// Receives Cell objects as start and end. 
// start and end harcoded into csvTOArray function

function astar(start, end) {

  if (openSet.length > 0) {
    let winner = 0
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i
      }
    }
    var current = openSet[winner]
    if (current === end) {
      noLoop();
      console.log("DONE!")
    }

    removeFromArray(openSet, current)
    closedSet.push(current)

    let neighbors = current.neighbors
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + heuristic(neighbor, current);
        let newPath = false
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }
        if (newPath) {
          neighbor.h = heuristic(neighbor, end)
          neighbor.f = neighbor.g + neighbor.h
          neighbor.previous = current
        }
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