/**
 * @fileOverview En este archivo se crea la vista con la paleta de colores.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una vista que contiene la paleta de colores para seleccionar uno.
 * @class
 * @param {String} [color] El valor del color seleccionado.
 */
function ViewPalette(color) {
    /**
     * La variable Global.
     * @private
     */
    var Global = require('/global/class/ReturnGlobal')();

    /**
     * Los colores de muestra.
     * @private
     * @type String[]
     */
    var sampleColors = ["#FFFFFF", "#000000", "#000080", "#0000FF", "#008000", "#008080", "#00FF00", "#00FFFF", "#800000", "#800080", "#808000", "#808080", "#C0C0C0", "#FF0000", "#FF7F00", "#FFFF00"];

    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var main = Ti.UI.createView({
        layout : 'vertical',
        height : Ti.UI.SIZE
    });

    /**
     * La vista donde están los colores comunes.
     * @private
     * @type Ti.UI.View
     */
    var commonColors = Ti.UI.createView({
        // backgroundColor : 'orange',
        borderColor : Global.Theme.BACKGROUND,
        borderWidth : 0.5,
        layout : 'vertical',
        top : 5,
        left : 5,
        right : 5,
        bottom : 5,
        height : Ti.UI.SIZE
    });

    /**
     * La vista de edición del color.
     * @private
     * @type Ti.UI.View
     */
    var editColor = Ti.UI.createView({
        // backgroundColor : 'white',
        layout : 'horizontal',
        height : 50
    });

    /**
     * La vista para mostrar el color.
     * @private
     * @type Ti.UI.View
     */
    var showColor = Ti.UI.createView({
        backgroundColor : 'transparent',
        borderColor : Global.Theme.BACKGROUND,
        borderWidth : 0.5,
        top : 5,
        bottom : 5,
        left : 5,
        right : 5
    });

    /**
     * La vista para mostrar el mensaje de que no hay color.
     * @private
     * @type Ti.UI.View
     */
    var noColor = Ti.UI.createView({
        backgroundColor : '#808080',
        borderWidth : 0.1,
        top : 5,
        bottom : 5,
        left : 5,
        right : 5
    });

    /**
     * La vista que contiene al color.
     * @private
     * @type Ti.UI.View
     */
    var showContentColor = Ti.UI.createView({
        width : '45%',
        height : 50
    });

    /**
     * El icono "#".
     * @private
     * @type Ti.UI.ImageView
     */
    var icon = Ti.UI.createImageView({
        width : '14.9%',
        image : '/images/hash_32.png'
    });

    /**
     * El campo de texto para introducir el color.
     * @private
     * @type Ti.UI.TextField
     */
    var text = Ti.UI.createTextField({
        value : color != null ? color.replace("#", "") : color,
        width : '40%',
        top : 5,
        maxLength : 6
    });

    /**
     * Al cambiar el valor del texto modificamos el color de la muestra.
     * @private
     * @event 'change'
     */
    text.addEventListener('change', function(e) {
        showColor.setBackgroundColor(Global.Functions.isColor('#' + e.source.value) ? '#' + e.source.value : "transparent");
    });

    /**
     * No color.
     * @private
     * @type Ti.UI.Label
     */
    var labelNoColor = Ti.UI.createLabel({
        text : 'NO COLOR'
    });
    
    /**
     * Retorna el valor del color seleccionado.
     * @return {String} El valor del color actual o null si no tiene ninguno. 
     */
    main.getColor = function(){
        return showColor.getBackgroundColor() != 'transparent' ? showColor.getBackgroundColor() : null ;  
    };

    //Ponemos los colores de muestra en la vista correspondiente.
    //Hacemos dos recorridos de 4x4.
    for (var i = 0; i < 4; i++) {
        var rowColors = Ti.UI.createView({
            height : Ti.UI.SIZE,
            layout : 'horizontal'
        });
        for (var x = 0; x < 4; x++) {
            var sampleView = Ti.UI.createView({
                backgroundColor : sampleColors[i * 4 + x],
                height : 50,
                width : x != 3 ? '25%' : '24.5%' 
            });
            
            sampleView.addEventListener('click', function(e){
                text.setValue(e.source.getBackgroundColor().replace("#", ""));
             });
            
            rowColors.add(sampleView);
        };
        
        commonColors.add(rowColors);
    };

    noColor.add(labelNoColor);

    showContentColor.add(noColor);
    showContentColor.add(showColor);

    editColor.add(icon);
    editColor.add(text);
    editColor.add(showContentColor);

    main.add(commonColors);
    main.add(editColor);

    return main;
};

module.exports = ViewPalette;
