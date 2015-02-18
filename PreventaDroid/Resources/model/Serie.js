/**
 * @fileOverview En este archivo se cre el modelo "Serie" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "Serie".
 * @memberOf Global.Model
 * @extends Persistence
 */
function Serie() {
	Persistence.call(this, "serie", Global.ConfigDB.PARAM_NAME, false);
	/**
	 * Código propio de este modelo
	 */
};

Serie.prototype = Persistence;

module.exports = Serie;
