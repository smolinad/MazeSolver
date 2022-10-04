function Cell(state, i, j) {
    this.row = i
    this.col = j
    this.f = 0
    this.g = 0
    this.h = 0
    this.depth = 0
    this.cost = 0
    this.state = state
    this.neighbors = []
    this.previous = undefined

    this.treeX = 0
    this.treeY = 0
  
    this.wall = false;

    if (this.state == "w") {
      this.wall = true;
    } 
  
    this.show = function(color) {
      if (this.wall) {
        fill(wallColor)
        noStroke();
        square(this.col * cellSize, this.row * cellSize, cellSize);
      } else if (color) {
        fill(color);
        square(this.col * cellSize, this.row * cellSize, cellSize);
      }
    }

    this.addNeighbors = function(grid) {
      var i = this.row
      var j = this.col
      if (i < grid[0].length - 1) {
        this.neighbors.push(grid[i + 1][j])
      }
      if (i > 0) {
        this.neighbors.push(grid[i - 1][j])
      }
      if (j < grid.length - 1) {
        this.neighbors.push(grid[i][j + 1])
      }
      if (j > 0) {
        this.neighbors.push(grid[i][j - 1])
      }
    }
}


Cell.prototype.visit = function(parent) {
  if (this.neighbors != null) {
    this.left.visit(this);
  }

  console.log(this.row, this.col);
  fill(255);
  noStroke();
  textAlign(CENTER);
  text(this.x, this.treeX, this.treeY);
  stroke(255);
  noFill();
  rect(this.treeX, this.treeY, 20, 20);
  line(parent.x, parent.y, this.x, this.y);
  
  if (this.right != null) {
    this.right.visit(this);
  }
}



  
