class Field {

    cells = null;
    shipCells = new Map();
    element = null;
    width = null;
    height = null;

    constructor(element) {

        this.width = width;
        this.height = height;
        this.element = element;
        this.cells = new Array(height);

        for (let y = 0; y < height; y++) {
            let row = new Array(width);
            for (let x = 0; x < width; x++) {
                const cellName = 'cell' + '_' + x + '_' + y;
                const cell = new Cell(x, y, cellName);
                row[x] = cell;
                const div = document.createElement('div');
                div.id = cellName;
                div.className = cell.state.name;
                this.element.appendChild(div);
            }
            this.cells[y] = row;
        }
    }

    addShipCell(cellName, ship) {
        this.shipCells.set(cellName, ship);
    }

    getShip(cellName) {
        return this.shipCells.get(cellName);
    }
}
