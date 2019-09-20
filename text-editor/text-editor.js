window.onload = () => {
  document.getElementById('text-area').addEventListener('input', onInput);
}

function onInput(e) {
  if (e.stopPropagation) { e.stopPropagation(); }
  if (e.preventDefault) { e.preventDefault(); }

  document.getElementById('position').style.display = 'none';

  const textArea = document.getElementById('text-area');

  if (textArea.innerText.length === 0 || !textArea.getElementsByTagName('div').length) {
    textArea.innerHTML = `<div><br></div>`;
  }
}

function insertStr() {
  if (!document.getElementById('insert').value) { return; }
  const insert = document.getElementById('insert').value;

  if (!window.getSelection) { return; }
  const selection = window.getSelection();

  if (!selection.rangeCount) { return; }
  const range = selection.getRangeAt(0);

  if (!detectTextArea(range.commonAncestorContainer)) { return; }

  const index = selection.focusOffset;
  let element = null;
  if (range.commonAncestorContainer.innerText) {
    element = range.commonAncestorContainer;
    element.innerText = insert;

  } else {
    element = range.commonAncestorContainer.parentElement;
    element.innerText = element.innerText.slice(0, index) + insert + element.innerText.slice(index);
  }

  const newRange = document.createRange();
  newRange.setStart(element.childNodes[0], index + insert.length);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);
}

function detectTextArea(element) {
  let parentElement = element.parentElement;
  while (parentElement) {
    if (parentElement.id === 'text-area') {
      return true;
    }

    parentElement = parentElement.parentElement;
  }

  return false;
}

function showCaretPos() {
  if (!window.getSelection) { return; }
  const selection = window.getSelection();

  if (!selection.rangeCount) { return; }
  const range = selection.getRangeAt(0);
  const pos = range.getBoundingClientRect();

  if (!pos.left && !pos.bottom) { return; }
  document.getElementById('position').style.left = `${pos.left - 28}px`;
  document.getElementById('position').style.top = `${pos.bottom}px`;
  document.getElementById('position').style.display = 'block';
}