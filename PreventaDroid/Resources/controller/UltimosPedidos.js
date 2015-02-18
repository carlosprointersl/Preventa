/**
 * @fileOverview En este archivo se crea el controlador "UltimosPedidos".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "UltimosPedidos".
 * @class Es la clase que define al controlador "UltimosPedidos". Interactua con el modelo "UltimosPedidos".
 * @memberOf Global.Controller
 * @param {Integer} Código de cliente.
 */
var UltimosPedidos = function(codeCustomer) {
    /**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    var model = new Global.Model.UltimosPedidos();

    /**
     * El modelo/s de los artículos.
     * @private
     * @type Model
     */
    var modelArticle = new Global.Model.Articulos();

    /**
     * Los últimos pedidos del cliente.
     * @private
     * @type Array
     */
    var orders = model.select("WHERE CodigoCliente = '" + codeCustomer + "' ORDER BY FechaFactura DESC");

    /**
     * Es la ventana principal, la vista "index".
     * @private
     * @type Ti.UI.Window
     */
    var mainWin = createMainWin();

    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @private
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createMainWin() {
        //La ventana principal.
        var win = Ti.UI.createWindow({
            title : 'Últimos pedidos',
            backgroundColor : Global.Theme.BACKGROUND,
            url : Global.Path.VIEW + 'UltimosPedidos/MainWin.js',
            Global : Global,
            navBarHidden : true,
            layout : 'vertical',
            dates : clientDates(),
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        //El evento para crear las filas por fecha.
        win.addEventListener('fillOrders', function(o) {
            win.fireEvent('returnOrders', {
                orders : fillOrdersDate(Global.Functions.strToDate(o.date))
            });
        });

        return win;
    };

    /**
     * Selecciona los últimos pedidos por fecha.
     * @param {Date} date La fecha por la que filtrar.
     * @return {Ti.UI.TableViewRow[]} Las líneas resultantes de la consulta.
     */
    function fillOrdersDate(date) {
        var date = Global.Functions.dateSQliteFormat(date);
        //Los pedidos
        var ordersLines = model.select("WHERE CodigoCliente = '" + codeCustomer + "' AND FechaFactura = '" + date + "'");
        //La fila
        var row = require(Global.Path.VIEW + 'UltimosPedidos/OrderRow');
        //Las filas
        var rows = new Array();
        //Recorremos todos los pedidos.
        for (var i = 0; i < ordersLines.length; i++) {
            var order = modelArticle.select("WHERE CodigoArticulo = " + orders[i].CodigoArticulo)[0];
            var dataRow = {
                code : ordersLines[i].CodigoArticulo,
                quantity : ordersLines[i].Cantidad,
                price : Global.Functions.numToEuro(ordersLines[i].Precio),
                discount : Global.Functions.numToEuro(ordersLines[i].Descuento),
                description : order.Descripcion,
                pu : Global.Functions.numToEuro(Math.round(((((ordersLines[i].Cantidad * ordersLines[i].Precio) - ordersLines[i].Descuento) / ordersLines[i].Cantidad) / order.UnidadesCaja) * 100) / 100)
            };

            rows.push(row(dataRow));
        };

        return rows;
    };

    /**
     * Lista las fechas del cliente para el desplegable
     * @return {String[]} Las fechas en formato legible.
     */
    function clientDates() {
        //El array final con las fechas.
        var dates = new Array();
        //Las fechas
        var datesModel = model.select("WHERE CodigoCliente = '" + codeCustomer + "' GROUP BY FechaFactura ORDER BY FechaFactura DESC");

        //Recorremos todas las filas
        for (var x = 0; x < datesModel.length; x++) {
            //Añadimos la descripción del artículo
            dates.push(Global.Functions.dateFormat(new Date(datesModel[x].FechaFactura.toString().slice(0, 10))));
        };

        return dates;
    };

    /**
     * Muestra una tabla/listado de registros.
     * @private
     */
    (function() {
        if (orders.length > 0) {
            mainWin.open();
        } else {
            var message = new Global.Control.Windows.Alert({
                title : 'PEDIDOS ANTERIORES',
                message : "No existen pedidos anteriores para este cliente.",
                icon : Global.Control.Windows.ICON.INFORMATION
            }).open();
        };

    })();

};

module.exports = UltimosPedidos;
