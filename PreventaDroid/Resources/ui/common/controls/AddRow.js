/**
 * @fileOverview En este archivo se crea la fila de añadir elementos a un listado.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea la fila para "añadir elementos" a un listado.
 * @class
 * @param {Object} options Las opciones para configurar la fila.
 * <lo>
 * <li>options.message: El mensaje a mostrar.</li>    
 * <li>options.height: La altura de la fila.</li>
 * </lo>
 * @return {Ti.UI.TableViewRow} 
 */
function AddRow(options) {
    /**
     * La fila.
     * @private
     * @type 
     */
    var row = Ti.UI.createTableViewRow({
        height : options.height || 50,
        className : "addRow",
        backgroundColor : Global.Theme.ROW.BACKGROUND
    });
    
    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var view = Ti.UI.createView({
        height : Ti.UI.FILL,
        width : Ti.UI.SIZE,
        layout : 'horizontal',
        touchEnabled : false
    });

    /**
     * El mensaje.
     * @private
     * @type Ti.UI.Label
     */
    var labelMessage = Ti.UI.createLabel({
        color : Global.Theme.ROW.TITLE,
        font : {
            fontSize : 16
        },
        text : options.message,
        touchEnabled : false
    });
    
    /**
     * El icono "plus".
     * @private
     * @type Ti.UI.ImageView 
     */
    var icon = Ti.UI.createImageView({
        image : '/images/edit_add_48.png',
        height : (row.height - 8),
        touchEnabled : false         
    });
      
    //Añadimos los controles
    view.add(icon);
    view.add(labelMessage);

    row.add(view);

    return row;
};

module.exports = AddRow;
