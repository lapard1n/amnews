"use strict"

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

if (isMobile.any()) {
  document.body.classList.add('_touch');

  let menuArrows = document.querySelectorAll('.menu__arrow');
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {

      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {
        if (menuArrow.parentElement.classList.contains('_active')) {
          menuArrow.parentElement.classList.remove('_active');
          return;
        }

        for (let i = 0; i < menuArrows.length; i++) {
          if (menuArrows[i].parentElement.classList.contains('_active')) {
            menuArrows[i].parentElement.classList.remove('_active');
          }
        }

        menuArrow.parentElement.classList.toggle('_active');
      })
    }
  }

} else {
  document.body.classList.add('_pc');
}
