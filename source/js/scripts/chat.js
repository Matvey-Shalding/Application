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
