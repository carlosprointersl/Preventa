/**
 * @fileOverview En este archivo estan las clases para crear los diferentes tipos de filas que puede tener una tabla.
 * Estas filas están relacionadas con la configuración de la aplicación y la edición de parámetros.
 *
 * @author Juan Carlos Matilla
 * @version 1.0
 */

/**
 * Representa una fila para una tabla. Por si misma no es nada, pero sus herederos representan los posibles tipos de filas.
 * @class Este objeto define una "Row" para una tabla. Es la clase PADRE.
 * @param {String} title El texto del título del parámetro.
 * @param {String} subtitle El texto del valor/descripción del parámetro.
 */
var ParentRow = function(titleLabel, subTitle) {
    /**
     * La fila.
     * @private
     * @type Ti.UI.TableViewRow
     */
    this.row = Ti.UI.createTableViewRow({
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        backgroundSelectedColor : Global.Theme.ROW.PRESS,
        height : Ti.UI.SIZE, //55,
        layout : 'horizontal'
    });
    /**
     * La vista donde se guardan las etiquetas
     * @private
     * @type View
     */
    var titles = Ti.UI.createView({
        layout : 'vertical',
        touchEnabled : false
    });

    /**
     * La vista donde se muestra la acción, si la tuviera. CheckBox
     * @private
     * @type View
     */
    var action = Ti.UI.createView({
        width : Ti.UI.SIZE,
        touchEnabled : false
    });

    /**
     * La etiqueta del nombre del parámetro.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitle = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 22,
            fontWeight : 'bold'
        },
        text : titleLabel,
        left : 2,
        top : 3,
        touchEnabled : false
    });

    /**
     * La etiqueta que muestra la definición o el valor del parámetro.
     * @private
     * @type Label
     */
    var labelValue = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 16
        },
        text : subTitle,
        left : 2,
        bottom : 3,
        touchEnabled : false
    });

    /**
     * Retorna la row montada.
     * @return {Row} La fila montada.
     */
    this.getRow = function() {

        titles.add(labelTitle);
        titles.add(labelValue);

        this.row.add(titles);
        this.row.add(action);

        // this.row.add(titles);
        // this.row.add(action);

        return this.row;
    };

    /**
     * Modifica el valor del subtítulo
     * @param {String} subTitle El valor que ha de aparecer en el subtítulo.
     */
    this.setSubTitle = function(subTitle) {
        labelValue.text = subTitle;
    };

    /**
     * Añade un objeto a la vista "action", como un checkbox
     * @param {Object} obj El objeto que añadimos a la vista
     * @param {String} width El ancho de la vista de las etiquetas para que quepa el objeto.
     */
    this.addAction = function(obj, width) {
        action.add(obj);
        titles.setWidth(width);
    };

};

/**
 * Crea una fila sencilla. Hereda de la clase ParentRow.
 * @param {String} title El texto del título del parámetro.
 * @param {String} subtitle El texto del valor/descripción del parámetro.
 */
var SingleRow = function(titleLabel, subTitle) {
    //Llamamos al constructor PADRE
    ParentRow.call(this, titleLabel, subTitle);
    //Le marcamos el nombre de la clase
    this.row.setClassName("rowSingle");
    /**
     * Añadimos eventos a la fila
     * @param {String} event El nombre del evento.
     * @param {Function} callback La funcíon callback del evento.
     */
    this.addEventListener = function(event, callback) {
        this.row.addEventListener(event, callback);
    };
};
SingleRow.prototype = ParentRow;

/**
 * Crea una fila con un Check. Hereda de la clase ParentRow.
 * @param {String} title El texto del título del parámetro.
 * @param {String} subtitle El texto del valor/descripción del parámetro.
 * @param {Boolean} value El valor del CheckBox.
 */
