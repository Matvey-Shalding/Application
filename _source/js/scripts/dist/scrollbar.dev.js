"use strict";

var _OverlayScrollbarsGlo = OverlayScrollbarsGlobal,
    OverlayScrollbars = _OverlayScrollbarsGlo.OverlayScrollbars,
    ScrollbarsHidingPlugin = _OverlayScrollbarsGlo.ScrollbarsHidingPlugin,
    SizeObserverPlugin = _OverlayScrollbarsGlo.SizeObserverPlugin,
    ClickScrollPlugin = _OverlayScrollbarsGlo.ClickScrollPlugin;
var a = OverlayScrollbars(document.querySelector(".rating__content"), {
  className: 's'
});
var b = OverlayScrollbars(document.body, {
  className: "other"
});
var c = OverlayScrollbars(document.querySelector(".shop__modal__card"), {
  className: 'ddd'
});
var f = OverlayScrollbars(document.querySelector(".messanger__content__contacts"), {
  className: 'f'
});