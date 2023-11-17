click(document.querySelectorAll(".library__tabs-title")[0]);
const articles = document.querySelectorAll(".library__content__article");
articles.forEach(article => {
  article.addEventListener(
    "click",
    e => {
      console.log("click");
      document.querySelector(".library__content__page").classList.add("_open");
      document.querySelector(".library__content").classList.add("_close");
    },
    false
  );
});

const arrowBack = document.querySelector(".library__page__arrow__back").parentElement
arrowBack.addEventListener("click", () => {
  document.querySelector(".library__content__page").classList.remove("_open");
  document.querySelector(".library__content").classList.remove("_close");
});
