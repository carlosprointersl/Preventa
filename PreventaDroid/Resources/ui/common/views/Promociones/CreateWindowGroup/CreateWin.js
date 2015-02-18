/**
 * @fileOverview En este archivo está la clase para crear una ventana para la edición de promociones para agrupaciones.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La variable Global
 * @type Object
 */
var Global = new (require('/global/class/ReturnGlobal'))();

/**
 * La clase padre.
 * @type class 
 */
var CreateWinParent = require(Global.Path.VIEW + 'Promociones/CreateWin');

/**
 * Crea la vista del cuerpo para la edición de las unidades del artículo para un pedido.
 * @param {Object} article Los datos de un artículo de la promoción.
 * @param {String} title El título de la ventana actual.
 * @param {String} nameControl El nombre del control.
 */
function CreateWin(article, title, nameControl) {
    CreateWinParent.call(this, article, title);
    
    /**
     * El control para las unidades.
     * @type Function
     */
    var ControlUnits = require(Global.Path.VIEW + 'Promociones/CreateWindowGroup/' + nameControl);

    /**
     * Crea un control para la vista.
     * @param {Object} Las propiedades del control.
     * @return {Object} El objeto CONTROL.
     */
    this.createControl = function(options) {
        return new ControlUnits(options);
    };
    
    /**
     * Añade los artículos al "Objeto" article para poder guardarlos mas adelante. Esta propiedad se utiliza en el padre "CreateWin".
     * @param {Object[]} articles Los artículo que intervienen.
     */
    this.addArticles = function(articles){
        article.articles = articles;  
    };
    
};
CreateWin.prototype = CreateWinParent;

module.exports = CreateWin;
