function Cell(state, i, j) {
    this.row = i;
    this.col = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.state = state
    this.neighbors = [];
    this.previous = undefined;
  
    this.wall = false;
    if (this.state == "w") {
      this.wall = true;
    }
  
    this.show = function(col) {
      if (this.wall) {
        fill(wallColor);
        noStroke();
        square(this.col * cellSize, this.row * cellSize, cellSize);
      } else if (col) {
        fill(col);
        square(this.col * cellSize, this.row * cellSize, cellSize);
      }
    }
    this.addNeighbors = function(grid) {
      var i = this.row;
      var j = this.col;
      if (i < grid[0].length - 1) {
        this.neighbors.push(grid[i + 1][j]);
      }
      if (i > 0) {
        this.neighbors.push(grid[i - 1][j]);
      }
      if (j < grid.length - 1) {
        this.neighbors.push(grid[i][j + 1]);
      }
      if (j > 0) {
        this.neighbors.push(grid[i][j - 1]);
      }
    }
  }