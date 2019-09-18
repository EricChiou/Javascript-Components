window.onload = () => {
	document.getElementById('mouse-effects').addEventListener('mousemove', onMouseMove);
	document.getElementById('mouse-effects').addEventListener('touchmove', onTouchMove);

	onResize();
	window.addEventListener('resize', onResize);
}

function onResize() {
	document.getElementById('mouse-effects').width = window.innerWidth - 2;
	document.getElementById('mouse-effects').height = window.innerHeight / 2;
}

function onMouseMove(e) {
	const x = e.clientX - e.target.offsetLeft;
	const y = e.clientY - e.target.offsetTop;

	animation(x, y);
}

function onTouchMove(e) {
	const x = e.touches[0].clientX - e.target.offsetLeft;
	const y = e.touches[0].clientY - e.target.offsetTop;
	if (x < 0 || x > e.target.clientWidth || y < 0 || y > e.target.clientHeight) { return; }

	animation(x, y);
}

function animation(x, y) {
	const canvas = document.getElementById('mouse-effects');
	const ctx = canvas.getContext("2d");

	ctx.beginPath();
	ctx.arc(x, y, 1, 0, 2 * Math.PI);
	ctx.strokeStyle = '#000000';
	ctx.closePath();
	ctx.stroke();

	setTimeout(() => {
		ctx.beginPath();
		ctx.arc(x, y, 2, 0, 2 * Math.PI);
		ctx.strokeStyle = '#ffffff';
		ctx.fill();
		ctx.fillStyle = '#ffffff';
		ctx.closePath();
		ctx.stroke();
	}, 500);
}