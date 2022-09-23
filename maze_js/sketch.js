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

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("canvas")

  backgroundColor = color('#aeaeb2')
  pathColor = color('#1e2f23')
  cellColor = color('#d1d1d6')
  wallColor = color('#1c1c1e')
  openColor = color('#fbd87f')
  closedColor = color('#7b9e87')


  // Create inputFile. If a CSV file is loaded, file is processed with csvToArray
  inputFile = createFileInput(csvToArray)
  inputFile.position(300, 950)
  inputFile.addClass('form-control d-flex align-items-center justify-content-center');
  inputFile.style('width', '50%')
  frameRate(60)
}

function draw() {

  background(255)

  if (grid != undefined && grid.length > 0) {
    astar(start, end)
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

// Manhattan distance
function heuristic(a, b) {
  let d = dist(a.i, a.j, b.i, b.j);
  return d;
}

// Converts CSV loaded with inputFile into an Array of Cells.
function csvToArray(file) {

  if (file.subtype === 'csv') {
    let mazeFromCSV = file.data
      .replace(/(\r|\r)/gm, '')
      .split('\n')
      .map(v => v.split(','))
      .slice(0, -1)


    if (mazeFromCSV.length > 0) {
      // Defines cellSize based on size pf the grid(maze)
      cellSize = parseInt(width / mazeFromCSV.length)

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
      openSet.push(start);

    }


  } else {
    print('No maze inserted!')
  }

}