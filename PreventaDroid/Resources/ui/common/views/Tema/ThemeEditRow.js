/**
 * @fileOverview En este archivo se crea la fila para mostrar los datos de un parámetro de un "Tema".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una fila para mostrar los datos de un parámetro de un "Tema".
 * @class
 * @param {String} name El nombre del parámetro.
 * @param {String} value El valor del parámetro.
 * @return {Ti.UI.View} Retorna un objeto que simula una fila de una tabla.
 */
function ThemeEditRow(name, value) {

    /**
     * La vista que compone la fila se la sección.
     * @private
     * @type Ti.UI.View
     */
    var content = Ti.UI.createView({
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        height : 70,
        width : Ti.UI.FILL,
        layout : 'horizontal'
    });

    /**
     * El contenedor para los textos
     * @private
     * @type Ti.UI.View
     */
    var viewTexts = Ti.UI.createView({
        height : 70,//Ti.UI.FILL,
        layout : 'vertical',
        width : '50%'
    });

    /**
     * El contenedor para mostrar el color.
     * @private
     * @type Ti.UI.View
     */
    var viewColor = Ti.UI.createView({
        height : 70,//Ti.UI.FILL,
        //layout : 'vertical',
        width : '50%'
    });

    /**
     * El recuadro con el color.
     * @private
     * @type Ti.UI.View
     */
    var viewRectColor = Ti.UI.createView({
        backgroundColor : value || 'transparent',
        borderColor : Global.Theme.BACKGROUND,
        borderWidth : 0.5,
        height : 60,
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
        //borderWidth : 0.1,
        height : 60,
        left : 5,
        right : 5
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
     * Nombre del parámetro.
     * @private
     * @type Ti.UI.Label
     */
    var labelName = Ti.UI.createLabel({
        //backgroundColor : 'gray',
        color : Global.Theme.ROW.TITLE,
        font : {
            fontSize : 22,
            fontWeight : 'bold'
        },
        text : name,
        left : 2,
        width : Ti.UI.FILL,
        height : 35
    });

    /**
     * El valor del color.
     * @private
     * @type Ti.UI.Label
     */
    var labelValue = Ti.UI.createLabel({
        color : Global.Theme.ROW.SUBTITLE,
        font : {
            fontSize : 16
        },
        text : value || 'NO DEFINIDO',
        height : 25,
        left : 2
    });

    /**
     * Crea la vista de edición del color. Si se guarda el color seleccionado se modifican los datos de la fila.
     * @private
     */
    function showEdit() {
        //El cuerpo de la ventana
        var body = require(Global.Path.VIEW + 'Tema/ViewPalette')(value);

        var options = {
            title : "Selección del color",
            body : body,
            buttons : Global.Control.Windows.BUTTON.SAVE_CANCEL
        };

        var Popup = require(Global.Path.CONTROL + 'Windows').Popup;
        var popup = new Popup(options);

        popup.addEventClickButton("save", function(){
            updateRow(body.getColor());
            popup.close();
        });
        
        popup.open();
    };
    
    /**
     * Actualiza los datos de la vista con el color. Si es el valor es NULL pone los valores correspondientes como "NO DEFINIDO".
     * @param {String/NULL} color El valor del color. 
     */
    function updateRow(color){
        value = color;
        labelValue.setText(color || "NO DEFINIDO");
        viewRectColor.setBackgroundColor(color || 'transparent');
    };
    
    /**
     * Retorna el valor del color actual de la fila o null en caso de no tener.
     * @return {String} Valor del color actual o NULL. 
     */
    content.getValue = function(){
        return value;
    };

    //Simula el efecto "touch" de una fila.
    content.addEventListener('touchstart', function() {
        content.setBackgroundColor(Global.Theme.ROW.PRESS);
    });

    content.addEventListener('touchend', function() {
        content.setBackgroundColor(Global.Theme.ROW.BACKGROUND);
        showEdit();
    });

    content.addEventListener('touchcancel', function() {
        content.setBackgroundColor(Global.Theme.ROW.BACKGROUND);
    });

    viewTexts.add(labelName);
    viewTexts.add(labelValue);

    noColor.add(labelNoColor);
    
    viewColor.add(noColor);
    viewColor.add(viewRectColor);

    content.add(viewTexts);
    content.add(viewColor);
    
    return content;
};

module.exports = ThemeEditRow;
