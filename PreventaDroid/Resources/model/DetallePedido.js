/**
 * @fileOverview En este archivo se cre el modelo "DetallePedido" y se hereda de la clase "Persistence".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "DetallePedido".
 * @memberOf Global.Model
 * @extends Persistence
 */
function DetallePedido() {
	Persistence.call(this, "DetallePedido", Global.ConfigDB.SEND_NAME);
	/**
	 * Código propio de este modelo
	 */
	
};

DetallePedido.prototype = Persistence;

module.exports = DetallePedido;
