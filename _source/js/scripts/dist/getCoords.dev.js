"use strict";

//this function returns coords of the element relativly to the top border of the page(! not window)
//return value {top: ,right: ,bottom: ,left:}
function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}