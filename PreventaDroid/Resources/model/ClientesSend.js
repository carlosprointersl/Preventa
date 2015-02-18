/**
 * @fileOverview En este archivo se crea el modelo "ClientesSend" y se hereda de la clase "Persistence".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "Clientes" de la base de datos "SEND".
 * @memberOf Global.Model
 * @extends Persistence
 */
function ClientesSend() {
	Persistence.call(this, "Clientes", Global.ConfigDB.SEND_NAME, false);
	/**
	 * Código propio de este modelo
	 */
};

ClientesSend.prototype = Persistence;

module.exports = ClientesSend;
