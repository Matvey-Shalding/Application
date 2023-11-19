function initTimer(close) {
  const timer = document.querySelector(".test__labels__timer");
  function updateTimer() {
    const time = timer.textContent;
    const [hours, minutes] = time.split(":");
    let newTime;
    if (minutes === "00") {
      newTime = `${+hours - 1}:59`;
    } else if (hours === "00" && minutes === "01") {
      close();
    } else {
      if (+minutes >= 10) {
        newTime = `${hours}:${+minutes - 1}`;
      } else {
        newTime = `${hours}:0${+minutes - 1}`;
      }
    }
    timer.textContent = newTime;
  }
  setInterval(updateTimer, 1000);
}
