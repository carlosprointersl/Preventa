/**
 * @fileOverview En este archivo se crea el la vista para mostrar la tarifa y el precio unitario.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La variable Global
 */
var Global = new (require('/global/class/ReturnGlobal'))();

/**
 * @class Crea la vista para mostrar la tarifa y el precio unitario. Este último vendrá determinado por la configuración de la aplicación.
 * @param {String} rate La tarifa del artículo.
 * @param {String} priceUnit El precio unidad.
 * @return {Ti.UI.View} La vista montada.
 */
module.exports = function(rate, priceUnit) {
    /**
     * La vista contenedor de los precios.
     * @private
     * @type Ti.UI.View
     */
    var content = Ti.UI.createView({
        backgroundColor : Global.Theme.HEADER,
        height : Ti.UI.SIZE
    });
    
    /**
     * La tarifa actual.
     * @private
     * @type Ti.UI.Label
     */
    var rate = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 22,
            fontWeight : 'bold'
        },
        text : "Tarifa: " + rate,
        left : 3
    });
    content.add(rate);

    /**
     * El precio unitario.
     * @private
     * @type Ti.UI.Label
     */
    var unitPrice = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 22,
            fontWeight : 'bold'
        },
        text : "P/U: " + priceUnit,
        right : 5
    });
    if (Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getMostrarPrecioU()))
        content.add(unitPrice);
        
    return content;
};