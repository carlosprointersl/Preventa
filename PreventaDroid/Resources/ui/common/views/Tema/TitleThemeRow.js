/**
 * @fileOverview En este archivo se crea la fila de título en el listado de "Temas".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una fila que se comporta como un título de sección. No realiza ninguna acción y es solo informativa.
 * @class
 * @param {String} title El nombre del título.
 */
function TitleThemeRow(title) {
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
    var row = Ti.UI.createTableViewRow({
        height : 42,
        className : 'titleThemeRow',
        backgroundColor : Global.Theme.HEADER
    });
    
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
     * Título de la sección.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitle = Ti.UI.createLabel({
        color : Global.Theme.HEADER.TEXT,
        font : {
            fontSize : 22,
            fontWeight : 'bold'
        },
        text : title,
        left : 10
    });


    row.add(labelTitle);

    return row;
};

module.exports = TitleThemeRow;
