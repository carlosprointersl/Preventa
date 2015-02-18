/**
 * @fileOverview En este archivo se crea la clase para gestionar un control. Este control está compuesto de un TextField y de dos botones para añadir y restar unidades.
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
 * Esta clase crea un control para gestionar las unidades. Está compuesta por un TextField y dos botones para añadir y restar unidades.
 * @class
 * @param {Object} options Las opciones configurables del control.</br>
 * <ul>
 * <li>value {String}: El valor del TextField.</li>
 * <li>[keyboard = Ti.UI.KEYBOARD_DECIMAL_PAD] {Number}: El tipo de teclado del TextField.</li>
 * <li>typeValue {Number}: El tipo de dato que debe tener el TextField.</li>
 * <li>[minim = 0] {Number}: La unidad mínima que puede tener el TextField</li>
 * <li>maxim {Number}: La unidad máxima que puede tener el TextField</li>
 * <li>[enabled = true]: Indica si el control está activo.
 * <ul>
 * @return {Ti.UI.View} La vista con el control montado.
 */
var UnitControl = function(options) {
    //Marcamos los valores por defecto.
    options.keyboard = options.keyboard || Ti.UI.KEYBOARD_DECIMAL_PAD;
    options.minim = options.minim || 0;
    options.enabled = options.enabled == undefined ? true : options.enabled;

    /**
     * Indica si se ha ganado el foco por la acción de un botón.
     * @type Boolean
     */
    var isButton = false;

    /**
     * El campo de texto.
     * @private
     * @type Ti.UI.TextField
     */
    var text = Ti.UI.createTextField({
        // height : 40,
        // left : 5,
        // right : 114,
        value : options.value || options.minim.toString(),
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        keyboardType : options.keyboard,
        height : Ti.UI.SIZE,
        enabled : options.enabled,
        editable : options.enabled
    });

    /**
     * En el evento 'focus' comprobamos si el contenido es "0", de ser así lo borramos.
     * @event 'focus'
     */
    text.addEventListener('focus', function() {
        if (text.getValue() === "0" && !isButton) {
            text.setValue("");
            isButton = false;
        };
    });

    /**
     * Botón para añadir unidades.
     * @private
     * @type Ti.UI.Button
     */
    var butAdd = Ti.UI.createButton({
        image : '/images/edit_add_32.png',
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,
        // right : 55
    });

    /**
     * El evento 'click' del botón Plus.
     * @event 'click'
     */
    butAdd.addEventListener('click', function() {
        if (text.getEnabled()) {
            text.value = isNumOk(text.value.replace(",", ".")) ? text.value : 0;
            var unit = text.value === 0 ? 0 : (parseInt(parse(text.value) * 100) + 100) / 100;
            unit = unit < options.minim ? options.minim : options.maxim != undefined ? unit > options.maxim ? options.maxim : unit : unit;
            text.value = unit.toString().replace(".", ",");
            isButton = true;
            text.focus();
        };
    });

    /**
     * Botón para restar unidades.
     * @private
     * @type Ti.UI.Button
     */
    var butRemove = Ti.UI.createButton({
        image : '/images/edit_remove_32.png',
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,
        // right : 0
    });

    /**
     * El evento 'click' del botón Remove.
     * @event 'click'
     */
    butRemove.addEventListener('click', function(e) {
        if (text.getEnabled()) {
            text.value = isNumOk(text.value.replace(",", ".")) ? text.value : 0;
            var unit = text.value === 0 ? 0 : (parseInt(parse(text.value) * 100) - 100) / 100;
            unit = unit < options.minim ? options.minim : options.maxim != undefined ? unit > options.maxim ? options.maxim : unit : unit;
            text.value = unit.toString().replace(".", ",");
            isButton = true;
            text.focus();
        };
    });

    /**
     * Botón para mostrar información.
     * @private
     * @type Ti.UI.Button
     */
    var butInfo = Ti.UI.createButton({
        image : '/images/info_32.png',
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,
        // right : 0
    });

    /**
     * Indica si el número es del formato correcto.
     * @param {String} num El número a comprobar el formato.
     * @return {Boolean} Retorna FALSE si no es un número, TRUE en caso afirmativo.
     */
    function isNumOk(num) {
        return options.typeValue == Constants.STRING ? false : (num == undefined || num == "") ? false : parse(num).toString() === num.replace(",", ".");
    };

    /**
     * Pasa el valor del TextField a un número para poder sumar o restar una unidad.
     * @param {String} num El número a formatar.
     * @return {Number} El número formatado.
     */
    function parse(num) {
        return options.typeValue == Constants.INTEGER ? parseInt(num) : parseFloat(num.replace(",", "."));
    };

    /**
     * Cambia el estado del control según se cumplan o no las condiciones.</br>
     * El TextField debe tener un valor válido (INTEGER o FLOAT) y debe estar dentro de los límites MINIM y MAXIM.
     */
    function checkData() {
        var num = text.getValue().replace(",", ".");
        return options.typeValue == Constants.STRING ? true : isNumOk(num) && options.maxim == undefined ? parse(num) >= options.minim : parse(num) <= options.maxim && parse(num) >= options.minim;
    };

    /**
     * Añade una función al evento del control indicado.
     * @param {Number} type El tipo de control.
     * @param {String} event El nombre del evento.
     * @param {Function} callback La función a realizar al disparar el evento.
     */
    this.addEventListener = function(type, event, callback) {
        switch(type) {
        case Constants.TEXT:
            text.addEventListener(event, callback);
            break;
        case Constants.ADD:
            butAdd.addEventListener(event, callback);
            break;
        case Constants.REMOVE:
            butRemove.addEventListener(event, callback);
            break;
        case Constants.INFO:
            butInfo.addEventListener(event, callback);
            break;
        };

    };

    /**
     * Retorna el control indicado..
     * @param {Number} type El tipo de control.
     * @return {Ti.UI.View} La vista contenedor.
     */
    this.getControl = function(type) {
        switch(type) {
        case Constants.TEXT:
            return text;
            break;
        case Constants.ADD:
            return butAdd;
            break;
        case Constants.REMOVE:
            return butRemove;
            break;
        case Constants.INFO:
            return butInfo;
            break;
        };
    };

    /**
     * Retorna el valor del campo de texto.
     * @return {String} El valor del campo de texto.
     */
    this.getValue = function() {
        return text.getValue();
    };

    /**
     * Cambia el valor del campo de texto
     * @param {String} value El nuevo valor par el campo de texto.
     */
    this.setValue = function(value) {
        text.setValue(value);
    };

    /**
     * Indica si el valor del TextField es válido.
     * @return {Boolean} .
     */
    this.isValid = function() {
        return checkData();
    };

};

module.exports = UnitControl;
