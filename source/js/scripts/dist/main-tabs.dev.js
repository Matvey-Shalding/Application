"use strict";

document.querySelectorAll(".nav-menu__item").forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(".tab.".concat(link.dataset.tab));
    console.log(link);
    document.querySelector('.nav-menu__item.current').classList.remove('current');
    document.querySelector('.tab._active-tab').classList.remove('_active-tab');
    target.classList.add('_active-tab');
    link.classList.add('current');
  });
});