lineNumber = 0
function drawLine(point1, point2){
    horizonal = point1[1] == point2[1]
    equation = ""
    if (horizonal){
        equation += "y = "+point1[1]
    }
    else{
        equation += "x = "+point1[1]
    }
    calculator.setExpression({id:lineNumber, latex:equation, polarDomain:{min:1, max:3}})
    lineNumber += 1

}

function drawRectangle(rectangleCoords){ // FIX ME
    p3 = [p1[0],p2[1]]
    p4 = [p2[0],p1[1]]
    points = [p1,p2,p3,p4]
    for (i = 0; i < points.length-1; i++){
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
            for (i = 0; i < points.length; i++){
                if (points[i][0] == point3[0] && points[i][1] == point3[1]){
                    point3Exists = true
                }
                if (points[i][0] == point4[0] && points[i][1] == point4[1]){
                    point4Exists = true
                }
            }
            pointsExist = point4Exists && point3Exists
            validRectangle = notEqual && notParallel && pointsExist
            console.log(validRectangle)
            rectangleCoords = []
            if (validRectangle){
                rectangleCoords = [points[p1], points[p2], [points[p1][0],points[p2][1]], [points[p2][0],points[p1][1]]]
                rectangleCoords.sort()
                if (rectangles.includes(rectangleCoords)){
                    //pass
                }
                else{
                    rectangles.push(rectangleCoords)
                    drawRectangle(rectangleCoords)
                    numberOfRectangles += 1
                }
            } 
        }
    }
    console.log(numberOfRectangles)
    return(numberOfRectangles)
}

// all coords
var coords = [
    [0,0],[5,0],[0,5],[5,5],[8,5],[8,0],[40,5],[5,54],[6,7],[40,0],[8,54]
]
var tocheck = []
console.log(coords.includes(1))

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