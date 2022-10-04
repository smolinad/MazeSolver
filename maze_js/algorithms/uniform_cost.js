function uniform_cost(start, end) {
    
    if (openSet.length > 0) {     
  
      var current = openSet[0]
      if (current === end) {
        noLoop();
        console.log("DONE!")
        drawTree()
      }
      removeFromArray(openSet, current)
      closedSet.push(current)
      let neighbors = current.neighbors
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
        neighbor.cost = current.cost + neighbor.cost
        neighbor.cost = 1
        //console.log(closedSet)
        if (!closedSet.includes(neighbor) && !neighbor.wall) {
            r = 0
            for (let k = 0; k < openSet.length; k++) {
                if(neighbor.cost < openSet[k].cost){
                    //Max = dist(neighbor.row, neighbor.col, end.row, end.col)
                    openSet.splice(k,0,neighbor)
                    r = 1
                    break;
                }
            }
            if(r == 0){
                openSet.push(neighbor)
            }
        
            neighbor.previous = current
        }
      }
    } else {
      console.log('no solution')
      noLoop()
      drawTree()
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
