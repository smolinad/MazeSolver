import pandas as pd
import numpy as np
import copy


def FIRST_SEARCH(maze, start, goal, type, status=0):
    # Type=Breadth,Depth
    g = np.array(maze)
    Frontier = []
    Reached = []
    len_Rows = len(g[1, :])
    len_Columns = len(g[:, 1])
    Frontier.append(start)
    while len(Frontier) != 0:
        if type == "Breadth":
            p = 0
        elif type == "Depth":
            p = len(Frontier) - 1
        '''else:
           return "Error"'''
        nodo = Frontier.pop(p)
        Reached.append(nodo)
        i = nodo[0]  # "fila"
        j = nodo[1]  # columna
        maze[i][j] = "f"
        if status != 0:
            print(nodo)
            print(np.array(maze))
        if (nodo == goal):
            if status != 0:
                print("Se encontro la meta")
            return Reached

            break;
        if (j + 1) < len_Rows:  # derecha
            f = (i, j + 1) in Frontier
            if maze[i][j + 1] == "c" and f == False:
                Frontier.append((i, j + 1))
        if (i + 1) < len_Columns:  # abajo
            f = (i + 1, j) in Frontier
            if maze[i + 1][j] == "c" and f == False:
                Frontier.append((i + 1, j))
        if (j - 1) >= 0:  # izquierda
            f = (i, j - 1) in Frontier
            if maze[i][j - 1] == "c" and f == False:
                Frontier.append((i, j - 1))
        if (i - 1) >= 0:  # arriba
            f = (i - 1, j) in Frontier
            if maze[i - 1][j] == "c" and f == False:
                Frontier.append((i - 1, j))
        if len(Frontier) == 0:
            if (status != 0):
                print("no fue posible encontrar la meta")
            return Reached



#------------------------------------------------------------#
global Reacheds
Reacheds = []


def ITERATIVE_DEEPENING_SEARCH(maze, start, goal, status=0):
    Reacheds = []
    level = 0
    result = "cutoff"
    while result == "cutoff":
        result = DEPTH_LIMITED_SEARCH(copy.deepcopy(maze), start, goal, level, status)
        level = level + 1
        if status != 0:
            print("--------")
    return result


def DEPTH_LIMITED_SEARCH(maze, start, goal, level, status):
    g = np.array(maze)
    Stack = []
    Reached = []
    len_Rows = len(g[1, :])
    len_Columns = len(g[:, 1])
    Stack.append(start)

    while len(Stack) != 0:
        nodo = Stack.pop(len(Stack) - 1)
        Reached.append(nodo)
        i = nodo[0]  # "fila"
        j = nodo[1]  # columna
        depth = nodo[2]
        maze[i][j] = "f"
        if ((i, j) == goal):
            if status != 0:
                print("se ha encontrado la meta")
            return (Reacheds)
        if status != 0:
            print(nodo)
            print(np.array(maze))
        if (depth >= level):
            if (len(Stack) == 0):
                Reacheds.append(Reached)
                return "cutoff"
        else:
            depth = depth + 1
            if (j + 1) < len_Rows:  # derecha
                f = (i, j + 1) in Stack
                if maze[i][j + 1] == "c" and f == False:
                    Stack.append((i, j + 1, depth))
            if (i + 1) < len_Columns:  # abajo
                f = (i + 1, j) in Stack
                if maze[i + 1][j] == "c" and f == False:
                    Stack.append((i + 1, j, depth))
            if (j - 1) >= 0:  # izquierda
                f = (i, j - 1) in Stack
                if maze[i][j - 1] == "c" and f == False:
                    Stack.append((i, j - 1, depth))
            if (i - 1) >= 0:  # arriba
                f = (i - 1, j) in Stack
                if maze[i - 1][j] == "c" and f == False:
                    Stack.append((i - 1, j, depth))
        if len(Stack) == 0:
            if (status != 0):
                print("no fue posible encontrar la meta")
            return (Reacheds)
#-------------------------------------------------------------#
def Manhattan_distance(p1,p2):
    d=abs(p1[0]-p2[0])+abs(p1[1]-p2[1])
    return d
def Greedy_search(maze,start,goal,status=0):
    #Type=Breadth,Depth
    g = np.array(maze)
    Frontier = []
    Reached = []
    len_Rows = len(g[1,:])
    len_Columns=len(g[:,1])
    Frontier.append(start)
    while len(Frontier)!=0:
      nodo = Frontier.pop(0)
      Max = Manhattan_distance(nodo,goal)
      Reached.append(nodo)
      i = nodo[0] #"fila"
      j = nodo[1] #columna
      maze[i][j]="f"
      if status!=0:
        print(nodo)
        print(np.array(maze))
      if(nodo==goal):
        if(status!=0):
          print("se ha encontrado la meta")
        return(Reached)
        break;
      if (j+1)<len_Rows: #derecha
        f=(i,j+1) in Frontier
        if maze[i][j+1] == "c" and f == False:
          if(Manhattan_distance((i,j+1),goal))<Max:
            Max = Manhattan_distance((i,j+1),goal)
            Frontier.insert(0,(i,j+1))
          else:
            Frontier.append((i,j+1))

      if (i+1)<len_Columns:#abajo
        f=(i+1,j) in Frontier
        if maze[i+1][j] == "c"and f == False:
          if(Manhattan_distance((i+1,j),goal)<Max):
            Max = Manhattan_distance((i+1,j),goal)
            Frontier.insert(0,(i+1,j))
          else:
           Frontier.append((i+1,j))
      if (j-1)>=0  :#izquierda
        f=(i,j-1) in Frontier
        if maze[i][j-1] == "c" and f == False:
          if(Manhattan_distance((i,j-1),goal))<Max:
            Max = Manhattan_distance((i,j-1),goal)
            Frontier.insert(0,(i,j-1))
          else:
            Frontier.append((i,j-1))
      if (i-1)>=0 :#arriba
        f=(i-1,j) in Frontier
        if maze[i-1][j] == "c" and f == False:
          if(Manhattan_distance((i-1,j),goal))<Max:
            Max = Manhattan_distance((i-1,j),goal)
            Frontier.insert(0,(i-1,j))
          else:
            Frontier.append((i-1,j))
      if len(Frontier) == 0:
        if status!=0:
          print("no fue posible encontrar la meta")
        return Reached

