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
 * <li>title: El título que aparece en la ventana.</li>
 * <li>body: La vista(View) central, el cuerpo de la ventana.</li>
 * <li>foot - Buttons: La vista del "Pie". Los botones son opcionales.</li>
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
    var heightFoot = options.heightFoot != undefined ? options.heightFoot : 50;

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
     * La vista 'scroll' que permite que se mueva la ventana al aparecer el teclado.
     * @private
     * @type Ti.UI.ScrollView
     */
    var viewBody = Ti.UI.createScrollView({
        contentHeight : 'auto',
        height : Ti.UI.FILL,
        layout : 'vertical',
        showVerticalScrollIndicator : true,
        showHorizontalScrollIndicator : false,
        height : Ti.UI.FILL,
        scrollType : 'vertical'
    });
    win.add(viewBody);

    /**
     * La vista principal. Es la que contiene todos los elementos.
     * @private
     * @type Ti.UI.View
     */
    var viewMain = Ti.UI.createView({
        height : options.height || Ti.UI.SIZE,
        width : options.width || 300,
        top : options.top || undefined,
        bottom : options.bottom || undefined,
        left : options.left,
        right : options.right,
        backgroundColor : Global.Theme.POPUP.BACKGROUND,
        layout : 'vertical'
    });

    /**
     * La vista header. Es la que contiene la cabecera([icon] - title).
     * @private
     * @type Ti.UI.View
     */
    var header = Ti.UI.createView({
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
    body.setBackgroundColor(body.backgroundColor == undefined ? 'transparent' : body.backgroundColor);

    /**
     * La vista Foot. Esta vista es opcional.
     * @private
     * @type Ti.UI.View
     */
    var foot = Ti.UI.createView({
        width : Ti.UI.FILL,
        height : heightFoot
    });

    /**
     * La etiqueta para el título de la ventana.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitle = Ti.UI.createLabel({
        color : Global.Theme.POPUP.TEXT,
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
        height : heightFoot,
        backgroundColor : Global.Theme.POPUP.BACKGROUND,
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        color : Global.Theme.BUTTON.TITLE,
        image : '/images/check_32.png'
    });

    /**
     * Botón Cancelar.
     * @private
     * @type Ti.UI.Button
     */
    var butCancel = Ti.UI.createButton({
        title : 'Cancelar',
        width : Ti.UI.FILL,
        height : heightFoot,
        backgroundColor : Global.Theme.POPUP.BACKGROUND,
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        color : Global.Theme.BUTTON.TITLE,
        image : '/images/cancel_32.png'
    });

    /**
     * Botón Guardar.
     * @private
     * @type Ti.UI.Button
     */
    var butSave = Ti.UI.createButton({
        title : 'Guardar',
        width : Ti.UI.FILL,
        height : heightFoot,
        backgroundColor : Global.Theme.POPUP.BACKGROUND,
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        color : Global.Theme.BUTTON.TITLE,
        image : '/images/save_32.png'
    });

    /**
     * Inicializa la ventana, añadiendo todos los elementos.
     */
    (function() {
        if (options.icon != undefined) {
            header.add(createIcon());
            labelTitle.setWidth(Ti.UI.SIZE);
        };
        header.add(labelTitle);

        addButtons();

        viewMain.add(header);
        viewMain.add(Ti.UI.createView({
            backgroundColor : Global.Theme.POPUP.LINES,
            width : Ti.UI.FILL,
            height : 0.5
        }));
        viewMain.add(body);
        viewMain.add(Ti.UI.createView({
            backgroundColor : Global.Theme.POPUP.LINES,
            width : Ti.UI.FILL,
            height : 0.5
        }));
        viewMain.add(foot);
        if (options.footVisible != undefined && !options.footVisible) {
            viewMain.remove(foot);
        };

        win.add(viewMain);
    })();

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
                icon.image = '/images/popup_exclamation.png';
                break;
            case Icon.QUESTION:
                icon.image = '/images/popup_question.png';
                break;
            case Icon.INFORMATION:
                icon.image = '/images/popup_information.png';
                break;
            case Icon.ERROR:
                icon.image = '/images/popup_delete.png';
                break;
        };

        return icon;
    };

    /**
     * Crea una vista contenedor para los botones y otra, que se coloca encima de esta, con las líneas de separación de los botones.
     * @private
     * @param {Ti.UI.Button[]} _buttons Un array con los botones que hemos de insertar.
     */
    function adaptButtons(_buttons) {
        //View content
        var content = Ti.UI.createView({
            layout : 'horizontal',
            height : heightFoot,
            zIndex : 1
        });
        //El ancho de cada botón.
        var width = (100 / _buttons.length);
        //Insertamos los botones.
        for (var i = 0; i < _buttons.length; i++) {
            _buttons[i].setWidth(width + "%");
            //Los ponemos en la posición correcta.
            content.add(_buttons[i]);
        };

        //Insertamos las líneas de los botones.
        for (var i = 1; i < _buttons.length; i++) {
            foot.add(Ti.UI.createView({
                backgroundColor : Global.Theme.POPUP.LINES,
                width : 0.5,
                height : heightFoot,
                center : {
                    x : (width * i) + '%'
                },
                zIndex : 2
            }));
        };

        foot.add(content);

    };

    /**
     * Crea los botones que deben aparecer en el pie y los retorna en un array. Los datos los recupera de la variable "buttons", que se inicializa con los datos introducidos.
     * @example
     * <ol>
     * <li>buttons[x].title: El texto del botón</li>
     * <li>buttons[x].image: La url de la imágen del botón</li>
     * <li>buttons[x]: Global.Windows.Buttons.*</li>
     * </ol>
     * @return {Ti.UI.Button[]} Array con los botones que aparecen en el pie.
     */
    function createButtons() {
        //El array con los botones montados.
        var _buttons = new Array();

        //Si es un número es una constante de "Buttons".
        for (var i = 0, j = buttons.length; i < j; i++) {

            _buttons.push( typeof buttons[i] === 'object' ? Ti.UI.createButton({
                title : buttons[i].title,
                width : Ti.UI.FILL,
                height : heightFoot,
                backgroundColor : Global.Theme.POPUP.BACKGROUND,
                backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
                color : Global.Theme.BUTTON.TITLE,
                image : buttons[i].image
            }) : returnButton(buttons[i]));
        };

        return _buttons;
    };

    /**
     * Retorna el botón o botones correspondientes según la constante "Buttons".
     * @param {Number} value El valor de la constante "Buttons".
     * @return {Ti.UI.Button, Ti.UI.Button[]} El botón o botones correspondientes o null si no es un número válido.
     */
    function returnButton(value) {
        switch(value) {
            case Buttons.ACCEPT:
                return butAccept;
                break;
            case Buttons.CANCEL:
                return butCancel;
                break;
            case Buttons.SAVE:
                return butSave;
                break;
            case Buttons.ACCEPT_CANCEL:
                return [butAccept, butCancel];
                break;
            case Buttons.SAVE_CANCEL:
                return [butSave, butCancel];
                break;
        };

        return null;
    };

    /**
     * Añade los botones que estén configurados a la vista del pie(Foot);
     * @private
     */
    function addButtons() {
        //Si es un entero añadimos los botones prediseñados.
        if (!Array.isArray(buttons)) {
            var but = returnButton(buttons);
            //Si es uno lo añadimos al pie, si son dos hemos de adaptarlos al tamaño.
            if (!Array.isArray(but)) {
                foot.add(but);
            } else {
                adaptButtons(but);
            };
        } else {
            adaptButtons(createButtons());
        };
    };

    /**
     * Monta una ventana con los datos actuales y la abre.
     */
    this.open = function() {
        if(options.preventBack){
         //   win.addEventListener('android:back', function(){
                
            //});
        }
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
     * Añade el evento click al botón que le indiquemos. Para ello le indicamos la posición de este.
     * @param {Number} index La posición del botón en el pie.
     * @param {Function} callback La función que queremos que realice en el evento "click" del botón.
     */
    this.addEventClickButtonIndex = function(index, callback) {
        try {
            foot.children[foot.children.length - 1].children[index].addEventListener('click', callback);
        } catch(error) {
            //Mensaje de error, el índice no es válido.
            Ti.API.error(error);
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
                butAccept.setBackgroundColor( value ? 'transparent' : Global.Theme.OBJECT_DISABLED);
                break;
            case "save":
                butSave.setEnabled(value);
                butSave.setBackgroundColor( value ? 'transparent' : Global.Theme.OBJECT_DISABLED);
                break;
            case "cancel":
                butCancel.setEnabled(value);
                butCancel.setBackgroundColor( value ? 'transparent' : Global.Theme.OBJECT_DISABLED);
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
        height : options.bodyHeight || 70
    });

    /**
     * La etiqueta que muestra el mensaje
     * @private
     * @type Ti.UI.Label
     */
    var message = Ti.UI.createLabel({
        color : Global.Theme.POPUP.TEXT,
        font : {
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

    /**
     * Cambia el mensaje a mostrar.
     * @param {String} value El valor del mensaje a mostrar.
     */
    self.setMessage = function(value) {
        message.setText(value);
    };
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
 * @class Crea una ventana para mostrar la descarga de archivos con una barra de progreso.
 * @memberOf Global.Control.Windows
 * @param {Object} options Las opciones para el objeto.
 * <ol>
 * <li>options.min: {Number} El valor mínim de la barra de progreso.</li>
 * <li>options.max: {Number} El valor máximo de la barra de progreso.</li>
 * </ol>
 */
function DownloadFile(options) {
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
        height : Ti.UI.SIZE,
        layout : 'vertical'
    });

    /**
     * Indica el estado de la descarga
     * @private
     * @type Ti.UI.Label
     */
    var state = Ti.UI.createLabel({
        color : Global.Theme.POPUP.TEXT,
        font : {
            fontSize : 17
        },
        text : 'Descargados 0/' + options.max + ' KB - 0%',
        left : 5,
        width : Ti.UI.FILL
    });
    body.add(state);
    
    /**
     * Indica el nombre del archivo
     * @private
     * @type Ti.UI.Label
     */
    var name = Ti.UI.createLabel({
        color : Global.Theme.POPUP.TEXT,
        font : {
            fontSize : 17
        },
        text : 'Archivo: ',
        left : 5,
        width : Ti.UI.FILL
    });
    body.add(name);
    
    /**
     * La barra de progreso.
     * @private
     * @type Ti.UI.ProgressBar 
     */
    var bar = Ti.UI.createProgressBar({
        min : options.min,
        max : options.max,
        value : options.min,
        left : 5,
        right : 5,
        bottom : 10
    });
    body.add(bar);

    //Añadimos la vista a las opciones
    options.body = body;
    //Mostramos el botón Cancelar
    options.buttons = Global.Control.Windows.BUTTON.CANCEL;
    
    /**
     * Cambia el nombre del archivo.
     * @param {String} value El nombre del archivo actual. 
     */
    this.setName = function(value){
        name.setText('Archivo: ' + value);
    };
    
    /**
     * Cambia el valor de la cantidad descargada.
     * @param {String} value La cantidad descargada. 
     */
    this.setValue = function(value){
        bar.setValue(value);
        state.setText('Descargados ' + parseInt(value) + '/' + options.max + ' KB - ' + parseInt((value * 100) / options.max) + '%');
    };

    Popup.call(this, options);

};
DownloadFile.prototype = Popup;

/**
 * El namespace Windows donde guardamos constantes y objetos relacionados con las ventanas.
 * @memberof Global.Control
 */
var Windows = {
    ICON : Icon,
    BUTTON : Buttons,
    Popup : Popup,
    Alert : Alert,
    DateTime : DateTime,
    DownloadFile : DownloadFile
};

module.exports = Windows;
