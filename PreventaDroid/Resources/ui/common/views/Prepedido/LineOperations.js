/**
 * @fileOverview En este archivo se crea el formulario para crear/editar los parámetros.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

var win = Ti.UI.currentWindow;
var global = win.global;

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//La principal
var viewMain = Ti.UI.createView({
    opacity : 1,
    borderRadius : 10,
    left : 20,
    right : 20,
    top : 100,
    height : Ti.UI.SIZE,
    backgroundColor : '#FFFFFF',
    layout : "vertical"
});

// viewHead
var viewHead = Ti.UI.createView({
    backgroundColor : 'gray',
    height : Ti.UI.SIZE,
    width : Ti.UI.FILL
});

// viewBody
var viewBody = Ti.UI.createView({
    //height : '80%',
    width : Ti.UI.SIZE,
    layout : "horizontal"
});

//
// ---------------------------------------------------------------- LABEL -------------------------------------------------
//
// Title
var labelTitle = Ti.UI.createLabel({
    color : '#E1E1E1',
    font : {
        fontSize : 20
    },
    left : 5,
    text : win.title,
    textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
    width : Ti.UI.FILL
});

//Units
var labelUnits = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontSize : 20
    },
    left : 2,
    text : win.units
});

//
// ---------------------------------------------------------------- TEXTFIELD -------------------------------------------------
//

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
//Button PLUS
var butPlus = Ti.UI.createButton({
    image : global.Path.IMAGES + 'edit_add.png',
    width : Ti.UI.SIZE,
    height : Ti.UI.SIZE
});

//Button REMOVE
var butRemove = Ti.UI.createButton({
    image : global.Path.IMAGES + 'edit_remove.png',
    width : Ti.UI.SIZE,
    height : Ti.UI.SIZE
});

//Button EDIT
var butEdit = Ti.UI.createButton({
    image : global.Path.IMAGES + 'clipboard_edit.png',
    width : Ti.UI.SIZE,
    height : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
butPlus.addEventListener('click', function() {
    win.fireEvent('butAdd');    
});

butRemove.addEventListener('click', function() {
    win.fireEvent('butRemove');
});

butEdit.addEventListener('click', function() {
    win.fireEvent('butEdit');
});
//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
viewHead.add(labelTitle);

viewBody.add(butPlus);
viewBody.add(butRemove);
viewBody.add(butEdit);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//

viewMain.add(viewHead);
viewMain.add(viewBody);

win.add(viewMain);
