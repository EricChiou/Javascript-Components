const imageEditorParams = {
  filterWidth: 250,
  filterHeight: 250,
  fiiterBorderWidth: 25,
  originalFile: null,
  imageWidth: 0,
  imageHeight: 0,
  imageDeg: 0,
  imagePosX: 0,
  imagePosY: 0,
  amplification: 1
};

function initImageEditor() {
  const container = document.getElementById('image-filter');
  if (container) {
    container.style.width = (imageEditorParams.filterWidth + (imageEditorParams.fiiterBorderWidth * 2)) + 'px';
    container.style.height = (imageEditorParams.filterHeight + (imageEditorParams.fiiterBorderWidth * 2)) + 'px';
  }
  const img = document.getElementById('image');
  if (img) {
    img.style.width = '0px';
    img.style.height = '0px';
    img.style.top = `${(imageEditorParams.filterWidth / 2) + imageEditorParams.fiiterBorderWidth}px`;
    img.style.left = `${(imageEditorParams.filterHeight / 2) + imageEditorParams.fiiterBorderWidth}px`;
  }
  const filter = document.getElementById('filter');
  if (filter) {
    filter.style.border = `${imageEditorParams.fiiterBorderWidth}px solid rgba(0, 0, 0, 0.4)`;
  }
  const canvas = document.getElementById('filter-image');
  if (canvas) {
    canvas.width = imageEditorParams.filterWidth;
    canvas.height = imageEditorParams.filterHeight;
  }
  dragElement();
}

function selectImage(event) {
  if (event.target.files.length < 1) { return; }
  if (event.target.files[0].type.indexOf('image') < 0) { return; }
  imageEditorParams.originalFile = event.target.files[0];
  const img = document.getElementById('image');
  img.src = URL.createObjectURL(imageEditorParams.originalFile);
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
  imageEditorParams.imageDeg = 0;
  imageEditorParams.amplification = 1;
  document.getElementById('amplification').innerText = `Amplification: ${imageEditorParams.amplification}`;

  const img = document.getElementById('image');
  img.className = `rotate${imageEditorParams.imageDeg}`;
  if (img.naturalWidth < img.naturalHeight) {
    imageEditorParams.imageWidth = imageEditorParams.filterWidth;
    imageEditorParams.imageHeight = img.naturalHeight / img.naturalWidth * imageEditorParams.filterWidth;

    imageEditorParams.imagePosX = imageEditorParams.fiiterBorderWidth;
    imageEditorParams.imagePosY = (imageEditorParams.filterHeight / 2) + imageEditorParams.fiiterBorderWidth - (imageEditorParams.imageHeight / 2);
  } else {
    imageEditorParams.imageWidth = img.naturalWidth / img.naturalHeight * imageEditorParams.filterHeight;
    imageEditorParams.imageHeight = imageEditorParams.filterHeight;

    imageEditorParams.imagePosX = (imageEditorParams.filterWidth / 2) + imageEditorParams.fiiterBorderWidth - (imageEditorParams.imageWidth / 2);
    imageEditorParams.imagePosY = imageEditorParams.fiiterBorderWidth;
  }
  img.style.width = `${imageEditorParams.imageWidth}px`;
  img.style.height = `${imageEditorParams.imageHeight}px`;

  img.style.left = `${imageEditorParams.imagePosX}px`;
  img.style.top = `${imageEditorParams.imagePosY}px`;
}

function filterImage() {
  if (!imageEditorParams.originalFile) { return; }
  const img = document.querySelector('#image');
  const canvas = document.querySelector('#filter-image');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#eeeeee";
  context.fill();

  let x = 0;
  let y = 0;
  if (imageEditorParams.imageDeg === 0) {
    x += (imageEditorParams.imagePosX - imageEditorParams.fiiterBorderWidth);
    y += (imageEditorParams.imagePosY - imageEditorParams.fiiterBorderWidth);
  } else if (imageEditorParams.imageDeg === 90) {
    y = -img.height;

    x += (imageEditorParams.imagePosY - imageEditorParams.fiiterBorderWidth);
    y -= (imageEditorParams.imagePosX - imageEditorParams.fiiterBorderWidth);
  } else if (imageEditorParams.imageDeg === 180) {
    x = -img.width;
    y = -img.height;

    x -= (imageEditorParams.imagePosX - imageEditorParams.fiiterBorderWidth);
    y -= (imageEditorParams.imagePosY - imageEditorParams.fiiterBorderWidth);
  } else if (imageEditorParams.imageDeg === 270) {
    x = -img.width;

    x -= (imageEditorParams.imagePosY - imageEditorParams.fiiterBorderWidth);
    y += (imageEditorParams.imagePosX - imageEditorParams.fiiterBorderWidth);
  }
  context.rotate(imageEditorParams.imageDeg * Math.PI / 180);
  context.translate(x, y);
  context.drawImage(img, 0, 0, img.width, img.height);
  context.translate(-x, -y);
  context.rotate(-imageEditorParams.imageDeg * Math.PI / 180);

  const dataURL = canvas.toDataURL();
  url2File(dataURL).then((file) => { console.log(file); });
}

function url2File(url) {
  return (fetch(url).then((res) => {
    return res.arrayBuffer();
  }).then((buffer) => {
    return new File([buffer], imageEditorParams.originalFile.name, { type: imageEditorParams.originalFile.type });
  }));
}

function rotate(degVariable) {
  const img = document.getElementById('image');
  imageEditorParams.imageDeg += degVariable;
  if (imageEditorParams.imageDeg < 0) {
    imageEditorParams.imageDeg += 360;
  } else if (imageEditorParams.imageDeg > 270) {
    imageEditorParams.imageDeg -= 360;
  }
  img.className = `rotate${imageEditorParams.imageDeg}`;

  calculatePos(Number(img.style.left.slice(0, -2)), Number(img.style.top.slice(0, -2)));
}

function zoom(variable) {
  imageEditorParams.amplification += variable;
  if (imageEditorParams.amplification > 2) { imageEditorParams.amplification = 2; return; }
  if (imageEditorParams.amplification < 0.5) { imageEditorParams.amplification = 0.5; return; }
  imageEditorParams.amplification = Math.round(imageEditorParams.amplification * 10) / 10;

  document.getElementById('amplification').innerText = `Amplification: ${imageEditorParams.amplification}`;
  const img = document.getElementById('image');
  img.style.width = `${imageEditorParams.imageWidth * imageEditorParams.amplification}px`;
  img.style.height = `${imageEditorParams.imageHeight * imageEditorParams.amplification}px`;

  img.style.left = `${Number(img.style.left.slice(0, -2)) - (imageEditorParams.imageWidth / 2 * variable)}px`;
  img.style.top = `${Number(img.style.top.slice(0, -2)) - (imageEditorParams.imageHeight / 2 * variable)}px`;

  calculatePos(Number(img.style.left.slice(0, -2)), Number(img.style.top.slice(0, -2)));
}

function calculatePos(x, y) {
  if (imageEditorParams.imageDeg === 0 || imageEditorParams.imageDeg === 180) {
    imageEditorParams.imagePosX = x;
    imageEditorParams.imagePosY = y;
  } else {
    imageEditorParams.imagePosX = (imageEditorParams.imageWidth - imageEditorParams.imageHeight) / 2 * imageEditorParams.amplification + x;
    imageEditorParams.imagePosY = (imageEditorParams.imageHeight - imageEditorParams.imageWidth) / 2 * imageEditorParams.amplification + y;
  }
}
