{
  const titles = document.querySelectorAll(".rating__content__titles__title");
  titles.forEach(title => {
    title.addEventListener("click", () => {
      const selector = title.className.split(" ")[1];
      const itemsForFilter = Array.from(
        document.querySelectorAll(`.rating__item__text.${selector}`)
      );
      if (isNaN(Number(itemsForFilter[0]))) {
        itemsForFilter.sort((a, b) => {
          const c = a.textContent.split(" ")[0];
          const d = b.textContent.split(" ")[0];
          if (Number(c) > Number(d)) return -1;
          if (Number(c) == Number(d)) return 0;
          if (Number(c) < Number(d)) return 1;
        });
      } else {
        itemsForFilter.sort((a, b) => {
          if (Number(a.textContent) > Number(b.textContent)) return -1;
          if (Number(a.textContent) == Number(b.textContent)) return 0;
          if (Number(a.textContent) < Number(b.textContent)) return 1;
        });
      }
      const filteredItems = [...itemsForFilter];
      let html = "";
      filteredItems.forEach(item => {
        html += item.closest(".rating__content__items__item").outerHTML;
      });
      document.querySelector(".rating__content__items").innerHTML = html;
      titles.forEach(title => void title.classList.remove("_filtered"));
      title.classList.add("_filtered");
      const tabs = document.querySelectorAll(".rating__content__items__item")
      for(let i = 0;i < 3;i++) {
        tabs[i].classList.add('_top-filtered')
      }
    });
  });
}
