/**
 * @fileOverview En este archivo se crea el la vista del cuerpo de la ventana para las unidades del artículo en el pedido.
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
 * @param {Object} article Los datos del artículo.
 * @param {String} title El título de la ventana actual.
 */
function CreateWin(article, title) {
    CreateWinParent.call(this, article, title);
    
    /**
     * El control para las unidades.
     * @type Function
     */
    var ControlUnits = require(Global.Path.VIEW + 'Promociones/CreateWindow/ControlUnits');

    /**
     * La vista contenedor de los precios.
     * @private
     * @type Ti.UI.View
     */
    var headerBody = require(Global.Path.VIEW + 'Promociones/CreateWindow/HeaderRateView')(Global.Functions.numToEuro(article.Tarifa), Global.Functions.numToEuro(article.Precio / article.UnidadesCaja));
    this.bodyAdd(headerBody);

    /**
     * Crea un control para la vista.
     * @param {Object} Las propiedades del control.
     * @return {Object} El objeto CONTROL.
     */
    this.createControl = function(options) {
        return new ControlUnits(options);
    };
    
};
CreateWin.prototype = CreateWinParent;

module.exports = CreateWin;
