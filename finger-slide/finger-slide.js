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

    slider.addEventListener('mousedown', onMouseDown, false);
    slider.addEventListener('mouseup', onMouseUp, false);
  }
}

function onTouchstart(event) {
  startTime = event.timeStamp;
  screenX = event.touches[0].screenX;
  screenY = event.touches[0].screenY;
}

function onTouchend(event) {
  const touch = event.changedTouches[0];
  detectSlide(touch.screenX, touch.screenY, event.timeStamp);
}

function onMouseDown(event) {
  startTime = event.timeStamp;
  screenX = event.screenX;
  screenY = event.screenY;
}

function onMouseUp(event) {
  detectSlide(event.screenX, event.screenY, event.timeStamp);
}

function detectSlide(x, y, endTime) {
  if (endTime - startTime > detectTime) {
    return;
  }
  xVar = Math.abs(x - screenX);
  yVar = Math.abs(y - screenY);
  if (xVar < threshold && yVar < threshold) {
    return;
  }

  if (Math.abs(x - screenX) > Math.abs(y - screenY)) {
    if (x - screenX > 0) {
      slider.innerText = 'Slide Right';
    } else {
      slider.innerText = 'Slide Left';
    }
  } else {
    if (y - screenY > 0) {
      slider.innerText = 'Slide Down';
    } else {
      slider.innerText = 'Slide Up';
    }
  }
}
