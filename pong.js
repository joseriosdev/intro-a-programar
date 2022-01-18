var canvas;
var ctx;

window.onload = function() {
	canvas = document.getElementById('videojuego-pong');
	ctx = canvas.getContext('2d');
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0, 800,600);
	ctx.fillStyle = 'green';
	ctx.fillRect(100,200, 100,50);
	ctx.fillStyle = 'yellow';
	ctx.fillRect(400,300, 100,100);
	ctx.fillStyle = 'red';
	ctx.fillRect(canvas.width,canvas.height, 50,50);
	ctx.fillStyle = 'red';
	ctx.fillRect(canvas.width-50,canvas.height-50, 50,50);
	ctx.fillStyle = 'blue';
	ctx.fillRect(canvas.width/2-50,canvas.height/2-50, 100,100);
}