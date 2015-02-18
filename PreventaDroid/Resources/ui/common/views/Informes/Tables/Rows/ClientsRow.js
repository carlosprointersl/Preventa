/**
 * @fileOverview En este archivo se crea la fila para la tabla de clientes.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una "Row" para el informe de clientes.
 * @class
 * @param {Object} data Los datos de un cliente.
 * @return Ti.UI.TableViewSection
 */
function ClientsRow(data) {
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
        className : "ClientsRow"
    });
    
    //Si los datos no son nulos
    if (data != null) {
        //Si el data = 'title' hacemos una fila para la cabecera de sección
        if (data == 'title') {
            row = require(Global.Path.VIEW + 'Informes/Tables/Rows/HeaderRow')({
                name : 'Clients',
                title : 'Clientes',
                image : 'customers_48.png'
            });
            
        } else {
            row.layout = "vertical";
            /**
             * La etiqueta de la fecha.
             * @private
             * @type Ti.UI.Label
             */
            var dateTime = Ti.UI.createLabel({
                color : "#000000",
                font : {
                    fontSize : '16sp'
                },
                text : Global.Functions.dateTimeFormat(new Date(data.FechaCambio)),
                width : Ti.UI.FILL,
                textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT
            });

            /**
             * La etiqueta del NIF.
             * @private
             * @type Ti.UI.Label
             */
            var nif = Ti.UI.createLabel({
                color : "#000000",
                font : {
                    fontSize : '16sp'
                },
                text : data.NIF,
                width : Ti.UI.FILL
            });
            
            /**
             * La etiqueta del "Trato".
             * @private
             * @type Ti.UI.Label
             */
            var treated = Ti.UI.createLabel({
                color : "#000000",
                font : {
                    fontSize : '16sp'
                },
                text : data.Tratado == 'ALTA' ? "Nuevo usuario" : data.Tratado == "MODI" ? "Usuario modificado" : data.Tratado == "BAJA" ? "Ususario eliminado" : "",
                width : Ti.UI.FILL
            });

            /**
             * La etiqueta del cliente.
             * @private
             * @type Ti.UI.Label
             */
            var client = Ti.UI.createLabel({
                color : "#000000",
                font : {
                    fontSize : '16sp'
                },
                text : data.NombreComercial,
                width : Ti.UI.FILL
            });

            row.add(dateTime);
            row.add(nif);
            row.add(treated);
            row.add(client);
        };
    } else {
        row = require(Global.Path.VIEW + 'Informes/Tables/Rows/NoFoundRow')({
            name : 'Autosale',
            title : 'No existen clientes editados.'
        });
    };

    return row;
};

module.exports = ClientsRow;
