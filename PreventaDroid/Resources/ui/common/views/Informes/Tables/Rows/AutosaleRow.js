/**
 * @fileOverview En este archivo se crea la fila para la tabla de pedidos de "autoventa".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una "Row" para el informe pedidos de "autoventa".
 * @class
 * @param {Object} data Los datos de un pedido.
 * @return Ti.UI.TableViewSection
 */
function AutosaleRow(data) {
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
        className : "movementsRow"
    });

    //Si los datos no son nulos
    if (data != null) {
        //Si el data = 'title' hacemos una fila para la cabecera de sección
        if (data == 'title') {
            row = require(Global.Path.VIEW + 'Informes/Tables/Rows/HeaderRow')({
                name : 'Autosale',
                title : 'Pedidos Autoventa',
                image : 'truck.png'
            });

        } else {
            // row.layout = "vertical";
            // /**
            // * La etiqueta de la fecha.
            // * @private
            // * @type Ti.UI.Label
            // */
            // var dateTime = Ti.UI.createLabel({
            // color : "#000000",
            // font : {
            // fontSize : '16sp'
            // },
            // text : Global.Functions.dateTimeFormat(new Date(data.Fecha)),
            // width : Ti.UI.FILL,
            // textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT
            // });
            //
            // /**
            // * La etiqueta de la descripción.
            // * @private
            // * @type Ti.UI.Label
            // */
            // var description = Ti.UI.createLabel({
            // color : "#000000",
            // font : {
            // fontSize : '16sp'
            // },
            // text : data.Descripcion,
            // width : Ti.UI.FILL
            // });
            //
            // /**
            // * La etiqueta del cliente.
            // * @private
            // * @type Ti.UI.Label
            // */
            // var client = Ti.UI.createLabel({
            // color : "#000000",
            // font : {
            // fontSize : '16sp'
            // },
            // text : data.Cliente,
            // width : Ti.UI.FILL
            // });
            //
            // row.add(dateTime);
            // row.add(description);
            // row.add(client);
        };
    } else {
        row = require(Global.Path.VIEW + 'Informes/Tables/Rows/NoFoundRow')({
            name : 'Autosale',
            title : 'No existen pedidos en el modo Autoventa.'
        });
    };

    return row;
};

module.exports = AutosaleRow;
