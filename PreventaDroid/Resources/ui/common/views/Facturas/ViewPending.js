/**
 * @fileOverview En este archivo se crea la vista para cobrar lasl facturas pendientes.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una vista que lista las facturas pendientes.
 * @param {Object} options Las diferentes opciones que tiene el objeto.</br>
 * <ol>
 * <li>invoices: Las facturas que ha de mostrar.</li>
 * <li>nameClient: El nombre comercial del cliente.</li>
 * </ol>
 * @return {Ti.UI.View} La vista montada.
 */
function ViewPending(options) {
    /**
     * La variable Global.
     * @private
     * @namespace 
     */
    var Global = require('/global/class/ReturnGlobal')();
    
    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var view = Ti.UI.createView({
        visible : false
    });
    
    /**
     * La vista de la cabecera.
     * @private
     * @type Ti.UI.View
     */
    var header = Ti.UI.createView({
        top : 0,
        height : 40,
        backgroundColor : Global.Theme.HEADER
    });

    /**
     * La etiqueta del título. 
     * @private
     * @type Ti.UI.Label
     */
    var nameClient = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 19
        },
        text : options.nameClient,
        left : 5
    });
    
    //Por cada factura creamos una fila válida.
    var data = new Array();
    var row = require(Global.Path.VIEW + 'Facturas/InvoiceRow');
    for (var i=0; i < options.invoices.length; i++) {
        data.push(row(options.invoices[i], Global.Functions.dateFormat));
    };
    
    /**
     * La tabla con las facturas pendientes.
     * @private
     * @type Ti.UI.TableView 
     */
    var table = Ti.UI.createTableView({
        data : data,
        top : 40
    });
    
    /**
     * Añade una función al evento 'click' de la tabla.
     * @param {Function} callback La función que realizará al disparar el evento click de la tabla. 
     */
    view.addClickTableListener = function(callback){
        table.addEventListener('click', callback);
    };
    
    //Añadimos los controles a la vista principal
    header.add(nameClient);
    
    view.add(header);
    view.add(table);

    return view;
    
};

module.exports = ViewPending;
