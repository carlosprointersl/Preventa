/**
 * @fileOverview En este archivo se crea la fila que indica que no existen registros.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una "Row" con el mensaje de que no existen registros.
 * @class
 * @param {Object} options Las opciones del objeto.
 * <ul>
 * <li>options.name: El nombre de la clase de la fila.</li>
 * <li>options.title: El título de la fila.</li>
 * </ul>
 * @return Ti.UI.TableViewRow
 */
function NoFoundRow(options) {
    /**
     * La varible "Global".
     * @private
     * @type Namespace
     */
    var Global = require('/global/class/ReturnGlobal')();

    /**
     * La fila.
     * @private
     * @type TableViewRow
     */
    var row = Ti.UI.createTableViewRow({
        height : 30,
        className : "noFound" + options.name,
        backgroundColor : 'gray'
    });

    /**
     * La vista que componene el fondo.
     * @private
     * @type Ti.UI.View
     */
    var content = Ti.UI.createView({
        height : 30
    });

    /**
     * La etiqueta del título.
     * @private
     * @type Ti.UI.Label
     */
    var title = Ti.UI.createLabel({
        color : "#c6c3b6",
        font : {
            fontSize : 15
        },
        text : options.title,
        width : Ti.UI.SIZE,
        left : 5
    });

    content.add(title);
    row.add(content);

    return row;
};

module.exports = NoFoundRow;
