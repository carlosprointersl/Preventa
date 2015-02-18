/**
 * @fileOverview En este archivo se cre el modelo "NotasPrventistaSend" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "NotasPrventistaSend".
 * @memberOf Global.Model
 * @extends Persistence
 */
function NotasPrventistaSend() {
	Persistence.call(this, "NotasPreventista", Global.ConfigDB.SEND_NAME, false);
	/**
	 * Código propio de este modelo
	 */
};

NotasPrventistaSend.prototype = Persistence;

module.exports = NotasPrventistaSend;
