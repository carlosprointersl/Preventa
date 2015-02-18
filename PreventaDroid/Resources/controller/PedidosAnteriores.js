/**
 * @fileOverview En este archivo se crea el controlador "PedidosAnteriores".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "PedidosAnteriores".
 * @class Es la clase que define al controlador "PedidosAnteriores".
 * @memberOf Global.Controller
 * @param {Object} client El Objeto con los datos del cliente.
 */
var PedidosAnteriores = function(client) {
	/**
	 * El modelo de CabeceraPedido.
	 * @private
	 * @type Model
	 */
	var modelHeader = new Global.Model.CabeceraPedido();
	
	/**
     * El modelo de DetallePedido.
     * @private
     * @type Model
     */
    var modelDetail = new Global.Model.DetallePedido();
	
	/**
	 * Los pedidos anteriores del cliente.
	 * @private
	 * @type Array 
	 */
	var orders = modelHeader.select("WHERE CodigoCliente = '" + client.CodigoCliente +"'");
	
	/**
	 * Comprueba si el cliente tiene pedidos anteriores.
	 * @return {Boolena} Evalua la operación y retorna TRUE si hay pedidos anteriores. 
	 */
	this.hasOrders = function(){
	   return orders.lenght > 0;  
	};
	
	this.getOrdersList = function(){
	    var win = Ti.UI.createWindow({
            title : 'Selección pedidos anteriores',
            backgroundColor : '#000000',
            url : Global.Path.VIEW + 'PedidosAnteriores/MainWin.js',
            global : Global,
            //layout : 'vertical',
            modal : false
        });
	};

};

module.exports = PedidosAnteriores;
