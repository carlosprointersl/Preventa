/**
 * @fileOverview En este archivo se cre el modelo "Vehiculo" y se hereda de la clase "Persistence".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "Vehiculo".
 * @memberOf Global.Model
 * @extends Persistence
 */
function Vehiculo() {
	Persistence.call(this, "vehiculo", Global.ConfigDB.PARAM_NAME);
	/**
	 * Código propio de este modelo
	 */
};

Vehiculo.prototype = Persistence;

module.exports = Vehiculo;
