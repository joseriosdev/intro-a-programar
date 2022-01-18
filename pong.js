var canvas;
var ctx;
var bolaX = 50;

window.onload = function() {
	canvas = document.getElementById('videojuego-pong');
	ctx = canvas.getContext('2d');
	setInterval(dibujarTodo, 50);
}

function dibujarTodo() {
	bolaX += 20;

	ctx.fillStyle = 'black';
	ctx.fillRect(0,0, 800,600);
	ctx.fillStyle = 'orange';
	ctx.fillRect(bolaX,200, 50,50);
}