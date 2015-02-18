/**
 * @fileOverview En este archivo se crea la fila para mostrar las facturas pendientes.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una fila para el listado de facturas pendientes.
 * @class
 * @memberOf Global.Control
 * @param {Object} invoice Los datos de la factura.
 * @param {Function} dateFormat La función que le da formato a la fecha.
 */
function InvoiceRow(invoice, dateFormat) {
    /**
     * La variable Global.
     * @private
     * @namespace 
     */
    var Global = require('/global/class/ReturnGlobal')();
    
    /**
     * La fila.
     * @private
     * @type Ti.UI.TableViewRow
     */    
    var row = Global.Control.Row.SelectedRow();
    
    //Modificamos las opciones de la vista "content" del "row".
    row.setClassName('invoiceRow');
    row.content.setLayout("vertical");
    
    /**
     * Serie, factura y fecha
     * @private
     * @type Ti.UI.View
     */
    var viewData = Ti.UI.createView({
        height : Ti.UI.SIZE,
        width : Ti.UI.FILL
    });

    /**
     * Importes de la factura.
     * @private
     * @type Ti.UI.View
     */
    var viewImports = Ti.UI.createView({
        height : Ti.UI.SIZE,
        width : Ti.UI.FILL,
        layout : 'horizontal'
    });

    /**
     * La serie mas el número de la factura.
     * @private
     * @type Ti.UI.Label
     */
    var labelNumInvoice = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 22,
            fontWeight : 'bold'
        },
        text : "(" + invoice.Serie + ") " + invoice.NumFactura,
        left : 2,
        height : 33
    });

    /**
     * La fecha de la factura
     * @private
     * @type Ti.UI.Label
     */
    var labelDate = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 22,
            fontWeight : 'bold'
        },
        text : invoice.FechaFactura, 
        right : 2,
        height : 33
    });

    /**
     * Los datos de los importes. Con estos datos se crean las vistas que componen los importes.
     * @private
     * @type Object[].
     */
    var dataImports = [{
        title : "Importe",
        value : Global.Functions.numToEuro(invoice.ImporteTotal)
    }, {
        title : "Pagado",
        value : invoice.ImporteCobro != null ? Global.Functions.numToEuro(invoice.ImporteCobro) : "0,00€" 
    }, {
        title : "Pendiente",
        value : Global.Functions.numToEuro(invoice.ImporteTotal - invoice.ImporteCobro)
    }];

    /**
     * Crea las filas de los importes y las añade a la vista "viewImports".
     * @private
     */
    (function() {
        // Por cada importe creamos una vista y la añadimos a la vista "viewImports".
        for (var v=0; v < dataImports.length; v++) {
            viewImports.add(require(Global.Path.VIEW + 'Facturas/ViewAmount')(dataImports[v]));
        };
        
    })();
    
    /**
     * Cambia el valor de los importes de "Pagado" y de "Pendiente".
     * @param {Object} pay El importe "pagado". 
     */
    row.setImports = function(pay){
        viewImports.children[1].children[1].setText(Global.Functions.numToEuro(pay));  
        viewImports.children[2].children[1].setText(Global.Functions.numToEuro(invoice.ImporteTotal - pay));
    };

    viewData.add(labelNumInvoice);
    viewData.add(labelDate);

    row.content.add(viewData);
    row.content.add(viewImports);
    
    return row;
};

module.exports = InvoiceRow;
