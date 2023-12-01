function iniciarJuego() {
    window.location.href = "BombParty.html";
}

function volverJuego(){
    window.location.href = "inicio.html";
}

document.addEventListener('DOMContentLoaded', function () {
    // Obtener el ranking desde el LocalStorage o inicializarlo si es la primera vez
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

    // Obtener el nombre del jugador ganador
    let jugadorGanador = localStorage.getItem('jugadorGanador');
    let palabraMasLarga = localStorage.getItem('palabraMasLarga');
    let masPalabrasUsadas = localStorage.getItem('masPalabrasUsadas');


    // Actualizar el ranking con el nuevo resultado
    if (jugadorGanador) {
        let jugadorExistente = ranking.find(jugador => jugador.nombre === jugadorGanador);

        if (jugadorExistente) {
            jugadorExistente.victorias++;
        } else {
            ranking.push({ nombre: jugadorGanador, victorias: 1 });
        }

        // Ordenar el ranking por número de victorias de forma descendente
        ranking.sort((a, b) => b.victorias - a.victorias);

        // Limitar el ranking a los primeros 4 jugadores
        ranking = ranking.slice(0, 4);

        // Actualizar el ranking en el LocalStorage
        localStorage.setItem('ranking', JSON.stringify(ranking));
    }

     // Comparar y actualizar el récord de palabras usadas
     let recordAnterior = parseInt(localStorage.getItem('recordPalabrasUsadas')) || 0;
     if (masPalabrasUsadas > recordAnterior) {
         localStorage.setItem('recordPalabrasUsadas', masPalabrasUsadas);
     } else {
         masPalabrasUsadas = recordAnterior; // Si no es un nuevo récord, conserva el récord anterior
     }

    // Función para mostrar el ranking en la página
    function mostrarRanking() {
        const nombres = document.querySelectorAll('#nombres p');
        const palabra = document.querySelector("#palabraLarga p");
        const usadas = document.querySelector("#palabrasUsadas p");

        ranking.forEach((jugador, index) => {
            if (index === 0) {
                // Aplicar negrita solo al primer elemento del ranking
                nombres[index].innerHTML = `<strong>${index + 1}. ${jugador.nombre} (${jugador.victorias} victorias)</strong>`;
            } else {
                // Mantener el formato normal para los demás elementos
                nombres[index].innerHTML = `${index + 1}. ${jugador.nombre} (${jugador.victorias} victorias)`;
            }

            palabra.textContent = palabraMasLarga;

            usadas.innerHTML = `${jugador.nombre} (${masPalabrasUsadas})`;
        });

      

    }

    // Mostrar el ranking en la página
    mostrarRanking();
});

