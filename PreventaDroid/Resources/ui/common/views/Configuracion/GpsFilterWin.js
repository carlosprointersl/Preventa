/**
 * @fileOverview En este archivo se crea el punto de menú "Administración".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//La principal
var viewMain = Ti.UI.createView({
    opacity : 1,
    borderRadius : 10,
    borderColor : 'gray',
    height : Ti.UI.SIZE,
    left : 20,
    right : 20,
    layout : 'vertical',
    backgroundColor : '#FFFFFF'
});

//header
var header = Ti.UI.createView({
    backgroundColor : 'black',
    width : Ti.UI.FILL,
    height : 30
});

//Body
var body = Ti.UI.createView({
    height : Ti.UI.SIZE,
    width : Ti.UI.FILL,
    layout : 'vertical'
});

//Los intervalos
var viewIntervals = Ti.UI.createView({
    left : 10,
    right : 10,
    layout : 'horizontal'
});

//Las distancias
var viewDistances = Ti.UI.createView({
    left : 10,
    right : 10,
    layout : 'horizontal'
});

//Foot
var foot = Ti.UI.createView({
    backgroundColor : 'gray',
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE
});

//Buttons
var viewButtons = Ti.UI.createView({
    width : Ti.UI.SIZE,
    layout : 'horizontal'
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
//Nombre comercial
var labelCommercialName = Ti.UI.createLabel({
    color : '#FFFFFF',
    font : {
        fontFamily : 'Arial',
        fontSize : 20
    },
    text : "Especificación",
    left : 2,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL,
    horizontalWrap : false
});

//Intervalo
var labelInterval = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontFamily : 'Arial',
        fontSize : 18
    },
    left : 2,
    text : "Intervalo",
    width : Ti.UI.FILL,
    height : 35
});

//Distancia
var labelDistance = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontFamily : 'Arial',
        fontSize : 18
    },
    left : 2,
    text : "Distancia",
    width : Ti.UI.FILL,
    height : 35
});

//Los intervalos
var intervals = ["0s", "30s", "5m", "15m", "30m", "1h"];

for (var i = 0; i < intervals.length; i++) {
    viewIntervals.add(Ti.UI.createLabel({
        color : '#808080',
        font : {
            fontFamily : 'Arial',
            fontSize : "12ps"
        },
        text : intervals[i],
        width : "16.66%",
        height : Ti.UI.SIZE
    }));
};

//Las distancias
var distances = ["5m", "50m", "100m", "500m", "1km", "5km"];

for (var i = 0; i < distances.length; i++) {
    viewDistances.add(Ti.UI.createLabel({
        color : '#808080',
        font : {
            fontFamily : 'Arial',
            fontSize : "12ps"
        },
        text : distances[i],
        width : "16.66%",
        height : Ti.UI.SIZE
    }));
};

//
// ---------------------------------------------------------------- SLIDERS -------------------------------------------------
//
//Intervalo
var valuesInterval = [0, 30, 300, 900, 1800, 3600];
var sliderInterval = Ti.UI.createSlider({
    min : 0,
    max : valuesInterval.length - 1,
    left : 10,
    right : 10,
    value : valuesInterval.indexOf(win.interval)
});

//Distancia
var valuesDistance = [5, 50, 100, 500, 1000, 5000];
var sliderDistance = Ti.UI.createSlider({
    min : 0,
    max : valuesDistance.length - 1,
    left : 10,
    right : 10,
    value : valuesDistance.indexOf(win.distance)
});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
//Aceptar
var butAccept = Ti.UI.createButton({
    title : 'Aceptar',
    width : 100,
    height : 50,
    image : win.Global.Path.IMAGES + '48/Check.png'
});

//Cancelar
var butCancel = Ti.UI.createButton({
    title : 'Cancelar',
    width : 100,
    height : 50,
    image : win.Global.Path.IMAGES + '48/Cancel.png'
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Cancelar
butCancel.addEventListener('click', function() {
    win.close();
});

//Aceptar
butAccept.addEventListener('click', function() {
    win.fireEvent('save', {
       interval : valuesInterval[sliderInterval.value],
       distance : valuesDistance[sliderDistance.value] 
    });
    
    win.close();
});

var isChanged = false;

//Slider Intervalo
sliderInterval.addEventListener('stop', function(e) {
    sliderInterval.setValue(Math.round(e.value));
});

//Slider Distancia
sliderDistance.addEventListener('stop', function(e){
    sliderDistance.setValue(Math.round(e.value));
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
header.add(labelCommercialName);

body.add(labelInterval);
body.add(sliderInterval);
body.add(viewIntervals);
body.add(labelDistance);
body.add(sliderDistance);
body.add(viewDistances);

viewButtons.add(butAccept);
viewButtons.add(butCancel);

foot.add(viewButtons);

viewMain.add(header);
viewMain.add(body);
viewMain.add(foot);
//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//

win.add(viewMain);
