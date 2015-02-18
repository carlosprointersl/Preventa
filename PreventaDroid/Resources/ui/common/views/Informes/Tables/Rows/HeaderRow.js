/**
 * @fileOverview En este archivo se crea la fila que hace de cabecera en las diferentes secciones.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una "Row" que hace de cabecera.
 * @class
 * @param {Object} options Las opciones del objeto.
 * <ul>
 * <li>options.name: El nombre de la clase de la fila.</li>
 * <li>options.title: El título de la fila.</li>
 * <li>options.image: El nombre, con la extensión, de la imagen. Ha de estar en la carpeta /48 de imágenes.</li>
 * </ul>
 * @return Ti.UI.TableViewRow
 */
function HeaderRow(options) {
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
        className : "header" + options.name
    });

    /**
     * La vista que componene el fondo.
     * @private
     * @type Ti.UI.View
     */
    var content = Ti.UI.createView({
        backgroundColor : '#444444'
    });

    /**
     * La etiqueta del título.
     * @private
     * @type Ti.UI.Label
     */
    var title = Ti.UI.createLabel({
        color : "#BCBCBC",
        font : {
            fontSize : 15
        },
        text : options.title,
        width : Ti.UI.SIZE,
        left : 40
    });

    /**
     * El icono de los pedidos autoventa.
     * @private
     * @type Ti.UI.ImageView
     */
    var icon = Ti.UI.createImageView({
        image : '/images/' + options.image,
        height : 30,
        width : 30,
        left : 5
    });

    content.add(icon);
    content.add(title);
    row.add(content);

    return row;
};

module.exports = HeaderRow;
