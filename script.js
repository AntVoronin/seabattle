const directions = [[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]];
const width = 10;
const height = 10;
const maxShipSize = 4;
const getRandom = n => Math.floor(Math.random() * (n + 1));
let   playerScore = 0, 
      opponentScore = 0;

const inputOneShot = document.querySelector('#oneShot'),
      inputToMiss  = document.querySelector('#toMiss'),
      btnPlay = document.querySelector('#play'),
      divRules = document.querySelector('.rules'),
      opponentField = document.querySelector('#opponent'), //
      toptext = document.querySelector('#text_top'),
      inpScore = document.querySelector('#inpScore'),
      inpName = document.querySelector( '#playerName' ),
      divScore = document.querySelector('.wrap_score'),
      btnPlayAgain = document.querySelector('#btnPlayAgain'),
      divMessage = document.querySelector('#messege');

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

function clearField() {
    document.querySelector('#player').innerHTML = "";
    document.querySelector('#opponent').innerHTML = "";
}
function updateScore() {
    divScore.querySelector('#score_player').textContent = `${playerScore}` ;
    divScore.querySelector('#score_opponent').textContent = `${opponentScore}` ;
}

btnPlay.addEventListener('click', ()=> {
    divRules.hidden = true;
    clearField();
    battle();
    divScore.hidden = false;
});
btnPlayAgain.addEventListener( 'click', ()=> {
    clearField();
    battle();
} )

function activeBtnPlay() { 

        if ( (inputOneShot.checked || inputToMiss.checked) && inpName.value ) {
            btnPlay.classList.remove('btn-play_disabled');
            btnPlay.disabled = false;
            } 
       else {
            btnPlay.classList.add('btn-play_disabled');
            btnPlay.disabled = true;
            }
}

