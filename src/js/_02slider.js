const wrapper = document.querySelector('.slider__wrapper');
const track = document.querySelector('.slider__track');
const items = document.querySelectorAll('.slider__item');
const btnPrev = document.querySelector('.slider__control_prev');
const btnNext = document.querySelector('.slider__control_next');
const indicators = document.querySelector('.slider__indicators');

// TODO ОСНОВНАЯ ФУНКЦИЯ РАБОТЫ СЛАЙДЕРА
function slide() {
  let posX1 = 0;
  let posX2 = 0;
  let posInitial;
  let posFinal;
  let threshold = 100;
  let slidesLength = items.length;
  let slideSize = items[0].offsetWidth;
  let firstSlide = items[0];
  let lastSlide = items[slidesLength - 1];
  let cloneFirst = firstSlide.cloneNode(true);
  let cloneLast = lastSlide.cloneNode(true);
  let index = 0;
  let allowShift = true;

  // ? КЛОНИРУЮ ПЕРВЫЕ И ПОСЛЕДНИЕ СЛАЙДЫ В ОЧЕРЕДЬ
  track.insertBefore(cloneLast, firstSlide); // ДО
  track.appendChild(cloneFirst); //  ПОСЛЕ

  // ? КОГДА СЛАЙДЫ КЛАНИРОВАНЫ ПРИМЕНЯЕМ СТИЛИ
  wrapper.classList.add('loaded');

  // ? СОБЫТИЕ ДЛЯ МЫШИ
  track.onmousedown = dragStart;

  // TODO ИНИЦИАЛИЗАЦИЯ СОБЫТИЙ
  // ? СОБЫТИЯ ДЛЯ СВАЙПОВ
  track.addEventListener('touchstart', dragStart);
  track.addEventListener('touchmove', dragAction);
  track.addEventListener('touchend', dragEnd);

  // ? СОБЫТИЯ ПО КНОПКАМ
  btnPrev.addEventListener('click', function () {
    shiftSlide("prev", "click");
  })
  btnNext.addEventListener('click', function () {
    shiftSlide("next", "click");
  })

  track.addEventListener('transitionend', checkIndex);

  // TODO ПРОКРУТКА СВАЙПОМ
  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = track.offsetLeft;
    track.classList.add('active');

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmousemove = dragAction;
      document.onmouseup = dragEnd;
    }
  }
  function dragAction(e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }

    track.style.left = (track.offsetLeft - posX2) + "px";
  }
  function dragEnd(e) {
    posFinal = track.offsetLeft;

    if (posFinal - posInitial < -threshold) {
      shiftSlide("next", "swipe");
    } else if (posFinal - posInitial > threshold) {
      shiftSlide("prev", "swipe");
    } else {
      track.style.left = (posInitial) + "px";
    }

    document.onmousemove = null;
    document.onmouseup = null;
    track.classList.replace('active', 'unactive');
  }

  // TODO КНОПКИ ПРОКРУТКИ
  function shiftSlide(dir, action) {
    track.classList.add('shifting');

    if (allowShift) {
      // ? УСЛОВИЕ ОБНУЛЕНИЯ НАЧАЛЬНОЙ ПОЗИЦИИ ТОЛЬКО ДЛЯ КНОПОК*
      if (action == "click") {
        posInitial = track.offsetLeft;
      }
      // ? УСЛОВИЕ САМОЙ ПРОКРУТКИ
      if (dir == "next") {
        track.style.left = (posInitial - slideSize) + "px";
        index++;
      } else if (dir == "prev") {
        track.style.left = (posInitial + slideSize) + "px";
        index--;
      }
    };

    allowShift = false;
  }

  // TODO ЗАЦИКЛЕННОСТЬ ПЕРЕХОДА
  function checkIndex() {
    track.classList.remove('shifting');

    if (index == -1) {
      track.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      track.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }

  // TODO ПЕРЕКЛЮЧЕНИЕ СЛАЙДОВ ПО ИНДИКАТОРАМ
  // ? ИНДИКАТОРЫ ПРОКРУТКИ В ЗАВИСИМОСТИ ОТ КОЛИЧЕСТВА СЛАЙДОВ
  for (let i = 0; i != items.length; i++) {
    // ? СОЗДАЮ ПОЛОСКУ ИНДИКАТОРА
    const indicatorLine = document.createElement('span');
    indicatorLine.classList.add('slider__indicator-line');
    // ? СОЗДАЮ ОБОЛОЧКУ ИНДИКТОРОВ
    const indicatorCase = document.createElement('button');
    indicatorCase.classList.add('slider__indicator-case');
    indicatorCase.setAttribute('href', '#');
    indicatorCase.appendChild(indicatorLine);
    // ? НАКОНЕЦ ДОБАВЛЯЮ ПАРТИЮ ГОТОВЫХ РЕБЯТ В РОДИТЕЛЯ
    indicators.appendChild(indicatorCase);
  }

  // TODO АВТО-ПРОКРУТКА СЛАЙДЕРА
  // ? ОПИСЫВАЮ ВРЕМЯ И РАБОТУ ИНТЕРВАЛА
  const timeShift = 5000;
  function autoShift() {
    track.classList.add('shifting');
    posInitial = track.offsetLeft;
    track.style.left = (posInitial - slideSize) + "px";
    index++;
    if (index == (slidesLength + 1)) {
      track.classList.remove('shifting');
      track.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    console.log('go');
  }
  let timer = setInterval(autoShift, timeShift);

  // ? ОТСЛЕЖИВАЮ РАБОТУ ИНТЕРВАЛА ДЛЯ СВАЙПОВ
  const config = { "attributes": true };
  const observeShift = new MutationObserver(mutationEvent);
  function mutationEvent() {
    if (track.classList.contains('active')) {
      console.log('ОСТАНОВКА!');
      clearInterval(timer);
    } else if (track.classList.contains('unactive')) {
      console.log('ПРОДОЛЖЕНИЕ!');
      timer = setInterval(autoShift, timeShift);
      track.classList.remove('unactive');
    }
  };
  observeShift.observe(track, config);

  // ? ОТСЛЕЖИВАЮ РАБОТУ ИНТЕРВАЛА ПРИ КЛИКАХ ПО КНОПКАМ
  btnPrev.addEventListener('click', function () {
    console.log('ОБНОВИЛ!');
    clearInterval(timer);
    timer = setInterval(autoShift, timeShift);
  });
  btnNext.addEventListener('click', function () {
    console.log('ОБНОВИЛ!');
    clearInterval(timer);
    timer = setInterval(autoShift, timeShift);
  });

  // ? ОТСЛЕЖИВАЮ РАБОТУ ИНТЕРВАЛА ПРИ УХОДЕ СО СТРАНИЦЫ
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === 'hidden') {
      console.log('Вкладка не активна');
      clearInterval(timer);
    } else {
      console.log('Вкладка активна');
      timer = setInterval(autoShift, timeShift);
    }
  });

  // TODO ОПТИМИЗАЦИЯ СЛУШАТЕЛЕЙ СОБЫТИЙ
}

slide()
