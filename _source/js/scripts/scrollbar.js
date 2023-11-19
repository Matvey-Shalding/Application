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
