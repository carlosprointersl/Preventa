/**
 * @fileOverview En este archivo se crea el botón para los menús.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * @class Esta clase crea el botón para los menús de edición.
 * @param {String} title El texto del botón.
 * @param {String} image La dirección de la imágen dentro de la carpeta de imágenes de la aplicación.
 * @param {Number/String} width El ancho del botón. 
 */
function MenuButton(title, image, width) {
    /**
     * La vista que hace de botón.
     * @private
     * @type Ti.UI.View
     */
    var button = Ti.UI.createView({
        backgroundColor : Global.Theme.BUTTON.BACKGROUND,
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        height : Ti.UI.FILL,
        width : width
    });
    /**
     * La imágen del botón.
     * @private
     * @type Ti.UI.View
     */
    var image = Ti.UI.createImageView({
        image : '/images/' + image,
        width : Ti.UI.FILL,
        top : 2,
        touchEnabled : false
    });
    /**
     * La acción del botón.
     * @private
     * @type Ti.UI.View
     */
    var label = Ti.UI.createLabel({
        text : title,
        color : Global.Theme.BUTTON.TITLE,
        font : {
            fontSize : 12.10
        },
        bottom : 3,
        touchEnabled : false
    });
    
    /**
     * Modifica el color del texto.
     * @param {String} color El color que tendrá el texto del botón. 
     */
    button.setColor = function(color){
        label.setColor(color);
    };

    button.add(image);
    button.add(label);

    return button;
};

module.exports = MenuButton;
