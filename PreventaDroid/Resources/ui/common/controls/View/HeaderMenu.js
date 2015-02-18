/**
 * @fileOverview En este archivo se crea la vista que forma el menú superior de las ventanas.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Esta clase crea una vista para la navegación por las ventanas. La función principal es el retroceso.
 * @class
 * @param {String} title El título de la ventana actual.
 * @param {String} titleBack El título de la ventana anterior.
 * @param {Function} [evetnClick] La función a realizar al pulsar el botón. Por lo general será cerrar la ventana actual.
 * @memberof Global.Control
 * @return {Ti.UI.View} La vista de la cabecera.
 */
function HeaderMenu(title, titleBack, eventClick) {
    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var viewMain = Ti.UI.createView({
        backgroundColor : "#082A3A",//Global.Theme.HEADER,
        height : 50,
        width : Ti.UI.FILL,
        layout : 'horizontal'
    });

    /**
     * El título.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitle = Ti.UI.createLabel({
        // backgroundColor : 'green',
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 19
        },
        text : title,
        height : Ti.UI.FILL,
        width : Ti.UI.FILL,
        // right : 0,
        left : 2.5,
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        //horizontalWrap : false
    });

    /**
     * El botón back.
     * @private
     * @type Ti.UI.Button
     */
    var button = createButton();
    
    // var button = Ti.UI.createButton({
        // title : titleBack,
        // color : Global.Theme.TEXT_PRINCIPAL,
        // backgroundColor : 'transparent',
        // backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        // image : Global.Path.IMAGES + '48/arrow_left_white.png',
        // height : Ti.UI.FILL,
        // font : {
            // fontSize : 9
        // },
        // width : Ti.UI.SIZE
    // });
    
    /**
     * Crea el botón BACK del menú.
     * @return {Ti.UI.View} La vista que simula la función del botón. 
     */
    function createButton(){
        //La vista contenedor.
        var content = Ti.UI.createView({
            backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
            layout : 'horizontal',
            width : Ti.UI.SIZE
        });
        
        //La imágen.
        var image = Ti.UI.createImageView({
            image : '/images/arrow_left_white_48.png',
            center : {
                y : '50%'
            },
            touchEnabled : false
        });
          
        //La etiqueta.
        var label = Ti.UI.createLabel({
            // backgroundColor : 'red',
            color : Global.Theme.TEXT_PRINCIPAL,
            font : {
                fontSize : 10
            },
            text : titleBack,
            height : Ti.UI.FILL,
            verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
            touchEnabled : false
        });
        
        //La línea divisoria
        var line = Ti.UI.createView({
            backgroundColor : Global.Theme.BACKGROUND,
            height : Ti.UI.FILL,
            width : 0.5,
            left : 5
        });
        
        content.add(image);
        content.add(label);
        content.add(line);
        
        return content;
    };

    /**
     * Acción a realizar al disparar el evento 'click' del botón.
     * @event 'click'
     */
    button.addEventListener('click', eventClick);

    viewMain.add(button);
    viewMain.add(labelTitle);

    return viewMain;
};

module.exports = HeaderMenu;
