/**
 * @fileOverview En este archivo se crea el namesapace Popup para crear una ventana emergente estándar. También están
 * todas las clases que pertenecen a este namespace
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Constantes que identifican los iconos disponibles para la ventana.
 * @class
 * @memberof Global.Control.Windows
 */
var Icon = {
    EXCLAMATION : 0,
    QUESTION : 1,
    INFORMATION : 2,
    ERROR : 3
};

/**
 * Constantes que identifican los botones disponibles para la ventana.
 * @class
 * @memberof Global.Control.Windows
 */
var Buttons = {
    ACCEPT : 0,
    CANCEL : 1,
    SAVE : 2,
    ACCEPT_CANCEL : 3,
    SAVE_CANCEL : 4
};

/**
 * Crea una ventana emergente estandar.
 * @class Se divide en tres secciones:</br>
 * <ol>
 * <li>Title: El título que aparece en la ventana.</li>
 * <li>BodyView: La vista(View) central, el cuerpo de la ventana.</li>
 * <li>Foot - Buttons: La vista del "Pie". Los botones son opcionales.</li>
 * </ol>
 * @memberOf Global.Control.Windows
 * @param {Object} options Las opciones que se pueden editar del objeto.
 */
function Popup(options) {
    /**
     * Los botones que se han de mostrar.
     * @private
     * @type Integer[]
     */
    var buttons = options.buttons != undefined ? options.buttons : 3;

    /**
     * La altura de los botones.
     * @private
     * @type Integer
     */
    var heightButtons = options.heightButtons || Ti.UI.FILL;

    /**
     * La ventana principal.
     * @private
     * @type Ti.UI.Window
     */
    var win = Ti.UI.createWindow({
        backgroundColor : '#000000',
        navBarHidden : true,
        opacity : 0.5
    });

    /**
     * La vista principal. Es la que contiene todos los elementos.
     * @private
     * @type Ti.UI.View
     */
    var viewMain = Ti.UI.createView({
        opacity : 1,
        //borderColor : 'white',
        //borderWidth : 1,
        height : options.height || Ti.UI.SIZE,
        width : options.width || 280,
        top : options.top || undefined,
        bottom : options.bottom || undefined,
        left : options.left || undefined,
        right : options.right || undefined,
        backgroundColor : '#FFFFFF',
        layout : 'vertical'
    });

    /**
     * La vista header. Es la que contiene la cabecera([icon] - title).
     * @private
     * @type Ti.UI.View
     */
    var header = Ti.UI.createView({
        backgroundColor : '#6BAECE',
        top : 0,
        layout : 'horizontal',
        width : Ti.UI.FILL,
        height : options.heightHeader || 30
    });

    /**
     * La vista Body. Es la que contiene la vista editada.
     * @private
     * @type Ti.UI.View
     */
    var body = options.body;
    body.setBackgroundColor(body.backgroundColor == undefined ? '#6BAECE' : body.backgroundColor);
    body.setTop(0.5);

    /**
     * La vista Foot. Esta vista es opcional.
     * @private
     * @type Ti.UI.View
     */
    var foot = Ti.UI.createView({
        width : Ti.UI.FILL,
        top : 0.5,
        height : options.heightFoot || 50,
        layout : 'horizontal'
    });

    /**
     * La etiqueta para el título de la ventana.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitle = Ti.UI.createLabel({
        color : '#FFFFFF',
        font : {
            fontFamily : 'Arial',
            fontSize : 20
        },
        text : options.title,
        left : 3,
        width : Ti.UI.FILL,
        height : Ti.UI.FILL,
        horizontalWrap : false
    });

    /**
     * Botón Aceptar.
     * @private
     * @type Ti.UI.Button
     */
    var butAccept = Ti.UI.createButton({
        title : 'Aceptar',
        width : Ti.UI.FILL,
        height : heightButtons,
        backgroundColor : '#6BAECE',
        backgroundSelectedColor : '#235D79',
        color : '#FFFFFF',
        image : Global.Path.IMAGES + '48/Check.png'
    });

    /**
     * Botón Cancelar.
     * @private
     * @type Ti.UI.Button
     */
    var butCancel = Ti.UI.createButton({
        title : 'Cancelar',
        width : Ti.UI.FILL,
        height : heightButtons,
        backgroundColor : '#6BAECE',
        backgroundSelectedColor : '#235D79',
        color : '#FFFFFF',
        image : Global.Path.IMAGES + '48/Cancel.png'
    });

    /**
     * Botón Guardar.
     * @private
     * @type Ti.UI.Button
     */
    var butSave = Ti.UI.createButton({
        title : 'Guardar',
        width : Ti.UI.FILL,
        height : 50,
        backgroundColor : '#6BAECE',
        backgroundSelectedColor : '#235D79',
        color : '#FFFFFF',
        image : Global.Path.IMAGES + '48/save.png'
    });

    /**
     * Botón en blanco. Este botón sirve para crear otros diferentes a los estándar.
     * @private
     * @type Ti.UI.Button
     */
    var butBlank = Ti.UI.createButton({
        title : '',
        width : Ti.UI.FILL,
        height : 50,
        image : ''
    });

    /**
     * Crea la imagen del icono de cabecera.
     * @return {Ti.UI.ImageView} Retorna una imagen con el icono correspondiente.
     */
    function createIcon() {
        var icon = Ti.UI.createImageView({
            height : header.height,
            width : header.height
        });
        switch(options.icon) {
            case Icon.EXCLAMATION:
                icon.image = Global.Path.IMAGES + 'popup_exclamation.png';
                break;
            case Icon.QUESTION:
                icon.image = Global.Path.IMAGES + 'popup_question.png';
                break;
            case Icon.INFORMATION:
                icon.image = Global.Path.IMAGES + 'popup_information.png';
                break;
            case Icon.ERROR:
                icon.image = Global.Path.IMAGES + 'popup_delete.png';
                break;
        };

        return icon;
    };

    /**
     * Modifica los botones y sus medidas para que quepan y los añade al pie.
     * @private
     * @param {Ti.UI.Button[]} _buttons Un array con los botones que hemos de insertar.
     */
    function adaptButtons(_buttons) {
        //El número de espacios que hemos de dejar a la izquierda de los botonoes.
        var padding = _buttons.length - 1;
        //El ancho de cada botón.
        //var width = (viewMain.width - (padding * 1)) / _buttons.length;
        var width = (viewMain.width - (padding * 1)) / _buttons.length;
        //Modificamos el ancho del primero y lo insertamos
        _buttons[0].setWidth(width);
        foot.add(_buttons[0]);
        //Insertamos el resto de botones
        for (var i = 1; i < _buttons.length; i++) {
            _buttons[i].setWidth(width);
            _buttons[i].setLeft(1);
            foot.add(_buttons[i]);
        };
    };

    /**
     * Añade los botones que estén configurados a la vista del pie(Foot);
     * @private
     */
    function addButtons() {
        //Si es un entero añadimos los botones prediseñados.
        if (!Array.isArray(buttons)) {
            switch(buttons) {
                case Buttons.ACCEPT:
                    foot.add(butAccept);
                    break;
                case Buttons.CANCEL:
                    foot.add(butCancel);
                    break;
                case Buttons.SAVE:
                    foot.add(butSave);
                    break;
                case Buttons.ACCEPT_CANCEL:
                    adaptButtons([butAccept, butCancel]);
                    break;
                case Buttons.SAVE_CANCEL:
                    adaptButtons([butSave, butCancel]);
                    break;
            };
        } else {

        };
    };

    /**
     * Monta una ventana con los datos actuales y la abre.
     */
    this.open = function() {
        if (options.icon != undefined) {
            header.add(createIcon());
            labelTitle.setWidth(Ti.UI.SIZE);
        };
        header.add(labelTitle);

        addButtons();

        viewMain.add(header);
        viewMain.add(body);
        viewMain.add(foot);
        if (options.footVisible != undefined && !options.footVisible) {
            viewMain.remove(foot);
        };

        win.add(viewMain);

        win.open();
    };

    /**
     * Cerramos la ventana.
     */
    this.close = function() {
        win.close();
    };

    /**
     * Añade el evento click al botón que le indiquemos. Los nombres de los botones prediseñados son:</br>
     * <ol>
     * <li>acept</li>
     * <li>cancel</li>
     * <li>save</li>
     * </ol>
     * @param {Function} callback La función que queremos que realice en el evento "click" del botón.
     * @param {String} name El nombre del botón para añadir el evento.
     */
    this.addEventClickButton = function(name, callback) {
        switch(name) {
            case "accept":
                butAccept.addEventListener('click', callback);
                break;
            case "cancel":
                butCancel.addEventListener('click', callback);
                break;
            case "save":
                butSave.addEventListener('click', callback);
                break;
        };
    };

    /**
     * Añade un evento al objeto "win", que es la ventana principal.
     * @param {String} name El nombre del evento.
     * @param {Function} callback La función que queremos que realice cuando se dispare el evento.
     */
    this.addEventListener = function(name, callback) {
        win.addEventListener(name, callback);
    };

    /**
     * Dispara un evento del objeto "win", que es la ventana principal.
     * @param {String} name El nombre del evento.
     * @param {Object} [callback] El objeto con los datos de retorno.
     */
    this.fireEvent = function(name, callback) {
        win.fireEvent(name, callback);
    };

    /**
     * Modifica el valor "enabled" del botón indicado.
     * @param {String} name El nombre del botón a aplicar el valor.
     * @param {Boolean} value El valor a aplicar.
     */
    this.setEnabledButton = function(name, value) {
        switch(name) {
            case "accept":
                butAccept.setEnabled(value);
                butAccept.setBackgroundColor( value ? '#6BAECE' : 'gray');
                break;
            case "save":
                butSave.setEnabled(value);
                butSave.setBackgroundColor( value ? '#6BAECE' : 'gray');
                break;
            case "cancel":
                butCancel.setEnabled(value);
                butCancel.setBackgroundColor( value ? '#6BAECE' : 'gray');
                break;
        };
    };

    //
    // ---------------------------------------------------------------- EVENTS -------------------------------------------------
    //
    //Cancelar
    butCancel.addEventListener('click', function() {
        win.close();
    });

};

