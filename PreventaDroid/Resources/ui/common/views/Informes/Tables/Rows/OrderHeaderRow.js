/**
 * @fileOverview En este archivo se crea la fila de la cabecera para la tabla de Pedidos.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una "Row" de cabecera para el informe de Pedidos.
 * @class
 * @param {Object} data Los datos de un pedido.
 * @return Ti.UI.TableViewSection
 */
function OrderHeaderRow(data) {
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
        className : "headerRow",
        backgroundColor : '#90BACE'
    });

    //Si los datos no son nulos
    if (data != null) {
        //Si el data = 'title' hacemos una fila para la cabecera de sección
        if (data == 'title') {
            row = require(Global.Path.VIEW + 'Informes/Tables/Rows/HeaderRow')({
                name : 'Orders',
                title : 'Pedidos',
                image : 'purchase_order_48.png'
            });
        } else {
            row.layout = "vertical";

            /**
             * La vista superior Serie-NumPedido-Importe
             */
            var viewUp = Ti.UI.createView({
                layout : 'horizontal'
            });

            /**
             * La vista inferior Cliente-FechaServicio
             */
            var viewDown = Ti.UI.createView({
                layout : 'horizontal'
            });

            /**
             * La etiqueta del número de pedido.
             * @private
             * @type Ti.UI.Label
             */
            var numOrder = Ti.UI.createLabel({
                color : "#000000",
                font : {
                    fontSize : 14
                },
                text : "Nº Pedido: (" + data.Serie + ") " + data.NumPedido,
                width : '60%'
            });

            /**
             * La etiqueta del importe bruto.
             * @private
             * @type Ti.UI.Label
             */
            var total = Ti.UI.createLabel({
                color : "#000000",
                font : {
                    fontSize : 14
                },
                text : "Imp. Bruto: " + Global.Functions.numToEuro(data.ImporteBrutoAlbaran),
                textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
                width : '40%'
            });

            /**
             * La etiqueta del cliente.
             * @private
             * @type Ti.UI.Label
             */
            var client = Ti.UI.createLabel({
                color : "#000000",
                font : {
                    fontSize : 14
                },
                text : data.Cliente,
                width : '75%'
            });

            /**
             * La etiqueta de la fecha de servicio.
             * @private
             * @type Ti.UI.Label
             */
            var dateTime = Ti.UI.createLabel({
                color : "#000000",
                font : {
                    fontSize : 14
                },
                text : Global.Functions.dateFormat(new Date(data.FechaServicio))
            });

            viewDown.add(numOrder);
            viewDown.add(total);

            viewUp.add(client);
            viewUp.add(dateTime);

            row.add(viewUp);
            row.add(viewDown);
        };
    } else {
        row = require(Global.Path.VIEW + 'Informes/Tables/Rows/NoFoundRow')({
            name : 'Orders',
            title : 'No existen pedidos.'
        });
    };

    return row;
};

module.exports = OrderHeaderRow;
