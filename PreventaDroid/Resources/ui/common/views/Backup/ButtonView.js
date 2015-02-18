/**
 * @fileOverview En este archivo se crea la vista donde están los botones para cambiar entre bases de datos y archivos .5MX.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La librearía underscore.
 */
var _ = require('/lib/underscore');

/**
 * @class Esta clase define la vista con los botones de la ventana Backup.</br>
 */
function ButtonView() {
    /**
     * La variable Global.
     * @private
     * @type Object
     */
    var Global = require('/global/class/ReturnGlobal')();

    /**
     * Contenedor.
     * @private
     * @type Ti.UI.Window
     */
    var content = Ti.UI.createView({
        backgroundColor : Global.Theme.BUTTON.BACKGROUND,
        height : 60
    });

    /**
     * El botón para el listado de bases de datos.
     * @private
     * @type Ti.UI.Button
     */
    var butDb = Ti.UI.createButton({
        image : '/images/database_settings_32.png',
        backgroundColor : Global.Theme.BUTTON.PRESS,
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        color : Global.Theme.BUTTON.TITLE,
        font : {
            fontSize : 23,
            fontStyle : 'bold'
        },
        title : "Datos",
        height : Ti.UI.FILL,
        width : '50%',
        left : 0
    });
    content.add(butDb);

    /**
     * El botón para el listado de archivos .5MX.
     * @private
     * @type Ti.UI.Button
     */
    var but5mx = Ti.UI.createButton({
        image : '/images/file_5mx_32.png',
        backgroundColor : Global.Theme.BUTTON.BACKGROUND,
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        color : Global.Theme.BUTTON.TITLE,
        font : {
            fontSize : 23,
            fontStyle : 'bold'
        },
        title : "Envíos",
        height : Ti.UI.FILL,
        width : '50%',
        right : 0
    });
    content.add(but5mx);

    /**
     * La función que como mínimo ha de realizar el botón de base de datos.
     */
    function clickButDb() {
        //Si no está seleccionado
        if (butDb.getBackgroundColor() != Global.Theme.BUTTON.PRESS) {
            butDb.setBackgroundColor(Global.Theme.BUTTON.PRESS);
            but5mx.setBackgroundColor(Global.Theme.BUTTON.BACKGROUND);
        };
    };

    /**
     * La función que como mínimo ha de realizar el botón de archivos .5MX.
     */
    function clickBut5mx() {
        //Si está seleccionado
        if (but5mx.getBackgroundColor() != Global.Theme.BUTTON.PRESS) {
            but5mx.setBackgroundColor(Global.Theme.BUTTON.PRESS);
            butDb.setBackgroundColor(Global.Theme.BUTTON.BACKGROUND);
        };
    };

    /**
     * Añade las líneas divisorias de los botones a la vista contenedor.
     */
    function createLines() {
        //La línea horizontal
        content.add(Ti.UI.createView({
            backgroundColor : Global.Theme.BACKGROUND,
            width : Ti.UI.FILL,
            height : 0.5,
            top : 0,
            zIndex : 1
        }));
        //La línea vertical
        content.add(Ti.UI.createView({
            backgroundColor : Global.Theme.BACKGROUND,
            width : 0.5,
            height : Ti.UI.FILL,
            center : {
                x : '50%'
            },
            zIndex : 1
        }));
    };

    /**
     * Añade eventos al botón indicado.
     * @param {String} name El nombre del evento.
     * @param {Function} callback La función callback del evento.
     * @param {Number} button El número del botón ha añadir el evento. El 1 es para las bases de datos y el 2 para el listado de archivos .5MX.
     */
    this.addEventListener = function(name, callback, num) {
        if (num === 1)
            butDb.addEventListener(name, name === 'click' ? function() {
                clickButDb();
                callback();
            } : callback);
        else
            but5mx.addEventListener(name, name === 'click' ? function() {
                clickBut5mx();
                callback();
            } : callback);
    };

    /**
     * Retorna la vista con los botones y las líneas.
     * @return {Ti.UI.View} La vista que forma el menú inferior.
     */
    this.getView = function() {
        createLines();
        return content;
    };

};

module.exports = ButtonView;
