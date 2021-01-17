lineNumber = 0
function drawLine(point1, point2){ // 8,5 and 8,0
    horizonal = point1[1] == point2[1]
    equation = ""
    if (horizonal){
        equation += "y = "+point1[1]
    }
    else{
        equation += "x = "+point1[0]
    }
    calculator.setExpression({id:lineNumber, latex:equation})
    lineNumber += 1
}

function drawSquare(p1,p2){
    console.log("i am called",p1,p2)
    p3 = [p1[0],p2[1]]
    p4 = [p2[0],p1[1]]
    points = [p1,p3,p2,p4]
    for (i = 0; i < points.length-1; i++){
        console.log(points[i], points[i+1])
        drawLine(points[i],points[i+1])
    }
    drawLine(points[0], points[points.length-1])
}

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