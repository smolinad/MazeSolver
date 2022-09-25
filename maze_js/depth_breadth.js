function depth_breadth(start, end,type) {
  
    if (openSet.length > 0) {      
      if(type=="depth"){
        var current = openSet[openSet.length-1]
      }
      if(type=="breadth"){
        var current = openSet[0]
      }
      if (current === end) {
        noLoop();
        console.log("DONE!")
      }
  
      removeFromArray(openSet, current)
      closedSet.push(current)
      let neighbors = current.neighbors
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
        console.log(closedSet)
        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          openSet.push(neighbor)
          neighbor.previous = current
        }
      }
    } else {
      console.log('no solution')
      noLoop();
      return;
    }
  
    for (let row of grid) {
      for (let cell of row) {
        cell.show();
      }
    }
  
    for (let closed of closedSet) {
      closed.show(closedColor)
    }
  
    for (let opened of openSet) {
      opened.show(openColor)
    }
  
    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous)
      temp = temp.previous
    }
  
    noFill();
    stroke(pathColor);
    strokeWeight(cellSize / 2);
    strokeCap(PROJECT);
    beginShape();
    for (let i = 0; i < path.length; i++) {
      vertex(path[i].col * cellSize + cellSize / 2, path[i].row * cellSize + cellSize / 2);
    }
    endShape();
  }