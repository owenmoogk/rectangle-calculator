// all coords
var points = [
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

// rectangles stores index of opposite coordinates
rectangles = findRectangles(points)

// drawing all the points on the graph
drawPoints(points)
fillTable(rectangles, points)

function fillTable(rectangleIndexes, coords){
    console.log(coords)
    console.log(rectangleIndexes)
    table = document.getElementById("coord-holder")
    string = ""
    for (i = 0; i < rectangleIndexes.length; i++){
        point1 = coords[rectangleIndexes[i][0]]
        point2 = coords[rectangleIndexes[i][1]]
        point3 = [point2[0], point1[1]]
        point4 = [point1[0], point2[1]]
        string += "<tr id='"+i+"'><td onclick='toggleActive("+i+")'>&#x1f441</td><td>("+point1.toString()+") (" + point2.toString()+") (" + point3.toString()+") (" + point4.toString()+")</td></tr>"
    }
    table.innerHTML = string
}

function toggleActive(id){
    row = document.getElementById(id)
    $(row).toggleClass("active")
    resetScreen()
}

function showById(id){
    rectangleCoords = getPointsFromIndexes(rectangles[id][0], rectangles[id][1])
    drawRectangle(rectangleCoords)
}

function resetScreen(){
    calculator.setBlank()
    drawPoints(points)
    activeElements = document.getElementsByClassName("active")
    for (i = 0; i < activeElements.length; i++){
        id = activeElements[i].id
        showById(id)
    }
}