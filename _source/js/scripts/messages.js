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
