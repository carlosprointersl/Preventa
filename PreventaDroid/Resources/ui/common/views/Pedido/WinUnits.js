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

//Foot
var viewFoot = Ti.UI.createView({
    height : Ti.UI.SIZE
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
var text = Ti.UI.createTextField({
    height : 40,
    width : 50,
    value : win.text,
    textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
    keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
    softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS
});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
//Button PLUS
var butPlus = Ti.UI.createButton({
    image : global.Path.IMAGES + '64/edit_add.png',
    width : Ti.UI.SIZE,
    height : Ti.UI.SIZE
});

//Button REMOVE
var butRemove = Ti.UI.createButton({
    image : global.Path.IMAGES + '64/edit_remove.png',
    width : Ti.UI.SIZE,
    height : Ti.UI.SIZE
});

var btngroup = Ti.UI.createView({
    layout : "horizontal",
    width : Ti.UI.SIZE
});

var btnSave = Ti.UI.createButton({
    title : "Guardar",
    btnID : "btnSave",
    width : 100
});

var btnCancel = Ti.UI.createButton({
    title : "Cancelar",
    btnID : "btnCancel",
    width : 100
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
butPlus.addEventListener('click', function() {
    var unit = parseInt(text.value);
    if (unit <= 0) {
        unit = 1;
    } else {
        unit += 1;
    };
    text.value = unit.toString();
});

butRemove.addEventListener('click', function(e) {
    var unit = parseInt(text.value);
    if (unit <= 0) {
        unit = 0;
    } else {
        unit -= 1;
    };
    text.value = unit.toString();
});

btnCancel.addEventListener('click', function(e) {
    win.close();
});

btnSave.addEventListener('click', function(e) {
    win.fireEvent('save', {
        data : text.value
    });
    win.close();
});

win.addEventListener('postlayout', function() {
    text.setSelection(0, 5);
    text.focus();
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
viewHead.add(labelTitle);

viewBody.add(text);
viewBody.add(labelUnits);
viewBody.add(butPlus);
viewBody.add(butRemove);

btngroup.add(btnCancel);
btngroup.add(btnSave);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//

viewFoot.add(btngroup);

viewMain.add(viewHead);
viewMain.add(viewBody);
viewMain.add(viewFoot);

win.add(viewMain);
