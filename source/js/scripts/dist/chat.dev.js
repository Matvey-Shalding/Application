"use strict";

{
  var labels = document.querySelectorAll(".messanger__content__contact");

  if (window.matchMedia("(max-width:700px)").matches) {
    labels.forEach(function (label) {
      return void label.addEventListener("click", function (e) {
        console.log('here');
        var parent = label.closest(".messanger__content__tab");
        parent.querySelector('.messanger__content__contacts').classList.remove("_active");
        parent.querySelector('.messanger__chat').classList.add("_active");
        parent.querySelector(".messanger__chat__headers__leave").classList.add('_shown');
      }, false);
    });
  } else {
    labels.forEach(function (label) {
      label.addEventListener("click", function () {
        label.closest(".messanger__content__tab").querySelector(".messanger__content__chat").classList.add("_active");
      }, false);
    });
  }

  var leaveFromChat = document.querySelectorAll(".messanger__chat__headers__leave");
  leaveFromChat.forEach(function (leave) {
    return leave.addEventListener('click', function (e) {
      var parent = document.querySelector(".messanger__content__tab");
      parent.querySelector(".messanger__content__chat").classList.remove('_active');
      parent.querySelector(".messanger__content__contacts").classList.add('_active');
    });
  });
}