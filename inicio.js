function iniciarJuego() {
    var jugador1 = document.querySelector('#j1nom input').value;
    var jugador2 = document.querySelector('#j2nom input').value;
    var start = new Audio('Media/8-bit-powerup-6768.mp3');
    var bgm = document.getElementById('bgm');

    if (jugador1 && jugador2) {
        setTimeout(function() {
            localStorage.setItem('jugador1', jugador1);
            localStorage.setItem('jugador2', jugador2);
            window.location.href = 'BombParty.html';
        }, 1000);
        
        start.play();
        bgm.pause();
    } else {
        alert('Por favor, ingresa nombres para ambos jugadores.');
    }
}