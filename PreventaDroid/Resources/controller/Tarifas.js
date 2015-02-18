/**
 * @fileOverview En este archivo se crea el controlador "Tarifas".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Tarifas".
 * @class Es la clase que define al controlador "Tarifas". Interactua con el modelo "Tarifas".
 * @param {String} [serie = 0] El número de la serie que se le aplica al cliente.
 * @memberOf Global.Controller
 */
var Tarifas = function(serie) {
	/**
	 * El modelo/s que se aplica a este controlador.
	 * @private
	 * @type Model
	 */
	var model = new Global.Model.Tarifas();
	
	serie = serie || 0; 
	
	/**
	 * Busca en las TARIFAS por el código de artículo y retorna esta si lo encuentra o "null" si no la encuentra.
     * @param {Integer} article El código del artículo del que queremos saber la tarifa.
     * @return {Float} El resultado del select o "0.00" si no encontró nada.  
	 */
	this.getRate = function(article){
	    var rs = model.select("WHERE CodigoArticulo = '" + article + "' AND Serie = '" + serie +"'");
	    
	    return rs.length > 0 ? rs[0].Tarifa : 0.00; 
	};

};

module.exports = Tarifas;
