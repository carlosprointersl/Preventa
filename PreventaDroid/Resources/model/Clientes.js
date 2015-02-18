/**
 * @fileOverview En este archivo se cre el modelo "Clientes" y se hereda de la clase "Persistence".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "Clientes".
 * @memberOf Global.Model
 * @extends Persistence
 */
function Clientes() {
	Persistence.call(this, "Clientes", Global.ConfigDB.PIT_FILE_NAME);
	/**
	 * Código propio de este modelo
	 */
};

Clientes.prototype = Persistence;

module.exports = Clientes;
