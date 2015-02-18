/**
 * @fileOverview En este archivo se crea una fila con el botón eliminar.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una fila con el botón eliminar.
 * @class
 * @param {Object} options Las opciones para configurar la fila.
 * <lo>
 * <li>options.title: El título de la fila.</li>
 * <li>options.id: La clave primaria o identificador de esta fila.</li>
 * <li>[options.height]: La altura de la fila.</li>
 * </lo>
 * @return {Ti.UI.TableViewRow}
 */
function DeleteRow(options) {
    /**
     * La fila.
     * @private
     * @type
     */
    var row = Ti.UI.createTableViewRow({
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        backgroundSelectedColor : Global.Theme.ROW.PRESS,
        height : options.height || 50,
        className : 'deleteRow'
    });
    
    /**
     * El id de la fila.
     * @private
     * @type Ti.UI.Label
     */
    var labelId = Ti.UI.createLabel({
        color : Global.Theme.ROW.TITLE,
        font : {
            fontSize : 16
        },
        text : options.id,
        left : 2,
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,
        touchEnabled : false
    });
    
    /**
     * El título de la fila.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitle = Ti.UI.createLabel({
        color : Global.Theme.ROW.TITLE,
        font : {
            fontSize : 16
        },
        text : options.title,
        left : 35,
        right : 60,
        height : Ti.UI.SIZE,
        touchEnabled : false
    });

    /**
     * El evento "row:delete" de la fila. Se dispara cuando pulsamos el botón de eleminar y aceptamos.
     * @event 'click'
     */
    // but.addEventListener('click', function() {
        // var options = {
            // title : "ELIMINAR FILA",
            // message : "¿Desea eliminar \"" + labelTitle.text + "\"?",
            // icon : Global.Control.Windows.ICON.QUESTION,
            // buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
        // };
// 
        // var popup = new Global.Control.Windows.Alert(options);
// 
        // popup.addEventClickButton("accept", function() {
            // row.fireEvent('row:delete');
            // popup.close();
        // });
        // popup.open();
// 
    // });

    //Añadimos los controles
    row.add(labelId);
    row.add(labelTitle);

    return row;
};

module.exports = DeleteRow;
