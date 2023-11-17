function formChartInfo(place, item) {
  if (place === 1) {
    return item.nextElementSibling.textContent.split("/")[0];
  } else if (place === 2) {
    const res = item.nextElementSibling.textContent.split("/");
    return res[1] - res[0];
  }
}

function formCutout(item) {
  if (window.matchMedia("(max-width:520px)").matches) {
    if(item.closest('.task.tab-active-tasks-task')) {
      return 40
    } else {
      return 28
    }
  }
  if (
    item.closest(".modal-window") &&
    window.matchMedia("(max-width:750px)").matches
  ) {
    return 32;
  }
  return 40;
}

document.querySelectorAll(".task__chart").forEach(chart => {
  new Chart(chart, {
    type: "doughnut",
    data: {
      labels: ["Выполненные задания", "Невыполненные задания"],
      datasets: [
        {
          label: "Задания",
          data: [formChartInfo(1, chart), formChartInfo(2, chart)],
          backgroundColor: [
            chart.closest(".task").classList.contains("_failed")
              ? "#fd3c60"
              : "#26E27C",
            "#fff",
          ],
          hoverOffset: 3,
        },
      ],
    },
    options: {
      cutout: 40,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
});
