''''En Reacheds se almacenarán todas los caminos visitados, ya que a diferencia de los otros algortimos este en particular
#se resetea cada vez que aumenta el nivel en el arbol '''
global Reacheds
Reacheds = []


# Está función se encarga de aumentar el nivel en el árbol y recorrer nuevamente el algortimo con un camino nuevo
# status es solo para imprimir y analizar datos, si desea verlos póngalo en 1
def ITERATIVE_DEEPENING_SEARCH(maze: list, start: tuple, goal: tuple, status=0) -> list:
    Reacheds = []
    level = 0
    result = "cutoff"
    while result == "cutoff":  # cuando el algoritmo encuentre la meta o fracase se terminará el ciclo
        result = DEPTH_LIMITED_SEARCH(copy.deepcopy(maze), start, goal, level, status)
        level = level + 1
        if status != 0:
            print("--------")
    return result


# este algoritmo es muy parecido al de profundidad pero funciona por niveles y retorna una lista con listas de coordenadas visitadas
# status es solo para imprimir y analizar datos, si desea verlos póngalo en 1
def DEPTH_LIMITED_SEARCH(maze: list, start: tuple, goal: tuple, level: int, status=0) -> list:
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
        depth = nodo[2] #profundidad del nodo actual
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
            # buscamos los hijos del nodo en este caso los cuadros a la derecha,abajo,izquierda,arriba
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
        # si la cola termina vacía en este punto, significa que ya recorrió todos los puntos posibles
        if len(Stack) == 0:
            if (status != 0):
                print("no fue posible encontrar la meta")
            return (Reacheds)