/**
 * @class Crea una ventana de alerta, donde se muestra un mensaje de advertencia.
 * @memberOf Global.Control.Windows
 * @param {Object} options Las opciones para el objeto.
 */
function Alert(options) {
    /**
     * El objeto actual "this".
     * @private
     * @type Object
     */
    var self = this;

    /**
     * La vista necesaria para llamar al Popup.
     * @private
     * @type Ti.UI.View
     */
    var body = Ti.UI.createView({
        height : 70
    });

    /**
     * La etiqueta que muestra el mensaje
     * @private
     * @type Ti.UI.Label
     */
    var message = Ti.UI.createLabel({
        color : '#FFFFFF',
        font : {
            fontFamily : 'Arial',
            fontSize : 20
        },
        text : options.message,
        left : 5,
        width : Ti.UI.FILL
    });

    //Añadimos la etiqueta a la vista
    body.add(message);
    //Añadimos la vista a las opciones
    options.body = body;
    //Mostramos solo el botón aceptar
    options.buttons = options.buttons || Global.Control.Windows.BUTTON.ACCEPT;

    Popup.call(this, options);

    this.addEventClickButton("accept", function() {
        self.close();
    });
};
Alert.prototype = Popup;

/**
 * @class Crea una ventana para editar una fecha. Hemos de escuchar el evento "dateTime:value" para recuperar el dato "value" al guardar.
 * @memberOf Global.Control.Windows
 * @param {Object} options Las opciones para el objeto.
 * <ol>
 * <li>options.type: {Ti.UI.PICKER_TYPE_*\Number} Indica el tipo de dato(Fecha/hora) a editar.</li>
 * <li>options.value: {Date} El valor actual del campo.</li>
 * </ol>
 */
function DateTime(options) {
    /**
     * El objeto actual "this".
     * @private
     * @type Object
     */
    var self = this;

    /**
     * La vista necesaria para llamar al Popup.
     * @private
     * @type Ti.UI.View
     */
    var body = Ti.UI.createView({
        height : Ti.UI.SIZE
    });

    var picker = Ti.UI.createPicker({
        top : 10,
        bottom : 10,
        type : options.type,
        value : options.value,
        format24 : true
    });

    body.add(picker);

    //Añadimos la vista a las opciones
    options.body = body;
    //Mostramos los botones Guardar/Cancelar
    options.buttons = Global.Control.Windows.BUTTON.SAVE_CANCEL;

    Popup.call(this, options);

    this.addEventClickButton("save", function() {
        self.fireEvent("dateTime:value", {
            value : picker.value
        });
        self.close();
    });
};
DateTime.prototype = Popup;

/**
 * El namespace Windows donde guardamos constantes y objetos relacionados con las ventanas.
 * @memberof Global.Control
 */
var Windows = {
    ICON : Icon,
    BUTTON : Buttons,
    Popup : Popup,
    Alert : Alert,
    DateTime : DateTime
};

module.exports = Windows;
