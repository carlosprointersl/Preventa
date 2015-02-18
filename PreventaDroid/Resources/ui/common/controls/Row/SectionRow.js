/**
 * @fileOverview En este archivo se crea una sección para una tabla.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * @class Crea una sección para una tabla.
 */
module.exports = function() {
    /**
     * La fila.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var row;

    /**
     * El título.
     * @private
     * @type Ti.UI.Label
     */
    var label;

    /**
     * Inicializa los controles.
     */
    function initialize() {
        //La etiqueta.
        label = Ti.UI.createLabel({
            color : '#FFFFFF',
            font : {
                fontSize : 18,
                fontWeight : 'bold'
            },
            // text : title,
            left : 4,
            // top : 2,
            // bottom : 2
        });
        
        //La vista contenedor
        var view = Ti.UI.createView({
            backgroundColor : '#808080',
            height : 25             
        });
        view.add(label);
        
        //La sección.
        row = Ti.UI.createTableViewSection({
            height : Ti.UI.SIZE,
            headerView : view
        });
    };

    /**
     * Añadimos los controles a la fila y la retorna montada.
     * @param {String} title El título de la sección.
     * @return {Ti.UI.TableViewSection} La fila montada.
     */
    this.getRow = function(title) {
        initialize();
        label.setText(title);
        //row.add(label);

        return row;
    };
};
