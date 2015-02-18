/**
 * @fileOverview En este archivo se crea el controlador "Incidencias".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Incidencias".
 * @class Es la clase que define al controlador "Incidencias". Interactua con el modelo "Incidencias".
 * @memberOf Global.Controller
 * @param {Object} client Un objeto del tipo "Cliente" para CRUD las incidencias sobre este.
 * @param {Function} buttonState Modifica el botón para realizar perdidos del menú del cliente.
 */
var Incidencias = function(client, buttonState) {
    /**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    var model = new Global.Model.Incidencias();

    /**
     * El controlador para los tipos de incidencias.
     * @private
     * @type Controller
     */
    var typeIncident = new Global.Controller.TipoIncidencia("nothing");

    /**
     * La incidencia actual del cliente, si la tuviera.
     * @private
     * @type Object
     */
    var incidence = model.select("WHERE CodigoCliente = '" + client.CodigoCliente + "'");

    var action = action || "index";

    /**
     * Muestra una tabla/listado de registros.
     * @private
     */
    function index() {
        createMainWin().open();
    };

    /**
     * Muestra una registro.
     * @private
     */
    function show() {
        // Code here ...
    };

    /**
     * Muestra un formulario vacío para crear un registro. (Vista Edit vacía)
     * Si los datos son correctos se guarda en el modelo. (Create())
     * @private
     */
    function _new() {
        // Code here ...
        // View Edit
        // if(OK){create() };
    };

    /**
     * Muestra un formulario con datos para modificar. (Vista Edit llena)
     * Si los datos son correctos se actualiza en el modelo. (Update())
     * @private
     */
    function edit() {
        // Code here ...
        // View Edit
        // if(OK){update() };
    };

    /**
     * Crea un nuevo registro.
     * @private
     */
    function create() {
        model.setData(incidence);
        model.insert();
        buttonState(false);
    };

    /**
     * Actualiza un registro.
     * @private
     */
    function update() {
        model.setData(incidence);
        model.update();
    };

    /**
     * Elemina un registro.
     * @private
     */
    function destroy() {
        model.setData(incidence);
        model.del();
        buttonState(true);
    };

    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @private
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createMainWin() {
        var win = Ti.UI.createWindow({
            // title : 'Incidencias',
            backgroundColor : Global.Theme.BACKGROUND,
            navBarHidden : true,
            url : Global.Path.VIEW + 'Incidencias/MainWin.js',
            Global : Global,
            client : client,
            type : typeIncident,
            incidence : incidence,
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        //Al guardar la incidencia
        win.addEventListener('save', function(e) {
            //Fecha de servicio
            var serviceDate = Global.Functions.compareDate(new Date(Global.Parameters.Preventista.getFechaServicio()), new Date()) == 2 ? new Date(Global.Parameters.Preventista.getFechaServicio()) : Global.Functions.nextWorkDay(new Date());
            //Ti.API.info(Global.Functions.dateSQliteFormat(serviceDate));
            //Si NO ES undefined guardamos o actualizamos los datos.
            if (e.index != undefined) {
                if (incidence.length > 0) {
                    incidence[0].NumIncidencia = e.type.id;
                    incidence[0].Descripcion = e.type.descripcion;
                    incidence[0].CodigoCliente = client.CodigoCliente;
                    incidence[0].Fecha = Global.Functions.dateTimeSQliteFormat(new Date());
                    incidence[0].FechaServicio = Global.Functions.dateSQliteFormat(serviceDate); 
                    incidence[0].send = 0;
                    incidence = incidence[0];
                    update();
                } else {
                    incidence = model.getData();
                    incidence.NumIncidencia = e.type.id;
                    incidence.Descripcion = e.type.descripcion;
                    incidence.CodigoCliente = client.CodigoCliente;
                    incidence.Fecha = Global.Functions.dateTimeSQliteFormat(new Date());
                    incidence.FechaServicio = Global.Functions.dateSQliteFormat(serviceDate);
                    incidence.send = 0;
                    create();
                    Ti.App.fireEvent('orders:isIncidence');
                };
            } else {
                //Eliminamos los datos, si es necesario.
                if (incidence.length > 0) {
                    incidence = incidence[0];
                    destroy();
                    Ti.App.fireEvent('orders:isNothing');
                };
            };
            win.close();
        });

        return win;
    };

    /**
     * Nos indica si el cliente tiene alguna incidencia.
     * @param {String} codeClient El código del cliente.
     * @return {Boolean} Retorna TRUE si el cliente tiene alguna incidencia.
     */
    this.clientIncidence = function() {
        return incidence.length > 0;
    };

    index();

};

module.exports = Incidencias;
