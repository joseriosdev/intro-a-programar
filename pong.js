var canvas;
var ctx;

var bolaX = 50;
var bolaY = 50;
const VELOCIDAD_INICIAL_X = 10;
const VELOCIDAD_INICIAL_Y = 5;
var velocidadBolaX = VELOCIDAD_INICIAL_X;
var velocidadBolaY = VELOCIDAD_INICIAL_Y;

var raqueta1Y = 250;
var raqueta2Y = 250;
const ANCHO_RAQUETA = 10;
const ALTURA_RAQUETA = 100;
var velocidadRaqueta2 = 4;
var raquetaOffset = 30;

var puntajeJugador1 = 0;
var puntajeJugador2 = 0;
const PUNTAJE_GANADOR = 3;
var mostrarPantallaFinal = false;
var margin = 100;

window.onload = function() {
	canvas = document.getElementById('videojuego-pong');
	ctx = canvas.getContext('2d');

	var fps = 30;
	setInterval(function() {
		moverTodo();
		dibujarTodo();
	}, 1000/fps);

	canvas.addEventListener('mousedown', mouseClick);

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
	if (bolaY < 0 || bolaY > canvas.height) {
		velocidadBolaY = -velocidadBolaY;
	}
}

function dibujarTodo() {
	// Cuadrado negro del fondo
	hacerCuadrado(0,0, canvas.width,canvas.height, 'black');

	if (mostrarPantallaFinal) {
		hacerTexto(canvas.width/4, canvas.height-margin, 'Click Para Continuar', 'white');

		if (puntajeJugador1 >= PUNTAJE_GANADOR) {
			hacerTexto(canvas.width/4, margin, 'Gana el Humano!', 'green');
		} else if (puntajeJugador2 >= PUNTAJE_GANADOR) {
			hacerTexto(canvas.width/4, margin, 'Gana la computadora', 'red');
		}
		return;
	}

	dibujarRed();

	// la bola
	hacerCirculo(bolaX,bolaY, 10, 'white');

	// raqueta izquierda y derecha
	hacerCuadrado(0,raqueta1Y, ANCHO_RAQUETA,ALTURA_RAQUETA, 'white');
	hacerCuadrado(canvas.width-ANCHO_RAQUETA,raqueta2Y, ANCHO_RAQUETA,ALTURA_RAQUETA, 'white');

	// puntajes
	hacerTexto(margin, margin, puntajeJugador1, 'white');
	hacerTexto(canvas.width-margin, margin, puntajeJugador2, 'white');
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

function hacerTexto(x, y, texto, color) {
	ctx.fillStyle = color;
	ctx.font = '20px arial'
	ctx.fillText(texto, x, y);
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
		mostrarPantallaFinal = true;
	}
	velocidadBolaX = -VELOCIDAD_INICIAL_X;
	velocidadBolaY = VELOCIDAD_INICIAL_Y;
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

function mouseClick() {
	if (mostrarPantallaFinal) {
		puntajeJugador1 = 0;
		puntajeJugador2 = 0;
		mostrarPantallaFinal = false;
	}
}

function dibujarRed() {
	var contador = 0;
	while (contador < canvas.height) {
		hacerCuadrado(canvas.width/2-1, contador, 2, 20, 'grey');
		contador += 40;
	}
}