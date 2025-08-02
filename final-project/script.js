function toggleTimer(timerId, btn) {
  document.querySelectorAll('.durations')
    .forEach(el => el.style.display = 'none');
  const activeTimer = document.getElementById(timerId).style.display = 'block';


  // Remove .active from all buttons, add to clicked one
  document.querySelectorAll('.tab-btn')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  return activeTimer;
}

document.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('.tab-btn');
  if (first) first.click();
});
