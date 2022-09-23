let table;
let d = 10

function preload() {
  table = loadTable('maze/maze_5x5.csv', 'csv');
}

function setup() {
  print(table.getColumn(0));

  //cycle through the table
  for (let r = 0; r < table.getRowCount(); r++)
    for (let c = 0; c < table.getColumnCount(); c++) {
      s = table.getString(r, c);
      if(s=='w'){
        fill(0)
      }
      else if(s=='c'){
        fill(255)
      }
      rect(c*d,r*d,d,d)
    }
}