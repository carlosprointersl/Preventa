/**
 * @fileOverview En este archivo se crea la vista para realizar el cobro de la factura al cliente.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una vista para editar los datos del cobro de la factura al cliente.
 * @class
 * @memberOf Global.Control
 * @param {Object} amount El título y el valor correspondiente.
 */
function ViewCharge(amount) {

    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var view = Ti.UI.createView({
        layout : 'vertical',
        height : Ti.UI.SIZE
    });

    /**
     * La variable Global.
     * @private
     * @namespace
     */
    var Global = require('/global/class/ReturnGlobal')();

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
     * Los datos del talón.
     * @private
     * @type Ti.UI.View
     */
    var viewCheck = Ti.UI.createView({
        height : 0,
        width : Ti.UI.FILL,
        layout : 'horizontal',
    });

    /**
     * El contenendor del número de talón.
     * @private
     * @type Ti.UI.View
     */
    var viewCheckNum = Ti.UI.createView({
        height : Ti.UI.SIZE,
        width : '60%',
        layout : 'vertical'
    });

    /**
     * El contenendor del vencimiento del talón.
     * @private
     * @type Ti.UI.View
     */
    var viewCheckExpiration = Ti.UI.createView({
        height : Ti.UI.SIZE,
        width : '40%',
        layout : 'vertical'
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
        text : "(" + amount.Serie + ") " + amount.NumFactura,
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
        text : amount.FechaFactura,
        right : 2,
        height : 33
    });

    /**
     * Número de talón.
     * @private
     * @type Ti.UI.Label
     */
    var labelNumCheck = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 16
        },
        text : "Número de talón"
    });

    /**
     * Vencimiento.
     * @private
     * @type Ti.UI.Label
     */
    var labelExpiration = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 16
        },
        text : "Vencimiento"
    });

    /**
     * Los datos de los importes. Con estos datos se crean las vistas que componen los importes.
     * @private
     * @type Object[].
     */
    var dataImports = [{
        title : "Importe",
        value : Global.Functions.numToEuro(amount.ImporteTotal)
    }, {
        title : "Pagado",
        value : amount.ImporteCobro != null ? Global.Functions.numToEuro(amount.ImporteCobro) : "0,00€"
    }, {
        title : "Pendiente",
        value : Global.Functions.numToEuro(amount.ImporteTotal - amount.ImporteCobro)
    }];

    /**
     * Crea las filas de los importes y las añade a la vista "viewImports".
     * @private
     */
    (function() {
        // Por cada importe creamos una vista y la añadimos a la vista "viewImports".
        for (var v = 0; v < dataImports.length; v++) {
            viewImports.add(require(Global.Path.VIEW + 'Facturas/ViewAmount')(dataImports[v], dataImports[v].title == "Pagado"));
        };

    })();

    //El evento 'click' para la etiqueta y el importe pendiente. Con esto se marca el total de la factura en la casilla de pagado.
    viewImports.children[2].children[0].addEventListener('click', function() {
        textPay.setValue(amount.ImporteTotal.toString().replace(".", ","));
    });

    viewImports.children[2].children[1].addEventListener('click', function() {
        textPay.setValue(amount.ImporteTotal.toString().replace(".", ","));
    });

    /**
     * El "textField" que guarda el importe de pagado.
     * @private
     * @type Ti.UI.TextFiedl
     */
    var textPay = viewImports.children[1].children[1];

    /**
     * Añadimos una escucha a "textPay" para cuando el importe de pagado cambie de valor.
     * @event 'change'
     */
    textPay.addEventListener('change', function(e) {
        var fl = parseFloat(textPay.getValue().replace(",", "."));
        //Ti.API.info(fl + " --> isNaN " + isNaN(fl));
        if (fl > amount.ImporteTotal)
            textPay.setValue(amount.ImporteTotal.toString().replace(".", ","));
        try {
            viewImports.children[2].children[1].setText(Global.Functions.numToEuro(amount.ImporteTotal - (isNaN(fl) ? 0 : fl)));
        } catch(e) {
            Ti.API.info("ERROR textPay " + e.name + ": " + e.message);
        };
    });

    /**
     * El selecctor de tipo de cobro(METÁLICO - TALÓN).
     * @private
     * @type Ti.UI.Picker
     */
    var typeCharge = Ti.UI.createPicker({
        left : 0,
        right : 0,
        selectionIndicator : true
    });
    //Añadimos las filas al picker
    typeCharge.add([Ti.UI.createPickerRow({
        title : "Metálico"
    }), Ti.UI.createPickerRow({
        title : "Talón"
    }), Ti.UI.createPickerRow({
        title : "Tarjeta"
    })]);

    //Selecionamos el tipo "Talón" si es necesario.
    if (amount.TipoCobro === "T") {
        typeCharge.setSelectedRow(0, 1);
        viewCheck.setHeight(Ti.UI.SIZE);
    } else if (amount.TipoCobro === "V")
        typeCharge.setSelectedRow(0, 2);

    /**
     * En el evento "change" del selector de tipo de pago, mostramos el formulario de talonario cuando elegimos esta opción.
     * @event 'change'
     */
    typeCharge.addEventListener('change', function(e) {
        //Si es Talón mostramos el formulario de este. Si no lo escondemos.
        if (e.row.title == "Talón") {
            viewCheck.animate(Ti.UI.createAnimation({
                height : Ti.UI.SIZE,
                duration : 300
            }));
        } else {
            viewCheck.animate(Ti.UI.createAnimation({
                height : 0,
                duration : 300
            }));
        };
    });

    /**
     * EL textField donde guardar el número del talón.
     * @private
     * @type Ti.UI.TextField
     */
    var textNumCheck = Ti.UI.createTextField({
        value : amount.NumTalon,
        width : Ti.UI.FILL
    });

    /**
     * EL textField donde guardar la fecha de vencimiento del talón.
     * @private
     * @type Ti.UI.TextField
     */
    var textExpiration = Ti.UI.createTextField({
        value : amount.Vencimiento,
        editable : false,
        width : Ti.UI.FILL
    });

    /**
     * Muestra una ventana para editar la fecha de vencimiento.
     */
    function openDateWin() {
        var winDate = new Global.Control.Windows.DateTime({
            title : "FECHA DEL VENCIMIENTO",
            type : Ti.UI.PICKER_TYPE_DATE,
            value : (textExpiration.getValue() != "" ? new Date(textExpiration.getValue().substr(6, 4), textExpiration.getValue().substr(3, 2) - 1, textExpiration.getValue().substr(0, 2)) : new Date())
        });

        winDate.addEventListener('dateTime:value', function(e) {
            //Ti.API.info("************* FIRE EVENT dateTime:value --> " + e.value);
            textExpiration.setValue(Global.Functions.dateFormat(e.value));
        });

        winDate.open();
    };

    /**
     * El evento 'click' del textExpiration. Muestra una ventana para la edición de la fecha.
     */
    textExpiration.addEventListener('click', openDateWin);
    
    /**
     * El evento 'focus' del textExpiration. Muestra una ventana para la edición de la fecha.
     */
    textExpiration.addEventListener('focus', openDateWin);

    /**
     * Retorna los datos modificados.
     */
    view.getData = function() {
        return {
            amount : isNaN(parseFloat(textPay.value.replace(",", "."))) ? 0 : parseFloat(textPay.value.replace(",", ".")),
            type : typeCharge.getSelectedRow(0).title == 'Metálico' ? "M" : typeCharge.getSelectedRow(0).title == 'Talón' ? "T" : "V",
            check : typeCharge.getSelectedRow(0).title == 'Metálico' ? "" : textNumCheck.value,
            expiration : typeCharge.getSelectedRow(0).title == 'Metálico' ? "" : textExpiration.value
        };
    };

    //Añadimos los controles
    viewData.add(labelNumInvoice);
    viewData.add(labelDate);

    viewCheckNum.add(labelNumCheck);
    viewCheckNum.add(textNumCheck);

    viewCheckExpiration.add(labelExpiration);
    viewCheckExpiration.add(textExpiration);

    viewCheck.add(viewCheckNum);
    viewCheck.add(viewCheckExpiration);

    view.add(viewData);
    view.add(viewImports);
    view.add(typeCharge);
    view.add(viewCheck);

    return view;
};

module.exports = ViewCharge;
