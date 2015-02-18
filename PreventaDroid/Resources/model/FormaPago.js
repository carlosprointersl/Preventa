/**
 * @fileOverview En este archivo se cre el modelo "FormaPago" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "FormaPago".
 * @memberOf Global.Model
 * @extends Persistence
 */
function FormaPago() {
	Persistence.call(this, "formaPago", Global.ConfigDB.PARAM_NAME, false);
	/**
	 * Código propio de este modelo
	 */
};

FormaPago.prototype = Persistence;

module.exports = FormaPago;
