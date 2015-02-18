/**
 * @fileOverview En este archivo se crea el formulario para crear/editar las notas del pedido.
 *
 * @author Juan Carlos Matilla
 * @version 1.0
 *
 */

//
// ---------------------------------------------------------------- VARIABLES -------------------------------------------------
//
//La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//La cabecera del pedido
var rowHeader = win.rowHeader;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Notas", "Pedido", function(){win.close();});
headerMenu.setTop(0);

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Notas
var viewNotes = Ti.UI.createView({
    layout : 'vertical',
    width : Ti.UI.FILL,
    top : 50,
    bottom : 60
});

//Nota Preventa
var viewUp = Ti.UI.createView({
    layout : 'vertical',
    width : Ti.UI.FILL,
    height : '50%'
});

//Nota Albarán
var viewDown = Ti.UI.createView({
    layout : 'vertical',
    width : Ti.UI.FILL,
    height : '50%'
});

//Pie
var viewFoot = Ti.UI.createView({
    bottom : 0,
    height : 60,
    width : Ti.UI.FILL
});

//La linea superior de los botones.
var line_h = Ti.UI.createView({
    backgroundColor : Global.Theme.LINES,
    height : 0.5,
    top : 0,
    width : Ti.UI.FILL,
    center : {
        y : 0
    },
    zIndex : 1
});

//
// ---------------------------------------------------------------- LABEL -------------------------------------------------
//
//Preventa
var labelPreventa = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 17,
        fontWeight : 'bold'
    },
    text : 'Nota preventa',
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE,
    left : 2
});

//Albarán
var labelAlbaran = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 17,
        fontWeight : 'bold'
    },
    text : 'Nota albarán',
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE,
    left : 2
});

//
// ---------------------------------------------------------------- TEXT AREA -------------------------------------------------
//
//Nota preventa
var areaPreventa = Ti.UI.createTextArea({
    width : Ti.UI.FILL,
    height : Ti.UI.FILL,
    value : rowHeader.NotaPreventa
});

//Nota albarán
var areaAlbaran = Ti.UI.createTextArea({
    width : Ti.UI.FILL,
    height : Ti.UI.FILL,
    value : rowHeader.NotaAlbaran
});
//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
//Guardar
var butSave = Ti.UI.createButton({
    image : '/images/save_32.png',
    backgroundColor : Global.Theme.BUTTON.BACKGROUND,
    backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
    color : Global.Theme.BUTTON.TITLE,
    font : {
        fontSize : 23,
        fontStyle : 'bold'
    },
    title : "Guardar",
    height : Ti.UI.FILL,
    width : '100%',
    left : 0
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//

//Guardar
butSave.addEventListener('click', function() {
    rowHeader.NotaPreventa = areaPreventa.value;
    rowHeader.NotaAlbaran = areaAlbaran.value;
    win.close();
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
viewUp.add(labelPreventa);
viewUp.add(areaPreventa);

viewDown.add(labelAlbaran);
viewDown.add(areaAlbaran);
 
viewNotes.add(viewUp);
viewNotes.add(viewDown);

viewFoot.add(butSave);
viewFoot.add(line_h);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(headerMenu);
win.add(viewNotes);
win.add(viewFoot);