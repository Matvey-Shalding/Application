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
