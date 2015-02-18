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
 * Crea la ventana para introducir la cantidad + regalo.
 * @class
 * @param {Object} options Las opciones configurables del control.</br>
 * <ul>
 * <li>title {String}: El texto para el título.</li>
 * <li>value {String}: El valor del TextField.</li>
 * <li>[keyboard = Ti.UI.KEYBOARD_DECIMAL_PAD] {Number}: El tipo de teclado del TextField.</li>
 * <li>typeValue {Number}: El tipo de dato que debe tener el TextField.</li>
 * <li>[minim = 0] {Number}: La unidad mínima que puede tener el TextField</li>
 * <li>[maxim] {Number} : La unidad máxima que puede tener el TextField</li>
 * <li>[enabled = true]: Indica si el control está activo.
 * <ul>
 * @return {Ti.UI.View} La vista con el control montado.
 */
var ControlUnits = function(options) {
    //Marcamos los valores por defecto.
    options.keyboard = options.keyboard || Ti.UI.KEYBOARD_DECIMAL_PAD;
    options.minim = options.minim || 0;
    options.enabled = options.enabled == undefined ? true : options.enabled;
    
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
        text : options.title
    });
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
    var text = Ti.UI.createTextField({
        // height : 40,
        left : 5,
        right : 114,
        value : options.value || options.minim.toString(),
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        keyboardType : options.keyboard,
        height : Ti.UI.SIZE,
        enabled : options.enabled,
        editable : options.enabled
    });
    viewText.add(text);

    /**
     * Botón para añadir unidades.
     * @private
     * @type Ti.UI.Button
     */
    var butAdd = Ti.UI.createButton({
        image : '/images/edit_add_32.png',
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,
        right : 55
    });
    viewText.add(butAdd);

    /**
     * El evento 'click' del botón Plus.
     * @event 'click'
     */
    butAdd.addEventListener('click', function() {
        if (text.getEnabled() && isNumOk(text.value.replace(",", "."))) {
            var unit = parse(text.value) + 1;
            unit = unit < options.minim ? options.minim : options.maxim != undefined && unit > options.maxim ? options.maxim : unit;
            text.value = unit.toString().replace(".", ",");
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
        right : 0
    });
    viewText.add(butRemove);

    /**
     * El evento 'click' del botón Remove.
     * @event 'click'
     */
    butRemove.addEventListener('click', function(e) {
        if (text.getEnabled() && isNumOk(text.value.replace(",", "."))) {
            var unit = parse(text.value) - 1;
            unit = unit < options.minim ? options.minim : options.maxim != undefined ? unit - 1 > options.maxim ? options.maxim : unit : unit;
            text.value = unit.toString().replace(".", ",");
        };
    });

    /**
     * Indica si el número es del formato correcto.
     * @param {String} num El número a comprobar el formato.
     * @return {Boolean} Retorna FALSE si no es un número, TRUE en caso afirmativo.
     */
    function isNumOk(num) {
        return options.typeValue == ControlUnits.STRING ? false : parse(num).toString() === num.replace(",", ".");
    };
    
    /**
     * Pasa el valor del TextField a un número para poder sumar o restar una unidad.
     * @param {String} num El número a formatar.
     * @return {Number} El número formatado.
     */
    function parse(num) {
        return options.typeValue == ControlUnits.INTEGER ? parseInt(num) : parseFloat(num.replace(",", "."));
    };
    
    /**
     * Cambia el estado del control según se cumplan o no las condiciones.</br>
     * El TextField debe tener un valor válido (INTEGER o FLOAT) y debe estar dentro de los límites MINIM y MAXIM. 
     */
    function checkData(){
        var num = text.getValue().replace(",", ".");
        return options.typeValue == ControlUnits.STRING ? true : isNumOk(num) && options.maxim == undefined ? parse(num) >= options.minim : parse(num) <= options.maxim && parse(num) >= options.minim;
    };

    /**
     * Añade una función al evento 'change' del TextField
     * @param {Function} callback La función al producirse el evento 'change' del campo de texto.
     */
    // this.addChangeListener = function(callback) {
        // text.addEventListener('change', callback);
    // };
    
    /**
     * Añade una función al evento del control indicado.
     * @param {Number} type El tipo de control.
     * @param {String} event El nombre del evento.
     * @param {Function} callback La función a realizar al disparar el evento.   
     */
    this.addEventListener = function(type, event, callback){
        switch(type){
            case ControlUnits.TEXT:
                text.addEventListener(event, callback);
            break;
            case ControlUnits.ADD:
                butAdd.addEventListener(event, callback);
            break;  
            case ControlUnits.REMOVE:
                butRemove.addEventListener(event, callback);
            break;    
        };
        
    };

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

//Añadimos la constante INTEGER
Object.defineProperty(ControlUnits, "INTEGER", {
    get : function() {
        return 0;
    }
});
//Añadimos la constante FLOAT
Object.defineProperty(ControlUnits, "FLOAT", {
    get : function() {
        return 1;
    }
});
//Añadimos la constante STRING
Object.defineProperty(ControlUnits, "STRING", {
    get : function() {
        return 2;
    }
});
//Añadimos la constante TEXT
Object.defineProperty(ControlUnits, "TEXT", {
    get : function() {
        return 3;
    }
});
//Añadimos la constante ADD
Object.defineProperty(ControlUnits, "ADD", {
    get : function() {
        return 4;
    }
});
//Añadimos la constante REMOVE
Object.defineProperty(ControlUnits, "REMOVE", {
    get : function() {
        return 5;
    }
});

module.exports = ControlUnits;
