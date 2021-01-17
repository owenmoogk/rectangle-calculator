coords = [
    [0,0],
    [5,0],
    [0,5],
    [5,5],
    [8,5],
    [8,0],
    [40,5],
    [5,54],
    [6,7],
    [40,0],
    [8,54],
    [0,54]
]

def findRectangles(points):
    points.sort()
    numberOfSquares = 0
    squares = []
    for p1 in points:
        for p2 in points:
            notParallel = p1[0] != p2[0] and p1[1] != p2[1]
            if p1 != p2 and [p2[0],p1[1]] in points and [p1[0],p2[1]] in points and notParallel:
                numberOfSquares += 1
    return(int(numberOfSquares/4))

print(findRectangles(coords))