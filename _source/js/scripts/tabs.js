const tabs = document.querySelectorAll(".content__tabs-title");
tabs.forEach(item => {
  const marker = item.parentElement.querySelector(".content__tabs-title__marker");
  item.addEventListener("mouseover", e => {
    marker.classList.remove("_fade-in");
    marker.style.width = item.offsetWidth + "px";
    marker.style.translate = item.offsetLeft + "px";
  });
  item.addEventListener("mouseleave", e => {
    marker.classList.add("_fade-in");
  });
});
{
  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      console.log("click");
      e.preventDefault();
      let prevtab;
      const marker = tab.parentElement.querySelector(".content__tabs-title__marker");
      marker.style.opacity = "1";
      const body = document.querySelector(tab.firstChild.getAttribute("href"));
      for (let index = 0; index < tabs.length; index++) {
        if (tabs[index].classList.contains("_active-tab-title")) {
          prevtab = tabs[index];
          tabs[index].classList.remove("_active-tab-title");
          document
            .querySelector(tabs[index].firstChild.getAttribute("href"))
            .classList.remove("tab-active");
          break;
        }
      }
      let top, left;
      if (prevtab) {
        const prevTabCoords = prevtab.getBoundingClientRect();
        const tabCoords = tab.getBoundingClientRect();
        // top = tabCoords.top - prevTabCoords.top;
        // left = tabCoords.left - prevTabCoords.left;
        // top = tabCoords.top - prevTabCoords.top
        const parentTop = tab.parentElement.getBoundingClientRect().top;
        top = tabCoords.top - parentTop;
        left = tabCoords.top - tabCoords.top;
        // if (prevTabCoords.top > tabCoords.top) {
        //   top = t
        // } else {
        //   top = marker.style.top + tab.offsetTop;
        // }
        // if (prevtab.offsetLeft > tab.offsetLeft) {
        //   top = marker.style.left - tab.offsetLeft;
        // } else {
        //   top = marker.style.left + tab.offsetLeft;
        // }
      } else {
        top = 0;
        left = 0;
      }
      setTimeout(() => void tab.classList.add("_active-tab-title"), 360);
      // console.log(prevtab && getCoords(prevtab), getCoords(tab), "prev current");
      body.classList.add("tab-active");
      marker.style.width = tab.offsetWidth + "px";
      marker.style.transform = `translate(${left + "px"},${top + "px"})`;
    });
  });
}
// document.querySelectorAll(".content__tabs-title")[0].click();
// const marker = document
//   .querySelector(".content__tabs-titles")
//   .querySelector(".content__tabs-title__marker");
// marker.style.opacity = '0'
// marker.style.width = document.querySelectorAll(".content__tabs-title")[0].offsetWidth + "px";
// marker.style.transform = `translateX(${
//   document.querySelectorAll(".content__tabs-title")[0].offsetLeft
// })px`;
// const tab = document.querySelector(`.${link}__tabs-title`);
// tab.click()
// tab.previousElementSibling.style.opacity = '0'
const main = document.querySelector(".main__container");
for (let i = 1; i < main.children.length; i++) {
  const tab = main.children[i];
  if (tab.classList.contains("tab")) {
    if (tab.querySelector('.content__tabs-title')) {
      tab.querySelector(".content__tabs-title").click();
      const marker = tab.querySelector(".content__tabs-title__marker");
      marker.style.opacity = "0";
    }
  } else {
    break;
  }
}