var CheckRow = function(titleLabel, subTitle, value) {
    //Llamamos al constructor PADRE
    ParentRow.call(this, titleLabel, subTitle);
    //Le marcamos el nombre de la clase
    this.row.setClassName("rowCheck");
    /**
     * El objeto CHECKBOX
     * @private
     * @type Ti.UI.createSwitch
     */
    var check = Ti.UI.createSwitch({
        style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
        value : value,
        right : 3,
        // touchEnabled : false
    });

    //Añadimos el checkbox a la fila.
    this.addAction(check, '86.5%');
    //Le marcamos el nombre de la clase
    this.row.setClassName("rowCheck" + titleLabel);

    /**
     * Añadimos eventos al CheckBox
     * @param {String} event El nombre del evento.
     * @param {Function} callback La funcíon callback del evento.
     */
    this.addEventListener = function(event, callback) {
        check.addEventListener(event, callback);
    };

    /**
     * Modifica el valor del Check.
     * @param {Boolean} value El valor del Check.
     */
    this.setValueCheck = function(value) {
        check.setValue(value);
    };

    /**
     * Retorna el valor actual del Check
     * @return {Boolean} El valor del Check.
     */
    this.getValueCheck = function() {
        return check.getValue();
    };
};
CheckRow.prototype = ParentRow;

/**
 * Crea una fila con un Picker(Desplegable). Hereda de la clase ParentRow.
 * @param {String} title El texto del título del parámetro.
 * @param {String} subtitle El texto del valor/descripción del parámetro.
 * @param {String[]} options Las opciones que deben aparecer.
 * @param {String} titleDialog El título del diálogo.
 */
var PickerRow = function(titleLabel, subTitle, options, titleDialog) {
    //Llamamos al constructor PADRE
    ParentRow.call(this, titleLabel, subTitle);
    //Marcamos la fila con hasChild
    this.row.setHasChild(true);
    //Le marcamos el nombre de la clase
    this.row.setClassName("rowPicker");

    /**
     * El diálogo donde se mostraran las diferentes opciones
     * @private
     * @type OptionDialog
     */
    var dialog = Ti.UI.createOptionDialog({
        options : options,
        title : titleDialog
    });

    //Disparamos el diálogo al pulsar en la fila
    this.row.addEventListener('click', function() {
        dialog.show();
    });

    /**
     * Añadimos eventos al OptionDialog
     * @param {String} event El nombre del evento.
     * @param {Function} callback La funcíon callback del evento.
     */
    this.addEventListener = function(event, callback) {
        dialog.addEventListener(event, callback);
    };

};
PickerRow.prototype = ParentRow;

/**
 * Crea una fila con un campo de texto(Text). Hereda de la clase ParentRow.
 * @param {String} title El texto del título del parámetro.
 * @param {String} subtitle El texto del valor/descripción del parámetro.
 * @param {Ti.UI.KEYBOARD.*} [keyboard] El tipo de teclado que queremos que se muestre para editar.
 */
