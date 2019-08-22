const componentList = [
  'finger-slide',
  'svg-ring',
  'image-editor',
  'slot-machine'
]

let index;

window.onload = () => {
  const i = getSearch();
  selectComponent(i);

  window.addEventListener('resize', onResize);
};

function getSearch() {
  const search = window.location.search;
  if (search) {
    for (const param of search.slice(1).split('&')) {
      const key = param.split('=')[0];
      const name = param.split('=')[1];
      if (key === 'component') {
        for (let i = 0; i < componentList.length; i++) {
          if (componentList[i] === name) {
            return i;
          }
        }
      }
    }
  }

  return 0;
}

function selectComponent(i) {
  if (index === i) { return; }

  index = i;
  document.getElementById('component-iframe').src = `./${componentList[index]}/${componentList[index]}.html`;

  if (window.innerWidth < 768) {
    closeMenu();
  }

  window.history.replaceState('', '', `${window.location.href.split('?')[0]}?component=${componentList[index]}`);
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
