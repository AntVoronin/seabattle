class Cell {

    x = null;
    y = null;
    name = null;
    state = CellState.WATER;

    setState(newState) {
        if (this.state.isTerminal === false) {
            this.state = newState;
        }
    }

    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
}