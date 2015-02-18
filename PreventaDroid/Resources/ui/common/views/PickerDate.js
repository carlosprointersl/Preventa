/**
 * @fileOverview En este archivo se crea la ventana para seleccionar una fecha.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

//
// ---------------------------------------------------------------- VARIABLES -------------------------------------------------
//
// Ventana actual
var win = Ti.UI.currentWindow;
//La variable Global
var global = win.global;
//El valor de la fecha
var value = win.value;

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
// Vista principal
var view = Ti.UI.createView({
    backgroundColor : '#000000',
    left : 10,
    right : 10,
    borderRadius : 10,
    height : Ti.UI.SIZE,
    layout : "vertical"
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
// Título de cabeceza
var labelTitle = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontSize : 20
    },
    text : 'Selección de la Fecha.',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : 'auto',
    height : 'auto'
});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
// Botones para las acciones.
var btngroup = Ti.UI.createView({
    layout : "horizontal"
});

// Botón de guardar
var btnSave = Ti.UI.createButton({
    title : "Guardar",
    btnID : "btnSave",
    width : 100
});

// Botón de cancelar
var btnCancel = Ti.UI.createButton({
    title : "Cancelar",
    btnID : "btnCancel",
    width : 100
});

//
// ---------------------------------------------------------------- PICKER -------------------------------------------------
//
// Picker Date
var minDate = new Date();
minDate.setFullYear(1900);
minDate.setMonth(0);
minDate.setDate(1);

var maxDate = new Date();
maxDate.setFullYear(2100);
maxDate.setMonth(11);
maxDate.setDate(31);

var picker = Ti.UI.createPicker({
    type : Ti.UI.PICKER_TYPE_DATE,
    minDate : minDate,
    maxDate : maxDate,
    value : value || new Date()
});

picker.selectionIndicator = true;


//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Cancelar
btnCancel.addEventListener('click', function(e) {
    win.close();
});

//Guardar
btnSave.addEventListener('click', function(e) {
    var value = picker.value;
    Ti.API.info("Picker value: " + value);
    var date = global.Functions.dateFormat(value);
    win.fireEvent('save', {
        date : date
    });
    win.close();
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
btngroup.add(btnCancel);
btngroup.add(btnSave);

view.add(labelTitle);
view.add(picker);
view.add(btngroup);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(view);
