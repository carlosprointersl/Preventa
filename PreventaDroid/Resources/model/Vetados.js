/**
 * @fileOverview En este archivo se cre el modelo "Vetados" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "Vetados".
 * @memberOf Global.Model
 * @extends Persistence
 */
function Vetados() {
	Persistence.call(this, "Vetados", Global.ConfigDB.PIT_FILE_NAME);
	/**
	 * Código propio de este modelo
	 */
};

Vetados.prototype = Persistence;

module.exports = Vetados;