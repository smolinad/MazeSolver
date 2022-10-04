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

// Start & End —hardcoded to be (0,1) & (grid.length -,1 grid.length -2) resp—.
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
let sizeButton
let uniformButton

let infoDiv

let runTheAlgorithm

let millisecs = 0
let seconds = 0
let minutes = 0

let searchTree = {
  nodes: [{id: "(0, 1)"}],
  links: []
}

function setup() {
  let canvas = createCanvas(1200, 1200)
  canvas.parent("canvas")

  frameRate(60)

  backgroundColor = color('#aeaeb2')
  pathColor = color('#1e2f23')
  cellColor = color('#d1d1d6')
  wallColor = color('#1c1c1e')
  openColor = color('#fbd87f')
  closedColor = color('#a1baa9')

  // Create inputFile. If a CSV file is loaded, file is processed with csvToArray
  inputFile = createFileInput(csvToArray)
  inputFile.parent("form")
  inputFile.addClass('form-control')
  inputFile.style('width', '30%')

  astarButton = createButton('A* Search')
  astarButton.parent("buttons")
  astarButton.addClass("btn btn-light")
  astarButton.mousePressed(
    function(){
      algMode = "A* Search"
    })

  greedyButton = createButton('Greedy Search')
  greedyButton.parent("buttons")
  greedyButton.addClass("btn btn-light")
  greedyButton.mousePressed(
    function(){
      algMode = "Greedy Search"
    })

  depthButton = createButton('DF Search')
  depthButton.parent("buttons")
  depthButton.addClass("btn btn-light")
  depthButton.mousePressed(
    function(){
      algMode = "DFS"
    })

  breadthButton = createButton('BF Search')
  breadthButton.parent("buttons")
  breadthButton.addClass("btn btn-light")
  breadthButton.mousePressed(
    function(){
      algMode = "BFS"
    })
  
  iterativeButton = createButton('Iterative DFS')
  iterativeButton.parent("buttons")
  iterativeButton.addClass("btn btn-light")
  iterativeButton.mousePressed(
    function(){
      algMode = "Iterative DFS"
    })
  uniformButton = createButton('Uniform Cost')
  uniformButton.parent("buttons")
  uniformButton.addClass("btn btn-light")
  uniformButton.mousePressed(
    function(){
      algMode = "Uniform Cost"
    })

  sizeButton = createButton('Create random maze')
  sizeButton.parent("size-button")
  sizeButton.addClass("btn btn-lg btn-light")
  sizeButton.mousePressed(
    function(){
      csvToArray()
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
  drawMaze()
  image
}

function drawMaze(){
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

    if (grid.length <= 6){
      info = `<b>⚙️ Mode:</b> ${algMode}<br/>
              <b>🟨 Open (Frontier) Set Size:</b> ${openSet.length} cells.<br/>
              <b>🟨 Open (Frontier) Set Size (in memory):</b> ${openSet.toString().length} bytes.<br/>
              <b>🟩 Closed (Visited) Set Size:</b> ${closedSet.length} cells.<br/>
              <b>🟩 Closed (Visited) Set Size (in memory):</b> ${closedSet.toString().length} bytes.<br/>
              <b>⏱️ Duration:</b> ${nf(minutes, 2)}:${nf(seconds, 2)}.${nf(millisecs, 1)}<br/>
              <b>🌲 Search Tree: Hover the mouse over a node to reveal the cell 😯</b>`
    } else {
      info = `<b>⚙️ Mode:</b> ${algMode}<br/>
            <b>🟨 Open (Frontier) Set Size:</b> ${openSet.length} cells.<br/>
            <b>🟨 Open (Frontier) Set Size (in memory):</b> ${openSet.toString().length} bytes.<br/>
            <b>🟩 Closed (Visited) Set Size:</b> ${closedSet.length} cells.<br/>
            <b>🟩 Closed (Visited) Set Size (in memory):</b> ${closedSet.toString().length} bytes.<br/>
            <b>⏱️ Duration:</b> ${nf(minutes, 2)}:${nf(seconds, 2)}.${nf(millisecs, 1)}`
    }
    
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
      case "Uniform Cost":
        uniform_cost(start,end)
        break
    }
    
    if (grid.length <= 8){
      for (let cell of openSet) {
        if (!containsObject(cell, closedSet) && !containsCell("(" + cell.row + ", " + cell.col + ")", searchTree.nodes)){
          searchTree.nodes.push(
            {id: "(" + cell.row + ", " + cell.col + ")"}
            )
          if (cell.previous != undefined){
            searchTree.links.push(
              {
                source: "(" + cell.previous.row + ", " + cell.previous.col + ")", 
                target: "(" + cell.row + ", " + cell.col + ")"
              }
            )
          }
        }
      }

      console.log(searchTree)
    }
  }

}

function containsCell(obj, list){
  let i;
  for (i = 0; i < list.length; i++) {
      if (list[i].id === obj) {
          return true;
      }
  }
  return false;
}

function drawTree() {
  const Graph = ForceGraph()
        (document.getElementById('graph'))
            .graphData(searchTree)
            .nodeLabel('id')
            .linkDirectionalArrowLength(6)
            .onNodeClick(node => {
              Graph.centerAt(node.x, node.y, 1000)
              Graph.zoom(8, 2000)
            })
}

function containsObject(obj, list) {
  let i;
  for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
          return true;
      }
  }
  return false;
}

// Delete Object from Array. Used to delete Cells from openSet

function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1)
    }
  }
}

// Manhattan distance
function heuristic(a, b) {
  let d = dist(a.row, a.col, b.row, b.col)
  return d
}

function csvToPlainArray(file){
  if (file.subtype === 'csv') {
    let mazeFromCSV = file.data
      .replace(/(\r|\r)/gm, '')
      .split('\n')
      .map(v => v.split(','))
      .slice(0, -1)
    return mazeFromCSV
  }
}

function plainArray(){
  let size = document.getElementById('size')
  if(size){      
    const numberInput = parseInt(size.value);// will return empty string if invalid
    let Maze = new MazeBuilder(numberInput);
    arr = Maze.maze
    return arr
  }
}

// Converts CSV loaded with inputFile into an Array of Cells.
function csvToArray(file) {

  file = file || 0
  let mazeFromCSV = []
  if (file != 0){
    mazeFromCSV = csvToPlainArray(file)
  }
  else{
    mazeFromCSV = plainArray()
  }
  
  if (mazeFromCSV!=[]) {

    if (mazeFromCSV.length > 0) {
      // Defines cellSize based on size pf the grid(maze)
      cellSize = parseInt(height / mazeFromCSV.length)

      grid = new Array(mazeFromCSV.length)

      for (let r = 0; r < grid.length; r++) {
        grid[r] = new Array(mazeFromCSV[0].length)
      }

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          let state = mazeFromCSV[i][j]
          grid[i][j] = new Cell(state, i, j)
        }
      }

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          grid[i][j].addNeighbors(grid)
        }
      }

      // Defines start and end as objects of type Cell. Used to run the algorithm
      // Harcoded as start=(0,1) end=(grid.length-1, grid.length-2) as per specifications (Maybe change l8r)
      start = grid[0][1]
      start.wall = false
      end = grid[grid.length - 1][grid.length - 2]
      end.wall = false


      //Pushes start Cell into openSet. REALLY IMPORTANT TO START THE ALGORITHM!!!
      openSet.push(start)

    }


  } else {
    print('No maze inserted!')
  }

}
