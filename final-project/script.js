function toggleTimer(timerId, btn) {
  document.querySelectorAll('.durations')
    .forEach(el => el.style.display = 'none');
  const activeTimer = document.getElementById(timerId).style.display = 'block';


  // Remove .active from all buttons, add to clicked one
  document.querySelectorAll('.tab-btn')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

}

document.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('.tab-btn');
  if (first) first.click();
});

const intervals = {};

function startTimer(timerId) {
  if (intervals[timerId]) {
    clearInterval(intervals[timerId]);
  }

  const activeTimer = document.getElementById(timerId);

  const minutes = activeTimer.querySelector('.minutes');
  const seconds = activeTimer.querySelector('.seconds');

  // parse once when started
  let parseMinutes = parseInt(minutes.textContent, 10);
  let parseSeconds = parseInt(seconds.textContent, 10);

  // store interval ID
  intervals[timerId] = setInterval(() => {
    if (parseSeconds === 0) {
      if (parseMinutes === 0) {
        clearInterval(intervals[timerId]);
        return;
      }
      parseMinutes--;
      parseSeconds = 59;
    } else {
      parseSeconds--;
    }

    minutes.textContent = String(parseMinutes).padStart(2, '0')
    seconds.textContent = String(parseSeconds).padStart(2, '0');
  }, 1000);

}