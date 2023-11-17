import * as noUiSlider from "https://cdn.jsdelivr.net/npm/nouislider@15.7.1/+esm";
noUiSlider
{const UIsliders = document.querySelectorAll(".filter__menu__range");
console.log(UIsliders);
UIsliders.forEach(UIslider => {
  const min__field = UIslider.nextElementSibling.firstChild;
  const max__field = UIslider.nextElementSibling.lastChild;
  noUiSlider.create(UIslider, {
    start: [10000, 50000],
    range: {
      min: [0],
      max: [80000],
    },
    connect: true,
    step: 1,
  });
  UIslider.noUiSlider.on("update", (values, handle) => {
    if (handle == 0) {
      min__field.textContent = Number(values[handle]).toFixed();
    } else if (handle == 1) {
      max__field.textContent = Number(values[handle]).toFixed();
    }
  });
});}
