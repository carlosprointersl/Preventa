/**
 * @fileOverview En este archivo se cre el modelo "NotasClientes" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "NotasClientes".
 * @memberOf Global.Model
 * @extends Persistence
 */
function NotasClientes() {
	Persistence.call(this, "NotasClientes", Global.ConfigDB.PIT_FILE_NAME, false);
	/**
	 * Código propio de este modelo
	 */
};

NotasClientes.prototype = Persistence;

module.exports = NotasClientes;
