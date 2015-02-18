/**
 * @fileOverview En este archivo se cre el modelo "Incidencias" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "Incidencias".
 * @memberOf Global.Model
 * @extends Persistence
 */
function Incidencias() {
	Persistence.call(this, "Incidencias", Global.ConfigDB.SEND_NAME);
	/**
	 * Código propio de este modelo
	 */
};

Incidencias.prototype = Persistence;

module.exports = Incidencias;