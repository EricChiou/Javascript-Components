const fingerSlideParams = {
  slider: null,
  screenX: 0,
  screenY: 0,
  startTime: 0
}

function initfingerSlide() {
  fingerSlideParams.slider = document.getElementById('finger-slide');
  if (fingerSlideParams.slider) {
    fingerSlideParams.slider.addEventListener('touchstart', onTouchstart, false);
    fingerSlideParams.slider.addEventListener('touchend', onTouchend, false);
  }
}

function onTouchstart(event) {
  fingerSlideParams.startTime = event.timeStamp;
  fingerSlideParams.screenX = event.touches[0].screenX;
  fingerSlideParams.screenY = event.touches[0].screenY;
}

function onTouchend(event) {
  const touch = event.changedTouches[0];
  if (event.timeStamp - fingerSlideParams.startTime > 500) {
    return;
  }
  xVar = Math.abs(touch.screenX - fingerSlideParams.screenX);
  yVar = Math.abs(touch.screenY - fingerSlideParams.screenY);
  threshold = 50;
  if (xVar < threshold && yVar < threshold) {
    return;
  }

  if (Math.abs(touch.screenX - fingerSlideParams.screenX) > Math.abs(touch.screenY - fingerSlideParams.screenY)) {
    if (touch.screenX - fingerSlideParams.screenX > 0) {
      fingerSlideParams.slider.innerText = 'Slide Right';
    } else {
      fingerSlideParams.slider.innerText = 'Slide Left';
    }
  } else {
    if (touch.screenY - fingerSlideParams.screenY > 0) {
      fingerSlideParams.slider.innerText = 'Slide Down';
    } else {
      fingerSlideParams.slider.innerText = 'Slide Up';
    }
  }
}
