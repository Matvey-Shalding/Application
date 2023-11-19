{
  const arrow__back = document.querySelector(".profile__friends__item__arrow");
  arrow__back.addEventListener("click", e => {
    arrow__back.closest(".profile__my").classList.remove("tab__open");
    document.querySelector(".profile__friends__item.sub-item").classList.remove('_active');
    const items = [
      ...document.querySelectorAll(".profile__friends__item:not(.sub-item)"),
    ];
    const filteredItems = items.filter(
      item => !item.classList.contains("different")
    );
    filteredItems.forEach(item => {
      item.classList.remove("fading");
    });
  });
}

{const links = document.querySelectorAll(
  ".navigation__profile-img.clickable,.navigation__profile-info-name-age.clickable"
);
links.forEach(link => {
  link.addEventListener("click", e => {
    const target = link.closest(".profile__friends__item").nextElementSibling
      .children[0];
    target.parentNode.classList.add('_active')
    target.classList.add("tab__open");
    const items = [
      ...document.querySelectorAll(".profile__friends__item:not(.sub-item)"),
    ];
    const filteredItems = items.filter(
      item => !item.classList.contains("different")
    );
    filteredItems.forEach(item => {
      item.classList.add("fading");
    });
  });
});}

const labels = document.querySelectorAll(".messanger__content__contact");
{
  if (!window.matchMedia("(max-width:700px)").matches) {
    labels.forEach(label => {
      label.addEventListener(
        "click",
        () => {
          label
            .closest(".messanger__content__tab")
            .querySelector(".messanger__content__chat")
            .classList.add("_active");
        },
        false
      );
    });
  }
  const leaveFromChat = document.querySelectorAll(
    ".messanger__chat__headers__leave"
  );
  leaveFromChat.forEach(leave =>
    leave.addEventListener("click", e => {
      const parent = document.querySelector(".messanger__content__tab");
      parent.querySelector(".messanger__content__chat").classList.remove("_active");
      parent.querySelector(".messanger__content__contacts").classList.add("_active");
    })
  );
}

document.querySelector(".filter__menu__cross").addEventListener(
  "click",
  function (e) {
    const checkboxes = document.querySelectorAll(".filter__menu__item__checkbox");
    const filters = [];
    checkboxes.forEach(checkbox => {
      const parent = checkbox.parentElement;
      if (checkbox.checked && parent.classList.contains("_submenu")) {
        const filterType = parent.dataset.filterType;
        if (parent.classList.contains("_range")) {
          const fields = parent.nextElementSibling.nextElementSibling.childNodes
          filters.push([filterType, fields[0].data, fields[fields.length - 1].data]);
        } else {
          const data = [];
          const checkboxes = parent.nextElementSibling
            .querySelectorAll(`.filter__menu__item__checkbox`)
            .forEach(checkbox => {
              if (checkbox.checked) {
                data.push(
                  checkbox.nextElementSibling.nextElementSibling.textContent
                );
              }
            });
          filters.push([filterType, data]);
        }
      }
    });
    console.log(filters);
    const tasksApproachToFilters = [];
    const filterTask = (task, index) => {
      filters.forEach(filter => {
        const item = task.querySelector(`.rating__item__text.${filter[0]}`);
        if (filter[1] instanceof Array) {
          if(!filter[1].includes(item.textContent)) {
            return
          }
        } else {
          if (filter[0] === "_level") {
            const compare = Number(item.textContent.split(" ")[0]);
            if(compare < filter[1] || compare > filter[2]) {
              return
            }
          } else {
            if(Number(item.textContent) < filter[1] || Number(item.textContent) > filter[2]) {
              return
            }
          }
        }
        tasksApproachToFilters.push(index)
      });
    };
    const profiles = document.querySelectorAll(".rating__content__items__item");
    profiles.forEach((profile,index) => void filterTask(profile,index));
    let html = ''
    for(const index of tasksApproachToFilters) {
      profiles[index].classList.add("_top-filtered");
      html += profiles[index].outerHTML
    }
    for(let i = 0; i < profiles.length; i++) {
      if(tasksApproachToFilters.includes(i)) {
        continue
      }
      html += profiles[i].outerHTML
    }
    document.querySelector(".rating__content__items").innerHTML = html
  },
  false
);

export default function click(node) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent(
    "mousedown",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  node.dispatchEvent(evt);
  node.click();
}

