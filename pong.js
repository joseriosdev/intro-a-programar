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
var velocidadRaqueta2 = 6;
var raquetaOffset = 30;

var puntajeJugador1 = 0;
var puntajeJugador2 = 0;
const PUNTAJE_GANADOR = 3;
var mostrarPantallaFinal = false;

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
	if (mostrarPantallaFinal) {
		return;
	}
	movimientoComputadora();

	bolaX += velocidadBolaX;
	bolaY += velocidadBolaY;

	if (bolaX < 0) {
		if (bolaY > raqueta1Y && bolaY < raqueta1Y+ALTURA_RAQUETA) {
			velocidadBolaX = -velocidadBolaX;
			velocidadBolaY = (bolaY - (raqueta1Y+ALTURA_RAQUETA/2)) * 0.3;
		} else {
			puntajeJugador2++; // tiene que ser antes del reset
			resetearBola();
		}
	}
	if (bolaX > canvas.width) {
		if (bolaY > raqueta2Y && bolaY < raqueta2Y+ALTURA_RAQUETA) {
			velocidadBolaX = -velocidadBolaX;
			velocidadBolaY = (bolaY - (raqueta2Y+ALTURA_RAQUETA/2)) * 0.3;
		} else {
			puntajeJugador1++; // tiene que ser antes del reset
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

	if (mostrarPantallaFinal) {
		ctx.fillStyle = 'white';
		ctx.fillText('Click Para Continuar', 100,100);
		return;
	}

	// la bola
	hacerCirculo(bolaX,bolaY, 10, 'white');

	// raqueta izquierda y derecha
	hacerCuadrado(0,raqueta1Y, ANCHO_RAQUETA,ALTURA_RAQUETA, 'white');
	hacerCuadrado(canvas.width-ANCHO_RAQUETA,raqueta2Y, ANCHO_RAQUETA,ALTURA_RAQUETA, 'white');

	// puntajes
	ctx.fillText(puntajeJugador1, 100, 100);
	ctx.fillText(puntajeJugador2, canvas.width-100, 100);
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
	if (puntajeJugador1 >= PUNTAJE_GANADOR || puntajeJugador2 >= PUNTAJE_GANADOR) {
		puntajeJugador1 = 0;
		puntajeJugador2 = 0;
		mostrarPantallaFinal = true;
	}
	velocidadBolaX = -velocidadBolaX;
	bolaX = canvas.width/2;
	bolaY = canvas.height/2;
}

function movimientoComputadora() {
	var centroRaqueta = raqueta2Y + (ALTURA_RAQUETA/2);

	if (centroRaqueta < bolaY-raquetaOffset) {
		raqueta2Y += velocidadRaqueta2;
	} else if (centroRaqueta > bolaY+raquetaOffset) {
		raqueta2Y -= velocidadRaqueta2;
	}
}
