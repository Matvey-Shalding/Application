{
  const select = document.querySelector(".profile__friends__select");
  var menu = document.querySelector(".profile__friends__select__menu");
  // select.addEventListener("click", (e) => {
  //   console.log(e.target);
  //   if(true) {
  //     console.log('he')
  //   }
  // },false);
  menu.addEventListener(
    "click",
    e => {
      const input = document.querySelector(".profile__friends__select__text");
      if (e.target.classList.contains("profile__friends__select__text")) {
        [input.textContent, e.target.textContent] = [
          e.target.textContent,
          input.textContent,
        ];
      } else {
        menu.classList.remove("active-select");
      }
    },
    false
  );
//select hover

  document
    .querySelector(".profile__friends__select")
    .addEventListener("mouseover", e => {
      document
        .querySelector(".profile__friends__select__menu")
        .classList.add("active-select");
    });
}
