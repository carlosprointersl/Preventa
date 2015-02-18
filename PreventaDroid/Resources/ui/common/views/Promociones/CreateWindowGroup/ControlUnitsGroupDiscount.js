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
 * <li>quantity {String}: La cantidad.</li>
 * <li>[keyboard = Ti.UI.KEYBOARD_DECIMAL_PAD] {Number}: El tipo de teclado del TextField.</li>
 * <li>typeValue {Number}: El tipo de dato que debe tener el TextField.</li>
 * <li>[minim = 0] {Number}: La cantidad mínima de venta.</li>
 * <li>[maxim] {Number} : La cantidad máxima de venta.</li>
 * <li>euro {Number} : La cantidad del descuento en €.</li>
 * <li>percent {Number} : La cantidad del descuento en %.</li>
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
     * Es la función que se dispara en el evento 'change' de los campos de texto.
     * @private
     * @type Function 
     */
    var changeEvent;

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
        height : 35 //Ti.UI.SIZE
    });
    content.add(viewText);

    /**
     * Contiene los descuentos.
     * @private
     * @type Ti.UI.View
     */
    var contentDto = Ti.UI.createView({
        height : 35
    });
    content.add(contentDto);

    /**
     * Contiene el importe total despúes del descuento.
     * @private
     * @type Ti.UI.View
     */
    var contentTotal = Ti.UI.createView({
        height : 20
    });
    content.add(contentTotal);

    /**
     * El contenedor del total.
     * @private
     * @type Ti.UI.View
     */
    var borderTotal = Ti.UI.createView({
        backgroundColor : "#808080",
        borderColor : '#000000',
        borderWidth : 1,
        right : 2,
        width : 86,
        height : Ti.UI.SIZE
    });
    viewText.add(borderTotal);

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
    borderTotal.add(labelImport);

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
    text.setFont({
        fontSize : 15
    });
    text.setLeft(50);
    text.setRight(200);
    viewText.add(text);

    //Añadimos funcionalidad extra al evento 'change' de la cantidad.
    unitControl.addEventListener(Constants.TEXT, 'change', function(e) {
        if (unitControl.isValid())
            labelImport.setText(Global.Functions.numToEuro(options.price * parseInt(e.source.getValue())));
        else
            labelImport.setText(Global.Functions.numToEuro(0));
        changeDtoPer();
        editPer.fireEvent('change');
        calculateTotal();
    });

    /**
     * Botón para añadir unidades.
     * @private
     * @type Ti.UI.Button
     */
    var butAdd = unitControl.getControl(Constants.ADD);
    butAdd.setImage('/images/edit_add_24.png');
    butAdd.setRight(145);
    viewText.add(butAdd);

    /**
     * Botón para restar unidades.
     * @private
     * @type Ti.UI.Button
     */
    var butRemove = unitControl.getControl(Constants.REMOVE);
    butRemove.setImage('/images/edit_remove_24.png');
    butRemove.setRight(90);
    viewText.add(butRemove);

    /**
     * El Dto en €.
     * @private
     * @type Ti.UI.Label
     */
    var labelEuroDto = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 15,
            fontWeight : 'bold'
        },
        text : 'Dto €:',
        height : Ti.UI.SIZE,
        width : Ti.UI.SIZE,
        right : 100
    });
    contentDto.add(labelEuroDto);

    /**
     * El campo para indicar el descuento en €.
     * @private
     * @type Ti.UI.TextField
     */
    var editEuro = Ti.UI.createTextField({
        // height : 35,
        right : 2,
        width : 86,
        value : "0", //options.euro.toString().replace(".", ","),
        font : {
            fontSize : 15
        },
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
        keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD
    });
    contentDto.add(editEuro);

    /**
     * El Dto en %.
     * @private
     * @type Ti.UI.Label
     */
    var labelPerDto = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 15,
            fontWeight : 'bold'
        },
        text : 'Dto %:',
        height : Ti.UI.SIZE,
        width : Ti.UI.SIZE,
        right : 250
    });
    contentDto.add(labelPerDto);

    /**
     * El campo para indicar el descuento en €.
     * @private
     * @type Ti.UI.TextField
     */
    var editPer = Ti.UI.createTextField({
        // height : 35,
        right : 150,
        width : 86,
        value : options.percent,
        font : {
            fontSize : 15
        },
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD
    });
    contentDto.add(editPer);

    /**
     * El total del pedido antes del descuento.
     * @private
     * @type Ti.UI.Label
     */
    var labelTotal2 = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 15,
            fontWeight : 'bold'
        },
        text : 'Total:',
        height : Ti.UI.SIZE,
        width : Ti.UI.SIZE,
        right : 100
    });
    contentTotal.add(labelTotal2);

    /**
     * La vista envoltorio del importe del total1.
     * @private
     * @type Ti.UI.View
     */
    var borderTotal2 = Ti.UI.createView({
        backgroundColor : "#808080",
        borderColor : '#000000',
        borderWidth : 1,
        right : 2,
        width : 86,
        //height : Ti.UI.SIZE
    });
    contentTotal.add(borderTotal2);

    /**
     * El importe de total1.
     * @private
     * @type Ti.UI.Label
     */
    var labelImportTotal2 = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 15,
            fontWeight : 'bold'
        },
        //height : Ti.UI.SIZE,
        width : Ti.UI.SIZE,
        right : 3
    });
    contentTotal.add(labelImportTotal2);
    
    /**
     * Activa el descuento "€" y desactiva el descuento "%".
     */
    function changeDtoEuro() {
        editEuro._change = true;
        editPer._change = false;
    };

    /**
     * Activa el descuento "%" y desactiva el descuento "€".
     */
    function changeDtoPer() {
        editEuro._change = false;
        editPer._change = true;
    };

    /**
     * Calcula el total resultante de la resta del total menos el descuento aplicado.
     */
    function calculateTotal() {
        //Ti.API.info(parseInt(Global.Functions.euroToNum(labelImport.getText()) * 100) + " - " + parseInt(editEuro.getValue().replace(",", ".") * 100));
        labelImportTotal2.setText(Global.Functions.numToEuro((parseInt(Global.Functions.euroToNum(labelImport.getText()) * 100) - parseInt(editEuro.getValue().replace(",", ".") * 100)) / 100));
        if(changeEvent != undefined)
            changeEvent();
    };
    
    /**
     * Comprueba que el valor del campo del descuento en "%" es correcto.
     * @return {Boolean} Retorna TRUE si el valor del campo es correcto, FALSE en caso contrario.
     */
    function checkPercent(){
        return (parseInt(editPer.getValue()).toString() === editPer.getValue()) && (editPer.getValue() <= options.percent);        
    };
    
    /**
     * Comprueba que el valor del campo del descuento en "€" es correcto.
     * @return {Boolean} Retorna TRUE si el valor del campo es correcto, FALSE en caso contrario.
     */
    function checkEuro(){
        
        return (parseFloat(editEuro.getValue().replace(",", ".")).toString() === editEuro.getValue().replace(",", "."));// && (editEuro.getValue().replace(",", ".") <= options.euro);  
    };

    //Añadimos la propiedad "_change" al control para poder editar los camos de descuento.
    editEuro._change = false;
    editPer._change = false;

    //Añadimos las funciones a los controles de descuentos para el evento "focus".
    editEuro.addEventListener('focus', changeDtoEuro);
    editPer.addEventListener('focus', changeDtoPer);

    //Añadimos las funciones a los controles de descuentos para el evento "change".
    editEuro.addEventListener('change', function(e) {
        if (editEuro._change) {
            //Si es el importe máximo
            if (editEuro.getValue().replace(",", ".") != options.euro) {
                var beforeTotal = parseFloat(Global.Functions.euroToNum(labelImport.getText()));
                var _percent = Math.round((editEuro.getValue().replace(",", ".") * 100) / beforeTotal) / 100;
                editPer.setValue(_percent >= options.percent ? options.percent : Math.round((100 * editEuro.getValue().replace(",", ".")) / beforeTotal).toString());
            } else {
                editPer.setValue(options.percent);
            };
            calculateTotal();
        };
    });
    editPer.addEventListener('change', function(e) {
        if (editPer._change) {
            //Si es el importe máximo
            if (editPer.getValue() != options.percent) {
                var beforeTotal = parseFloat(Global.Functions.euroToNum(labelImport.getText()));
                editEuro.setValue((Math.round((editPer.getValue().replace(",", ".") * beforeTotal)) / 100).toString().replace(".", ","));
            } else {
                editEuro.setValue((options.euro * parseInt(text.getValue())).toString().replace(".", ","));
            };
            calculateTotal();
        };
    });

    /**
     * Añade una función al evento del control indicado.
     * @param {Number} type El tipo de control.
     * @param {String} event El nombre del evento.
     * @param {Function} callback La función a realizar al disparar el evento.
     */
    this.addEventListener = function(type, event, callback){
        switch(type){
            case Constants.TEXT:
            case Constants.ADD:
            case Constants.REMOVE:
                unitControl.addEventListener(type, event, callback);
            break;
            case Constants.PERCENT:
                editPer.addEventListener(event, callback);
            break;
            case Constants.EURO:
                editEuro.addEventListener(event, callback);
            break;            
        };
    };
    
    /**
     * Añade una función al evento 'change' de los campos de texto. Se dispara siempre que se modifiquen las unidades o alguno de los descuentos.
     * @param {Function} callback La función a realizar al dispara el evento. 
     */
    this.addChangeEvent = function(callback){
        changeEvent = callback;  
    };

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
    this.getTotal = function() {
        return parseFloat(Global.Functions.euroToNum(labelImport.getText()));
    };
    
    /**
     * Retorna el valor del descuento en %.
     * @return {String} El valor del campo de descuento en %.
     */
    this.getDtoP = function(){
        return editPer.getValue();         
    };
    
    /**
     * Retorna el valor del descuento en €.
     * @return {String} El valor del campo de descuento en €.
     */
    this.getDtoE = function(){
        return editEuro.getValue();         
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
     * Indica si el valor del Control es válido.
     * @return {Boolean} .
     */
    this.isValid = function(){
        var per = checkPercent();
        var eur = checkEuro();
        var unit = unitControl.isValid();
        return checkPercent() && checkEuro() && unitControl.isValid();
    };

};

module.exports = ControlUnits;
