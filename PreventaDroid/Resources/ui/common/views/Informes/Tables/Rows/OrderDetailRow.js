/**
 * @fileOverview En este archivo se crea la fila para el detal de la tabla de pedidos.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una "Row" de detalle para el informe de Pedidos.
 * @class
 * @param {Object} data Los datos de una incidencia.
 * @return Ti.UI.TableViewSection
 */
function OrderDetailRow(data) {
    /**
     * La varible "Global".
     * @private
     * @type Namespace
     */
    var Global = require('/global/class/ReturnGlobal')();

    /**
     * La fila.
     * @private
     * @type TableViewRow
     */
    var row = Ti.UI.createTableViewRow({
        height : Ti.UI.SIZE,
        layout : 'vertical',
        className : "detailRow"
    });
    
    /**
     * La vista superior Serie-NumPedido-Importe
     * @private
     * @type Ti.UI.View
     */
    var viewUp = Ti.UI.createView({
        layout : 'horizontal'
    });

    /**
     * La vista inferior Cliente-FechaServicio
     * @private
     * @type Ti.UI.View
     */
    var viewDown = Ti.UI.createView({
        layout : 'horizontal'
    });

    /**
     * La etiqueta de la descripción.
     * @private
     * @type Ti.UI.Label
     */
    var description = Ti.UI.createLabel({
        color : "#000000",
        font : {
            fontSize : 14
        },
        text : data.Descripcion,
        width : '80%'
    });
    
    /**
     * La etiqueta del precio.
     * @private
     * @type Ti.UI.Label
     */
    var price = Ti.UI.createLabel({
        color : "#000000",
        font : {
            fontSize : 14
        },
        text : Global.Functions.numToEuro(data.Precio)
    });

    /**
     * La etiqueta de la venta.
     * @private
     * @type Ti.UI.Label
     */
    var sale = Ti.UI.createLabel({
        color : "#000000",
        font : {
            fontSize : 14
        },
        text : "Venta: " + data.Venta,
        width : '33%'
    });

    /**
     * La etiqueta del regalo.
     * @private
     * @type Ti.UI.Label
     */
    var gift = Ti.UI.createLabel({
        color : "#000000",
        font : {
            fontSize : 14
        },
        text : "Regalo: " + (data.Regalo != undefined ? data.Regalo : "0"),
        width : '33%'
    });

    /**
     * La etiqueta del tipo.
     * @private
     * @type Ti.UI.Label
     */
    var type = Ti.UI.createLabel({
        color : "#000000",
        font : {
            fontSize : 14
        },
        text : "T: 0 | C: C",
        width : "33%"
    });
    
    viewUp.add(description);
    viewUp.add(price);
    
    viewDown.add(sale);
    viewDown.add(gift);
    viewDown.add(type);
    
    row.add(viewUp);
    row.add(viewDown);

    return row;
};

module.exports = OrderDetailRow;
