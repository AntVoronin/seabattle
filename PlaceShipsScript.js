function markShipPlaced(x, y, size, direction, field) {
    const ship = new Ship(direction, size);
    for (let i = 0; i < size; i++) {
        let cellName;
        if (direction === ShipDirection.HORIZONTAL) {
            field.cells[y][x + i].state = CellState.SHIP;
            cellName = `#cell_${x + i}_${y}`;
        } else {
            field.cells[y + i][x].state = CellState.SHIP;
            cellName = `#cell_${x}_${y + i}`;
        }
        const div = field.element.querySelector(cellName);
        div.className = CellState.SHIP.name;
        ship.addCell(cellName.replace('#', ''));
        field.addShipCell(cellName.replace('#', ''), ship);
    }
}

function validateCell(x, y, field) {
    for (let i = 0; i < directions.length; i++) {
        const curX = x + directions[i][0];
        const curY = y + directions[i][1];
        if (curX >= 0 && curX < field.width && curY >= 0 && curY < field.height) {
            if (field.cells[curY][curX].state !== CellState.WATER) return false;
        }
    }
    return true;
}

function validateShipPlacement(x, y, size, direction, field) {
    if (direction === ShipDirection.HORIZONTAL) {
        for (let i = 0; i < size; i++) {
            if (x + i > field.width) return false;
            if (!validateCell(x + i, y, field)) return false;
        }
    } else {
        for (let i = 0; i < size; i++) {
            if (y + i > field.height) return false;
            if (!validateCell(x, y + i, field)) return false;
        }
    }
    return true;
}

function placeShip(size, field) {
    const direction = getRandom(1) === 1 ? ShipDirection.HORIZONTAL : ShipDirection.VERTICAL;
    const maxX = direction === ShipDirection.VERTICAL ? field.width : field.width - size;
    const maxY = direction === ShipDirection.HORIZONTAL ? field.height : field.height - size;
    while (true) {
        const x = getRandom(maxX - 1);
        const y = getRandom(maxY - 1);
        if (!validateShipPlacement(x, y, size, direction, field)) continue;
        markShipPlaced(x, y, size, direction, field);
        break;
    }
}

function placeShips(field) {
    for (let i = maxShipSize; i > 0; i--) {
        for (let j = maxShipSize - i + 1; j > 0; j--) {
            placeShip(i, field);
        }
    }
}
