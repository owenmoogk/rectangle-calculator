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
        string += "<tr><td>&#x1f441</td><td>("+point1.toString()+") (" + point2.toString()+") (" + point3.toString()+") (" + point4.toString()+")</td></tr>"
    }
    table.innerHTML = string
}
