/**
 * @fileOverview En este archivo se crea la fila para mostrar las "Plantillas".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una fila con los datos de una "plantilla".
 * @class
 * @param {Object} template Los datos de una plantilla.
 */
function TemplateRow(template) {
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
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        height : 70,
        layout : 'vertical',
        className : 'templateRow'
    });
    
    /**
     * Descripcion.
     * @private
     * @type Ti.UI.Label
     */
    var labelDescription = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 22,
            fontWeight : 'bold'
        },
        text : template.Descripcion,
        left : 2,
        width : Ti.UI.FILL,
        height : 35
    });

    /**
     * El código.
     * @private
     * @type Ti.UI.Label
     */
    var labelCode = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 16
        },
        text : template.CodigoPlantilla || "Nueva",
        left : 2,
        width : Ti.UI.FILL,
        height : 35
    });

    /**
     * Marca o desmarca la fila, según convenga, cambiando el color de fondo de la fila.
     * @event 'click'
     */
    row.addEventListener('click', function(e){
        //Ti.API.warn("El evento 'click' - Objeto: " + e.source + "\Color: " + e.row.getBackgroundColor());
        e.row.setBackgroundColor(e.row.getBackgroundColor() === Global.Theme.ROW.BACKGROUND ? Global.Theme.ROW.PRESS : Global.Theme.ROW.BACKGROUND);
    });
    
    /**
     * Los datos de la fila.
     * @type Object 
     */
    row.data = template;
    
    row.add(labelDescription);
    row.add(labelCode);

    return row;
};

module.exports = TemplateRow;