const storage = new Map();
const attribute = "data-da";
const elements = document.querySelectorAll(`[${attribute}]`);
export function formingData() {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    let [destination, breakpoint, index, type] = element
      .getAttribute(attribute)
      .split(",");
    type = type === undefined ? (type = "max") : type;
    if (type) {
      if (type !== "max" && type !== "min") {
        throw new Error("Invalid type");
      } else {
        type = "max";
      }
    }
    storage.set(element, {
      destination: destination,
      breakpoint: `(${type}-width: ${breakpoint}px)`,
      indexForDestination: index,
      parent: element.parentElement,
    });
    storage.get(element).indexInParent = Array.from(
      storage.get(element).parent.children
    ).findIndex((child) => {
      return child.getAttribute("class") === element.getAttribute("class");
    });
  }
}
export const dynamicThrowing = () => {
  function mainAdaptive() {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const data = storage.get(element);
      if (window.matchMedia(data.breakpoint).matches) {
        element.classList.add("_dynamic-adapted");
        const dest = document.querySelector(data.destination);
        let position;
        if (
          typeof Number(data.indexForDestination) === "number" &&
          Number(data.indexForDestination) - 1 < dest.children.length
        ) {
          position = [...dest.children].find(
            (item, index) => index === Number(data.indexForDestination)
          );
        } else {
          if (data.indexForDestination === "first") {
            position = dest.firstChild;
          } else if (
            data.indexForDestination === "last" ||
            data.indexForDestination - 1 >= dest.children.length
          ) {
            position = null;
          } else throw new Error("Invalid index of destination");
        }
        dest.insertBefore(element, position);
      } else {
        if (element.classList.contains("_dynamic-adapted")) {
          element.classList.remove("_dynamic-adapted");
          const position = [...data.parent.children].find(
            (item, index) => index === data.indexInParent
          );
          data.parent.insertBefore(element, position);
        }
      }
    }
  }
  mainAdaptive();
};
export const dataChange = () => {
  const attribute_change = "data-change";
  const elements = document.querySelectorAll(`[${attribute_change}]`);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const type = element.getAttribute(attribute).split(",")[3];
    const prevValue = element.getAttribute(attribute);
    const value = element.getAttribute(attribute_change);
    const mediaRequest = value.split(",").splice(1, Infinity);
    let media;
    if (type) {
      media = window.matchMedia(`(${type}-width: ${mediaRequest}px)`).matches;
    } else {
      media = window.matchMedia(`(max-width: ${mediaRequest}px)`).matches;
    }
    if (media) {
      if (!element.classList.contains("dynamic_changed")) {
        element.classList.add("dynamic_changed");
        element.setAttribute(attribute, value.split(","));
        element.setAttribute(attribute_change, `${mediaRequest},${prevValue}`);
      }
    } else {
      if (element.classList.contains("dynamic_changed")) {
        element.classList.remove("dynamic_changed");
        element.setAttribute(attribute, prevValue);
        element.setAttribute(attribute_change, value);
      }
    }
  }
};

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

//this function returns coords of the element relativly to the top border of the page(! not window)
//return value {top: ,right: ,bottom: ,left:}

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}

document.querySelectorAll('a').forEach(item => void item.setAttribute('tabindex','-1'))
function formChartInfo(place, item) {
  if (place === 1) {
    return item.nextElementSibling.textContent.split("/")[0];
  } else if (place === 2) {
    const res = item.nextElementSibling.textContent.split("/");
    return res[1] - res[0];
  }
}

function formCutout(item) {
  if (window.matchMedia("(max-width:520px)").matches) {
    if(item.closest('.task.tab-active-tasks-task')) {
      return 40
    } else {
      return 28
    }
  }
  if (
    item.closest(".modal-window") &&
    window.matchMedia("(max-width:750px)").matches
  ) {
    return 32;
  }
  return 40;
}

