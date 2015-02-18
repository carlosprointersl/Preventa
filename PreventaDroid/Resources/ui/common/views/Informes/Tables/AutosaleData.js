/**
 * @fileOverview En este archivo se crean las filas para la tabla de informes. Estas filas contienen los pedidos realizados en modo "AutoVenta".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Consulta los pedidos realizados en modo "AutoVenta", según los parámetros, y retorna una "sección" válida para una tabla.
 * @class
 * @param {Date} start La fecha de inicio.
 * @param {Date} end La fecha de fin.
 * @return Ti.UI.TableViewSection 
 */
function AutosaleData(start, end) {
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
    var row = require(Global.Path.VIEW + 'Informes/Tables/Rows/AutosaleRow');
    
    /**
     * El controlador de los "Clientes".
     * @private
     * @type Controller 
     */
    //var clients = new Global.Controller.Clientes("nothing");    

    /**
     * El modelo de la tabla "CabeceraPedido".
     * @private
     * @type Model
     */
    //var model = new Global.Model.Incidencias();
    
    /**
     * La query para el WHERE de la consulta de las incidencias.
     * @private
     * @type String
     */
    // var where = (function() {
        // var dateStart = start != null ? "Fecha >= '" + Global.Functions.dateTimeSQliteFormat(start) + "'" : "";
        // var dateEnd = end != null ? (start != null ? " AND " : "") + "Fecha <= '" + Global.Functions.dateTimeSQliteFormat(end) + "'" : "";
        // var send = Global.Parameters.Configuracion.getMostrarEnviados() == "N" ? (start != null || end != null ? " AND " : "") + "send = 0" : "";
        // // Ti.API.info(dateStart != "" || dateEnd != "" || send != "" ? "WHERE " + dateStart + dateEnd + send : "");
        // return dateStart != "" || dateEnd != "" || send != "" ? "WHERE " + dateStart + dateEnd + send : "";
    // })();
    
    /**
     * Recuperamos todas las incidencias.
     * @private
     * @type Object[] 
     */
    //var movements = new Array();//model.select(where + " ORDER BY Fecha DESC");
    //Ti.API.info("****************************** WHERE *******************************\n" + where);
    /**
     * La sección principal.
     * @private
     * @type Ti.UI.TableViewSection 
     */
    var section = Ti.UI.createTableViewSection();
    
    //Recorremos todas las incidencias, si hay.
    // if(incidents.length > 0) {
        // for (var i=0; i < movements.length; i++) {
//             
            // section.add(row(movements[i]));
        // };
        // section.enabled = true;    
    // } else {
        section.add(row('title'));
        section.add(row(null));
        section.enabled = false;
    // };
    
    return section;
};

module.exports = AutosaleData;
