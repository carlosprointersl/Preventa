/**
 * @fileOverview En este archivo se crea el controlador "NotasClientes".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "NotasClientes".
 * @class Es la clase que define al controlador "NotasClientes". Interactua con el modelo "NotasClientes".
 * @memberOf Global.Controller
 */
var NotasClientes = function() {
	/**
	 * El modelo/s que se aplica a este controlador.
	 * @private
	 * @type Model
	 */
	var model = new Global.Model.NotasClientes();
	
    /**
	 * Muestra una tabla/listado de registros.
	 * @private
	 */
	function index() {
		 
	};
    
    /**
     * Recuperamos las notas de un cliente en concreto
     * @param {String} client El código del cliente del que queremos recuperar las notas.
     * @return {Object[]} Un array con las notas que tenga el cliente.
     */
    this.getNotes = function(client){
        return model.select("WHERE CodigoCliente = '" + client + "'");
    };
};

module.exports = NotasClientes;
