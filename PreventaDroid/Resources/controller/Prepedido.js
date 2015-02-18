/**
 * @fileOverview En este archivo se crea el controlador "Prepedido". Este controlador recupera los datos
 * de la tabla "Prepedido".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Prepedido".
 * @class Es la clase que define al controlador "Prepedido". Interactua con el modelo "Prepedido".
 * @memberOf Global.Controller
 * @param {Object} client El Objeto con los datos del cliente.
 */
var Prepedido = function(client) {

    /**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    var model = new Global.Model.Prepedido();
    
    /**
     * Retorna las líneas de "Prepedido" para el cliente dado.
     * @return {Array} Array bidimensional. El primer índice son las líneas y el segundo los campos de estas. 
     */
    this.getPreorder = function(){
        var articles = model.select("WHERE CodigoCliente = '" + client.CodigoCliente + "' ORDER BY CAST(CodigoArticulo As INTEGER) DESC");
        
        // var articlesSort = _.sortBy(articles, function(article){
            // return parseInt(article.CodigoArticulo);
        // });
        
        return articles;  
    };

    
};

module.exports = Prepedido;
