/**
 * @fileOverview En este archivo se crea el controlador "Facturas".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Facturas".
 * @class Es la clase que define al controlador "Facturas".
 * @memberOf Global.Controller
 * @param {Object} client El cliente con sus datos.
 * @param {String} [action = main]) La acción que debe realizar el controlador.
 */
var Facturas = function(client, action) {
    /**
     * El modelo de "CabeceraPedido" para recuperar datos de los pedidos.
     * @private
     * @type Model
     */
    var modelOrder = new Global.Model.CabeceraPedido();

    /**
     * El modelo de "Cobros" para recuperar datos de las facturas pendientes.
     * @private
     * @type Model
     */
    var modelCharge = new Global.Model.Cobros();

    /**
     * El modelo de "CobrosSend" para actualizar los cobros que se realicen.
     * @private
     * @type Model
     */
    var modelChargeSend = new Global.Model.CobrosSend();
    
    /**
     * La fila actual.
     * @private
     * @type {Object} 
     */
    var currentRow;

    action = action || "main";

    /**
     * Crea la ventana principal.
     * @private
     */
    function main() {
        createMainWin().open();
    };

    /**
     * Crea un nuevo registro.
     * @private
     */
    function create() {
        modelChargeSend.setData(currentRow);
        modelChargeSend.insert();
    };

    /**
     * Actualiza un registro.
     * @private
     */
    function update() {
        modelChargeSend.setData(currentRow);
        modelChargeSend.update();
    };

    /**
     * Elemina un registro.
     * @private
     */
    function destroy() {
        var dialog = Ti.UI.createAlertDialog({
            cancel : 1,
            buttonNames : ['Si', 'No'],
            message : '¿Desea eliminar esta fila?',
            title : 'ELIMINAR FILA'
        });

        dialog.addEventListener('click', function(r) {
            if (r.index != r.source.cancel) {
                // Code here ...
            }
        });
        dialog.show();
    };

    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @private
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createMainWin() {
        //Las facturas pendientes.
        var invoices = returnInvoices();

        //La ventan principal
        var win = Ti.UI.createWindow({
            // title : 'Facturas',
            backgroundColor : Global.Theme.BACKGROUND,
            url : Global.Path.VIEW + 'Facturas/MainWin.js',
            navBarHidden : true,
            invoices : invoices,
            Global : Global,
            nameClient : client.NombreComercial,
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        //Cuando seleccionamos una fila de la tabla.
        win.addEventListener('table:click', function(e) {
            chargesPopup(invoices[e.index], e.row);
        });

        return win;
    };

    /**
     * Retorna todas las facturas pendientes del cliente.
     * @private
     * @return {Object[]} Un array con todas las facturas del cliente.
     */
    function returnInvoices() {
        //Los cobros originales.
        var charges = modelCharge.select("WHERE CodigoCliente = " + client.CodigoCliente);

        //Por cada cliente miramos si está tratado.
        for (var c = 0; c < charges.length; c++) {
            var editCharge = modelChargeSend.select("WHERE NumFactura = '" + charges[c].NumFactura + "'");
            charges[c] = editCharge.length > 0 ? editCharge[0] : charges[c];
        };

        return charges;

    };

    /**
     * Crea la ventana emergente para editar los cobros.
     * @param {Object} charge Los datos del cobro.
     * @param {Ti.UI.TableViewRow} row La fila que es llamada.
     */
    function chargesPopup(charge, row) {
        var body = require(Global.Path.VIEW + 'Facturas/ViewCharge')(charge);

        var options = {
            title : "Información del cobro",
            body : body,
            icon : Global.Control.Windows.ICON.INFORMATION,
            buttons : Global.Control.Windows.BUTTON.SAVE_CANCEL
        };

        var popup = new Global.Control.Windows.Popup(options);

        popup.addEventClickButton("save", function() {
            var r = body.getData();
            //Si no hay un importe superior a 0 no hacemos nada.
            if (r.amount > 0) {
                charge.FechaCobro = Global.Functions.dateTimeSQliteFormat(new Date());
                charge.ImporteCobro = r.amount;
                charge.TipoCobro = r.type;
                charge.NumTalon = r.check;
                charge.Vencimiento = r.expiration;
                charge.send = 0;
                
                currentRow = charge;
                saveData();
                
                row.setImports(r.amount);
                popup.close();
            };
            
        });

        popup.open();

    };
    
    /**
     * Inserta o actualiza el cobro según convenga.
     * @private
     */
    function saveData(){
         //Buscamos el cobro en la tabla de cobros de envio.
         if(modelChargeSend.select("WHERE NumFactura = '" + currentRow.NumFactura + "'").length > 0){
            update();  
         } else {
            create();
         };
    };
    
    /**
     * Indica si el cliente tiene facturas.
     * @return {Boolean} Retorna TRUE si el cliente tiene facturas, FALSE en caso contrario. 
     */
    this.hasInvoices = function(){
        return returnInvoices().length > 0;
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

module.exports = Facturas;
