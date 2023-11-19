function checkIfError(questions) {
  for (let i = 0; i < questions.children.length; i++) {
    const question = questions.children[i];
    if (question.classList.contains("_active")) {
      return false;
    }
  }
  return true;
}

function createErrorMessage(button) {
  const prevElement = button.nextElementSibling ? button.nextElementSibling : null;
  if (prevElement && prevElement.classList.contains("alert-message")) {
    prevElement.classList.add("_show");
  } else {
    const span =
      '<span class="alert-message _show">Пожалуйста,выберите вариант ответа</span>';
    button.insertAdjacentHTML("afterend", span);
  }
}

function closeTest() {
  document.querySelector(".testing").classList.add("_active-tab");
  document.querySelector(".test").classList.remove("_active-tab");
  document.querySelector('.header').classList.remove('hidden')
  document.querySelector('html').classList.remove('scrollbar')
}

const needToBeInitialized = [
  document.querySelector(".test__labels__info__img"),
  document.querySelector(".test__labels__timer"),
  document.querySelector(".test__questions__labels"),
];
const tests = document.querySelectorAll(".testing__content__test");
tests.forEach(test => {
  test.addEventListener(
    "click",
    () => {
      needToBeInitialized.forEach(item => void item.classList.remove("_hide"));
      document.querySelector(".testing").classList.remove("_active-tab");
      document.querySelector(".test").classList.add("_active-tab");
      initTimer();
    },
    false
  );
});

const answers = document.querySelectorAll(".test__questions__answer");
answers.forEach(answer => {
  answer.addEventListener("click", e => {
    answers.forEach(item => void item.classList.remove("_active"));
    answer.classList.add("_active");
  });
});

const buttons = document.querySelectorAll(".test__questions__btn");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    let current = button.closest(".test__questions__answers");
    console.log(current, checkIfError(current));
    if (!checkIfError(current)) {
      current.classList.remove("_active");
      if (current.nextElementSibling) {
        current.nextElementSibling.classList.add("_active");
      }
      if (!button.classList.contains("_last")) {
        const pagination = document.querySelector(
          ".test__questions__labels__pagination"
        );
        pagination.textContent = `${+pagination.textContent.split("/")[0] + 1}/${
          pagination.textContent.split("/")[1]
        }`;
      } else {
        document.querySelector(".test__result").classList.add("_active");
        needToBeInitialized.forEach(item => void item.classList.add("_hide"));
      }
    } else {
      createErrorMessage(button);
    }
  });
});

const exitAfterResults = document.querySelector(".test__result__cross");
exitAfterResults.addEventListener("click", closeTest, false);

const exitDuringTets = document.querySelector(".test__labels__info__img");
exitDuringTets.addEventListener("click", e => {
  document.querySelector(".test__overlay").classList.add("_active");
  document.querySelector(".test__result__modal").classList.add("_show");
  document.querySelector("html").classList.add("scrollbar");
  document.querySelector('.header').classList.add('hidden')
  document.querySelector(".test__result__modal").scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
});

const btnYes = document.querySelector(".test__result__btn._yes");
const btnNo = document.querySelector(".test__result__btn._no");
btnYes.addEventListener(
  "click",
  e => {
    closeTest();
    document.querySelector(".test__overlay").classList.remove("_active");
    document.querySelector(".test__result__modal").classList.remove("_show");
  },
  false
);
btnNo.addEventListener("click", e => {
  document.querySelector(".test__overlay").classList.remove("_active");
  document.querySelector(".test__result__modal").classList.remove("_show");
    document.querySelector("html").classList.remove("scrollbar");
    document.querySelector(".header").classList.remove("hidden");
});
