/**
 * @fileOverview En este archivo se crea la vista para los cargos en el listado de facturas pendientes.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una vista para mostrar los cargos. Consta de un título(title) y del valor del amounte(value).
 * @class
 * @memberOf Global.Control
 * @param {Object} amount El título y el valor correspondiente.
 * <ol>
 * <li>amount.title: El título.</li>
 * <li>amount.value: La cantidad que hace referéncia el título.</li>    
 * </ol>
 * @param {Boolean} [edit] Indica si el valor es editable. 
 */
function ViewAmount(amount, edit) {
    /**
     * La variable Global.
     * @private
     * @namespace 
     */
    var Global = require('/global/class/ReturnGlobal')();
    
    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var view = Ti.UI.createView({
        height : Ti.UI.SIZE,
        width : '33.33%',
        layout : 'vertical'
    });

    /**
     * El título.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitle = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 16
        },
        text : amount.title
    });
    
    /**
     * La etiqueta con el valor.
     * @private
     * @type Ti.UI.Label
     */
    var labelValue = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 16
        },
        text : amount.value
    });
    
    /**
     * El "textField" del valor.
     * @private
     * @type Ti.UI.TextField
     */
    var textValue = Ti.UI.createTextField({
        font : {
            fontSize : 16
        },
        value : (amount.value).replace("€", ""),
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        keyboardType : Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        left : 1,
        right : 1
    });
    
    //Añadimos los controles
    view.add(labelTitle);
    view.add(edit ? textValue : labelValue);

    return view;
};

module.exports = ViewAmount;
