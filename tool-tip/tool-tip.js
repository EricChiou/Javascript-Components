function onMouseEnter(e) {
    const toolTip = e.getElementsByClassName('tool-tip')[0];
    toolTip.style.left = `calc(50% - ${toolTip.clientWidth / 2}px)`;
}