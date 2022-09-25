// Receives Cell objects as start and end. 
// start and end harcoded into csvTOArray function
level = 0
function iterative_search(start, end) {
    if (openSet.length > 0) {   
    var current = openSet[openSet.length-1]
    depth = current.depth
    if (current === end) {
      noLoop();
      console.log("DONE!")
    }

    removeFromArray(openSet, current)
    closedSet.push(current)
    if(depth>=level){
        if(openSet.length==0){
          openSet.push(start)
          start.depth = 0; 
          closedSet = []
          level = level+1
          //noLoop();
        }
    }
    else{
      depth = depth+1
      let neighbors = current.neighbors
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
        //console.log(closedSet)
        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          neighbor.depth = depth
          openSet.push(neighbor)
          //console.log("perra")
          neighbor.previous = current
       }
      }
    }
    if(openSet.length==0){
      openSet.push(start)
      start.depth = 0; 
      level=level+1
      closedSet = []}
  } else {
    console.log('no solution')
    noLoop();
    return
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
