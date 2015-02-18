/**
 * @fileOverview En este archivo se crean las filas para la tabla de informes. Estas filas contienen los datos relacionados con los pedidos.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Consulta los pedidos, según los parámetros, y retorna una "sección" válida para una tabla.
 * @class
 * @param {Date} start La fecha de inicio.
 * @param {Date} end La fecha de fin.
 * @return Ti.UI.TableViewSection
 */
function OrdersData(start, end) {
    /**
     * La varible "Global".
     * @private
     * @type Namespace
     */
    var Global = require('/global/class/ReturnGlobal')();

    /**
     * Genera una fila para la cabecera del pedido.
     * @private
     * @type Function
     */
    var headerRow = require(Global.Path.VIEW + 'Informes/Tables/Rows/OrderHeaderRow');

    /**
     * Genera una fila de detalle del pedido.
     * @private
     * @type Function
     */
    var detailRow = require(Global.Path.VIEW + 'Informes/Tables/Rows/OrderDetailRow');

    /**
     * El controlador de los "Clientes".
     * @private
     * @type Controller
     */
    var clients = new Global.Controller.Clientes("nothing");
    
    /**
     * El controlador de los "Articulos".
     * @private
     * @type Controller
     */
    var articles = new Global.Controller.Articulos("nothing");

    /**
     * El modelo de la tabla "CabeceraPedido".
     * @private
     * @type Model
     */
    var headerModel = new Global.Model.CabeceraPedido();

    /**
     * El modelo de la tabla "DetallePedido".
     * @private
     * @type Model
     */
    var detailModel = new Global.Model.DetallePedido();

    /**
     * La query para el WHERE de la consulta de las incidencias.
     * @private
     * @type String
     */
    var where = (function() {
        var dateStart = start != null ? "FechaPedido >= '" + Global.Functions.dateTimeSQliteFormat(start) + "'" : "";
        var dateEnd = end != null ? (start != null ? " AND " : "") + "FechaPedido <= '" + Global.Functions.dateTimeSQliteFormat(end) + "'" : "";
        var send = Global.Parameters.Configuracion.getMostrarEnviados() == "N" ? (start != null || end != null ? " AND " : "") + "send = 0" : "";
        //Ti.API.info(dateStart != "" || dateEnd != "" || send != "" ? "WHERE " + dateStart + dateEnd + send : "");
        return dateStart != "" || dateEnd != "" || send != "" ? "WHERE " + dateStart + dateEnd + send : "";
    })();

    /**
     * Recuperamos todos los pedidos.
     * @private
     * @type Object[]
     */
    var orders = headerModel.select(where + " ORDER BY FechaPedido DESC");
    // Ti.API.info("****************************** WHERE *******************************\n" + where);
    /**
     * La sección principal.
     * @private
     * @type Ti.UI.TableViewSection
     */
    var section = Ti.UI.createTableViewSection();
    
    //Añadimos la cabecera de la sección.
    section.add(headerRow('title'));

    //Recorremos todos los pedidos, si hay.
    if (orders.length > 0) {
        for (var i = 0; i < orders.length; i++) {
            var client = clients.getClient(orders[i].CodigoCliente);
            orders[i].Cliente = client.NombreComercial;
            section.add(headerRow(orders[i]));
            //Recuperamos las líneas del pedido.
            var details = detailModel.select("WHERE NumPedido = " + orders[i].NumPedido);
            //Añadimos todos las líneas a la sección
            for (var x=0; x < details.length; x++) {
                var article = articles.getArticle(details[x].CodigoArticulo);
                details[x].Descripcion = article.Descripcion;
                section.add(detailRow(details[x]));
            };
        };
        section.enabled = true;
    } else {
        section.add(headerRow(null));
        section.enabled = false;
    };

    return section;
};

module.exports = OrdersData;
