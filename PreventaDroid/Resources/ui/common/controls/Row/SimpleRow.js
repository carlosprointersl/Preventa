/**
 * @fileOverview En este archivo se crea la estructura genérica de una fila sencilla.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * El control "ParentRow".
 * @class Crea la estructura base de una fila.
 */
var ParentRow = Global.Control.Row.ParentRow;

/**
 * Crea la estructura genérica de una fila sencilla.
 * @class Esta clase crea la estructura genérica de una fila sencilla.</br>
 * @extends ParentRow
 */
function SimpleRow() {
    ParentRow.call(this);

    return this.row;
};
module.prototype = ParentRow;

module.exports = SimpleRow;
