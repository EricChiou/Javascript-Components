const componentList = [
  'finger-slide',
  'svg-ring',
  'image-editor'
]

let showMenu = false;

window.onload = () => {
  selectComponent(0);
};

function selectComponent(index) {
  document.getElementById('component-iframe').src = `./${componentList[index]}/${componentList[index]}.html`;
}