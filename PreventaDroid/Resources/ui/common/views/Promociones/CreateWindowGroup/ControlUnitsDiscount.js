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
 * <li>name {String}: El nombre del artículo.</li>
 * <li>price {String}: El precio del artículo.</li>
 * <li>value {String}: El valor del TextField. La cantidad.</li>
 * <li>[keyboard = Ti.UI.KEYBOARD_DECIMAL_PAD] {Number}: El tipo de teclado del TextField.</li>
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
            fontSize : 20
        },
        text : options.name
    });
    content.add(labelTitle);

    /**
     * Contiene los datos y botones.
     * @private
     * @type Ti.UI.View
     */
    var viewText = Ti.UI.createView({
        height : Ti.UI.SIZE
    });
    content.add(viewText);
    
    /**
     * El contenedor del total.
     * @private
     * @type Ti.UI.View 
     */
    var contentTotal = Ti.UI.createView({
        backgroundColor : "#808080",
        borderColor : '#000000',
        borderWidth : 1,
        right : 2,
        width : 86,
        height : Ti.UI.FILL
    });
    viewText.add(contentTotal);
    
    /**
     * El importe del control.
     * @private
     * @type Ti.UI.Label 
     */
    var labelImport = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 15,
            fontWeight : 'bold'
        },
        height : Ti.UI.SIZE,
        width : Ti.UI.SIZE,
        right : 2
    });
    contentTotal.add(labelImport);
    
    /**
     * El precio actual del artículo.
     * @private
     * @type Ti.UI.Label
     */
    var labelPrice = Ti.UI.createLabel({
        //backgroundColor : 'red',
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 15,
            fontWeight : 'bold'
        },
        text : Global.Functions.numToEuro(options.price),
        left : 3
    });
    viewText.add(labelPrice);

    /**
     * El campo de texto.
     * @private
     * @type Ti.UI.TextField
     */
    var text = unitControl.getControl(Constants.TEXT);
    text.setLeft(50);
    text.setRight(210);
    viewText.add(text);
    
    //Añadimos funcionalidad extra al evento 'change' de la cantidad.
    unitControl.addEventListener(Constants.TEXT, 'change', function(e){
        if(unitControl.isValid())
            labelImport.setText(Global.Functions.numToEuro(options.price * parseInt(e.source.getValue()), 2));
        else
            labelImport.setText(Global.Functions.numToEuro(0));
    });

    /**
     * Botón para añadir unidades.
     * @private
     * @type Ti.UI.Button
     */
    var butAdd = unitControl.getControl(Constants.ADD);
    butAdd.setRight(155);
    viewText.add(butAdd);
    
    /**
     * Botón para restar unidades.
     * @private
     * @type Ti.UI.Button
     */
    var butRemove = unitControl.getControl(Constants.REMOVE);
    butRemove.setRight(100);
    viewText.add(butRemove);

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
     * Retorna el total actual del control.
     * @return {Number} El total del control. 
     */
    this.getTotal = function(){
        return parseFloat(Global.Functions.euroToNum(labelImport.getText()));  
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
