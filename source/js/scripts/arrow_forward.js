{const links = document.querySelectorAll(
  ".navigation__profile-img.clickable,.navigation__profile-info-name-age.clickable"
);
links.forEach(link => {
  link.addEventListener("click", e => {
    const target = link.closest(".profile__friends__item").nextElementSibling
      .children[0];
    target.parentNode.classList.add('_active')
    target.classList.add("tab__open");
    const items = [
      ...document.querySelectorAll(".profile__friends__item:not(.sub-item)"),
    ];
    const filteredItems = items.filter(
      item => !item.classList.contains("different")
    );
    filteredItems.forEach(item => {
      item.classList.add("fading");
    });
  });
});}
