/**
 * @fileOverview En este archivo se crea la ventana para listar y marcar las notas del preventista.
 *
 * @author Juan Carlos Matilla
 * @version 1.0
 *
 */

/**
 * La variable Global.
 */
var Global = require('/global/class/ReturnGlobal')();

/**
 * La librería underscore.js
 */
var _ = require('/lib/underscore');

/**
 * @class La clase que define la ventana para mostrar las notas para el preventista.
 * @param {Number} [client] El código de cliente.
 */
module.exports = function(client) {
    /**
     * La ventana de las notas.
     * @private
     * @type Ti.UI.Window
     */
    var win;
    // = Ti.UI.createWindow({
    // navBarHidden : true
    // });

    /**
     * El controlador de las notas del preventista.
     * @private
     * @type Object
     */
    var controller;
    // = new Global.Controller.NotasPreventista();

    /**
     * El controlador de los clientes.
     * @private
     * @type Object
     */
    var clientsController;
    // = new Global.Controller.Clientes('nothing');

    /**
     * La tabla con las notas.
     * @private
     * @type Ti.UI.TableView
     */
    var table;
    // = Ti.UI.createTableView({
    // data : createDataTable(),
    // top : 50,
    // bottom : 0
    // });
    // win.add(table);

    /**
     * Inicializa los valores de las propiedades si no lo están ya.
     */
    function initialize() {
        //La ventana.
        win = Ti.UI.createWindow({
            navBarHidden : true,
            backgroundColor : Global.Theme.BACKGROUND,
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        //El controlador NostaPreventista
        controller = new Global.Controller.NotasPreventista();

        // El controlador de las notas leídas e enviadas.
        clientsController = new Global.Controller.Clientes('nothing');

        /**
         * La cabera.
         * @private
         * @type Ti.UI.View
         */
        var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')(client == undefined ? "Todas las notas" : "Notas de cliente", "Salir", function() {
            win.close();
        });
        headerMenu.setTop(0);
        win.add(headerMenu);

        //La tabla con las notas
        table = Ti.UI.createTableView({
            data : createDataTable(),
            top : 50,
            bottom : 0
        });
        win.add(table);
    };

    /**
     * Crea una tabla con las notas globales y las de todos los clientes.
     * @return {TableViewRow[]} Las filas para la tabla.
     */
    function createAllData() {
        var rows = new Array();
        var row = require(Global.Path.VIEW + 'NotasPreventista/RowNote');
        var sectionRow = require(Global.Path.VIEW + 'NotasPreventista/SectionRowNote');
        var notes = controller.getAllNotes();

        rows.push((new sectionRow('Notas globales')).getRow());
        //Las notas globales.
        var globals = _.filter(notes, function(element) {
            return element.CodigoCliente == 0;
        });
        //Añadimos las notas globales.
        for (var i = 0, j = globals.length; i < j; i++) {
            rows.push((new row(globals[i], controller.checkNote)).getRow());
        };

        //Las notas de clientes.
        var clients = _.reject(notes, function(element) {
            return element.CodigoCliente == 0;
        });
        //Añadimos las notas de clientes.
        rows.push((new sectionRow('Notas de clientes')).getRow());
        for (var i = 0, j = clients.length; i < j; i++) {
            var tmpClient = clientsController.getClient(clients[i].CodigoCliente);
            rows.push((new row(clients[i], controller.checkNote, tmpClient.NombreComercial)).getRow());
        };

        return rows;
    };

    /**
     * Crea una tabla con las notas del cliente.
     * @return {TableViewRow[]} Las filas para la tabla.
     */
    function createClientData() {
        var rows = new Array();
        var row = require(Global.Path.VIEW + 'NotasPreventista/RowNote');
        var sectionRow = require(Global.Path.VIEW + 'NotasPreventista/SectionRowNote');
        var notes = controller.getNotes(client);
        var tmpClient = clientsController.getClient(client);
        
        //Añadimos el nombre del Cliente.
        rows.push((new sectionRow(tmpClient.NombreComercial)).getRow());
        //Añadimos las notas de clientes.
        for (var i = 0, j = notes.length; i < j; i++) {
            
            rows.push((new row(notes[i], controller.checkNote)).getRow());
        };

        return rows;
    };

    /**
     * Crea los datos de la tabla.
     * @return {TableViewRow[]} Las filas para la tabla.
     */
    function createDataTable() {
        return client === undefined ? createAllData() : createClientData();
    };

    /**
     * Nos indica si hay notas para el preventista.
     * @return {Boolean} Retorna TRUE si hay notas y FALSE en caso contrario.
     */
    function haveNotes() {
        //El controlador NotasPreventista
        var modelNotes = new Global.Model.NotasPreventista();

        return modelNotes.select(client != undefined ? "WHERE CodigoCliente = " + client : "").length > 0;
    };

    /**
     * Inicializa los valores de la ventana y la abre si hay notas.
     */
    this.open = function() {
        //Comprobamos que hay notas.
        if (haveNotes()) {
            //Inicializa la ventana si no lo está.
            if (win == undefined)
                initialize();
            win.open();
        };
    };

};
