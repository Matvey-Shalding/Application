"use strict";

{
  var sendButtons = document.querySelectorAll(".messanger__chat__writing__send");
  sendButtons.forEach(function (sendbtn) {
    sendbtn.addEventListener("click", function () {
      var text = sendbtn.previousElementSibling.value;

      if (text === '') {
        return false;
      }

      var now = new Date();
      var date = now.getMinutes() >= 10 ? "".concat(now.getHours(), ":").concat(now.getMinutes()) : "".concat(now.getHours(), ":0").concat(now.getMinutes());
      var layout = "<div class=\"chat-messages__message _your\">\n        <div class=\"chat-messages__message__text\">".concat(text, "</div>\n        <div class=\"chat-messages__message__date\">").concat(date, "</div>\n      </div>");
      sendbtn.closest(".messanger__chat__content").querySelector(".messanger__chat__content__msgs").insertAdjacentHTML("beforeend", layout);
      sendbtn.previousElementSibling.value = '';
    });
  });
}