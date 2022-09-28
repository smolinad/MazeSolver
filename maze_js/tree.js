function Tree() {
    this.root = null;
}
  
Tree.prototype.traverse = function() {
    this.root.visit(this.root);
}
  
Tree.prototype.search = function(val) {
    return this.root.search(val)
}
  
Tree.prototype.addValue = function(state, row, col) {
    let n = new Cell(state, row, col)
    if (this.root == null) {
      this.root = n
      this.root.x = 3 * (width / 2)
      this.root.y = 16
    } else {
      this.root.addNeighbors(grid)
    }
}
  