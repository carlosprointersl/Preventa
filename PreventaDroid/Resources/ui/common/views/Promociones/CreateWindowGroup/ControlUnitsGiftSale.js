/**
 * @fileOverview En este archivo se crea el control para introducir los datos de venta y regalo para la promoción V+R.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La variable Global
 */
var Global = new (require('/global/class/ReturnGlobal'))();

/**
 * Las constantes para las promociones.
 */
var Constants = require(Global.Path.VIEW + 'Promociones/Constants');

/**
 * Crea la ventana para introducir la cantidad + regalo.
 * @class
 * @param {Object} options Las opciones configurables del control.</br>
 * <ul>
 * <li>title {String}: El texto para el título.</li>
 * <li>value {String}: El valor del TextField.</li>
 * <li>[keyboard = Ti.UI.KEYBOARD_DECIMAL_PAD] {Number}: El tipo de teclado del TextField.</li>
 * <li>[fontSize] {Number}: El tamaño de la fuente de la etiqueta.</li>
 * <li>typeValue {Number}: El tipo de dato que debe tener el TextField.</li>
 * <li>[minim = 0] {Number}: La unidad mínima que puede tener el TextField</li>
 * <li>[maxim] {Number} : La unidad máxima que puede tener el TextField</li>
 * <li>[enabled = true]: Indica si el control está activo.
 * <ul>
 * @return {Ti.UI.View} La vista con el control montado.
 */
var ControlUnits = function(options) {
    /**
     * Los controles para las unidades.
     * @private
     * @type Object
     */
    var unitControl = new (require(Global.Path.VIEW + 'Promociones/UnitControl'))(options);

    /**
     * La vista contenedor.
     * @private
     * @type Ti.UI.View
     */
    var content = Ti.UI.createView({
        layout : 'vertical',
        height : Ti.UI.SIZE
    });

    /**
     * Título
     * @private
     * @type Ti.UI.Label
     */
    var labelTitle = Ti.UI.createLabel({
        left : 5,
        color : options.enabled ? Global.Theme.TEXT_SECONDARY : Global.Theme.TEXT_DISABLED,
        font : {
            fontSize : options.fontSize != undefined ? options.fontSize : 20
        },
        text : options.title
    });
    if (labelTitle.getText() != "")
        content.add(labelTitle);

    /**
     * Contiene el campo de texto y los botones.
     * @private
     * @type Ti.UI.View
     */
    var viewText = Ti.UI.createView({
        height : Ti.UI.SIZE
    });
    content.add(viewText);

    /**
     * El campo de texto.
     * @private
     * @type Ti.UI.TextField
     */
    var text = unitControl.getControl(Constants.TEXT);
    text.setLeft(5);
    text.setRight(options.buttonInfo ? 169 : 114);
    viewText.add(text);

    /**
     * Botón para añadir unidades.
     * @private
     * @type Ti.UI.Button
     */
    var butAdd = unitControl.getControl(Constants.ADD);
    butAdd.setRight(options.buttonInfo ? 114 : 55);
    viewText.add(butAdd);

    /**
     * Botón para restar unidades.
     * @private
     * @type Ti.UI.Button
     */
    var butRemove = unitControl.getControl(Constants.REMOVE);
    butRemove.setRight(options.buttonInfo ? 55 : 0);
    viewText.add(butRemove);

    if (options.buttonInfo) {

        /**
         * Botón para mostrar información.
         * @private
         * @type Ti.UI.Button
         */
        var butInfo = unitControl.getControl(Constants.INFO);
        butInfo.setRight(0);
        viewText.add(butInfo);
    };

    /**
     * Añade una función al evento del control indicado.
     * @param {Number} type El tipo de control.
     * @param {String} event El nombre del evento.
     * @param {Function} callback La función a realizar al disparar el evento.
     */
    this.addEventListener = unitControl.addEventListener;

    /**
     * Retorna la vista contenedor.
     * @return {Ti.UI.View} La vista contenedor.
     */
    this.getControl = function() {
        return content;
    };

    /**
     * Retorna el valor del campo de texto.
     * @return {String} El valor del campo de texto.
     */
    this.getValue = unitControl.getValue;

    /**
     * Cambia el valor del campo de texto
     * @param {String} value El nuevo valor par el campo de texto.
     */
    this.setValue = unitControl.setValue;

    /**
     * Indica si el valor del TextField es válido.
     * @return {Boolean} .
     */
    this.isValid = unitControl.isValid;

};

module.exports = ControlUnits;
