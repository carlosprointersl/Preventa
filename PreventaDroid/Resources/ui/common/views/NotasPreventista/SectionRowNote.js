/**
 * @fileOverview En este archivo se crea la cabecera de sección del listado de notas para el preventista.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * El título de la sección de las notas.
 */

module.exports = function(title) {
    /**
     * La fila.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var row = Ti.UI.createTableViewRow({
        backgroundColor : '#808080',
        height : Ti.UI.SIZE,
        touchEnabled : false
    });

    /**
     * El título.
     * @private
     * @type Ti.UI.Label
     */
    var label = Ti.UI.createLabel({
        color : '#FFFFFF',
        font : {
            fontSize : 18,
            fontWeight : 'bold'
        },
        text : title,
        left : 4,
        top : 2,
        bottom : 2
    });

   /**
     * Añadimos los controles a la fila y la retorna montada.
     * @return {Ti.UI.TableViewRow} La fila montada.
     */
    this.getRow = function() {
        row.add(label);

        return row;
    };
};
