"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var cards = document.querySelectorAll(".shop__content__tab__card");
cards.forEach(function (card) {
  card.addEventListener("click", function (e) {
    if (!e.target.classList.contains("shop__card__btn")) {
      document.querySelector(".shop__modal__card").classList.add("_active");
      document.querySelector(".shop__modal__overlay").classList.add("_show");
      document.body.classList.add("smt");
      document.querySelector(".shop__modal__card").scrollIntoView({
        block: "center"
      });
    }
  }, false);
}); // small modal

var first = document.querySelectorAll(".shop__card__btn");
var second = document.querySelectorAll(".modal-card__content__btn");
[].concat(_toConsumableArray(first), _toConsumableArray(second)).forEach(function (item) {
  item.addEventListener("click", function (e) {
    document.querySelector(".shop__modal__card").classList.remove("_active");
    document.querySelector(".shop__modal__confirm").classList.add("_active");
    document.querySelector(".shop__modal__overlay").classList.add("_show");
    document.querySelector("html").classList.add("smt");
    document.querySelector(".shop__modal__confirm").scrollIntoView({
      block: "center"
    });
  });
}); // closing modals

function closeShopModals(cross) {
  if (cross == undefined) {
    if (cross.closest(".shop__modal__card")) {
      document.querySelector(".shop__modal__card").classList.remove("_active");
      document.querySelector(".shop__modal__overlay").classList.remove("_show");
      document.querySelector("html").classList.remove("smt");
      document.body.scrollIntoView();
    } else {
      document.querySelector(".shop__modal__confirm").classList.remove("_active");
      document.querySelector(".shop__modal__overlay").classList.remove("_show");
      document.querySelector("html").classList.remove("smt");
      document.body.scrollIntoView();
    }
  } else {
    var target = document.querySelector(".shop__modal__card").classList.contains("_active") ? document.querySelector(".shop__modal__card") : document.querySelector(".shop__modal__confirm");
    target.classList.remove("_active");
    document.querySelector(".shop__modal__overlay").classList.remove("_show");
    document.querySelector("html").classList.remove("smt");
    document.body.scrollIntoView();
  }
}

document.querySelectorAll(".modal__card__cross").forEach(function (cross) {
  cross.addEventListener("click", function (e) {
    return void closeShopModals(cross);
  }, false);
});
document.querySelector(".shop__modal__overlay").addEventListener("click", closeShopModals, false);
var confirmBtn = document.querySelector(".modal__confirm__btn");
confirmBtn.addEventListener('click', function (e) {
  return void closeShopModals(confirmBtn.nextElementSibling);
});