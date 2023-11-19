{
  const arrow__back = document.querySelector(".profile__friends__item__arrow");
  arrow__back.addEventListener("click", e => {
    arrow__back.closest(".profile__my").classList.remove("tab__open");
    document.querySelector(".profile__friends__item.sub-item").classList.remove('_active');
    const items = [
      ...document.querySelectorAll(".profile__friends__item:not(.sub-item)"),
    ];
    const filteredItems = items.filter(
      item => !item.classList.contains("different")
    );
    filteredItems.forEach(item => {
      item.classList.remove("fading");
    });
  });
}
