const componentList = [
  'finger-slide',
  'svg-ring',
  'image-editor',
  'slot-machine',
  'roulette'
]

let index;

window.onload = () => {
  selectComponent(0);

  window.addEventListener('resize', onResize);
};

function selectComponent(i) {
  if (index === i) { return; }

  index = i;
  document.getElementById('component-iframe').src = `./${componentList[index]}/${componentList[index]}.html`;

  if (window.innerWidth < 768) {
    closeMenu();
  }
}

function onResize() {
  const menu = document.getElementsByClassName('component-list')[0];
  if (!menu) { return; }

  menu.style.left = (window.innerWidth < 768) ? '-300px' : '0px';
}

function menuOnClick() {
  const menu = document.getElementsByClassName('component-list')[0];
  if (!menu) { return; }

  menu.style.left = (menu.style.left === '0px') ? '-300px' : '0px';
  maskHandler(menu);
}

function maskHandler(menu) {
  const mask = document.getElementById('mask');
  if (!mask) { return; }

  mask.style.display = (menu.style.left === '0px') ? 'initial' : 'none';
}

function closeMenu() {
  const menu = document.getElementsByClassName('component-list')[0];
  if (!menu) { return; }

  menu.style.left = '-300px';
  maskHandler(menu);
}
