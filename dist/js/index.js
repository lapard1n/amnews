"use strict"

// ! ОБНАРУЖЕНИЕ МОБИЛЬНХ УСТРОЙСТВ
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
}

// ! СКРИПТ ДЛЯ РАЗДЕЛЕНИЯ ПО ТИПУ УСТРОЙСТВ
if (isMobile.any()) {
  document.body.classList.add('_touch');

  // ? ПОЛУЧАЕМ МАССИВ ОБЪЕКТОВ ДЛЯ МЕНЮ
  let menuArrows = document.querySelectorAll('.menu__arrow');
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {

      const menuArrow = menuArrows[index];

      // ? ОБРОБОТЧИК СОБЫТИЙ ДЛЯ ДИНАМИЧНОГО TOGGLE МЕНЮ
      menuArrow.addEventListener("click", function (e) {

        // ? ЗАКРЫТИЕ ПРИ КЛИКЕ
        if (menuArrow.parentElement.classList.contains('_active')) {
          menuArrow.parentElement.classList.remove('_active');
          return;
        }

        // ? ЗАКРЫТИЕ ВСЕХ АКТИВНЫХ ОТКРЫТИЕМ НОВОГО - ПЕРЕКЛЮЧЕНИЕ
        for (let i = 0; i < menuArrows.length; i++) {
          if (menuArrows[i].parentElement.classList.contains('_active')) {
            menuArrows[i].parentElement.classList.remove('_active');
          }
        }

        // ? ОТКРЫТИЕ НУЖНОГО TOGGLE МЕНЮ ПО КЛИКУ
        menuArrow.parentElement.classList.toggle('_active');
      })
    }
  }

} else {
  document.body.classList.add('_pc');
}

// ! ПРОКРУТКА ПРИ КЛИКЕ
const menuAnchors = document.querySelectorAll('a[data-goto]');

for (let menuAnchor of menuAnchors) {
  menuAnchor.addEventListener('click', function (e) {
    // ? ДЕЙСТВИЕ ПО УМОЛЧАНИЮ НЕ ДОЛЖНО ВЫПОЛНЯТЬСЯ
    e.preventDefault();

    // ? ССЫЛКА НА ОБЪЕКТЫ ПО DATA-GOTO
    const dataSet = document.querySelector(menuAnchor.dataset.goto);

    // ? ПЛАВНЫЙ СКРОЛЛ К КОНКРЕТНОМУ ЭЛЕМЕНТУ
    dataSet.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

// ! КНОПКА ВОЗВРАЩЕНИЯ НАВЕРХ
const goToTopBtn = document.querySelector('.main__link-up');
const header = document.querySelector('.header');

// ? СОЗДАЮ ОТБРАБОТЧИК СОБЫТИЙ ДЛЯ ОТСЛЕЖИВАНИЯ СКРОЛЛИНГА СТРАНИЦЫ
window.addEventListener('scroll', trackScroll);
function trackScroll(e) {
  e.preventDefault();
  let scrolled = window.pageYOffset;
  // ? ПОЛУЧАЮ ВЫСОТУ HEADER И ВЫЧИТАЮ 1 ДЛЯ ПОЯВЛЕНИЯ КНОПКИ ПРИ КЛИКЕ НА ANCHOR
  let headerHeight = header.clientHeight - 1;

  if (scrolled > headerHeight) {
    goToTopBtn.classList.add('_show');
  }
  if (scrolled < headerHeight) {
    goToTopBtn.classList.remove('_show');
  }
}

// ? ПРОПИСВАЮ ПЛАВНУЮ ПРОВЕКУ ВВЕРХ ПРИ НАЖАТИИ НА ПОЯВИВШУЮСЯ КНОПКУ
goToTopBtn.addEventListener('click', backToTop);
function backToTop(e) {
  e.preventDefault();

  header.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}
