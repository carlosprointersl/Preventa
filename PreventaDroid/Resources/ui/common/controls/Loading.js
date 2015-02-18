/**
 * @fileOverview En este archivo se crea el mensaje de "Cargando...". 
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una ventana con el mensaje "Cargando...".
 * @class 
 * @memberOf Global.Control
 * @param {Object} [options] Las opciones que se pueden editar del objeto.
 */
function Loading(options) {
    
    /**
     * El mensaje de "Cargando..." por defecto.
     * @private
     * @type Ti.UI.ActivityIndicator
     */
    var activityIndicator = Ti.UI.createActivityIndicator({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontFamily : 'Helvetica Neue',
            fontSize : 22,
            fontWeight : 'bold'
        },
        message : 'Cargando...',
        style : Ti.UI.ActivityIndicatorStyle.PLAIN
    });

    /**
     * La vista que contiene el mensaje.
     * @private
     * @type Ti.UI.View
     */
    var content = Ti.UI.createView({
        height : 70,
        width : 170,
        backgroundColor : Global.Theme.POPUP.BACKGROUND,
        opacity : 0
    });
    
    //Modificamos las opciones si se han indicado.
    activityIndicator.color = options != undefined ? options.color || activityIndicator.color : activityIndicator.color;
    activityIndicator.font = options != undefined ? options.font || activityIndicator.font : activityIndicator.font;
    activityIndicator.message = options != undefined ? options.message || activityIndicator.message : activityIndicator.message;
    activityIndicator.style = options != undefined ? options.style || activityIndicator.style : activityIndicator.style;
    content.height = options != undefined ? options.height || content.height : content.height;
    content.width = options != undefined ? options.width || content.width : content.width;
    content.left = options != undefined ? options.left : content.left;
    content.right = options != undefined ? options.right : content.right;
    content.top = options != undefined ? options.top : content.top;
    content.bottom = options != undefined ? options.bottom : content.bottom;
    content.backgroundColor = options != undefined ? options.backgroundColor || content.backgroundColor : content.backgroundColor;
    
    //Añadimos el "indicator" a la vista.
    content.add(activityIndicator);
    
    /**
     * Muestra el mensaje.
     */
    content.show = function(){
        activityIndicator.show();
        content.animate(Ti.UI.createAnimation({
            opacity : 1,
            height : 70,
            duration : 250
        }));
    };    
    
    /**
     * Esconde el mensaje.
     */
    content.hide = function(){
        content.animate(Ti.UI.createAnimation({
            opacity : 0,
            height : 0,
            duration : 250
        }));
        activityIndicator.hide();
    };
    
    /**
     * Cambiar el valor del mensaje.
     * @param {String} value El mensaje a mostrar.
     */
    content.setMessage = function(value){
        activityIndicator.setMessage(value);
    };

    return content;    
};

module.exports = Loading;
