/**
 * @fileOverview En este archivo se crea el controlador "TipoMovimiento".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "TipoMovimiento".
 * @class Es la clase que define al controlador "TipoMovimiento". Interactua con el modelo "TipoMovimiento". Hereda de la clase "Desplegables".
 * @memberOf Global.Controller
 * @param {String} [action = index]) La acción que debe realizar el controlador.
 */
var TipoMovimiento = function(action) {
	Global.Class.Desplegables.call(this, action);
	
	/**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    this.model = new Global.Model.TipoMovimiento();
};
TipoMovimiento.prototype = Global.Class.Desplegables;

module.exports = TipoMovimiento;
