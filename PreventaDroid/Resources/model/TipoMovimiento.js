/**
 * @fileOverview En este archivo se cre el modelo "TipoMovimiento" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "TipoMovimiento".
 * @memberOf Global.Model
 * @extends Persistence
 */
function TipoMovimiento() {
	Persistence.call(this, "tipoMovimiento", Global.ConfigDB.PARAM_NAME, false);
	/**
	 * Código propio de este modelo
	 */
};

TipoMovimiento.prototype = Persistence;

module.exports = TipoMovimiento;
