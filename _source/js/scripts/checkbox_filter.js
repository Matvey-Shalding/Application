document.querySelector(".filter__menu__cross").addEventListener(
  "click",
  function (e) {
    const checkboxes = document.querySelectorAll(".filter__menu__item__checkbox");
    const filters = [];
    checkboxes.forEach(checkbox => {
      const parent = checkbox.parentElement;
      if (checkbox.checked && parent.classList.contains("_submenu")) {
        const filterType = parent.dataset.filterType;
        if (parent.classList.contains("_range")) {
          const fields = parent.nextElementSibling.nextElementSibling.childNodes
          filters.push([filterType, fields[0].data, fields[fields.length - 1].data]);
        } else {
          const data = [];
          const checkboxes = parent.nextElementSibling
            .querySelectorAll(`.filter__menu__item__checkbox`)
            .forEach(checkbox => {
              if (checkbox.checked) {
                data.push(
                  checkbox.nextElementSibling.nextElementSibling.textContent
                );
              }
            });
          filters.push([filterType, data]);
        }
      }
    });
    console.log(filters);
    const tasksApproachToFilters = [];
    const filterTask = (task, index) => {
      filters.forEach(filter => {
        const item = task.querySelector(`.rating__item__text.${filter[0]}`);
        if (filter[1] instanceof Array) {
          if(!filter[1].includes(item.textContent)) {
            return
          }
        } else {
          if (filter[0] === "_level") {
            const compare = Number(item.textContent.split(" ")[0]);
            if(compare < filter[1] || compare > filter[2]) {
              return
            }
          } else {
            if(Number(item.textContent) < filter[1] || Number(item.textContent) > filter[2]) {
              return
            }
          }
        }
        tasksApproachToFilters.push(index)
      });
    };
    const profiles = document.querySelectorAll(".rating__content__items__item");
    profiles.forEach((profile,index) => void filterTask(profile,index));
    let html = ''
    for(const index of tasksApproachToFilters) {
      profiles[index].classList.add("_top-filtered");
      html += profiles[index].outerHTML
    }
    for(let i = 0; i < profiles.length; i++) {
      if(tasksApproachToFilters.includes(i)) {
        continue
      }
      html += profiles[i].outerHTML
    }
    document.querySelector(".rating__content__items").innerHTML = html
  },
  false
);
