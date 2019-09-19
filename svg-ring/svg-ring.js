const defalutValue = 35;

window.onload = () => {
  document.getElementsByClassName('range')[0].value = defalutValue;
  document.getElementsByClassName('value')[0].innerText = defalutValue;

  const value = document.getElementsByClassName('range')[0].value;
  changeRing(value);
};

function onInput(e) {
  document.getElementsByClassName('value')[0].innerText = e.value;
  changeRing(e.value);
}

function changeRing(value) {
  if (value > 50) {
    document.getElementById('left').style.strokeDasharray = `${((value - 50) / 50 * 408.2) + 408.2} 816.4`;
    document.getElementById('right').style.strokeDasharray = `408.2 816.4`;
  } else {
    document.getElementById('left').style.strokeDasharray = `0 816.4`;
    document.getElementById('right').style.strokeDasharray = `${value / 50 * 408.2} 816.4`;
  }
}