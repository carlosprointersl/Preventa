/**
 * @fileOverview En este archivo se cre el modelo "TipoIncidencia" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "TipoIncidencia".
 * @memberOf Global.Model
 * @extends Persistence
 */
function TipoIncidencia() {
	Persistence.call(this, "tipoIncidencia", Global.ConfigDB.PARAM_NAME, false);
	/**
	 * Código propio de este modelo
	 */
};

TipoIncidencia.prototype = Persistence;

module.exports = TipoIncidencia;