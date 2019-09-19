window.onload = () => {
  document.getElementById('text-area').addEventListener('input', onInput);
}

function onInput(e) {
  if (e.stopPropagation) { e.stopPropagation(); }
  if (e.preventDefault) { e.preventDefault(); }

  document.getElementById('position').style.display = 'none';

  if (!window.getSelection) { return; }
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(e.target);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  const index = preCaretRange.toString().length;

  // document.getElementById('text-area').innerText = document.getElementById('text-area').innerText;

  // const newRange = document.createRange();
  // newRange.setStart(e.target, index);
  // newRange.collapse(true);
  // selection.removeAllRanges();
  // selection.addRange(range);
}

function insertStr() {
  if (!document.getElementById('insert').value) { return; }
  const insert = document.getElementById('insert').value;

  if (!window.getSelection) { return; }
  const selection = window.getSelection();

  if (!selection.rangeCount) { return; }
  const range = selection.getRangeAt(0);

  if (range.commonAncestorContainer.parentElement.contentEditable !== 'true' &&
    range.commonAncestorContainer.parentElement.parentElement.contentEditable !== 'true'
  ) {
    return;
  }

  const element = range.commonAncestorContainer.parentElement;
  const index = selection.focusOffset;

  element.innerText = element.innerText.slice(0, index) + insert + element.innerText.slice(index);
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