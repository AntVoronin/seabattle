let playersDamagedShips = new Set();

function fire(el, field) {
    if (el.className === CellState.HIT.name || el.className === CellState.MISS.name) return false;

    if (el.className === CellState.SHIP.name) {
        el.className = CellState.HIT.name;
        const ship = field.getShip(el.id);
        if (!ship.hitCell(el.id)) {
            markShipKilled(ship, field);
        }
        // if (inputOneShot.checked) return true;
        return false;
    } else {
        el.className = CellState.MISS.name;
    }
    if (document.querySelectorAll('#opponent .s').length === 0) {
        const timer = setTimeout( ()=> {
            divMessage.textContent = 'Вы победили!';
        }  , 500 );
            playerScore++;
            divMessage.hidden = false;
            updateScore();
            clearField();
            battle();
        return false;
    }
    if (el.className === CellState.MISS.name) return true; 
    return false;
}

function markShipKilled(ship, field) {
    ship.damagedCells.forEach(cellName => {
        const x = Number(cellName.split('_')[1]);
        const y = Number(cellName.split('_')[2]);
        for (let i = 0; i < directions.length; i++) {
            const curX = x + directions[i][0];
            const curY = y + directions[i][1];
            const curCellName = `#cell_${curX}_${curY}`;
            if (curX >= 0 && curX < field.width && curY >= 0 && curY < field.height) {
                if (field.cells[curY][curX].state === CellState.WATER) {
                    const div = field.element.querySelector(curCellName);
                    div.className = CellState.MISS.name;
                    field.cells[curY][curX].state = CellState.MISS;
                }
            }
        }
    });
}

function backfire(field) {
    for (let i = width * height; i > 0; i--) {
        const targets = getTargets(field);
        const shotCell = targets[Math.floor(Math.random() * targets.length)];
        const isMiss = fire(shotCell, field);
        if (!isMiss) {
            playersDamagedShips.add(field.getShip(shotCell.id));
        }
        if (document.querySelectorAll('#player .s, #player .w').length === 0 || isMiss) break;
    }
    if (document.querySelectorAll('#player .s').length === 0) { 
            const timer = setTimeout( ()=> {
            divMessage.textContent = 'Вы проиграли! Попробуйте снова';
            }, 500 );
            opponentScore++;
            divMessage.hidden = false;
            updateScore();
            clearField();
            battle();
        }
}

function getTargets(field) {
    const targets = document.querySelectorAll('#player .s, #player .w');
    playersDamagedShips = new Set(Array.from(playersDamagedShips).filter(ship => ship.isAlive));
    if (playersDamagedShips.size === 0) {
        return targets;
    }
    return getDamagedTargets(field);
}

function getDamagedTargets(field) {
    const shotDirectionsHorizontal = [[-1, -0], [1, 0]];
    const shotDirectionsVertical = [[0, -1], [0, 1]];
    const targets = [];
    playersDamagedShips.forEach(ship => {
        if (ship.damagedCells.length === 1) {
            targets.push.apply(targets, getDamagedCellsNeighbors(ship, shotDirectionsHorizontal, shotDirectionsVertical, field));
        } else {
            const shipDirection = getDirectionByDamagedCells(ship);
            if (shipDirection === ShipDirection.HORIZONTAL) {
                targets.push.apply(targets, getDamagedCellsNeighbors(ship, shotDirectionsHorizontal, [], field));
            } else {
                targets.push.apply(targets, getDamagedCellsNeighbors(ship, [], shotDirectionsVertical, field));
            }
        }
    });
    return targets;
}

function getDirectionByDamagedCells(ship) {
    const firstCellX = ship.damagedCells[0].split('_')[1];
    const secondCellX = ship.damagedCells[1].split('_')[1];
    if (firstCellX === secondCellX) {
        return ShipDirection.VERTICAL;
    }
    return ShipDirection.HORIZONTAL;
}

function getDamagedCellsNeighbors(ship, horizontal, vertical, field) {
    const targets = [];
    ship.damagedCells.forEach(cell => {
        const x = Number(cell.split('_')[1]);
        const y = Number(cell.split('_')[2]);
        horizontal.forEach(direction => {
            if (validateBorders(x + direction[0], y + direction[1])) {
                const curCell = `#cell_${x + direction[0]}_${y + direction[1]}`;
                const cell = field.element.querySelector(curCell);
                if (cell.className === CellState.WATER.name || cell.className === CellState.SHIP.name) {
                    targets.push(cell);
                }
            }
        });
        vertical.forEach(direction => {
            if (validateBorders(x + direction[0], y + direction[1])) {
                const curCell = `#cell_${x + direction[0]}_${y + direction[1]}`;
                const cell = field.element.querySelector(curCell);
                if (cell.className === CellState.WATER.name || cell.className === CellState.SHIP.name) {
                    targets.push(cell);
                }
            }
        });
    });
    return targets;
}
