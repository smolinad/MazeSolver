// Colors
let backgroundColor 
let startColor      
let goalColor       
let cellColor       
let openColor      
let closedColor  


// Maze Grid
let grid

let openSet = []
let closedSet = []
let path = []

//Start & End —hardcoded to be (0,1) & (grid.length -,1 grid.length -2) resp—.
let start
let end

let cellSize

let algMode 

// Input Form
let inputFile

let astarButton
let greedyButton
let depthButton
let breadthButton
let iterativeButton
let startButton

let infoDiv

let runTheAlgorithm

let millisecs = 0
let seconds = 0
let minutes = 0


function setup() {
  let canvas = createCanvas(2400, 1200)
  canvas.parent("canvas")
  
  iterativeButton = createButton('Iterative DFS')
  iterativeButton.parent("buttons")
  iterativeButton.addClass("btn btn-light")
  iterativeButton.mousePressed(
    function(){
      algMode = "Iterative DFS"
    })

  startButton = createButton('Start')
  startButton.parent("start-button")
  startButton.addClass("btn btn-lg btn-success")
  startButton.mousePressed(
    function(){
      runTheAlgorithm = true
    }) 

  infoDiv = createDiv()
  infoDiv.style("font-size", "1.5rem")
  infoDiv.parent("info")

}

function draw() {

  background(cellColor)

  if (grid != undefined && grid.length > 0 && algMode != undefined && runTheAlgorithm) {
    if ((parseInt(millis()/100) % 10) != millisecs){
			millisecs++;
		}
		if (millisecs >= 10){
			millisecs -= 10;
			seconds++;
		}
		if (seconds >= 60){
			seconds -= 60;
			minutes++;
		}

    // textSize(25)
    // fill(pathColor)
    // strokeWeight(1)
    // stroke(pathColor)
    // text("Mode: " + algMode, 20, 1250)
    // text("Duration: " + nf(minutes, 2) + ":" + nf(seconds, 2) + "." + nf(millisecs, 1), 20, 1275);

    info = `<b>⚙️ Mode:</b> ${algMode}<br/>
            <b>🟨 Open (Frontier) Set Size:</b> ${openSet.length} cells.<br/>
            <b>🟨 Open (Frontier) Set Size (in memory):</b> ${openSet.toString().length} bytes.<br/>
            <b>🟩 Closed (Visited) Set Size:</b> ${closedSet.length} cells.<br/>
            <b>🟩 Closed (Visited) Set Size (in memory):</b> ${closedSet.toString().length} bytes.<br/>
            <b>⏱️ Duration:</b> ${nf(minutes, 2)}:${nf(seconds, 2)}.${nf(millisecs, 1)}`
    infoDiv.html(info)

    switch (algMode){
      case "A* Search":
        astar(start, end)
        break
      case "Greedy Search":
        greedy_search(start, end)
        break
      case "DFS":
        depth_breadth(start, end, "depth")
        break
      case "BFS":
        depth_breadth(start, end, "breadth")
        break
      case "Iterative DFS":
        iterative_search(start, end)
        break
    }
    
  }
  
}

// Delete Object from Array. Used to delete Cells from openSet

function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  let d = dist(a.i, a.j, b.i, b.j);
  return d;
}

function csvToArray(file) {
  
  if (file.subtype === 'csv') {
    let mazeFromCSV = file.data
      .replace(/(\r|\r)/gm, '')
      .split('\n')
      .map(v => v.split(','))
      .slice(0, -1)
    
    
    if (mazeFromCSV.length > 0) {
      // Defines cellSize based on size pf the grid(maze)
      cellSize = parseInt(height / mazeFromCSV.length)

      cellSize = parseInt(width / mazeFromCSV.length)
    
      grid = new Array(mazeFromCSV.length)

      for (let r = 0; r < grid.length; r++) {
        grid[r] = new Array(mazeFromCSV[0].length)
      }

      for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++){
          let state = mazeFromCSV[i][j]
          grid[i][j] = new Cell(state, i, j)
        }
      }
      
      for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++){
          grid[i][j].addNeighbors(grid)
        }
      }
      
      start = grid[0][1]
      start.wall = false
      end = grid[grid.length-1][grid.length-2]
      end.wall = false

      openSet.push(start);
      
    }
    
    
  } else {
    print('No maze inserted!')
  }
}