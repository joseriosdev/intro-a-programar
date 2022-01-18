var canvas;
var ctx;

var bolaX = 50;
var bolaY = 50;
var velocidadBolaX = 10;
var velocidadBolaY = 5;

var raqueta1Y = 250;
var raqueta2Y = 250;
const ANCHO_RAQUETA = 10;
const ALTURA_RAQUETA = 100;

window.onload = function() {
	canvas = document.getElementById('videojuego-pong');
	ctx = canvas.getContext('2d');

	var fps = 30;
	setInterval(function() {
		moverTodo();
		dibujarTodo();
	}, 1000/fps);

	canvas.addEventListener('mousemove', function(evt) {
		var posicionMouse = calcularPosicionDelMouse(evt);
		raqueta1Y = posicionMouse.y - (ALTURA_RAQUETA/2);
	});
}

function moverTodo() {
	bolaX += velocidadBolaX;
	bolaY += velocidadBolaY;

	if (bolaX < 0) {
		if (bolaY > raqueta1Y && bolaY < raqueta1Y+ALTURA_RAQUETA) {
			velocidadBolaX = -velocidadBolaX;
		} else {
			resetearBola();
		}
	}
	if (bolaX > canvas.width) {
		if (bolaY > raqueta2Y && bolaY < raqueta2Y+ALTURA_RAQUETA) {
			velocidadBolaX = -velocidadBolaX;
		} else {
			resetearBola();
		}
	}
	if (bolaY < 0) {
		velocidadBolaY = -velocidadBolaY;
	}
	if (bolaY > canvas.height) {
		velocidadBolaY = -velocidadBolaY;
	}
}

function dibujarTodo() {
	// Cuadrado negro del fondo
	hacerCuadrado(0,0, canvas.width,canvas.height, 'black');

	// la bola
	hacerCirculo(bolaX,bolaY, 10, 'white');

	// raqueta izquierda y derecha
	hacerCuadrado(0,raqueta1Y, ANCHO_RAQUETA,ALTURA_RAQUETA, 'white');
	hacerCuadrado(canvas.width-ANCHO_RAQUETA,raqueta2Y, ANCHO_RAQUETA,ALTURA_RAQUETA, 'white');
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

function calcularPosicionDelMouse(evt) {
	var coordenadasCanvas = canvas.getBoundingClientRect();
	var raiz = document.documentElement;
	var mouseX = evt.clientX - coordenadasCanvas.left - raiz.scrollLeft;
	var mouseY = evt.clientY - coordenadasCanvas.top - raiz.scrollTop;

	return {
		x: mouseX,
		y: mouseY
	};
}

function resetearBola() {
	velocidadBolaX = -velocidadBolaX;
	bolaX = canvas.width/2;
	bolaY = canvas.height/2;
}