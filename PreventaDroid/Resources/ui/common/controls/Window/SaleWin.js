/**
 * @fileOverview En este archivo se crea una ventana para introducir las unidades de venta de un artículo, tanto invidual como en promoción.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La librería underscore.js
 */
// var _ = require('/lib/underscore');

/**
 * La variable Global
 */
var Global = new (require('/global/class/ReturnGlobal'))();

/**
 * Esta clase crea una ventana que es el esqueleto para introcudir las unidades de venta de los artículos. Este esqueleto
 * sirve tanto para los artículos inviduales como en promoción.
 * @class
 * @param {String} title El título de la ventana actual.
 * @param {String} subTitle El subtítulo. Es el nombre de la promoción o el nombre del artículo.
 * @param {String} backTitle El título del botón de retroceso.
 * @param {Object} body Es el CONTROL que realiza toda la acción. Es donde se realiza la promoción o se introducen las unidades.
 * @param {Boolean} [del = false] Indica si se ha de mostrar el botón para eliminar la fila de la tabla del pedido.
 * @param {Function} [actionBack] La función a realizar al pulsar el botón de retroceso. Por defecto cierra la ventana actual.
 * @memberof Global.Control
 * @return {Ti.UI.Window} La ventana para las unidades de venta.
 */
function SaleWin(title, subTitle, backTitle, body, del, actionBack) {
    //Aañdimos el valor por defecto;
    var del = del || false;

    /**
     * La ventana principal.
     * @private
     * @type Ti.UI.Window
     */
    var win = Ti.UI.createWindow({
        backgroundColor : Global.Theme.BACKGROUND,
        navBarHidden : true,
        orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
    });

    /**
     * HeaderMenu
     * @private
     * @type Ti.UI.View
     */
    var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')(title, backTitle, actionBack ||
    function() {
        win.close();
    });
    headerMenu.setTop(0);
    win.add(headerMenu);

    /**
     * El nombre del artículo o promoción.
     * @private
     * @type Ti.UI.Label
     */
    var name = Ti.UI.createLabel({
        top : 50,
        height : 25,
        width : Ti.UI.FILL,
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 18,
            fontWeight : 'bold'
        },
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        text : subTitle
    });
    win.add(name);

    /**
     * El botón para aceptar.
     * @private
     * @type Ti.UI.Button
     */
    var butAccept = Ti.UI.createButton({
        backgroundColor : Global.Theme.BUTTON.BACKGROUND,
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        color : Global.Theme.BUTTON.TITLE,
        title : 'Aceptar',
        width : del ? '50%' : Ti.UI.FILL,
        height : 60,
        left : del ? 0 : undefined,
        image : '/images/save_32.png',
        bottom : 0
    });
    win.add(butAccept);

    /**
     * El botón para eliminar.
     * @private
     * @type Ti.UI.Button
     */
    var butDel = Ti.UI.createButton({
        backgroundColor : Global.Theme.BUTTON.BACKGROUND,
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        color : Global.Theme.BUTTON.TITLE,
        title : 'Eliminar',
        width : '50%',
        height : 60,
        right : 0,
        image : '/images/delete_32.png',
        bottom : 0
    });

    //Si debe aparecer el botón de eliminar
    if (del) {
        win.add(butDel);
        //Añadimos la línea divisoria
        win.add(Ti.UI.createView({
            backgroundColor : Global.Theme.BACKGROUND,
            width : 0.5,
            height : 60,
            bottom : 0,
            zIndex : 1,
            center : {
                x : '50%'
            }
        }));
    };

    //Añadimos el cuerpo a la ventana.
    body.setTop(75);
    body.setBottom(60);
    win.add(body);

    /**
     * Añade eventos a los botones.
     * @param {Number} typeBut Indica el botón al que se ha de añadir el evento.
     * @param {String} event El nombre del evento.
     * @param {Function} callback La función que se ejecuta en el evento.
     */
    this.addEventListener = function(typeBut, event, callback) {
        //El tipo de botón
        switch(typeBut) {
            case this.BUTTON_ACCEPT:
                butAccept.addEventListener(event, callback);
                break;
            case this.BUTTON_DELETE:
                butDel.addEventListener(event, callback);
                break;
        };
    };

    /**
     * Activa o bloquea el botón "Aceptar" según convenga.
     * @param {Boolean} state El estado del botón. TRUE es activo y FALSE es inactivo.
     */
    this.buttonState = function(state) {
        //Si el estado es diferente lo cambiamos
        if (butAccept.getEnabled() != state) {
            butAccept.setBackgroundColor( state ? Global.Theme.BUTTON.BACKGROUND : Global.Theme.OBJECT_DISABLED);
            butAccept.setEnabled(state);
        };
    };

    /**
     * Retorna la ventana principal.
     * @return {Ti.UI.Window}
     */
    this.getWin = function() {
        return win;
    };

};

/**
 * Las constantes que indican el tipo de botón.
 * @namespace Constants
 */
var Constants = {};
//Añadimos la constante BUTTON_ACCEPT
Object.defineProperty(Constants, "BUTTON_ACCEPT", {
    get : function() {
        return 0;
    }
});
Object.defineProperty(Constants, "BUTTON_DELETE", {
    get : function() {
        return 1;
    }
});
//Añadimos la constante BUTTON_ACCEPT
SaleWin.prototype = Constants;

module.exports = SaleWin; 