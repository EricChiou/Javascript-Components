const filterWidth = 250;
const filterHeight = 250;
const fiiterBorderWidth = 25;

let originalFile = null;
let imageWidth = 0;
let imageHeight = 0;
let imageDeg = 0;
let imagePosX = 0;
let imagePosY = 0;
let amplification = 1;

window.onload = () => { init(); }

function init() {
  const container = document.getElementById('image-filter');
  if (container) {
    container.style.width = (filterWidth + (fiiterBorderWidth * 2)) + 'px';
    container.style.height = (filterHeight + (fiiterBorderWidth * 2)) + 'px';
  }
  const img = document.getElementById('image');
  if (img) {
    img.style.width = '0px';
    img.style.height = '0px';
    img.style.top = `${(filterWidth / 2) + fiiterBorderWidth}px`;
    img.style.left = `${(filterHeight / 2) + fiiterBorderWidth}px`;
  }
  const filter = document.getElementById('filter');
  if (filter) {
    filter.style.border = `${fiiterBorderWidth}px solid rgba(0, 0, 0, 0.4)`;
  }
  const canvas = document.getElementById('filter-image');
  if (canvas) {
    canvas.width = filterWidth;
    canvas.height = filterHeight;
  }
  dragElement();
}

function selectImage(event) {
  if (event.target.files.length < 1) { return; }
  if (event.target.files[0].type.indexOf('image') < 0) { return; }
  originalFile = event.target.files[0];
  const img = document.getElementById('image');
  img.src = URL.createObjectURL(originalFile);
  event.target.value = null;
}

function dragElement() {
  const img = document.querySelector('#image');
  document.querySelector('#image-filter').onmousedown = dragMouseDown;
  let newPosX = 0, newPosY = 0, posX = 0, posY = 0;

  function dragMouseDown(e) {
    if (e.preventDefault) { e.preventDefault() }
    posX = e.clientX;
    posY = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    if (e.preventDefault) { e.preventDefault() }
    newPosX = posX - e.clientX;
    newPosY = posY - e.clientY;
    posX = e.clientX;
    posY = e.clientY;
    img.style.left = (img.offsetLeft - newPosX) + 'px';
    img.style.top = (img.offsetTop - newPosY) + 'px';

    calculatePos(img.offsetLeft - newPosX, img.offsetTop - newPosY);
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function imageOnload() {
  imageDeg = 0;
  amplification = 1;
  document.getElementById('amplification').innerText = `Amplification: ${amplification}`;

  const img = document.getElementById('image');
  img.className = `rotate${imageDeg}`;
  if (img.naturalWidth < img.naturalHeight) {
    imageWidth = filterWidth;
    imageHeight = img.naturalHeight / img.naturalWidth * filterWidth;

    imagePosX = fiiterBorderWidth;
    imagePosY = (filterHeight / 2) + fiiterBorderWidth - (imageHeight / 2);
  } else {
    imageWidth = img.naturalWidth / img.naturalHeight * filterHeight;
    imageHeight = filterHeight;

    imagePosX = (filterWidth / 2) + fiiterBorderWidth - (imageWidth / 2);
    imagePosY = fiiterBorderWidth;
  }
  img.style.width = `${imageWidth}px`;
  img.style.height = `${imageHeight}px`;

  img.style.left = `${imagePosX}px`;
  img.style.top = `${imagePosY}px`;
}

function filterImage() {
  if (!originalFile) { return; }
  const img = document.querySelector('#image');
  const canvas = document.querySelector('#filter-image');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#eeeeee";
  context.fill();

  let x = 0;
  let y = 0;
  if (imageDeg === 0) {
    x += (imagePosX - fiiterBorderWidth);
    y += (imagePosY - fiiterBorderWidth);
  } else if (imageDeg === 90) {
    y = -img.height;

    x += (imagePosY - fiiterBorderWidth);
    y -= (imagePosX - fiiterBorderWidth);
  } else if (imageDeg === 180) {
    x = -img.width;
    y = -img.height;

    x -= (imagePosX - fiiterBorderWidth);
    y -= (imagePosY - fiiterBorderWidth);
  } else if (imageDeg === 270) {
    x = -img.width;

    x -= (imagePosY - fiiterBorderWidth);
    y += (imagePosX - fiiterBorderWidth);
  }
  context.rotate(imageDeg * Math.PI / 180);
  context.translate(x, y);
  context.drawImage(img, 0, 0, img.width, img.height);
  context.translate(-x, -y);
  context.rotate(-imageDeg * Math.PI / 180);

  const dataURL = canvas.toDataURL();
  url2File(dataURL).then((file) => { console.log(file); });
}

function url2File(url) {
  return (fetch(url).then((res) => {
    return res.arrayBuffer();
  }).then((buffer) => {
    return new File([buffer], originalFile.name, { type: originalFile.type });
  }));
}

function rotate(degVariable) {
  const img = document.getElementById('image');
  imageDeg += degVariable;
  if (imageDeg < 0) {
    imageDeg += 360;
  } else if (imageDeg > 270) {
    imageDeg -= 360;
  }
  img.className = `rotate${imageDeg}`;

  calculatePos(Number(img.style.left.slice(0, -2)), Number(img.style.top.slice(0, -2)));
}

function zoom(variable) {
  amplification += variable;
  if (amplification > 2) { amplification = 2; return; }
  if (amplification < 0.5) { amplification = 0.5; return; }
  amplification = Math.round(amplification * 10) / 10;

  document.getElementById('amplification').innerText = `Amplification: ${amplification}`;
  const img = document.getElementById('image');
  img.style.width = `${imageWidth * amplification}px`;
  img.style.height = `${imageHeight * amplification}px`;

  img.style.left = `${Number(img.style.left.slice(0, -2)) - (imageWidth / 2 * variable)}px`;
  img.style.top = `${Number(img.style.top.slice(0, -2)) - (imageHeight / 2 * variable)}px`;

  calculatePos(Number(img.style.left.slice(0, -2)), Number(img.style.top.slice(0, -2)));
}

function calculatePos(x, y) {
  if (imageDeg === 0 || imageDeg === 180) {
    imagePosX = x;
    imagePosY = y;
  } else {
    imagePosX = (imageWidth - imageHeight) / 2 * amplification + x;
    imagePosY = (imageHeight - imageWidth) / 2 * amplification + y;
  }
}
