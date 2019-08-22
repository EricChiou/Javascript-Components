const threshold = 50;
const detectTime = 500; // ms

let slider = null;
let screenX = 0;
let screenY = 0;
let startTime = 0;

window.onload = () => { init(); };

function init() {
  slider = document.getElementById('finger-slide');
  if (slider) {
    slider.addEventListener('touchstart', onTouchstart, false);
    slider.addEventListener('touchend', onTouchend, false);
  }
}

function onTouchstart(event) {
  startTime = event.timeStamp;
  screenX = event.touches[0].screenX;
  screenY = event.touches[0].screenY;
}

function onTouchend(event) {
  const touch = event.changedTouches[0];
  if (event.timeStamp - startTime > detectTime) {
    return;
  }
  xVar = Math.abs(touch.screenX - screenX);
  yVar = Math.abs(touch.screenY - screenY);
  if (xVar < threshold && yVar < threshold) {
    return;
  }

  if (Math.abs(touch.screenX - screenX) > Math.abs(touch.screenY - screenY)) {
    if (touch.screenX - screenX > 0) {
      slider.innerText = 'Slide Right';
    } else {
      slider.innerText = 'Slide Left';
    }
  } else {
    if (touch.screenY - screenY > 0) {
      slider.innerText = 'Slide Down';
    } else {
      slider.innerText = 'Slide Up';
    }
  }
}
