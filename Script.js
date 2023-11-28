var arrayDiccionario = {};
var usadas = [];
var vidasj1 = 2;
var vidasj2 = 2;
var turno = 0;
let turnoActual = 'jugador1';
const maxVidas = 3;
const vocales = "AEIOU";
const consonantes = "BCDFGHJLMNPQRSTV";
const letrasDisponibles = "ABCDEFGHIJLMNOPQRSTUV";
const palabraCorrecta = 2000;
const marcoj1 = document.getElementById('marcoj1');
const marcoj2 = document.getElementById('marcoj2');
const mid1 = document.getElementById('bomba');
const mid2 = document.getElementById('flecha');
const inputj1 = document.getElementById('j1');
const inputj2 = document.getElementById('j2');
const flecha = document.getElementById('flechita');
document.getElementById('jugador1Texto').innerText = localStorage.getItem('jugador1');
document.getElementById('jugador2Texto').innerText = localStorage.getItem('jugador2');

var letrasIDs = {
  A1: document.getElementById("A1"), B1: document.getElementById("B1"), C1: document.getElementById("C1"),
  D1: document.getElementById("D1"), E1: document.getElementById("E1"), F1: document.getElementById("F1"), 
  G1: document.getElementById("G1"), H1: document.getElementById("H1"), I1: document.getElementById("I1"),
  J1: document.getElementById("J1"), K1: document.getElementById("K1"), L1: document.getElementById("L1"),  
  M1: document.getElementById("M1"), N1: document.getElementById("N1"), O1: document.getElementById("O1"),
  P1: document.getElementById("P1"), Q1: document.getElementById("Q1"), R1: document.getElementById("R1"),
  S1: document.getElementById("S1"), T1: document.getElementById("T1"), U1: document.getElementById("U1"),  
  A2: document.getElementById("A2"), B2: document.getElementById("B2"), C2: document.getElementById("C2"),
  D2: document.getElementById("D2"), E2: document.getElementById("E2"), F2: document.getElementById("F2"),  
  G2: document.getElementById("G2"), H2: document.getElementById("H2"), I2: document.getElementById("I2"),
  J2: document.getElementById("J2"), K2: document.getElementById("K2"), L2: document.getElementById("L2"),  
  M2: document.getElementById("M2"), N2: document.getElementById("N2"), O2: document.getElementById("O2"), 
  P2: document.getElementById("P2"), Q2: document.getElementById("Q2"), R2: document.getElementById("R2"),  
  S2: document.getElementById("S2"), T2: document.getElementById("T2"), U2: document.getElementById("U2"),
};

function actualizarVidasVisual() {
  actualizarVidas('j1corazon', vidasj1);
  actualizarVidas('j2corazon', vidasj2);

  if (vidasj1 === 0) {
    fin(marcoj1, mid1, mid2, jugador2);
  } 
  
  if (vidasj2 === 0) {
    fin(marcoj2, mid1, mid2, jugador1);
  }
}

function actualizarVidas(id, lives) {
  for (let i = 1; i <= 3; i++) {
      const corazón = document.getElementById(`${id}${i}`);
      if (i <= lives) {
          corazón.innerHTML = '<img src="Media/pixel-heart-2779422_640.png">';
          corazón.style.display = 'inline-block';
      } else {
        corazón.style.display = 'none';
      }
  }
}


function explosion() {
  var duracion = 900;
  var bomba = document.getElementById('bombita');
  var letras = document.getElementById('letras-bomba');
  bomba.src = "Media/Explosion.gif";
  bomba.style.animation = 'none';
  letras.style.display = 'none';
  flecha.style.visibility = 'hidden';
  bomba.style.height = '300px';
  bomba.style.width = '300px';
  bomba.style.position = 'relative';
  bomba.style.left = '-34%';
  setTimeout(function () {
      bomba.style.display = 'none';
  }, duracion);
}

actualizarVidasVisual();

function cambiarTurno() {
  if (turnoActual === 'jugador1') {
      turnoActual = 'jugador2';
  } else {
      turnoActual = 'jugador1';
  }
}

function fin(marco, mid1, mid2, ganador) {
  explosion();
  setTimeout(function () {
    document.getElementById('j2').style.display = 'none';
    ganador.style.backgroundImage = "url('Media/winner.png')";
    ganador.style.backgroundSize = "105px 100px";
    marco.style.display = 'none';
    mid1.style.display = 'none';
    mid2.style.display = 'none';
  }, 745);
}


