/**
 * @fileOverview En este archivo se crea la estructura base de una fila.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea la estructura base de una fila.
 * @class Esta clase crea la estructura base de una fila, con las propiedades mas elementales. Las filas que se creen
 * han de implementar esta clase.</br>
 */
function ParentRow() {
    /**
     * La fila.
     * @type Ti.UI.TableViewRow 
     */
    this.row = Ti.UI.createTableViewRow({
        backgroundColor : Global.Theme.ROW.BACKGROUND
    });
    
};

module.exports = ParentRow;
