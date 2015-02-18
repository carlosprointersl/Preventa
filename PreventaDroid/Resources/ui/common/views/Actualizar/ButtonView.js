/**
 * @fileOverview En este archivo se crea la vista donde está el botón para actualizar los datos del dispositivo.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La librearía underscore.
 */
var _ = require('/lib/underscore');

/**
 * La variable Global.
 * @private
 * @type Object
 */
var Global = require('/global/class/ReturnGlobal')();

/**
 * Contenedor.
 * @private
 * @type Ti.UI.View
 */
var content = Ti.UI.createView({
    backgroundColor : Global.Theme.BUTTON.BACKGROUND,
    height : 60
});

var indicator;

/**
 * El botón para el listado de bases de datos.
 * @private
 * @type Ti.UI.Button
 */
var but = Ti.UI.createButton({
    backgroundColor : Global.Theme.BUTTON.BACKGROUND,
    backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
    color : Global.Theme.BUTTON.TITLE,
    title : 'Actualizar',
    width : Ti.UI.FILL,
    height : Ti.UI.FILL,
    image : '/images/update_32.png'
});

content.add(but);

//La línea horizontal
content.add(Ti.UI.createView({
    backgroundColor : Global.Theme.BACKGROUND,
    width : Ti.UI.FILL,
    height : 0.5,
    top : 0,
    zIndex : 1
}));

exports.content = content;
