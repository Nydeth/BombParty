function iniciarJuego() {
    var jugador1 = document.querySelector('#j1nom input').value;
    var jugador2 = document.querySelector('#j2nom input').value;

    if (jugador1 && jugador2) {
        localStorage.setItem('jugador1', jugador1);
        localStorage.setItem('jugador2', jugador2);

        window.location.href = 'BombParty.html';
    } else {
        alert('Por favor, ingresa nombres para ambos jugadores.');
    }
}