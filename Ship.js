class Ship {

    cells = new Set();
    damagedCells = [];
    size = 0;
    direction = null;
    isAlive = true;

    constructor(direction, size) {
        this.direction = direction;
        this.size = size;
    }

    addCell(cellName) {
        this.cells.add(cellName);
    }

    hitCell(cellName) {
        if (this.cells.has(cellName)) {
            this.damagedCells.push(cellName);
            if (this.damagedCells.length >= this.size) {
                this.isAlive = false;
            }
        }
        return this.isAlive;
    }
}