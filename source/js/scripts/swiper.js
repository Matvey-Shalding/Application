import Swiper from "https://cdn.jsdelivr.net/npm/swiper@10.2.0/swiper.mjs";
import Navigation from "https://cdn.jsdelivr.net/npm/swiper@10.2.0/modules/navigation.min.mjs";
const swiper1 = new Swiper(".achievements__list__swiper", {
  modules: [Navigation],
  navigation: {
    nextEl: ".achievements__list__swiper__arrow._next",
    prevEl: ".achievements__list__swiper__arrow._prev",
  },
  spaceBetween: 32,
  slidesPerView: 7,
})
