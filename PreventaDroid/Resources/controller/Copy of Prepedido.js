/**
 * @fileOverview En este archivo se crea el controlador "Prepedido".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Prepedido".
 * @class Es la clase que define al controlador "Prepedido". Interactua con el modelo "Prepedido".
 * @memberOf Global.Controller
 * @param {Object} client El Objeto con los datos del cliente.
 */
var Prepedido = function(client) {

    /**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    var model = new Global.Model.Prepedido();

    /**
     * El modelo/s de la tabla "Familias".
     * @private
     * @type Model
     */
    var modelFamily = new Global.Model.Familias();

    /**
     * Es la ventana principal, la vista "index".
     * @private
     * @type Ti.UI.Window
     */
    var mainWin = createMainWin();

    /**
     * Muestra una tabla/listado de registros.
     * @private
     */
    function index() {
        mainWin.open();
    };

    /**
     * Muestra una registro.
     * @private
     */
    function show() {
        // Code here ...
    };

    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @private
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createMainWin() {
        var win = Ti.UI.createWindow({
            title : 'Pedido: 9999',
            backgroundColor : '#000000',
            url : Global.Path.VIEW + 'Prepedido/MainWin.js',
            global : Global,
            layout : 'vertical',
            modal : false,
            client : client,
            rates : new Global.Controller.Tarifas(),
            dataLines : model.select("WHERE CodigoCliente = '" + client.CodigoCliente.toString() + "'")
        });

        win.addEventListener('butAdd', function(e) {

            var winSelectItem = Ti.UI.createWindow({
                title : 'Selección de artículos',
                navBarHidden : false,
                url : Global.Path.VIEW + 'Prepedido/SelectItem.js',
                layout : 'vertical',
                global : Global,
                familys : modelFamily.select(),
                article : new Global.Model.Articulos(),
                rates : new Global.Controller.Tarifas(),
                table : e.table
            });

            winSelectItem.open();
        });

        win.addEventListener('butModify', function(e) {
            var rates = new Global.Controller.Tarifas();
            e.article.Tarifa = rates.getRate(e.article.CodigoArticulo);;
            var winQuantity = Ti.UI.createWindow({
                backgroundColor : '#808080',
                navBarHidden : false,
                opacity : 0.50,
                url : Global.Path.VIEW + 'Prepedido/QuantityItem.js',
                article : e.article,
                global : Global
            });

            winQuantity.open();

            winQuantity.addEventListener('butSave', function(q) {
                e.table.fireEvent('tableUpdate', {
                    article : q.article
                });

            });
        });

        return win;
    };

    index();
};

module.exports = Prepedido;
