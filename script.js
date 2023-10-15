const directions = [[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]];
const width = 10;
const height = 10;
const maxShipSize = 4;
const getRandom = n => Math.floor(Math.random() * (n + 1));

const inputOneShot = document.querySelector('#oneShot'),
inputToMiss  = document.querySelector('#toMiss'),
btnPlay = document.querySelector('#play'),
divRules = document.querySelector('.rules'),
opponentField = document.querySelector('#opponent'),
toptext = document.querySelector('#text_top');

function validateBorders(x, y) {
    return x >= 0 && x < width && y >= 0 && y < height;
}

function battle() {

    const playerField = new Field(document.querySelector('#player'));
    const opponentField = new Field(document.querySelector('#opponent'));

    const opponentCells = document.querySelectorAll('#opponent .w');
    opponentCells.forEach(cell => {
            cell.onclick = function () {
                if (fire(cell, opponentField)) backfire(playerField);
            };
    });

    placeShips(playerField);
    placeShips(opponentField);
}

btnPlay.addEventListener('click', function(e) {
    divRules.hidden = true;
    battle();
});
