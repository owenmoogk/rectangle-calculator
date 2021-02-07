lineNumber = 0
// draw a line given 2 coords
function drawLine(point1, point2){
    equation = ""
    if (point1[0] == point2[0]){
        equation += "x = "+point1[0]
    }
    else{
        equation += "y = "+point1[1]
    }
    calculator.setExpression({id:lineNumber, latex:equation, color:"#FF69B4"})
    lineNumber += 1
}

// returning the coords in an order that the draw square can understand
function getRectangleCoordsInOrder(rectangleCoords){
    orderedCoords = [[],[],[],[]]
    indexesAppended = []
    // first find 2 coords with the same x
    for (i in rectangleCoords){
        if (i == 0){
            continue
        }
        if (rectangleCoords[0][0] == rectangleCoords[i][0]){
            orderedCoords[0] = rectangleCoords[0]
            orderedCoords[3] = rectangleCoords[i]
            indexesAppended.push(i)
            indexesAppended.push(0)
            break
        }
    }
    // putting in the other 2
    for (i in rectangleCoords){
        if (i == 0 || i == indexesAppended[0]){
            continue
        }
        if (rectangleCoords[i][1] == rectangleCoords[0][1]){
            orderedCoords[1] = rectangleCoords[i]
            indexesAppended.push(i)
        }
    }
    for (i in indexesAppended){
        indexesAppended[i] = parseInt(indexesAppended[i])
    }
    for (i in rectangleCoords){
        if (indexesAppended.includes(parseInt(i))){
            //pass
        }
        else{
            orderedCoords[2] = rectangleCoords[i]
            break
        }
    }
    return(orderedCoords)
}

// given sorted rectangle coords, draw the rectangle
function drawRectangle(rectangleCoords){
    rectangleCoords = getRectangleCoordsInOrder(rectangleCoords)
    for (i = 0; i < rectangleCoords.length-1; i++){
        drawLine(rectangleCoords[i],rectangleCoords[i+1])
    }
    drawLine(rectangleCoords[0], rectangleCoords[rectangleCoords.length-1])
}

// given a set of points display them all on the graph
function drawPoints(points){
    for (i = 0; i < points.length; i++){
        expId = "point"+i
        expLatex = "("+points[i][0]+","+points[i][1]+")"
        calculator.setExpression({id:expId, latex:expLatex})
    }
}

function findDuplicates(rectangleCoords, rectangles, points){
    // rectangle coords is a list of indicies of the points
    
    for (i = 0; i < rectangles.length; i++){
        checkingRectangle = rectangles[i]
        if (rectangleCoords[0] == checkingRectangle[0] && rectangleCoords[1] == checkingRectangle[1]){
            return(true)
        }
        if (rectangleCoords[0] == checkingRectangle[1] && rectangleCoords[1] == checkingRectangle[0]){
            return(true)
        }
    }
    return(false)
}

function findRectangles(points){
    numberOfRectangles = 0
    rectangles = []
    for (p1 in points){
        for (p2 in points){

            // i am checking for 2 diagonal points, and then finding the other 2 verticies.
            // the 2 points must be not parallel and not equal
            notParallel = points[p1][0] != points[p2][0] && points[p1][1] != points[p2][1]
            notEqual = p1 != p2

            // point 3 and 4 are the other 2 points that must exist
            point3 = [points[p2][0],points[p1][1]]
            point4 = [points[p1][0],points[p2][1]]
            point3Exists = false
            point4Exists = false
            indexSet1 = [p1,p2]
            indexSet2 = []
            for (i = 0; i < points.length; i++){
                if (points[i][0] == point3[0] && points[i][1] == point3[1]){
                    point3Exists = true
                    indexSet2.push(i)
                }
                if (points[i][0] == point4[0] && points[i][1] == point4[1]){
                    point4Exists = true
                    indexSet2.push(i)
                }
            }
            pointsExist = point4Exists && point3Exists
            validRectangle = notEqual && notParallel && pointsExist
            if (validRectangle){
                if (findDuplicates(indexSet1, rectangles, points) || findDuplicates(indexSet2, rectangles, points)){
                    // pass
                }
                else{
                    rectangleCoords = [points[p1], points[p2], [points[p1][0],points[p2][1]], [points[p2][0],points[p1][1]]]
                    rectangles.push([p1,p2])
                    drawRectangle(rectangleCoords)
                    numberOfRectangles += 1
                }
            } 
        }
    }
    console.log(numberOfRectangles)
    console.log(rectangles)
    return(numberOfRectangles)
}

// all coords
var coords = [
    [0,0],[5,0],[0,5],[5,5],[8,5],[8,0],[40,5],[5,54],[6,7],[40,0],[8,54],[0,54]
]

// desmos init
var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt, {
    keypad: false,
    zoomButtons: true,
    expressions: false,
    settingsMenu: false,
    lockViewport: false,
    autosize: true,
    showResetButtonOnGraphpaper: true,
    sliders: false,
});
calculator.updateSettings({
    xAxisLabel: 'X-Axis', 
    yAxisLabel: 'Y-Axis'
});

findRectangles(coords)