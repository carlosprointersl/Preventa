/**
 * @fileOverview En este archivo se cre el modelo "TipoEstablecimiento" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "TipoEstablecimiento".
 * @memberOf Global.Model
 * @extends Persistence
 */
function TipoEstablecimiento() {
	Persistence.call(this, "tipoEstablecimiento", Global.ConfigDB.PARAM_NAME, false);
	/**
	 * Código propio de este modelo
	 */
};

TipoEstablecimiento.prototype = Persistence;

module.exports = TipoEstablecimiento;
