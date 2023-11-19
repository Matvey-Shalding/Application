document.querySelectorAll(".nav-menu__item").forEach(link => {
  link.addEventListener('click',e => {
    const target = document.querySelector(`.tab.${link.dataset.tab}`)
    console.log(link);
    document.querySelector('.nav-menu__item.current').classList.remove('current')
    document.querySelector('.tab._active-tab').classList.remove('_active-tab')
    target.classList.add('_active-tab')
    link.classList.add('current')
  })
})