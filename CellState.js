class CellState {
    static WATER = new CellState('w', false);
    static SHIP  = new CellState('s', false);
    static MISS = new CellState('m', true);
    static HIT = new CellState('h', true);

    name = null;
    isTerminal = null;

    constructor(name, isTerminal) {
        this.name = name;
        this.isTerminal = isTerminal;
    }
}