# Distancia entre dos puntos
def Manhattan_distance(p1: tuple, p2: tuple) -> int:
    d = abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])
    return d

#Algoritmo que siempre busca encontrar el camino más corto aunque puede que no lo sea
def Greedy_search(maze: list, start: tuple, goal: tuple, status=0) -> list:
    maze = copy.deepcopy(maze) #las listas son mutables por lo que es mejor generar una copia de ellas
    # Type=Breadth,Depth
    g = np.array(maze)
    Frontier = []
    Reached = []
    len_Rows = len(g[1, :])
    len_Columns = len(g[:, 1])
    Frontier.append(start)
    while len(Frontier) != 0:
        nodo = Frontier.pop(0)
        Max = Manhattan_distance(nodo, goal) #Guardamos la distancia que hay entre el punto inicial y la meta y esa es la más grande
        Reached.append(nodo)
        i = nodo[0]  # "fila"
        j = nodo[1]  # columna
        maze[i][j] = "f"
        if status != 0:
            print(nodo)
            print(np.array(maze))
        if (nodo == goal):
            if (status != 0):
                print("se ha encontrado la meta")
            return (Reached)
            break;
        #buscamos los hijos del nodo en este caso los cuadros a la derecha,abajo,izquierda,arriba
        if (j + 1) < len_Rows:  # derecha
            f = (i, j + 1) in Frontier
            if maze[i][j + 1] == "c" and f == False:
                if (Manhattan_distance((i, j + 1), goal)) < Max:
                    Max = Manhattan_distance((i, j + 1), goal)
                    Frontier.insert(0, (i, j + 1))
                else:
                    Frontier.append((i, j + 1))

        if (i + 1) < len_Columns:  # abajo
            f = (i + 1, j) in Frontier
            if maze[i + 1][j] == "c" and f == False:
                if (Manhattan_distance((i + 1, j), goal) < Max):
                    Max = Manhattan_distance((i + 1, j), goal)
                    Frontier.insert(0, (i + 1, j))
                else:
                    Frontier.append((i + 1, j))
        if (j - 1) >= 0:  # izquierda
            f = (i, j - 1) in Frontier
            if maze[i][j - 1] == "c" and f == False:
                if (Manhattan_distance((i, j - 1), goal)) < Max:
                    Max = Manhattan_distance((i, j - 1), goal)
                    Frontier.insert(0, (i, j - 1))
                else:
                    Frontier.append((i, j - 1))
        if (i - 1) >= 0:  # arriba
            f = (i - 1, j) in Frontier
            if maze[i - 1][j] == "c" and f == False:
                if (Manhattan_distance((i - 1, j), goal)) < Max:
                    Max = Manhattan_distance((i - 1, j), goal)
                    Frontier.insert(0, (i - 1, j))
                else:
                    Frontier.append((i - 1, j))
        #si la cola termina vacía en este punto, significa que ya recorrió todos los puntos posibles
        if len(Frontier) == 0:
            if status != 0:
                print("no fue posible encontrar la meta")
            return Reached
