/**
 * @fileOverview En este archivo se crea la fila para mostrar los "Temas".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una fila para el menú de "Temas".
 * @class
 * @param {Object} theme Los datos del "Tema".
 */
function ThemeRow(theme) {
    /**
     * La variable Global.
     * @private
     * @type Object 
     */
    var Global = require('/global/class/ReturnGlobal')();
    
    /**
     * La fila.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var row = require(Global.Path.CONTROL + 'Row/SimpleRow')();
    
    //Modificamos las opciones de la vista "content" del "row".
    row.setClassName('themeRow');
    row.setHeight(70);

    /**
     * El contenedor para los textos
     * @private
     * @type Ti.UI.View
     */
    var viewTexts = Ti.UI.createView({
        height : Ti.UI.FILL,
        width : Ti.UI.FILL
    });

    /**
     * Nombre del tema.
     * @private
     * @type Ti.UI.Label
     */
    var labelName = Ti.UI.createLabel({
        color : Global.Theme.ROW.TITLE,
        font : {
            fontSize : 22,
            fontWeight : 'bold'
        },
        text : theme.nombre,
        left : 10
    });


    /**
     * Marca o desmarca la fila, según convenga, cambiando el color de fondo de la fila.
     */
    row.click = function() {
        if (row.getBackgroundColor() === Global.Theme.ROW.BACKGROUND) {
            row.setBackgroundColor(Global.Theme.ROW.PRESS);
        } else {
            row.setBackgroundColor(Global.Theme.ROW.BACKGROUND);
        };
    };
    
    /**
     * Retorna el theme.
     * @return {Object} EL theme. 
     */
    row.getTheme = function(){
        return theme;
    };
    
    viewTexts.add(labelName);

    row.add(viewTexts);

    return row;
};

module.exports = ThemeRow;
