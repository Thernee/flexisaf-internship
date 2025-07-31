function toggleTimer(timerId) {
  const element = document.getElementById(timerId);
  const isHidden = getComputedStyle(element).display === 'none';
  if (isHidden) {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}