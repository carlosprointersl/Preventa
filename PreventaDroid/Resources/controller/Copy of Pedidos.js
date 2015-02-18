/**
 * @fileOverview En este archivo se crea el controlador "Pedidos".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Pedidos".
 * @class Es la clase que define al controlador "Pedidos". Interactua con el modelo "Clientes".
 * @memberOf Global.Controller
 * @param {String} [action = index]) La acción que debe realizar el controlador.
 */
var Pedidos = function(action) {
    /**
     * Es la ventana principal, la vista "index".
     * @private
     * @type Ti.UI.Window
     */
    var mainWin = createMainWin();

    /**
     * El modelo de clientes.
     * @private
     * @type Model
     */
    var modelClients = new Global.Model.Clientes();

    /**
     * Muestra una tabla/listado de registros.
     * @private
     */
    function index() {
        mainWin.open();
    };

    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @private
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createMainWin() {
        // La ventana principal.
        var win = Ti.UI.createWindow({
            // title : 'Selección de cliente',
            backgroundColor : Global.Theme.BACKGROUND,
            url : Global.Path.VIEW + 'Pedidos/MainWin.js',
            navBarHidden : true,
            Global : Global,
            log : Log,
        });

        // Evento para retornar los clientes según el día seleccionado.
        win.addEventListener('fillCustomersDay', function(e) {
            //Retornamos a la vista "Main" el listado con los clientes.
            win.fireEvent('main:clients', {
                rows : fillCustomersDay(e.dayWeek)
            });
        });

        win.addEventListener('tableClick', callbackTableClick);
        return win;
    };

    /**
     * Crea un conjunto de filas de clientes según el día de la semana.
     * @param {String} dayWeek El día de la semana tal y como se guarda en la base de datos.
     * @return {row[]} Conjunto de filas de clientes.
     */
    function fillCustomersDay(dayWeek) {
        //Consultamos los clientes por el día de la semana
        var clients = modelClients.select("WHERE DiaPreventa = '" + dayWeek + "'");
        //La fila.
        var row = require(Global.Path.VIEW + 'Pedidos/ClientRow');
        //Las filas
        var rows = new Array();
        //Creamos las filas con los datos de los clientes
        for (var i = 0, j = clients.length; i < j; i++) {
            //EL controlador Pedido
            var order = new Global.Controller.Pedido(clients[i]);
            var incidences = new Global.Controller.Incidencias(clients[i], "nothing");
            var invoices = new Global.Controller.Facturas(clients[i], "nothing");
            var notes = new Global.Controller.NotasClientes();
            //Marcamos si tienen pedidos e incidencias
            clients[i].hasOrders = order.hasOrders();
            clients[i].hasIncidence = incidences.clientIncidence();
            clients[i].hasInvoice = invoices.hasInvoices();
            clients[i].Notes = notes.getNotes(clients[i].CodigoCliente);

            //Miramos si tiene incidencias
            if (clients[i].hasIncidence) {
                //dataRow.name = dataRow.name.toString().slice(3);
                clients[i].state = 'incidencia';
                //Miramos si tiene pedidos
            } else if (clients[i].hasOrders) {
                //dataRow.name = dataRow.name.toString().slice(1);
                clients[i].state = 'pedido';
            };
            
            rows.push(row(clients[i]));
        };

        return rows;

    };

    /**
     * Muestra las opciones del cliente seleccionado. Es invocada cuando seleccionamos un cliente de la lista de clientes.
     * @event
     * @private
     */
    function callbackTableClick(e) {
        // Las notas del cliente.
        var notes = new Global.Controller.NotasClientes();
        e.client.Notes = new Array();
        //Si el parámetro "Cliente tiene dto" está activo y el cliente tiene "promociones" añadimos una línea al principio de las notas indicando que el cliente tiene descuento.
        if (Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getTieneDto())) {
            //Las promociones
            var modelPromo = new (require(Global.Path.MODEL + 'Promociones'));
            promos = modelPromo.select("WHERE CodigoCliente = " + e.client.CodigoCliente);
            if (promos.length > 0)
                //Añadimos el mensaje a las notas.
                e.client.Notes.push({
                    DescripcionNota : "Este cliente dispone de descuentos."
                });
            //Añadimos las notas.
            e.client.Notes = e.client.Notes.concat(notes.getNotes(e.client.CodigoCliente));
        } else {
            //Añadimos las notas.
            e.client.Notes = notes.getNotes(e.client.CodigoCliente);
        };

        //El cuerpo de la ventana
        var body = require(Global.Path.VIEW + 'Pedidos/BodyClientMenu')(e.client);
        //Las opciones de la ventana.
        var options = {
            title : e.client.NombreComercial,
            body : body,
            buttons : Global.Control.Windows.BUTTON.CANCEL,
            heightHeader : Ti.UI.SIZE
        };

        // Evento al pulsar el botón "últimos pedidos".
        body.addEventListener('but:lastOrders', function() {
            //Abrimos los pedidos anteriores.
            Global.Controller.Pedido(e.client, "previous");
            //Cerramos el menú.
            //winMenu.close();
        });
        // Evento al pulsar el botón "pedido".
        body.addEventListener('but:order', function() {
            //Primero cerramos la ventana porque si se muestran las tarifas, estas se cierran con ella.
            //Cerramos el menú.
            winMenu.close();
            //Abrimos el pedido.
            Global.Controller.Pedido(e.client, "new");
        });
        // Evento al pulsar el botón "facturas".
        body.addEventListener('but:invoices', function() {
            //Abrimos las facturas
            Global.Controller.Facturas(e.client);
            //Cerramos el menú.
            //winMenu.close();
        });
        // Evento al pulsar el botón "incidencia".
        body.addEventListener('but:incidence', function() {
            //Abrimos las incidencias
            Global.Controller.Incidencias(e.client);
            //Cerramos el menú.
            //winMenu.close();
        });

        //La ventana emergente que guarda la vista "body".
        var winMenu = new Global.Control.Windows.Popup(options);

        winMenu.open();
    };

    //La acción que realiza este controlador cuando es instanciado.
    index();
};

module.exports = Pedidos;
