/**
 * @fileOverview En este archivo se cre el modelo "Kilometraje" y se hereda de la clase "Persistence".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "Kilometraje".
 * @memberOf Global.Model
 * @extends Persistence
 */
function Kilometraje() {
	Persistence.call(this, "kilometraje", Global.ConfigDB.PARAM_NAME);
	/**
	 * Código propio de este modelo
	 */
};

Kilometraje.prototype = Persistence;

module.exports = Kilometraje;
