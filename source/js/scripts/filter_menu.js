{
  document.querySelector(".rating__labels__filter").addEventListener("click", e => {
    console.log('mrnu')
    document.querySelector(".filter__menu").classList.add("_active__filter");
    document.querySelector("html").classList.add("scrollbar");
    document.querySelector('.header').classList.add('hidden')
    // document.body.classList.add("_modal");
    // document.body.style.height = "100vh";
    document.querySelector(".filter__menu").scrollIntoView({
      block : 'center',
      inline :'center'
    });
    document.querySelector(".filter-menu__overlay").classList.add("_active__blur");
  });
  document
    .querySelectorAll(".filter__menu__item._submenu .filter__menu__item__checkbox")
    .forEach(item => {
      item.addEventListener("change", () => {
        item.parentElement.nextElementSibling.classList.toggle("_active__sub-filter");
        // const nextEl = item.closest(
        //   ".filter__menu__item._submenu"
        // ).nextElementSibling;
        // nextEl.classList.toggle("_active__sub-filter");
        // if (
        //   nextEl.nextElementSibling.classList.contains("filter__menu__range__fields")
        // ) {
        //   nextEl.nextElementSibling.classList.toggle("_active__sub-filter");
        // }
      });
    });
}
