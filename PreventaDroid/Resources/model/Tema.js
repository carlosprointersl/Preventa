/**
 * @fileOverview En este archivo se cre el modelo "Tema" y se hereda de la clase "Persistence".
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
function Tema() {
	Persistence.call(this, "tema", Global.ConfigDB.PARAM_NAME);
	/**
	 * Código propio de este modelo
	 */
};

Tema.prototype = Persistence;

module.exports = Tema;
