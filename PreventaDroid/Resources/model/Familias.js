/**
 * @fileOverview En este archivo se cre el modelo "Familias" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "Familias".
 * @memberOf Global.Model
 * @extends Persistence
 */
function Familias() {
	Persistence.call(this, "Articulos", Global.ConfigDB.PIT_FILE_NAME);
	/**
	 * Código propio de este modelo
	 */
};

Familias.prototype = Persistence;

module.exports = Familias;
