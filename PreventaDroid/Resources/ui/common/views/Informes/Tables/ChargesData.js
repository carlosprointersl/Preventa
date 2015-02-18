/**
 * @fileOverview En este archivo se crean las filas para la tabla de cobros. Estas filas contienen los datos relacionados con los cobros.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Consulta los cobros, según los parámetros, y retorna una "sección" válida para una tabla.
 * @class
 * @param {Date} start La fecha de inicio.
 * @param {Date} end La fecha de fin.
 * @return Ti.UI.TableViewSection 
 */
function ChargesData(start, end) {
    /**
     * La varible "Global".
     * @private
     * @type Namespace
     */
    var Global = require('/global/class/ReturnGlobal')();
    
    /**
     * Genera una fila para este tipo de dato.
     * @private
     * @type Function
     */
    var row = require(Global.Path.VIEW + 'Informes/Tables/Rows/ChargesRow');
    
    /**
     * El modelo de la tabla "Cobros".
     * @private
     * @type Model
     */
    var model = new Global.Model.CobrosSend();
    
    /**
     * El controlador de los "Clientes".
     * @private
     * @type Controller
     */
    var clients = new Global.Controller.Clientes("nothing");
    
    /**
     * La query para el WHERE de la consulta de los cobros.
     * @private
     * @type String
     */
    var where = (function() {
        var dateStart = start != null ? "FechaCobro >= '" + Global.Functions.dateTimeSQliteFormat(start) + "'" : "";
        var dateEnd = end != null ? (start != null ? " AND " : "") + "FechaCobro <= '" + Global.Functions.dateTimeSQliteFormat(end) + "'" : "";
        var send = Global.Parameters.Configuracion.getMostrarEnviados() == "N" ? (start != null || end != null ? " AND " : "") + "send = 0" : "";
        // Ti.API.info(dateStart != "" || dateEnd != "" || send != "" ? "WHERE " + dateStart + dateEnd + send : "");
        return dateStart != "" || dateEnd != "" || send != "" ? "WHERE " + dateStart + dateEnd + send : "";
    })();
    
    
    /**
     * Recuperamos todos los cobros.
     * @private
     * @type Object[] 
     */
    var charges = model.select(where + " ORDER BY FechaCobro DESC");
    //Ti.API.info("****************************** WHERE *******************************\n" + where);
    /**
     * La sección principal.
     * @private
     * @type Ti.UI.TableViewSection 
     */
    var section = Ti.UI.createTableViewSection();
    
    //Añadimos la cabecera de la sección.
    section.add(row('title'));
    
    //Recorremos todas las incidencias, si hay.
    if(charges.length > 0) {
        for (var i=0; i < charges.length; i++) {
            var client = clients.getClient(charges[i].CodigoCliente);
            charges[i].Cliente = client.NombreComercial;
            section.add(row(charges[i]));
        };
        //Añadimos la fila con los totales.
        var cash = model.selectFields("SUM(ImporteCobro) ImporteCobro", "WHERE TipoCobro = 'M'");
        var check = model.selectFields("SUM(ImporteCobro) ImporteCobro", "WHERE TipoCobro = 'T'");
        var card = model.selectFields("SUM(ImporteCobro) ImporteCobro", "WHERE TipoCobro = 'V'");
        section.add(row({
            cash : cash.length > 0 ? cash[0].ImporteCobro : 0,
            check : check.length > 0 ? check[0].ImporteCobro : 0,
            card : card.length > 0 ? card[0].ImporteCobro : 0
        }));
        section.enabled = true;    
    } else {
        section.add(row(null));
        section.enabled = false;
    };
    
    return section;
};

module.exports = ChargesData;
