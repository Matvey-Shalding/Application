"use strict";

function getCoord(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}

function close() {
  document.querySelector(".header").classList.remove("hidden");
  document.querySelector("main").classList.remove("unscrollable");
}

function open() {
  document.querySelector(".header").classList.add("hidden");
  document.querySelector("main").classList.add("unscrollable");
}

{
  // closing modal window
  var closeModal = function closeModal(modal) {
    modal.classList.add("_close");
    document.querySelector("html").classList.remove("smt");
    document.querySelector(".main").scrollIntoView({
      inline: "start"
    });
  };

  if (window.matchMedia("(max-width:700px)").matches) {
    document.querySelectorAll(".modal-window__task").forEach(function (modal) {
      modal.classList.remove("task");
    });
  }

  var task = document.querySelector(".task._modal");
  window.addEventListener("click", function (e) {
    if (e.target.closest("._modal") !== null || e.target.classList.contains("_modal")) {
      var _modal = document.querySelector(".modal-window");

      var _ref = [getCoord(_modal).top, getCoord(_modal).left],
          top = _ref[0],
          left = _ref[1];
      var offset = getCoord(document.querySelector('main')).top;
      _modal.style.bottom = "".concat(top - offset + 12, "px");
      _modal.style.left = left * -1 + 'px';
      window.scrollTo(0, offset);

      _modal.classList.remove("_close");

      open();
    } else if (e.target.closest(".profile__friends__select") instanceof Element) {
      menu.classList.toggle("active-select");
    } else if (e.target.classList.contains("modal-window")) {
      closeModal(e.target);
    }

    if (!e.target.classList.contains("profile__friends__select")) {
      document.querySelector(".profile__friends__select__menu").classList.remove("active-select");
    }

    if (!e.target.classList.contains("filter__menu") && !e.target.closest(".rating__labels__filter") || e.target.closest(".filter__menu__cross")) {
      document.querySelector(".filter-menu__overlay").classList.remove("_active__blur");
      document.querySelector(".filter__menu").classList.remove("_active__filter");
      document.querySelector("html").classList.remove("smt");
    }
  }, false);
  var modal = document.querySelector(".modal-window");
  modal.addEventListener("click", function (e) {
    return void e.target === modal && closeModal(modal);
  }, false);
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal-window__cross") || e.target.classList.contains("modal-window__cross_IMG")) {
      closeModal(e.target.closest(".modal-window"));
    }
  }, false);
}