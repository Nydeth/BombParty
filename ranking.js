function iniciarJuego() {
  window.location.href = "BombParty.html";
}

function volverJuego() {
  window.location.href = "inicio.html";
}

document.addEventListener("DOMContentLoaded", function () {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  let jugadorGanador = localStorage.getItem("jugadorGanador");
  let palabraMasLarga = localStorage.getItem("palabraMasLarga");
  let masPalabrasUsadas = localStorage.getItem("masPalabrasUsadas");
  var audio = document.getElementById('bgm');
    audio.volume = 0.2;

  if (jugadorGanador) {
    let jugadorExistente = ranking.find(
      (jugador) => jugador.nombre === jugadorGanador
    );

    if (jugadorExistente) {
      jugadorExistente.victorias++;
    } else {
      ranking.push({ nombre: jugadorGanador, victorias: 1 });
    }

    ranking.sort((a, b) => b.victorias - a.victorias);

    ranking = ranking.slice(0, 4);

    localStorage.setItem("ranking", JSON.stringify(ranking));
  }

  let recordAnterior =
    parseInt(localStorage.getItem("recordPalabrasUsadas")) || 0;
  if (masPalabrasUsadas > recordAnterior) {
    localStorage.setItem("recordPalabrasUsadas", masPalabrasUsadas);
  } else {
    masPalabrasUsadas = recordAnterior; 
  }

  function mostrarRanking() {
    const nombres = document.querySelectorAll("#nombres p");
    const palabra = document.querySelector("#palabraLarga p");
    const usadas = document.querySelector("#palabrasUsadas p");

    ranking.forEach((jugador, index) => {
      if (index === 0) {
        nombres[index].innerHTML = `<strong>${index + 1}. ${jugador.nombre} (${
          jugador.victorias
        } victorias)</strong>`;
      } else {
        nombres[index].innerHTML = `${index + 1}. ${jugador.nombre} (${
          jugador.victorias
        } victorias)`;
      }

      palabra.textContent = palabraMasLarga + ' (' + palabraMasLarga.length + ' letras)';

      usadas.innerHTML = `${jugador.nombre} (${masPalabrasUsadas})`;
    });
  }

  mostrarRanking();
});
