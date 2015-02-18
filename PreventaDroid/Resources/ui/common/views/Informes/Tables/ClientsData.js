/**
 * @fileOverview En este archivo se crean las filas para la tabla de clientes. Estas filas contienen los datos relacionados con los clientes editados.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Consulta los clientes editados, según los parámetros, y retorna una "sección" válida para una tabla.
 * @class
 * @param {Date} start La fecha de inicio.
 * @param {Date} end La fecha de fin.
 * @return Ti.UI.TableViewSection 
 */
function ClientsData(start, end) {
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
    var row = require(Global.Path.VIEW + 'Informes/Tables/Rows/ClientsRow');
    
    /**
     * El controlador de los "Clientes".
     * @private
     * @type Controller 
     */
    //var clients = new Global.Controller.Clientes("nothing");    

    /**
     * El modelo de la tabla "Clientes".
     * @private
     * @type Model
     */
    var model = new Global.Model.ClientesSend();
    
    /**
     * La query para el WHERE de la consulta de los clientes.
     * @private
     * @type String
     */
    var where = (function() {
        var dateStart = start != null ? "FechaCambio >= '" + Global.Functions.dateTimeSQliteFormat(start) + "'" : "";
        var dateEnd = end != null ? (start != null ? " AND " : "") + "FechaCambio <= '" + Global.Functions.dateTimeSQliteFormat(end) + "'" : "";
        var send = Global.Parameters.Configuracion.getMostrarEnviados() == "N" ? (start != null || end != null ? " AND " : "") + "send = 0" : "";
        // Ti.API.info(dateStart != "" || dateEnd != "" || send != "" ? "WHERE " + dateStart + dateEnd + send : "");
        return dateStart != "" || dateEnd != "" || send != "" ? "WHERE " + dateStart + dateEnd + send : "";
    })();
    
    /**
     * Recuperamos todos los clientes.
     * @private
     * @type Object[] 
     */
    var clients = model.select(where + " ORDER BY FechaCambio DESC");
    //Ti.API.info("****************************** WHERE *******************************\n" + where);
    /**
     * La sección principal.
     * @private
     * @type Ti.UI.TableViewSection 
     */
    var section = Ti.UI.createTableViewSection();
    
    //Añadimos la cabecera de la sección.
    section.add(row('title'));
    
    //Recorremos todos los clientes, si hay.
    if(clients.length > 0) {
        for (var i=0; i < clients.length; i++) {
            section.add(row(clients[i]));
        };
        section.enabled = true;    
    } else {
        section.add(row(null));
        section.enabled = false;
    };
    
    return section;
};

module.exports = ClientsData;
