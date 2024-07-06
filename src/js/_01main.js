// TODO ПРОКРУТКА ПРИ КЛИКЕ
const menuAnchors = document.querySelectorAll('a[data-goto]');
for (let menuAnchor of menuAnchors) {
  menuAnchor.addEventListener('click', function (e) {
    // ? ДЕЙСТВИЕ ПО УМОЛЧАНИЮ НЕ ДОЛЖНО ВЫПОЛНЯТЬСЯ
    e.preventDefault();

    // ? ССЫЛКА НА ОБЪЕКТЫ ПО DATA-GOTO
    const dataSet = document.querySelector(menuAnchor.dataset.goto);

    // ? ПРОВЕРКА ОТКРЫТОГО МЕНЮ
    if (burgerMenu.classList.contains('_active')) {
      document.body.classList.remove('_lock');
      burgerMenu.classList.remove('_active');
      menuDropout.classList.remove('_active');
    }

    // ? ПЛАВНЫЙ СКРОЛЛ К КОНКРЕТНОМУ ЭЛЕМЕНТУ
    dataSet.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }, false)
}

// TODO КНОПКА ВОЗВРАЩЕНИЯ НАВЕРХ
const goToTopBtn = document.querySelector('.main__link-up');
const header = document.querySelector('.header');
const options = { threshold: 1.0 }

const observeCallback = function (entries, observer) {
  entries.forEach(entry => {
    // ? СВОЙСТВА ОБЪЕКТА IntersectionObserver
    const {
      // ? ДОСТУП К ОТСЛЕЖИВАЕМОМУ ЭЛЕМЕНТУ
      target,
      // ? true ЕСЛИ ОТСЛЕЖИВАЕМЫЙ ЭЛЕМЕНТ ПЕРЕСЕКАЕТ viewport ХОТЯ БЫ НА 1 px
      isIntersecting
    } = entry;

    if (isIntersecting) {
      goToTopBtn.classList.remove('show');
    } else {
      goToTopBtn.classList.add('show');
    }
  });
}

const observer = new IntersectionObserver(observeCallback, options);
observer.observe(header);

// TODO ПРОПИСВАЮ ПЛАВНУЮ ПРОКРУТКУ ВВЕРХ ПРИ НАЖАТИИ НА ПОЯВИВШУЮСЯ КНОПКУ
goToTopBtn.addEventListener('click', backToTop, false);

function backToTop(e) {
  e.preventDefault();

  header.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

// TODO ДОБАВЛЯЮ HR ЭЛЕМЕНТ В НАЧАЛО СПИСКА SUB-LIST НА ЭКРАНАХ ДО 768
if (document.documentElement.clientWidth < 768) {

  const hrElement = document.querySelectorAll('.menu__sub-list');
  hrElement.forEach(i => {
    const newUpHr = document.createElement('hr');
    i.insertAdjacentElement('afterbegin', newUpHr);
  })
  hrElement.forEach(i => {
    const newUpHr = document.createElement('hr');
    i.insertAdjacentElement('beforeend', newUpHr);
  })
}

// TODO СОЗДАЮ ТО САМОЕ ПРЕСЛОВУТОЕ БУРГЕР-МЕНЮ!
const burgerMenu = document.querySelector('.burger-menu');
const menuDropout = document.querySelector('.menu');
burgerMenu.addEventListener('click', function (e) {
  document.body.classList.toggle('_lock');
  burgerMenu.classList.toggle('_active');
  menuDropout.classList.toggle('_active');
}, false);

// TODO СТИЛИЗУЮ FOOTER С ПОМОЩЬЮ СКРИПТОВ
// ? УСТАНАВЛИВАЮ ВЫСОТУ ЭЛЕМЕНТА ПО САМОМУ БОЛЬШОМУ
const footerLine = document.querySelector(".footer__line");
const footerInfo = document.querySelector(".footer__info");
const footerHeight = document.querySelector(".footer__input-case").offsetHeight;

footerLine.style.height = (footerHeight - 70) + "px";
footerInfo.style.height = footerHeight + "px";

// ? АНИМИРУЮТ LABEL ПРИ ОЧИСТКЕ ПОЛЯ INPUT
const footerInput = document.querySelectorAll(".footer__input");
const footerLabel = document.querySelectorAll('.footer__label');
const footerReset = document.querySelector('buttun.footer__submit');

footerInput.forEach(input => {
  input.addEventListener('input', function (e) {
    input.nextSibling.nextSibling.classList.add("input-active");
    if (input.value == '') {
      input.nextSibling.nextSibling.classList.remove("input-active");
    }
  }, false);
  footerReset.addEventListener('click', function (e) {
    input.value = '';
    input.nextSibling.nextSibling.classList.remove("input-active");
  }, false);
})



