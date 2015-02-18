/**
 * @fileOverview En este archivo se crea el controlador "Pedidos".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

//La librería underscore.js
var _ = require('/lib/underscore');

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
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
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
        //Ti.API.warn("*********************** INICIO DATOS CLIENTE ********** -> " + Date.now());
        //Consultamos los clientes por el día de la semana
        var clients = modelClients.select(dayWeek != "T" ? "WHERE DiaPreventa = '" + dayWeek + "'" : "");
        //La fila.
        var row = require(Global.Path.VIEW + 'Pedidos/ClientRow');
        //Las filas
        var rows = new Array();
        //Los modelos para recuperar los datos del cliente
        var modelHeader = new Global.Model.CabeceraPedido();
        var orders = modelHeader.select();
        var modelIncidence = new Global.Model.Incidencias();
        var incidences = modelIncidence.select();
        var modelCharge = new Global.Model.Cobros();
        var charges = modelCharge.select();
        var modelNotes = new Global.Model.NotasClientes();
        var notes = modelNotes.select();

        //Ti.API.warn("*********************** INICIO DATOS CLIENTE FOR********** -> " + Date.now());
        //Por cada cliente ...
        _.each(clients, function(element) {
            // for(var i=0,j=clients.length; i<j; i++){
            // var element = clients[i];

            //Marcamos si tienen pedidos e incidencias
            element.hasOrders = _.findWhere(orders, {
                CodigoCliente : element.CodigoCliente
            }) != undefined ? true : false;
            element.hasIncidence = _.findWhere(incidences, {
                CodigoCliente : element.CodigoCliente
            }) != undefined ? true : false;
            element.hasInvoice = _.findWhere(charges, {
                CodigoCliente : element.CodigoCliente
            }) != undefined ? true : false;
            element.Notes = _.findWhere(notes, {
                CodigoCliente : element.CodigoCliente
            });

            //Miramos si tiene incidencias
            if (element.hasIncidence) {
                //dataRow.name = dataRow.name.toString().slice(3);
                element.state = 'incidencia';
                //Miramos si tiene pedidos
            } else if (element.hasOrders) {
                //dataRow.name = dataRow.name.toString().slice(1);
                element.state = 'pedido';
            }
            ;

            rows.push(row(element));
        });
        // };
        //Ti.API.warn("*********************** FIN DATOS CLIENTE ********** -> " + Date.now());

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

        var winMenu = new (require(Global.Path.VIEW + 'Pedidos/ClientMenu'))(e.client);

        //Abrimos las notas si las tiene.
        winMenu.addEventListener('open', function() {
            //Miramos si tiene notas.
            var win = new (require(Global.Path.VIEW + 'NotasPreventista/MainWin'))(e.client.CodigoCliente);
            win.open();
        });

        winMenu.open();
    };

    //La acción que realiza este controlador cuando es instanciado.
    index();
};

module.exports = Pedidos;
