var canvas;
var ctx;
var bolaX = 50;

window.onload = function() {
	canvas = document.getElementById('videojuego-pong');
	ctx = canvas.getContext('2d');

	var fps = 30;
	setInterval(function() {
		moverTodo();
		dibujarTodo();
	}, 1000/fps);
}

function moverTodo() {
	bolaX += 20;
}

function dibujarTodo() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0, canvas.width,canvas.height);
	ctx.fillStyle = 'orange';
	ctx.fillRect(bolaX,200, 10,10);
	ctx.fillStyle = 'white';
	ctx.fillRect(10,100, 10,100);
}