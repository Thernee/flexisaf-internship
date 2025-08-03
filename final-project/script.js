// Defaults Durations
const DEFAULTS = {
  pomodoro: 25,
  short: 5,
  long: 15
};

// load/init config from localStorage
let config = JSON.parse(localStorage.getItem('timerConfig')) || { ...DEFAULTS };

let state = JSON.parse(localStorage.getItem('timerState')) || {
  mode: 'pomodoro', // | 'short' | 'long'
  minutes: config.pomodoro,
  seconds: 0,
  running: false
};

const intervals = {};

function toggleTimer(timerId, btn) {
  document.querySelectorAll('.durations')
    .forEach(el => el.style.display = 'none');
  const activeTimer = document.getElementById(timerId).style.display = 'block';


  // Remove .active from all buttons, add to clicked one
  document.querySelectorAll('.tab-btn')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

}

function startTimer(timerId) {
  if (intervals[timerId]) {
    clearInterval(intervals[timerId]);
  }

  const activeTimer = document.getElementById(timerId);

  // hide the start button and display stop button
  activeTimer.querySelector('.start-btn').style.display = 'none';
  activeTimer.querySelector('.stop-btn').style.display = 'inline-block';

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

    // Update the DOM
    minutes.textContent = String(parseMinutes).padStart(2, '0')
    seconds.textContent = String(parseSeconds).padStart(2, '0');
  }, 1000);

}

function stopTimer(timerId) {
  clearInterval(intervals[timerId]);

  // hide stop button once clicked
  const activeTimer = document.getElementById(timerId);
  activeTimer.querySelector('.stop-btn').style.display = 'none';
  activeTimer.querySelector('.start-btn').style.display = 'inline-block';
}

function resetTimer(timerId) {
  clearInterval(intervals[timerId]);

  const activeTimer = document.getElementById(timerId);

  // Hide stop button on reset
  activeTimer.querySelector('.stop-btn').style.display = 'none';
  activeTimer.querySelector('.start-btn').style.display = 'inline-block';

  //Get the duration elements
  const minutes = activeTimer.querySelector('.minutes');
  const seconds = activeTimer.querySelector('.seconds');

  // Get initial duration
  const initialMins = activeTimer.dataset.minutes;
  const initialSecs = activeTimer.dataset.seconds;

  // Reset all elements to initial values
  minutes.textContent = initialMins.padStart(2, '0');
  seconds.textContent = initialSecs.padStart(2, '0');
}

document.addEventListener('DOMContentLoaded', () => {
  //Show only pomodoro tab on load
  const first = document.querySelector('.tab-btn');
  if (first) first.click();

  for (let mode of ['pomodoro', 'short', 'long']) {
    const activeTimer = document.getElementById(`${mode}-timer`);
    activeTimer.dataset.minutes = config[mode];
    activeTimer.dataset.seconds = 0;

    //update the time spans
    activeTimer.querySelector('.minutes').textContent = String(config[mode]).padStart(2, '0');
    activeTimer.querySelector('.seconds').textContent = '00';
  }
  //restore last state
  toggleTimer(`${state.mode}-timer`, document.querySelector(`.tab-btn[onclick*="${state.mode}-timer"]`));
  if (state.running) {
    startTimer(`${state.mode}-timer`);

    // fast forward state to last
    const activeTimer = document.getElementById(`${mode}-timer`);
    activeTimer.querySelector('.minutes').textContent = String(state.minutes).padStart(2, '0');
    activeTimer.querySelector('.seconds').textContent = String(state.seconds).padStart(2, '0');
  }

  // request notifications permission if not granted
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  // wire the options panel
  document.getElementById('options-toggle').addEventListener('click', () => {
    document.getElementById('options-panel').hidden = false;
  });

  document.getElementById('options-cancel').addEventListener('click', () => {
    document.getElementById('options-panel').hidden = true;
  });

  document.getElementById('options-save').addEventListener('click', () => {
    // pull the new values
    config.pomodoro = +document.getElementById('opt-pomodoro').value;
    config.short = +document.getElementById('opt-short').value;
    config.long = +document.getElementById('opt-long').value;

    // persist/update
    localStorage.setItem('timerConfig', JSON.stringify(config));

    // reload the page so
    window.location.reload();
  });
});