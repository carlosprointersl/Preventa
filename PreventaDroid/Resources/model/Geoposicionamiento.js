/**
 * @fileOverview En este archivo se cre el modelo "Geoposicionamiento" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "Geoposicionamiento".
 * @memberOf Global.Model
 * @extends Persistence
 */
function Geoposicionamiento() {
	Persistence.call(this, "Geoposicionamiento", Global.ConfigDB.SEND_NAME);
	/**
	 * Código propio de este modelo
	 */
};

Geoposicionamiento.prototype = Persistence;

module.exports = Geoposicionamiento;