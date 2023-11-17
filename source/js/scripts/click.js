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