document.querySelectorAll(".task__chart").forEach(chart => {
  new Chart(chart, {
    type: "doughnut",
    data: {
      labels: ["Выполненные задания", "Невыполненные задания"],
      datasets: [
        {
          label: "Задания",
          data: [formChartInfo(1, chart), formChartInfo(2, chart)],
          backgroundColor: [
            chart.closest(".task").classList.contains("_failed")
              ? "#fd3c60"
              : "#26E27C",
            "#fff",
          ],
          hoverOffset: 3,
        },
      ],
    },
    options: {
      cutout: 40,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
});

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

document.querySelectorAll(".nav-menu__item").forEach(link => {
  link.addEventListener('click',e => {
    const target = document.querySelector(`.tab.${link.dataset.tab}`)
    console.log(link);
    document.querySelector('.nav-menu__item.current').classList.remove('current')
    document.querySelector('.tab._active-tab').classList.remove('_active-tab')
    target.classList.add('_active-tab')
    link.classList.add('current')
  })
})
{ 
  const sendButtons = document.querySelectorAll(".messanger__chat__writing__send");
  sendButtons.forEach(sendbtn => {
    sendbtn.addEventListener("click", () => {
      const text = sendbtn.previousElementSibling.value;
      if(text === '') {
        return false
      }
      const now = new Date()
      let date =
        now.getMinutes() >= 10
          ? `${now.getHours()}:${now.getMinutes()}`
          : `${now.getHours()}:0${now.getMinutes()}`;
      const layout = `<div class="chat-messages__message _your">
        <div class="chat-messages__message__text">${text}</div>
        <div class="chat-messages__message__date">${date}</div>
      </div>`;
      sendbtn
        .closest(".messanger__chat__content")
        .querySelector(".messanger__chat__content__msgs")
        .insertAdjacentHTML("beforeend", layout);
      sendbtn.previousElementSibling.value = ''
    });
  });
}

function getCoord(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}

const modal = document.querySelector(".modal-window__container")
const overlay = document.querySelector(".modal-window__overlay");
function close() {
  document.querySelector(".header").classList.remove("hidden");
  document.documentElement.classList.remove("scrollbar");
}

function open() {
  document.querySelector(".header").classList.add("hidden");
  document.documentElement.classList.add('scrollbar')
}

{
  if (window.matchMedia("(max-width:700px)").matches) {
    document.querySelectorAll(".modal-window__task").forEach(modal => {
      modal.classList.remove("task");
    });
  }
  const task = document.querySelector(".task._modal");
  window.addEventListener(
    "click",
    e => {
      if (
        e.target.closest("._modal") !== null ||
        e.target.classList.contains("_modal")
      ) {
        modal.classList.add('_active')
        overlay.classList.add('_shown')
        open()
        modal.scrollIntoView({
          block: 'center',
          inline: 'center'
        })
      } else if (Boolean(e.target.closest(".profile__friends__select"))) {
        if(document.querySelector(".profile__friends__select__menu").classList.contains('active-select')) {
          document.querySelector(".profile__friends__select__menu").classList.remove("active-select");
        } else {
          document.querySelector(".profile__friends__select__menu").classList.add("active-select");
        }
      } else if (e.target.classList.contains("modal-window")) {
        closeModal(e.target);
      }
      if (!e.target.classList.contains("profile__friends__select")) {
        document
          .querySelector(".profile__friends__select__menu")
          .classList.remove("active-select");
      }
      if (
        (!e.target.closest(".filter__menu") &&
          document
            .querySelector(".filter__menu")
            .classList.contains("_active__filter") &&
          !e.target.closest(".rating__labels__filter")) ||
        e.target.closest(".filter__menu__cross")
      ) {
        document
          .querySelector(".filter-menu__overlay")
          .classList.remove("_active__blur");
        document.querySelector(".filter__menu").classList.remove("_active__filter");
        document.querySelector("html").classList.remove("scrollbar");
        document.querySelector(".header").classList.remove("hidden");
      }
      if (
        e.target.closest(".messanger__content__contact") &&
        window.matchMedia("(max-width:700px)").matches
      ) {
        labels.forEach(
          label =>
            void label.addEventListener("click", e => {
              const parent = label.closest(".messanger__content__tab");
              parent
                .querySelector(".messanger__content__contacts")
                .classList.remove("_active");
              parent.querySelector(".messanger__chat").classList.add("_active");
              parent
                .querySelector(".messanger__chat__headers__leave")
                .classList.add("_shown");
            })
        );
      }
    },
    false
  );

  // closing modal window

  function closeModal(modal) {
    modal.classList.remove("_active");
    overlay.classList.remove('_shown')
    close()
    document.querySelector(".main").scrollIntoView({
      inline: "start",
    });
  }
  document.addEventListener(
    "click",
    e => {
      console.log(e.target);
      if(e.target.classList.contains('modal-window__overlay')) {
        closeModal(document.querySelector(".modal-window__container"));
      }
    },
  );
  const cross = document.querySelector(".modal-window__cross");
  cross.addEventListener('click',function (e){
    console.log('clic');
    close()
    closeModal(cross.closest(".modal-window__container"));
  })
}

formingData();
document.addEventListener("DOMContentLoaded", e => {
  dynamicThrowing();
});

window.addEventListener("resize", e => {
  dataChange();
  dynamicThrowing();
});

import * as noUiSlider from "https://cdn.jsdelivr.net/npm/nouislider@15.7.1/+esm";
noUiSlider
{const UIsliders = document.querySelectorAll(".filter__menu__range");
console.log(UIsliders);
UIsliders.forEach(UIslider => {
  const min__field = UIslider.nextElementSibling.firstChild;
  const max__field = UIslider.nextElementSibling.lastChild;
  noUiSlider.create(UIslider, {
    start: [10000, 50000],
    range: {
      min: [0],
      max: [80000],
    },
    connect: true,
    step: 1,
  });
  UIslider.noUiSlider.on("update", (values, handle) => {
    if (handle == 0) {
      min__field.textContent = Number(values[handle]).toFixed();
    } else if (handle == 1) {
      max__field.textContent = Number(values[handle]).toFixed();
    }
  });
});}

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

const {
  OverlayScrollbars,
  ScrollbarsHidingPlugin,
  SizeObserverPlugin,
  ClickScrollPlugin,
} = OverlayScrollbarsGlobal;

let a = OverlayScrollbars(document.querySelector(".rating__content"), {
  className: "s",
});



const b = OverlayScrollbars(document.body, {
  className: "other",
});

const c = OverlayScrollbars(document.querySelector(".shop__modal__card"), {
  className: "ddd",
});

const u = OverlayScrollbars(document.querySelector(".modal-window__container"), {
  className: "ddd",
});

const f = OverlayScrollbars(
  document.querySelector(".messanger__content__contacts"),
  {
    className: "f",
  }
);

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

const cards = document.querySelectorAll(".shop__content__tab__card");
cards.forEach(card => {
  card.addEventListener(
    "click",
    e => {
      if (!e.target.classList.contains("shop__card__btn")) {
        document.querySelector(".shop__modal__card").classList.add("_active");
        document.querySelector(".shop__modal__overlay").classList.add("_show");
        open();
      }
    },
    false
  );
});

// small modal

const first = document.querySelectorAll(".shop__card__btn");
const second = document.querySelectorAll(".modal-card__content__btn");
[...first, ...second].forEach(item => {
  item.addEventListener("click", e => {
    document.querySelector(".shop__modal__card").classList.remove("_active");
    document.querySelector(".shop__modal__confirm").classList.add("_active");
    document.querySelector(".shop__modal__overlay").classList.add("_show");
    document.querySelector("html").classList.add("smt");
    document.querySelector(".shop__modal__confirm").scrollIntoView({
      block: "center",
    });
  });
});

// closing modals

function closeShopModals(cross) {
  if (cross == undefined) {
    if (cross.closest(".shop__modal__card")) {
      document.querySelector(".shop__modal__card").classList.remove("_active");
      document.querySelector(".shop__modal__overlay").classList.remove("_show");
    } else {
      document.querySelector(".shop__modal__confirm").classList.remove("_active");
      document.querySelector(".shop__modal__overlay").classList.remove("_show");
    }
    document.body.scrollIntoView();
  } else {
    const target = document
      .querySelector(".shop__modal__card")
      .classList.contains("_active")
      ? document.querySelector(".shop__modal__card")
      : document.querySelector(".shop__modal__confirm");
    target.classList.remove("_active");
    document.querySelector(".shop__modal__overlay").classList.remove("_show");
    close();
    document.body.scrollIntoView();
  }
}

document.querySelectorAll(".modal__card__cross").forEach(cross => {
  cross.addEventListener("click", e => void closeShopModals(cross), false);
});

document
  .querySelector(".shop__modal__overlay")
  .addEventListener("click", closeShopModals, false);
const confirmBtn = document.querySelector(".modal__confirm__btn");
confirmBtn.addEventListener(
  "click",
  e => void closeShopModals(confirmBtn.nextElementSibling)
);

import Swiper from "https://cdn.jsdelivr.net/npm/swiper@10.2.0/swiper.mjs";
import Navigation from "https://cdn.jsdelivr.net/npm/swiper@10.2.0/modules/navigation.min.mjs";
const swiper1 = new Swiper(".achievements__list__swiper", {
  modules: [Navigation],
  navigation: {
    nextEl: ".achievements__list__swiper__arrow._next",
    prevEl: ".achievements__list__swiper__arrow._prev",
  },
  spaceBetween: 32,
  slidesPerView: 7,
})

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

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

function initTimer(close) {
  const timer = document.querySelector(".test__labels__timer");
  function updateTimer() {
    const time = timer.textContent;
    const [hours, minutes] = time.split(":");
    let newTime;
    if (minutes === "00") {
      newTime = `${+hours - 1}:59`;
    } else if (hours === "00" && minutes === "01") {
      close();
    } else {
      if (+minutes >= 10) {
        newTime = `${hours}:${+minutes - 1}`;
      } else {
        newTime = `${hours}:0${+minutes - 1}`;
      }
    }
    timer.textContent = newTime;
  }
  setInterval(updateTimer, 1000);
}
