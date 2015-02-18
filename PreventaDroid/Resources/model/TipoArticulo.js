/**
 * @fileOverview En este archivo se cre el modelo "TipoArticulo" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "TipoArticulo".
 * @memberOf Global.Model
 * @extends Persistence
 */
function TipoArticulo() {
	Persistence.call(this, "tipoArticulo", Global.ConfigDB.PARAM_NAME, false);
	/**
	 * Código propio de este modelo
	 */
};

TipoArticulo.prototype = Persistence;

module.exports = TipoArticulo;
