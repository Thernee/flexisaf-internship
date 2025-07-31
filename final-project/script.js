// function toggleTimer(timerId) {
//   const element = document.getElementById(timerId);
//   const isHidden = getComputedStyle(element).display === 'none';
//   if (isHidden) {
//     element.style.display = 'block';
//   } else {
//     element.style.display = 'none';
//   }
// }

function toggleTimer(timerId) {
  document.querySelectorAll('.durations')
    .forEach(el => el.style.display = 'none');
  document.getElementById(timerId).style.display = 'block';

}