var TextRow = function(titleLabel, subTitle, keyboard) {
    //Llamamos al constructor PADRE
    ParentRow.call(this, titleLabel, subTitle);
    //Le marcamos el nombre de la clase
    this.row.setClassName("rowText");

    /**
     * El objeto actual.
     * @private
     * @type Object
     */
    var self = this;

    /**
     * La vista del cuerpo.
     * @private
     * @type Ti.UI.View
     */
    var body = Ti.UI.createView({
        height : Ti.UI.SIZE,
        layout : 'vertical',
        touchEnabled : false
    });

    /**
     * Los eventos que se le han añadido al objeto.
     * @private
     * @type Object[]
     */
    var events = new Array();

    /**
     * El TextField para editar los datos
     * @private
     * @type Ti.UI.TextField
     */
    var text = Ti.UI.createTextField({
        height : 40,
        bottom : 5,
        width : Ti.UI.FILL,
        value : subTitle,
        keyboardType : keyboard || Ti.UI.KEYBOARD_DEFAULT
    });

    /**
     * El nombre del campo.
     * @private
     * @type Ti.UI.Label
     */
    var label = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 20
        },
        left : 5,
        top : 5,
        text : titleLabel,
        width : Ti.UI.FILL
    });

    //Aañdimos los elementos a la vista.
    body.add(label);
    body.add(text);

    /**
     * Las opciones para la ventana Popup.
     * @private
     * @type Object
     */
    var options = {
        title : "Edición de datos",
        body : body,
        buttons : Global.Control.Windows.BUTTON.SAVE_CANCEL,
        // top : 20
    };

    /**
     * El formulario para editar los datos.
     * @private
     * @type Window
     */
    //var winForm = new Global.Control.FormNewEdit([titleLabel], [text]);
    // var winForm = new Global.Control.Windows.Popup(options);
    // winForm.addEventClickButton("save", function() {
    //    winForm.fireEvent("save", {
    //        value : text.value
    //    });
    //    winForm.close();
    // });

    //Disparamos la ventana de edición al pulsar en la fila
    this.row.addEventListener('click', function() {
        var winForm = new Global.Control.Windows.Popup(options);
        winForm.addEventClickButton("save", function() {
            winForm.fireEvent("save", {
                value : text.value
            });
            winForm.close();
        });

        for (var i = 0, j = events.length; i < j; i++) {
            winForm.addEventListener(events[i].name, events[i].fun);
        };

        winForm.open();
    });

    /**
     * Modifica el valor del campo a editar y el valor que muestra en el "subTitle". Esta función
     * solo es aplicable cuando el valor es modificado por otro control.(Parámetros -> Serie).
     * @param {Object} value El nuevo valor.
     */
    this.setValue = function(value) {
        this.setSubTitle(value);
        text.setValue(value);
    };

    /**
     * Añadimos eventos al formulario de edición. El evento principal para capturar se denomina "save".
     * Este evento nos retorna el TextField con los datos.
     * @param {String} event El nombre del evento.
     * @param {Function} callback La funcíon callback del evento.
     */
    this.addEventListener = function(event, callback) {
        events.push({
            name : event,
            fun : callback
        });
        // winForm.addEventListener(event, callback);
    };
};
TextRow.prototype = ParentRow;

/**
 * Crea una fila par editar una fecha.
 * @param {String} title El texto del título del parámetro.
 * @param {Date} subtitle La fecha del parámetro.
 */
var DateRow = function(titleLabel, subTitle) {
    //Llamamos al constructor PADRE
    ParentRow.call(this, titleLabel, Global.Functions.dateFormat(subTitle));
    //Le marcamos el nombre de la clase
    this.row.setClassName("dateText");

    /**
     * El formulario para editar la fecha.
     * @private
     * @type Window
     */
    var winDate = new Global.Control.Windows.DateTime({
        type : Ti.UI.PICKER_TYPE_DATE,
        value : subTitle,
        title : "Edición de fechas"
    });

    // var winDate = new Global.Control.FormDate(subTitle);

    //Disparamos la ventana de edición al pulsar en la fila
    this.row.addEventListener('click', function() {
        // var winDate = new Global.Control.Windows.DateTime({
            // type : Ti.UI.PICKER_TYPE_DATE,
            // value : subTitle,
            // title : "Edición de fechas"
        // });
        winDate.open();
    });

    /**
     * Añadimos eventos al formulario de edición. Al capturar el evento "dateTime:value" retorna el valor de la fecha/hora actual.
     * @param {String} event El nombre del evento.
     * @param {Function} callback La funcíon callback del evento.
     */
    this.addEventListener = function(event, callback) {
        winDate.addEventListener(event, callback);
    };
};
DateRow.prototype = ParentRow;

/**
 * Es el conjunto de posibles filas.
 * @namespace
 * @memberOf Global.Control
 */
var TypesRows = {
    CheckRow : CheckRow,
    TextRow : TextRow,
    PickerRow : PickerRow,
    DateRow : DateRow,
    SingleRow : SingleRow
};

// var functionControl = TypesRows;
module.exports = TypesRows;
