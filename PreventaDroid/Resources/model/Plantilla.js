/**
 * @fileOverview En este archivo se cre el modelo "Plantilla" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "Plantilla".
 * @memberOf Global.Model
 * @extends Persistence
 */
function Plantilla() {
	Persistence.call(this, "Plantilla", Global.ConfigDB.SEND_NAME, false);
	/**
	 * Código propio de este modelo
	 */
};

Plantilla.prototype = Persistence;

module.exports = Plantilla;
