/**
 * @fileOverview En este archivo se crea la fila para la tabla de cobros.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una "Row" para el informe de cobros.
 * @class
 * @param {Object} data Los datos de un cobro.
 * @return Ti.UI.TableViewSection
 */
function ChargesRow(data) {
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
        className : "chargesRow"
    });

    //Según el tipo de valor de data

    //Si los datos no son nulos
    if (data != null) {
        //Si el data = 'title' hacemos una fila para la cabecera de sección
        if (data == 'title') {
            row = require(Global.Path.VIEW + 'Informes/Tables/Rows/HeaderRow')({
                name : 'Charge',
                title : 'Cobros',
                image : 'safe_48.png'
            });

        } else {
            //Si tiene número de factura son los datos de una.
            if (data.NumFactura != undefined) {
                row.layout = "vertical";

                /**
                 * La vista superior Serie-NumFactura-Importe
                 */
                var viewUp = Ti.UI.createView({
                    layout : 'horizontal'
                });

                /**
                 * La vista inferior Cliente-FechaCobro
                 */
                var viewDown = Ti.UI.createView();

                /**
                 * La etiqueta del número de factura.
                 * @private
                 * @type Ti.UI.Label
                 */
                var numInvoice = Ti.UI.createLabel({
                    color : "#000000",
                    font : {
                        fontSize : 14
                    },
                    text : "Nº Factura: (" + data.Serie + ") " + data.NumFactura,
                    width : Ti.UI.SIZE,
                    left : 24
                });

                /**
                 * La etiqueta del importe.
                 * @private
                 * @type Ti.UI.Label
                 */
                var total = Ti.UI.createLabel({
                    color : "#000000",
                    font : {
                        fontSize : 14
                    },
                    text : "Importe: " + Global.Functions.numToEuro(data.ImporteTotal),
                    width : Ti.UI.SIZE,
                    right : 0
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
                 * La etiqueta de la fecha de cobro.
                 * @private
                 * @type Ti.UI.Label
                 */
                var dateTime = Ti.UI.createLabel({
                    color : "#000000",
                    font : {
                        fontSize : 14
                    },
                    text : Global.Functions.dateFormat(new Date(data.FechaCobro))
                });

                /**
                 * El icono que indica el tipo de cobro.
                 * @private
                 * @type Ti.UI.ImageView
                 */
                var icon = Ti.UI.createImageView({
                    image : '/images/' + (data.TipoCobro == "M" ? "money_24.png" : data.TipoCobro == "T" ? "e_check_24.png" : "credit_card_24.png"),
                    height : 24,
                    width : 24,
                    left : 0
                });

                viewDown.add(icon);
                viewDown.add(numInvoice);
                viewDown.add(total);

                viewUp.add(client);
                viewUp.add(dateTime);

                row.add(viewUp);
                row.add(viewDown);
            } else {
                row = require(Global.Path.VIEW + 'Informes/Tables/Rows/TotalCharge')({
                    cash : Global.Functions.numToEuro(data.cash),
                    check : Global.Functions.numToEuro(data.check),
                    card : Global.Functions.numToEuro(data.card),
                    total : Global.Functions.numToEuro(data.cash + data.check + data.card)
                });
            };
        };
    } else {
        row = require(Global.Path.VIEW + 'Informes/Tables/Rows/NoFoundRow')({
            name : 'Charge',
            title : 'No existen cobros.'
        });
    };

    return row;
};

module.exports = ChargesRow;
