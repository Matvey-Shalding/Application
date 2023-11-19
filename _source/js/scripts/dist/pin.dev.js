"use strict";

{
  var moveIntoMessanger = function moveIntoMessanger(extending) {
    btnGoToMessanger.style.display = "none";
    document.querySelector(".pin-code").classList.remove("_shown");

    if (extending) {
      document.querySelector(".tab._active-tab").classList.remove("_active-tab");
    }

    document.querySelector(".messanger").classList.add("_active");
  };

  var btnGoToMessanger = document.querySelector(".header-options__item.other");
  var prevTab;
  var first = true;
  btnGoToMessanger.addEventListener("click", function (e) {
    if (first) {
      document.querySelector(".pin-code").classList.add("_shown");
      prevTab = document.querySelector(".tab._active-tab");
      prevTab && prevTab.classList.remove("_active-tab");
      first = false;
    } else {
      moveIntoMessanger(true);
    }
  });
  var buttons = document.querySelectorAll(".pin-code__button");
  var chars = document.querySelectorAll(".pin-code__input__chart");
  var current = 0;
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      if ((button.classList.contains("erase") || button.classList.contains("delete_one")) && current !== 0) {
        if (button.classList.contains("erase")) {
          chars.forEach(function (_char) {
            _char.value = "";
          });
          current = 0;
        } else {
          current--;
          chars[current].value = "";
        }
      } else {
        chars[current].value = button.textContent;
        current++;

        if (current === 4) {
          setTimeout(function () {
            moveIntoMessanger();
            return false;
          }, 500);
        }
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (document.querySelector(".pin-code").classList.contains("_shown")) {
      var key = e.key;

      if (key === "Backspace" || key === "Delete") {
        if (current > 0) {
          chars[current - 1].value = "";
          current--;
        }
      } else {
        if (!isNaN(Number(key))) {
          chars[current].value = key;
          current++;

          if (current === 4) {
            setTimeout(function () {
              moveIntoMessanger();
              return false;
            }, 500);
          }
        }
      }
    }
  }); //Leave from messanger

  var leave = document.querySelector(".messanger__labels__header__leave");
  leave.addEventListener("click", function () {
    document.querySelector(".messanger").classList.remove("_active");
    document.querySelector(".pin-code").classList.remove("_shown");
    prevTab && prevTab.classList.add("_active-tab");
    btnGoToMessanger.style.display = "grid";
  });
}