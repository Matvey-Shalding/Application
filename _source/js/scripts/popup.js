{const arrow = document.querySelector(".navigation__popup-arrow");
arrow.addEventListener("click", e => {
  document.body.classList.toggle("navigation__popup-open");
});
document.addEventListener("scroll", e => {
  document.body.classList.remove("navigation__popup-open");
  document
    .querySelector(".profile__friends__select__menu")
    .classList.remove("active-select");
});}
