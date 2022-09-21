import pandas as pd
import numpy as np
import copy


# Esta función nos retorna el camino de los algortimos  de búsqueda Depth first search y Breadth first search
# hay dos opciones para Type="Breadth","Depth"
#status es solo para imprimir y analizar datos, si desea verlos póngalo en 1
def FIRST_SEARCH(maze: list, start: tuple, goal: tuple, type: int, status=0) -> list:
    maze = copy.deepcopy(maze)#las listas son mutables por lo que es mejor generar una copia de ellas
    g = np.array(maze)
    Frontier = []  # Esta es la cola o la pila dependiendo de si es or profuncidad o anchura
    Reached = []  # acá se almazenarán los elementos ya visitados y por ende será nuestras coordenadas del camino
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
        # buscamos los hijos del nodo en este caso los cuadros a la derecha,abajo,izquierda,arriba
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
        # si la cola o pila termina vacía en este punto, significa que ya recorrió todos los puntos posibles
        if len(Frontier) == 0:
            if (status != 0):
                print("no fue posible encontrar la meta")
            return Reached
