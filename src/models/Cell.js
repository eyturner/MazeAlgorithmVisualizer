class Cell {
  constructor(id) {
    this.id = id;
    this.visited = false;
    this.inStack = false;
    this.isCurrent = false;
    this.walls = [true, true, true, true]; //Top, Right, Bottom, Left
  }
}

export default Cell;