function cargarDiccionario(letra) {
  if (!arrayDiccionario[letra]) {
    return new Promise((resolve, reject) => {
      fetch(`diccionario/Diccionario_${letra}.txt`)
        .then(response => {
          if (!response.ok) {
            reject(`Error al cargar el diccionario para la letra ${letra}. Estado: ${response.status}`);
          } else {
            return response.text();
          }
        })
        .then(txt => {
          var lineas = txt.split('\n');
          arrayDiccionario[letra] = lineas.map(linea => linea.trim());
          resolve();
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  } else {
    return Promise.resolve();
  }
}

document.addEventListener("DOMContentLoaded", iniciar());

function iniciar() {
  const vocalAleatoria = vocales.charAt(Math.floor(Math.random() * vocales.length));
  const consonanteAleatoria = consonantes.charAt(Math.floor(Math.random() * consonantes.length));
  const letrasAleatorias = vocalAleatoria + consonanteAleatoria;
  document.getElementById("letras-bomba").textContent = letrasAleatorias;
  inputj1.focus();
  actualizarVidasVisual();
}

function ganarVida(jugador) {
  let todasEnGris = true;

  for (let letra of letrasDisponibles) {
    const letras = document.getElementById(`${letra}${jugador}`);
    if (letras.style.backgroundColor !== 'grey') {
      todasEnGris = false;
    }
  }

  if (todasEnGris) {
    reiniciarColores(jugador);
    return true;
  }

  return false;
}

function reiniciarColores(jugador) {
  var vidasJugador = jugador === 1 ? vidasj1 : vidasj2;

  if (vidasJugador < maxVidas) {
    jugador === 1 ? vidasj1++ : vidasj2++;
    actualizarVidasVisual();
  } else {
    alert("¡Increíble! Aunque es una lástima que como máximo sean 3 vidas...\n ¡Aquí tienes un corazón <3!");
  }

  for (let letra of letrasDisponibles) {
    const letras = document.getElementById(`${letra}${jugador}`);
    if (letras) {
      letras.style.backgroundColor = 'rgb(243, 243, 135)';
    }
  }
}





function verificarEnter1(event) {
  if (event.key === "Enter" && inputj1.value != '') {
    verificarPalabra1();
    setTimeout(function () {
      inputj2.style.display = 'flex';
      inputj1.style.display = 'none'; 
      inputj1.value = '';
      if (vidasj1 > 0) {
      rotar(flecha);
      inputj2.focus();
      turno = 1;
      iniciar(marcoj1, mid1, mid2, jugador2);
    } else {
      fin();
    }
    }, 723);
  }
}

function verificarEnter2(event) {
  if (event.key === "Enter" && inputj2.value != '') {
    verificarPalabra2();
    setTimeout(function () {
      inputj1.style.display = 'flex';
      inputj2.style.display = 'none';
      inputj2.value = '';
      if (vidasj2 > 0) {
      rotar2(flecha);
      inputj1.focus();
      turno = 0;
      iniciar();
      } else {
        fin(marcoj2, mid1, mid2, jugador1);
      }
    }, 723);
  }
}

function verificarPalabra1() {
  const palabraJugador1 = document.getElementById("j1").value.toLowerCase();
  const letrasAleatorias = document.getElementById("letras-bomba").textContent.toLowerCase();
  const primeraLetraPalabra1 = palabraJugador1.charAt(0);
  var input = document.getElementById('j1');
  var resultado = '';
  let jugador = 1;

  cargarDiccionario(primeraLetraPalabra1)
    .then(() => {
      if (
        arrayDiccionario[primeraLetraPalabra1] &&
        arrayDiccionario[primeraLetraPalabra1].includes(palabraJugador1) &&
        palabraJugador1.includes(letrasAleatorias) && !esPalabraUsada(palabraJugador1)
      ) {
        usadas.push(palabraJugador1);
        resultado = 'correcto';
        correccion(input, resultado);
        letrasUsadas(jugador, palabraJugador1);
        ganarVida(jugador);
        cambiarTurno();
      } else {
        resultado = 'incorrecto';
        correccion(input, resultado);
        vidasj1--;
        actualizarVidasVisual();
        if (vidasj1 === 0) {
          fin(marcoj1, mid1, mid2, jugador2);
        } else {
          cambiarTurno();
        }
      }
    })
    .catch(error => console.error(error));
}

function verificarPalabra2() {
  const palabraJugador2 = document.getElementById("j2").value.toLowerCase();
  const letrasAleatorias = document.getElementById("letras-bomba").textContent.toLowerCase();
  const primeraLetraPalabra2 = palabraJugador2.charAt(0);
  var input = document.getElementById('j2');
  var resultado = '';
  let jugador = 2;

  cargarDiccionario(primeraLetraPalabra2)
    .then(() => {
      if (
        arrayDiccionario[primeraLetraPalabra2] &&
        arrayDiccionario[primeraLetraPalabra2].includes(palabraJugador2) &&
        palabraJugador2.includes(letrasAleatorias) && !esPalabraUsada(palabraJugador2)
      ) {
        usadas.push(palabraJugador2);
        resultado = 'correcto';
        correccion(input, resultado);
        letrasUsadas(jugador, palabraJugador2);
        ganarVida(jugador);
        setTimeout(function () {
        cambiarTurno();
        }, 500);
      } else {
        resultado = 'incorrecto';
        correccion(input, resultado);
        vidasj2--;
        actualizarVidasVisual();
        if (vidasj2 === 0) {
          fin(marcoj2, mid1, mid2, jugador1);
        } else {
          cambiarTurno();
        }
      }
    })
    .catch(error => console.error(error));
}

function letrasUsadas(jugador, palabra) {
  const letrasUnicas = palabra.toLowerCase().split('');
  letrasUnicas.forEach(letra => {
    const letraID = document.getElementById(`${letra.toUpperCase()}${jugador}`);
    if (letraID) {
      letraID.style.backgroundColor = 'grey';
    }
  });
}

function esPalabraUsada(palabra) {
  return usadas.includes(palabra);
}

function comprobarPalabraUsada(palabra, jugador) {
  if (usadas.includes(palabra)) {
    return correccion(jugador, 'incorrecto');
  } else {
    usadas.push(palabra);
    return correccion(jugador, 'correcto');
  }
}


function correccion(jugador, resultado) {
  const idOriginal = jugador.id;
  jugador.id = resultado;
  setTimeout(function () {
    jugador.id = idOriginal;
  }, 925);
}

function rotar(flecha) {
  flecha.id = 'rotacion';
}

function rotar2(flecha) {
  flecha.id = 'rotacion2';
}