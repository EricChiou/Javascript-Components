const componentList = [
  { title: 'Finger Slide', path: './finger-slide/finger-slide.html' },
  { title: 'Svg Ring', path: './svg-ring/svg-ring.html' },
  { title: 'Image Editor', path: './image-editor/image-editor.html' },
  { title: 'Slot Machine', path: './slot-machine/slot-machine.html' },
  { title: 'Roulette', path: './roulette/roulette.html' },
  { title: 'Custom Scroll Bar', path: './custom-scroll-bar/custom-scroll-bar.html' },
  { title: 'Crypto SHA-3', path: './crypto-sha3/crypto-sha3.html' },
  { title: 'RSA-OAEP Encrypt', path: './rsa-oaep-encrypt/rsa-oaep-encrypt.html' },
]

let index;

window.onload = () => {
  for (let i = 0; i < componentList.length; i++) {
    const li = document.createElement('li');
    li.innerText = componentList[i].title;
    li.onclick = () => { selectComponent(i) };
    document.getElementsByClassName('components')[0].appendChild(li);
  }

  selectComponent(0);

  window.addEventListener('resize', onResize);
};

function selectComponent(i) {
  if (index === i) { return; }

  index = i;
  document.getElementById('component-iframe').src = componentList[index].path;

  closeMenu();
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
  if (window.innerWidth > 767) { return; }

  const menu = document.getElementsByClassName('component-list')[0];
  if (!menu) { return; }

  menu.style.left = '-300px';
  maskHandler(menu);
}

function showAbout() {
  document.getElementById('component-iframe').src = `./about/about.html`;

  index = null;

  closeMenu();
}