
def setup():
    size(400, 400)
    loadData("maze_10x10.csv")
        
def loadData(s):
    global table
    table = loadTable(s)
    if table is None:
        print("no table there")
    d = height/table.getColumnCount()
    strokeWeight(.2)
    for col in range(table.getColumnCount()):
        for row in range(table.getRowCount()/2):
            a = table.getString(row*2,col)
            if a == 'w':
                fill(255, 255, 255)
            if a == 'c':
                fill(0, 0, 0)
            rect(col*d,row*d,d,d)


        
