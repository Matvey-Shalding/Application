{
  const btnGoToMessanger = document.querySelector(".header-options__item.other");
  function moveIntoMessanger(extending) {
    btnGoToMessanger.style.display = "none";
    document.querySelector(".pin-code").classList.remove("_shown");
    if(extending) {
      document.querySelector(".tab._active-tab").classList.remove("_active-tab");
    }
    document.querySelector(".messanger").classList.add("_active");
  }
  let prevTab;
  let first = true;
  btnGoToMessanger.addEventListener("click", e => {
    if (first) {
      document.querySelector(".pin-code").classList.add("_shown");
      prevTab = document.querySelector(".tab._active-tab");
      prevTab && prevTab.classList.remove("_active-tab");
      first = false;
    } else {
      moveIntoMessanger(true);
    }
  });
  const buttons = document.querySelectorAll(".pin-code__button");
  const chars = document.querySelectorAll(".pin-code__input__chart");
  let current = 0;
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      if (
        (button.classList.contains("erase") ||
          button.classList.contains("delete_one")) &&
        current !== 0
      ) {
        if (button.classList.contains("erase")) {
          chars.forEach(char => {
            char.value = "";
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
          setTimeout(() => {
            moveIntoMessanger();
            return false;
          }, 500);
        }
      }
    });
  });

  document.addEventListener("keydown", e => {
    if (document.querySelector(".pin-code").classList.contains("_shown")) {
      const key = e.key;
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
            setTimeout(() => {
              moveIntoMessanger();
              return false;
            }, 500);
          }
        }
      }
    }
  });

  //Leave from messanger

  const leave = document.querySelector(".messanger__labels__header__leave");
  leave.addEventListener("click", () => {
    document.querySelector(".messanger").classList.remove("_active");
    document.querySelector(".pin-code").classList.remove("_shown");
    prevTab && prevTab.classList.add("_active-tab");
    btnGoToMessanger.style.display = "inline-grid";
  });
}
