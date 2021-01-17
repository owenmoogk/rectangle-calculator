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
    [8,54]
]

def findRectangles(points):
    points.sort()
    verticalLines = []
    squaresCounted = []
    numberOfSquares = 0
    for p1 in points:
        for p2 in points:
            newVerticalLine = p2[0] == p1[0] and p1 != p2 and [p1,p2] not in verticalLines and [p2,p1] not in verticalLines
            if newVerticalLine:
                verticalLines.append([p1,p2])
    for l1 in verticalLines:
        for l2 in verticalLines:
            newSquare = l1[0][1] == l2[0][1] and l1[1][1] == l2[1][1] and l1 != l2 and [l1,l2] not in squaresCounted and [l2,l1] not in squaresCounted
            if newSquare:
                squaresCounted.append([l1,l2])
                numberOfSquares += 1
    return(numberOfSquares)


print(findRectangles(coords))