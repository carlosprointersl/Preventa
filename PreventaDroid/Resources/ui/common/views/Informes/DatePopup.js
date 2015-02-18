/**
 * @fileOverview En este archivo se crea la vista para modificar las fechas/horas para el filtro de los informes.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Body
var body = Ti.UI.createView({
    height : Ti.UI.SIZE,
    layout : 'vertical'
});

//Up
var up = Ti.UI.createView({
    layout : 'horizontal'
});

//Down
var down = Ti.UI.createView({
    layout : 'horizontal'
});

//
// ---------------------------------------------------------------- PICKER -------------------------------------------------
//
// Picker Date Start
var startPicker = Ti.UI.createPicker({
    type : Ti.UI.PICKER_TYPE_DATE,
    minDate : new Date(1900, 0, 1),
    maxDate : new Date(2100, 11, 31),
    value : new Date(),
    selectionIndicator : true
});

// Picker time Start
var startTimePicker = Ti.UI.createPicker({
    type : Ti.UI.PICKER_TYPE_TIME,
    format24 : true,
    value : new Date(),
    selectionIndicator : true
});

// Picker Date End
var endPicker = Ti.UI.createPicker({
    type : Ti.UI.PICKER_TYPE_DATE,
    minDate : startPicker.value,
    maxDate : new Date(2100, 11, 31),
    value : new Date(),
    selectionIndicator : true
});

// Picker time End
var endTimePicker = Ti.UI.createPicker({
    type : Ti.UI.PICKER_TYPE_TIME,
    format24 : true,
    value : new Date(),
    selectionIndicator : true
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
up.add(startPicker);
up.add(startTimePicker);

up.add(endPicker);
up.add(endTimePicker);

body.add(up);
body.add(down);
