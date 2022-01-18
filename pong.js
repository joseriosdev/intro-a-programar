var canvas;
var ctx;
var bolaX = 50;
var velocidadBolaX = 10;

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
	bolaX += velocidadBolaX;

	if (bolaX < 0) {
		velocidadBolaX = -velocidadBolaX;
	}
	if (bolaX > canvas.width) {
		velocidadBolaX = -velocidadBolaX;
	}
}

function dibujarTodo() {
	// Cuadrado negro del fondo
	hacerCuadrado(0,0, canvas.width,canvas.height, 'black');

	// la bola
	hacerCirculo(bolaX,200, 10, 'white');

	// raqueta izquierda
	hacerCuadrado(10,100, 10,100, 'white');
}

function hacerCuadrado(x, y, ancho, alto, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x,y, ancho,alto);
}

function hacerCirculo(x, y, radio, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x,y, radio, 0,Math.PI*2, true);
	ctx.fill();
	ctx.closePath();
}