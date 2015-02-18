/**
 * @fileOverview En este archivo se cre el modelo "CabeceraPedido" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "CabeceraPedido".
 * @memberOf Global.Model
 * @extends Persistence
 */
function CabeceraPedido() {
	Persistence.call(this, "CabeceraPedido", Global.ConfigDB.SEND_NAME);
	/**
	 * Código propio de este modelo
	 */
};

CabeceraPedido.prototype = Persistence;

module.exports = CabeceraPedido;