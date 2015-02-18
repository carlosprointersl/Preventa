/**
 * @fileOverview En este archivo se crea el formulario para crear/editar fechas.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un formulario simple emergente para editar fechas.
 * @class Crea un formulario que consta de cuerpo, este se divide en dos partes(izquierda, derecha)
 * y en un pie donde están los botones de CANCELAR y GUARDAR.
 * Para recuperar los datos al GUARDAR se ha de crear un evento de nombre 'save' y se recuperan de e.controls,
 * donde están de nuevo los controles que antes le hemos enviado pero con los nuevos datos.
 * @memberOf Global.Control
 * @param {Date} value El valor de la fecha actual.
 * @return {Ti.UI.Window} El formulario ya montado.
 */
function createDateForm(value) {
    var value = value || new Date();
    var win = Ti.UI.createWindow({
        title : 'Fecha',
        backgroundColor : '#000000',
        modal : true,
        opacity : 0.5
    });

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
        text : 'Selección de la Fecha.'
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
    var picker = Ti.UI.createPicker({
        type : Ti.UI.PICKER_TYPE_DATE,
        value : value
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
        var date = picker.value;
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

    return win;
};

// var functionControl = createDateForm;
module.exports = createDateForm; 