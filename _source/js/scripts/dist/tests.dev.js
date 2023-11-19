"use strict";

function checkIfError(questions) {
  for (var i = 0; i < questions.children.length; i++) {
    var question = questions.children[i];

    if (question.classList.contains("_active")) {
      return false;
    }
  }

  return true;
}

function createErrorMessage(button) {
  var prevElement = button.nextElementSibling ? button.nextElementSibling : null;

  if (prevElement && prevElement.classList.contains("alert-message")) {
    prevElement.classList.add("_show");
  } else {
    var span = '<span class="alert-message _show">Пожалуйста,выберите вариант ответа</span>';
    button.insertAdjacentHTML("afterend", span);
  }
}

function closeTest() {
  document.querySelector('.testing').classList.add('_active-tab');
  document.querySelector(".test").classList.remove("_active-tab");
  document.querySelector("html").classList.remove("smt");
}

var needToBeInitialized = [document.querySelector(".test__labels__info__img"), document.querySelector(".test__labels__timer"), document.querySelector(".test__questions__labels")];
var tests = document.querySelectorAll(".testing__content__test");
tests.forEach(function (test) {
  test.addEventListener("click", function () {
    needToBeInitialized.forEach(function (item) {
      return void item.classList.remove("_hide");
    });
    document.querySelector(".testing").classList.remove("_active-tab");
    document.querySelector(".test").classList.add("_active-tab");
    initTimer();
  }, false);
});
var answers = document.querySelectorAll(".test__questions__answer");
answers.forEach(function (answer) {
  answer.addEventListener("click", function (e) {
    answers.forEach(function (item) {
      return void item.classList.remove("_active");
    });
    answer.classList.add("_active");
  });
});
var buttons = document.querySelectorAll(".test__questions__btn");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    var current = button.closest(".test__questions__answers");
    console.log(current, checkIfError(current));

    if (!checkIfError(current)) {
      current.classList.remove("_active");

      if (current.nextElementSibling) {
        current.nextElementSibling.classList.add("_active");
      }

      if (!button.classList.contains("_last")) {
        var pagination = document.querySelector(".test__questions__labels__pagination");
        pagination.textContent = "".concat(+pagination.textContent.split("/")[0] + 1, "/").concat(pagination.textContent.split("/")[1]);
      } else {
        document.querySelector(".test__result").classList.add("_active");
        needToBeInitialized.forEach(function (item) {
          return void item.classList.add("_hide");
        });
      }
    } else {
      createErrorMessage(button);
    }
  });
});
var exitAfterResults = document.querySelector(".test__result__cross");
exitAfterResults.addEventListener('click', closeTest, false);
var exitDuringTets = document.querySelector(".test__labels__info__img");
exitDuringTets.addEventListener('click', function (e) {
  document.querySelector(".test__overlay").classList.add('_active');
  document.querySelector(".test__result__modal").classList.add('_show');
  document.querySelector("html").classList.add("smt");
  document.querySelector(".test__result__modal").scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
  });
});
var btnYes = document.querySelector(".test__result__btn._yes");
var btnNo = document.querySelector(".test__result__btn._no");
btnYes.addEventListener('click', closeTest, false);
btnNo.addEventListener('click', function (e) {
  document.querySelector(".test__overlay").classList.remove("_active");
  document.querySelector(".test__result__modal").classList.remove("_show");
  document.querySelector("html").classList.remove("smt");
});