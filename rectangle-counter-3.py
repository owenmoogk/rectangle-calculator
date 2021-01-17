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
    numberOfrectangles = 0
    rectangles = []
    for p1 in points:
        for p2 in points:
            
            notParallel = p1[0] != p2[0] and p1[1] != p2[1]
            notEqual = p1 != p2
            pointsExist = [p2[0],p1[1]] in points and [p1[0],p2[1]] in points
            
            validrectangle = notParallel and notEqual and pointsExist

            rectangleCoords = []
            if validrectangle:
                rectangleCoords = [p1, p2, [p1[0],p2[1]], [p2[0],p1[1]]]
                rectangleCoords.sort()
                if rectangleCoords in rectangles:
                    pass
                else:
                    rectangles.append(rectangleCoords)
                    numberOfrectangles += 1
    return(int(numberOfrectangles))


print(findRectangles(coords))