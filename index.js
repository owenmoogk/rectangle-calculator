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
    calculator.setExpression({id:lineNumber, latex:equation})
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
            console.log(i)
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
        console.log(rectangleCoords)
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

function findRectangles(points){
    points.sort()
    numberOfSquares = 0
    for (p1 in points){
        for (p2 in points){
            notParallel = points[p1][0] != points[p2][0] && points[p1][1] != points[p2][1]
            pointsExist = points.includes([points[p2][0],points[p1][1]]) && points.includes([points[p1][0],points[p2][1]])
            if (points[p1] != points[p2] && notParallel){
                numberOfSquares += 1
                drawSquare(points[p1],points[p2])
            } 
        }
    }
}

// all coords
// var coords = [
//     [0,0],[5,0],[0,5],[5,5],[8,5],[8,0],[40,5],[5,54],[6,7],[40,0],[8,54]
// ]
var coords = [
    [0,0],[5,0],[0,5],[5,5],[8,5],[8,0]
]

// desmos init
var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt, {
    keypad: false,
    zoomButtons: true,
    expressions: true, //just for now
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

drawPoints(coords)
findRectangles(coords)