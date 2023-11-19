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
