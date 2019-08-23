const list = ['item1', 'item2', 'item3', 'item4', 'item5'];

window.onload = () => { init(); };

function init() {
  list.forEach(item => {
    const itemEle = document.createElement('div');
    itemEle.className = 'item';
    itemEle.innerText = item;
    document.getElementById('roulette').appendChild(itemEle);

    const barEle = document.createElement('div');
    barEle.className = 'bar';
    document.getElementById('roulette').appendChild(barEle);
  });

  const items = document.getElementsByClassName('item');
  const bars = document.getElementsByClassName('bar');

  for (let i = 0; i < items.length; i++) {
    items[i].style.transform = `rotate(${i * 360 / items.length}deg)`;
  }

  if (items.length % 2 === 0) {
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.transform = `rotate(${(i + 0.5) * 360 / items.length}deg)`;
    }
  } else {
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.transform = `rotate(${i * 360 / items.length}deg)`;
    }
  }
}

function animation() {
  document.getElementById('result').innerText = '';
  const roulette = document.getElementById('roulette');
  roulette.style.transitionDuration = '0s';
  roulette.style.transform = 'rotate(0deg)';
  setTimeout(() => {
    const deg = random(0, 360);
    roulette.style.transitionDuration = '5s';
    roulette.style.transform = `rotate(${1800 + deg}deg)`;
    calResult(deg);
  }, 100);
}

function random(min, max) {
  if (min >= max) { return 0; }
  return Math.round(Math.random() * (max - min) + min);
}

function calResult(deg) {
  const each = 360 / list.length;
  const start = 270 / each;
  const end = Math.round(start - (deg / each));
  setTimeout(() => {
    if (end < 0) {
      document.getElementById('result').innerText = list[list.length + end];
    } else {
      document.getElementById('result').innerText = list[end];
    }
  }, 5000);
}