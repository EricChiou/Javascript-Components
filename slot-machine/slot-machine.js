const slotHeight = 50;
const list = ['item1', 'item2', 'item3', 'item4', 'item5'];

let items = [];
let run = false;

window.onload = () => { init(); };

function init() {
  items = [];
  document.getElementById('items').style.transitionDuration = '0s';
  document.getElementById('items').style.marginTop = '0px';
  document.getElementById('items').innerHTML = '';
  for (const item of list) {
    const ele = document.createElement('div');
    ele.className = 'item';
    ele.innerText = item;
    document.getElementById('items').appendChild(ele);
  }
}

function start() {
  if (run) { return; }

  run = true;
  init();

  document.getElementById('arm').classList.add('clicked');
  setTimeout(() => {
    document.getElementById('arm').classList.remove('clicked');
  }, 500);

  setTimeout(() => {
    go(Math.floor(Math.random() * 1000) % list.length);
  }, 250);
}

function go(time) {
  let num;
  switch (list.length) {
    case 1:
    case 2:
    case 3:
      num = 8;
      break;
    case 4:
    case 5:
    case 6:
      num = 6;
      break;
    case 7:
    case 8:
    case 9:
      num = 4;
      break;
    default:
      num = 2;
      break;
  }
  addSlots(num);
  moveSlots(time);
}

function addSlots(num) {
  for (let i = 0; i < num; i++) {
    items = items.concat(list);
    for (const item of list) {
      const ele = document.createElement('div');
      ele.className = 'item';
      ele.innerText = item;
      document.getElementById('items').appendChild(ele);
    }
  }
}

function moveSlots(num) {
  let time = 1000;
  time += Math.round(Math.random() * 1000);

  const numSlot = Math.round(items.length / (list.length * 2));
  const marginTop = ((numSlot - 1) * (slotHeight * list.length)) + (num * slotHeight);

  document.getElementById('items').style.transitionDuration = `${time}ms`;
  document.getElementById('items').style.transitionTimingFunction = 'cubic-bezier(0.64, 0.57, 0.67, 1.53)';
  document.getElementById('items').style.marginTop = '-' + marginTop + 'px';

  setTimeout(() => {
    run = false;
  }, time + 10);
}