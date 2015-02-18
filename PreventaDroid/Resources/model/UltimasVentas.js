/**
 * @fileOverview En este archivo se cre el modelo "UltimasVentas" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "UltimasVentas".
 * @memberOf Global.Model
 * @extends Persistence
 */
function UltimasVentas() {
	Persistence.call(this, "UltimasVentas", Global.ConfigDB.PIT_FILE_NAME);
	/**
	 * Código propio de este modelo
	 */
};

UltimasVentas.prototype = Persistence;

module.exports = UltimasVentas;
