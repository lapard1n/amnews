// TODO УКАЗАНИЕ СЛАЙДА ПО УМОЛЧАНИЮ
// TODO КНОПКИ ПРОКРУТКИ
// TODO ЗАЦИКЛЕННОСТЬ ПЕРЕХОДА
// TODO АВТО-ПРОКРУТКА СЛАЙДЕРА
// TODO ПРОКРУТКА СВАЙПОМ

const wrapper = document.querySelector('.slider__wrapper');
const container = document.querySelector('.slider__container');
const track = document.querySelector('.slider__track');
const items = document.querySelectorAll('.slider__item');
const btnPrev = document.querySelector('.slider__control_prev');
const btnNext = document.querySelector('.slider__control_next');

function slide(mainWrapper, prev, next) {
  let posX1 = 0;
  let posX2 = 0;
  let posInitial;
  let posFinal;
  let threshold = 100;
  let slides = track.querySelectorAll('.slider__item');
  let slidesLength = slides.length;
  let slideSize = track.querySelectorAll('.slider__item')[0].offsetWidth;
  let firstSlide = slides[0];
  let lastSlide = slides[slidesLength - 1];
  let cloneFirst = firstSlide.cloneNode(true);
  let cloneLast = lastSlide.cloneNode(true);
  let index = 0;
  let allowShift = true;

  // ? КЛОНИРУЮ ПЕРВЫЕ И ПОСЛЕДНИЕ СЛАЙДЫ В ОЧЕРЕДЬ
  track.appendChild(cloneFirst);
  track.insertBefore(cloneLast, firstSlide);
  mainWrapper.classList.add('loaded');

  // ? СОБЫТИЕ МЫШЬЮ
  track.onmousedown = dragStart;

  // ? СОБЫТИЯ СВАЙПОМ
  track.addEventListener('touchstart', dragStart);
  track.addEventListener('touchend', dragEnd);
  track.addEventListener('touchmove', dragAction);

  // ? СОБЫТИЯ ПО КНОПКАМ
  prev.addEventListener('click', function () { shiftSlide(-1) })
  next.addEventListener('click', function () { shiftSlide(1) })

  track.addEventListener('transitionend', checkIndex);

  // ! ОПИСЫВАЮ СОБЫТИЯ
  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = track.offsetLeft;

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
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
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      track.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  // ? ГЛАВНЫЕ ФУНКЦИИ СМЕЩЕНИЯ
  function shiftSlide(dir, action) {
    track.classList.add('shifting');

    if (allowShift) {
      if (!action) {
        posInitial = track.offsetLeft;
      }
      if (dir == 1) {
        track.style.left = (posInitial - slideSize) + "px";
        index++;
      } else if (dir == -1) {
        track.style.left = (posInitial + slideSize) + "px";
        index--;
      }
    };

    allowShift = false;
  }

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
}

slide(wrapper, btnPrev, btnNext);

// TODO СОЗДАЮ ИНДИКАТОРЫ ПРОКРУТКИ В ЗАВИСИМОСТИ ОТ КОЛИЧЕСТВА СЛАЙДОВ
const indicators = document.querySelector('.slider__indicators');

for (let i = 0; i != items.length; i++) {
  // ? СОЗДАЮ ПОЛОСКУ ИНДИКАТОРА
  let indicatorLine = document.createElement('span');
  indicatorLine.classList.add('slider__indicator-line');
  // ? СОЗДАЮ ОБОЛОЧКУ ИНДИКТОРОВ
  let indicatorCase = document.createElement('button');
  indicatorCase.classList.add('slider__indicator-case');
  indicatorCase.setAttribute('href', '#');
  indicatorCase.appendChild(indicatorLine);
  // ? НАКОНЕЦ ДОБАВЛЯЮ ПАРТИЮ ГОТОВЫХ РЕБЯТ В РОДИТЕЛЯ
  indicators.appendChild(indicatorCase);
}
