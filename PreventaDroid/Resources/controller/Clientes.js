/**
 * @fileOverview En este archivo se crea el controlador "Clientes".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Clientes".
 * @class Es la clase que define al controlador "Clientes". Interactua con el modelo "Clientes".
 * @memberOf Global.Controller
 * @param {String} [action = index]) La acción que debe realizar el controlador.
 */
var Clientes = function(action) {
    /**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    var model = new Global.Model.Clientes();

    /**
     * El modelo para guardar los datos a enviar.
     * @private
     * @type Model
     */
    var modelSend = new Global.Model.ClientesSend();

    /**
     * El controlador de plantillas.
     * @private
     * @type Controller
     */
    var template;
    // = new Global.Controller.Plantilla();

    /**
     * Es la ventana principal, la vista "index".
     * @private
     * @type Ti.UI.Window
     */
    var mainWin = createMainWin();

    /**
     * Datos del registro con el que se esta trabajando. Simula un Array asociativo.
     * @private
     * @type Object
     */
    var currentRow = model.getData();

    action = action || "main";

    /**
     * Muestra una la vista principal.
     * @private
     */
    function main() {
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
     * Crea un nuevo cliente en la base de datos "SEND".
     * @private
     */
    function create() {
        var client = currentRow.getClient();
        client.send = "0";
        modelSend.setData(client);
        modelSend.insert();
    };

    /**
     * Actualiza un cliente de la base de datos "SEND".
     * @private
     */
    function update() {
        var client = currentRow.getClient();

        //Buscamos el cliente en SEND, si está realizamos un "update" en caso contrario un "insert".
        var clientSend = modelSend.select("WHERE CodigoCliente = '" + client.CodigoCliente + "'");

        if (clientSend.length > 0) {
            modelSend.setData(client);
            modelSend.update();
        } else {
            create();
        };
    };

    /**
     * Elemina un registro.
     * @private
     */
    function destroy() {
        var client = currentRow.getClient();

        //La función al aceptar.
        function deleteUser() {
            //Si es una "ALTA" la eliminamos, sino actualizamos su estado.
            if (client.Tratado == "ALTA") {
                modelSend.setData(modelSend.select("WHERE CodigoCliente = '" + client.CodigoCliente + "'")[0]);
                modelSend.del();
                popup.close();
                currentRow.treated(modelSend.select());
                currentRow = undefined;
            } else {
                client.Tratado = 'BAJA';
                client.FechaCambio = Global.Functions.dateTimeSQliteFormat(new Date());
                popup.close();
                update();
                currentRow.treated(modelSend.select());
            };
        };

        //Las opciones de la ventana
        var options = {
            title : "ELIMINAR USUARIO",
            message : "¿Seguro que quiere eliminar al usuario " + client.NombreComercial + " ?",
            icon : Global.Control.Windows.ICON.QUESTION,
            buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
        };
        //El objeto Popup
        var popup = new Global.Control.Windows.Alert(options);

        popup.addEventClickButton("accept", deleteUser);
        popup.open();
    };

    /**
     * Retorna los clientes según la condición.
     * @private
     * @param {String} filter La condición para mostrar los clientes.
     * @param {String} value El valor de la condición.
     * @return {Object[]} Los clientes que cumplan los requisitos.
     */
    function selectClients(filter, value) {
        //Los clientes que cumplen la condición.
        var clients = model.select(value != "" ? "WHERE " + filter + " LIKE '%" + value + "%'" : value);
        //Los clientes dados de alta
        var newClients = modelSend.select(value != "" ? "WHERE Tratado = 'ALTA' AND " + filter + " LIKE '%" + value + "%'" : "WHERE Tratado = 'ALTA'");
        //Por cada cliente miramos si está tratado.
        for (var c = 0; c < clients.length; c++) {
            var sendClient = modelSend.select("WHERE CodigoCliente = '" + clients[c].CodigoCliente + "'");
            clients[c] = sendClient.length > 0 ? sendClient[0] : clients[c];
        };
        //Añadimos los clientes nuevos al final del listado.
        for (var n = 0; n < newClients.length; n++) {
            clients.push(newClients[n]);
        };

        return clients;
    };

    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @private
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createMainWin() {
        var win = Ti.UI.createWindow({
            //title : 'Clientes',
            backgroundColor : Global.Theme.BACKGROUND,
            url : Global.Path.VIEW + 'Clientes/MainWin.js',
            Global : Global,
            navBarHidden : true,
            customersEdit : modelSend.select(),
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });
        //New
        win.addEventListener('butNew', function() {
            var row = model.getData();
            row.CodigoCliente = Global.Parameters.Configuracion.getNuevoCodigo();
            template = new Global.Controller.Plantilla(row.CodigoCliente);
            var newWin = createEditWin(row);

            //Al guardar los datos.
            newWin.addEventListener('saveForm', function(e) {
                var row = require(Global.Path.VIEW + 'Clientes/ClientRow');
                e.client.Tratado = 'ALTA';
                //Recuperamos el código del cliente de los parámetros y le sumamos uno.
                //e.client.CodigoCliente = Global.Parameters.Configuracion.getNuevoCodigo();
                Global.Parameters.Configuracion.setNuevoCodigo(e.client.CodigoCliente + 1 < 1000000 ? e.client.CodigoCliente + 1 : 999901);
                e.client.FechaCambio = Global.Functions.dateTimeSQliteFormat(new Date());
                currentRow = row(e.client);
                create();
                //template.saveTemplates();
                //Mostramos los clientes "tratados".
                win.fireEvent('search:data', {
                    data : modelSend.select()
                });
            });

            newWin.open();
        });
        //Modify
        win.addEventListener('butModify', function(e) {
            currentRow = e.row.getClient();
            template = new Global.Controller.Plantilla(currentRow.CodigoCliente);
            //El formulario de edición
            var editWin = createEditWin(currentRow);

            //Al guardar los datos
            editWin.addEventListener('saveForm', function(e) {
                var row = require(Global.Path.VIEW + 'Clientes/ClientRow');
                e.client.Tratado = e.client.Tratado != 'ALTA' ? 'MODI' : 'ALTA';
                e.client.FechaCambio = Global.Functions.dateTimeSQliteFormat(new Date());
                var tmpRow = row(e.client);
                Ti.API.info("Día de servicio UPDATE: " + e.DiaServicio);
                //currentRow.parent.updateRow(currentRow.index, tmpRow);
                currentRow = tmpRow;
                update();
                //Mostramos los clientes "tratados".
                win.fireEvent('search:data', {
                    data : modelSend.select()
                });
            });

            editWin.open();
        });
        //Delete
        win.addEventListener('butDelete', function(e) {
            currentRow = e.row;
            destroy();
        });
        //Duplicate
        win.addEventListener('butDuplicate', function(e) {
            var row = require(Global.Path.VIEW + 'Clientes/ClientRow');
            var client = e.row.getClient();
            //Si el original no es un 'ALTA' lo ducplicamos.
            if (client.Tratado != 'ALTA' && client.Tratado != 'BAJA') {
                client.Tratado = 'ALTA';
                client.NIF = "000000000";
                //Recuperamos el código del cliente de los parámetros y le sumamos uno.
                client.CodigoCliente = Global.Parameters.Configuracion.getNuevoCodigo();
                Global.Parameters.Configuracion.setNuevoCodigo(client.CodigoCliente + 1 < 1000000 ? client.CodigoCliente + 1 : 999901);
                client.FechaCambio = Global.Functions.dateTimeSQliteFormat(new Date());
                currentRow = row(client);
                create();
                //Mostramos los clientes "tratados".
                win.fireEvent('search:data', {
                    data : modelSend.select()
                });
            };
        });
        //Search
        win.addEventListener('butLens', function(e) {
            win.fireEvent('search:data', {
                data : selectClients(e.filter, e.value)
            });
        });

        return win;
    };

    /**
     * Crea la vista Edit con la que podemos crear/editar registros.
     * @private
     * @param {DataTable.Row} [row] Una fila válida.
     */
    function createEditWin(row) {
        //La ventana para editar los datos
        var win = Ti.UI.createWindow({
            // title : 'Datos del cliente',
            backgroundColor : Global.Theme.BACKGROUND,
            url : Global.Path.VIEW + 'Clientes/CustomerData.js',
            Global : Global,
            navBarHidden : true,
            row : row,
            pickerFrecuency : pickerFrecuency,
            template : template,
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        return win;
    };

    /**
     * Retorna los datos de un cliente saviendo su "CodigoCliente".
     * @param {Integer} id El código del cliente del que queremos recuperar los datos.
     * @return {Object/Null} El cliente o null si no lo encuentra
     */
    this.getClient = function(id) {
        var client = model.select("WHERE CodigoCliente = '" + id + "'");
        return client.length > 0 ? client[0] : null;
    };

    /**
     * Los datos del campo "Frecuencia" se guardan com "S"(Semanal), "1"(1ª Quinzena), "2"(2ª Quinzena).</br>
     * Esta función pasa los datos de la BBDD al picker y viceversa.
     * @param {String/Number} value El valor a pasar.
     * @return {String/Number/Null} El valor a recuperar dependiendo del valor pasado.
     */
    function pickerFrecuency(value) {
        var values = [null, "S", "1", "2"];
        //Si es un número lo pasamos a letra. SI NO lo pasamos a número.
        if ( typeof value == "number") {
            return values[value];
        } else {
            return values.lastIndexOf(value);
        };
    };

    //Se ejecuta cuando se instancia el objeto.
    (function() {
        switch(action) {
            case "main":
                main();
                break;
            case "index":
                index();
                break;
            case "show":
                show();
                break;
            case "new":
                _new();
                break;
            case "edit":
                edit();
                break;
            case "create":
                create();
                break;
            case "update":
                update();
                break;
            case "destroy":
                destroy();
                break;
        }
    })();

};

module.exports = Clientes;
