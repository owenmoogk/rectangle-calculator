
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
calculator.setExpression({id:1, latex:"y = x<1 \{ x>3 \}"})