/**
 * @fileOverview En este archivo se crea el formulario para crear/editar los parámetros.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un formulario simple emergente para editar datos.
 * @class Crea un formulario que consta de cuerpo, este se divide en dos partes(izquierda, derecha)
 * y en un pie donde están los botones de CANCELAR y GUARDAR.
 * Para recuperar los datos al GUARDAR se ha de crear un evento de nombre 'save' y se recuperan de e.controls,
 * donde están de nuevo los controles que antes le hemos enviado pero con los nuevos datos.
 * @memberOf Global.Control
 * @param {String[]} keys Las etiquetas que se muestran en el lado izquierdo del formulario.
 * @param {Object[]} controls Los diferentes controles que hacen referéncia a las etiquetas.
 * @return {Ti.UI.Window} El formulario ya montado.
 */
function createEditForm(keys, controls) {
    /**
     * La ventana principal
     * @private
     * @type Window
     */
    var win = Ti.UI.createWindow({
        title : 'Configuración del preventista',
        backgroundColor : '#000000',
        modal : true,
        opacity : 0.5
    });

    //
    // ---------------------------------------------------------------- VIEWS -------------------------------------------------
    //
    /**
     * La vista principal. Es la que contiene los controles.
     * @private
     * @type View
     */
    var viewMain = Ti.UI.createView({
        opacity : 1,
        borderRadius : 10,
        left : 20,
        right : 20,
        height : Ti.UI.SIZE,
        backgroundColor : '#FFFFFF',
        layout : "vertical"
    });

    /**
     * La vista que compone el cuerpo.
     * @private
     * @type View
     */
    var viewBody = Ti.UI.createView({
        //height : '80%',
        width : Ti.UI.FILL,
        layout : "horizontal"
    });

    /**
     * La vista que compone la parte izquierda del formulario. Pertenece a la vista del cuerpo y es donde se insertan
     * las etiquetas.
     * @private
     * @type View
     */
    var viewLeft = Ti.UI.createView({
        height : Ti.UI.FILL,
        width : '55%',
        layout : "vertical"
    });

    /**
     * La vista que compone la parte derecha del formulario. Pertenece a la vista del cuerpo y es donde se insertan
     * los controles.
     * @private
     * @type View
     */
    var viewRight = Ti.UI.createView({
        height : Ti.UI.SIZE,
        width : '45%',
        layout : "vertical"
    });

    /**
     * La vista que compone el pie del formulario, es donde se insetan los botones.
     * @private
     * @type View
     */
    var viewFoot = Ti.UI.createView({
        height : Ti.UI.SIZE
    });

    /**
     * La vista que compone los botones. Aquí se insertan los botones.
     * @private
     * @type View
     */
    var btngroup = Ti.UI.createView({
        layout : "horizontal",
        width : Ti.UI.SIZE
    });

    //
    // ---------------------------------------------------------------- LABELS -------------------------------------------------
    //
    //Añadimos las etiquetas al formulario
    for (var i = 0; i < keys.length; i++) {
        viewLeft.add(Ti.UI.createLabel({
            color : '#000000',
            font : {
                fontSize : 20
            },
            right : 5,
            text : keys[i],
            textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
            width : Ti.UI.FILL,
            height : 40
        }));
    };

    //
    // ---------------------------------------------------------------- CONTROLS -------------------------------------------------
    //
    //Añadimos los controles la formulario
    for (var i = 0; i < controls.length; i++) {
        controls[i].left = 5;
        viewRight.add(controls[i]);
    };
    //
    // ---------------------------------------------------------------- BUTTONS -------------------------------------------------
    //
    /**
     * El botón para guardar los datos del formulario.
     * @private
     * @type Button
     */
    var btnSave = Ti.UI.createButton({
        title : "Guardar",
        btnID : "btnSave",
        width : 100
    });

    /**
     * El botón para cancelar la edición del formulario.
     * @private
     * @type Button
     */
    var btnCancel = Ti.UI.createButton({
        title : "Cancelar",
        btnID : "btnCancel",
        width : 100
    });

    //
    // ---------------------------------------------------------------- EVENTS -------------------------------------------------
    //
    /**
     * Evento CLICK del botón "Cancelar".
     * @private
     * @event btnCancel.click
     */
    btnCancel.addEventListener('click', function(e) {
        win.close();
    });

    /**
     * Evento CLICK del botón "Guardar".
     * @private
     * @event
     */
    function clickSave() {
        win.close();
        win.fireEvent('save', {
            controls : controls
        });
    };
    btnSave.addEventListener('click', clickSave);

    //
    // ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
    //
    btngroup.add(btnCancel);
    btngroup.add(btnSave);

    //
    // ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
    //
    viewBody.add(viewLeft);
    viewBody.add(viewRight);

    viewFoot.add(btngroup);

    viewMain.add(viewBody);
    viewMain.add(viewFoot);

    win.add(viewMain);

    /**
     * Sobreescribe el evento click del botón de guardar. El evento original cierra el formulario antes de comprobar
     * que los datos sean correctos.
     * @param {Function} callback La función que queremos que realice en el evento "click" del botón "Guardar".
     */
    win.setEventSave = function(callback) {
        btnSave.removeEventListener('click', clickSave);
        btnSave.addEventListener('click', callback);
    };

    return win;
};

// var functionControl = createEditForm; 
module.exports = createEditForm;