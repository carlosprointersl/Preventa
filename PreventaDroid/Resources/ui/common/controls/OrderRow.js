/**
 * @fileOverview En este archivo se crea la fila cuando se realiza un pedido.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una fila para el menú de pedido. Esta fila está dotada de una serie de funciones y parámetros para mejorar la funcionalidad
 * a la hora de realizar un pedido.
 * @class
 * @memberOf Global.Control
 * @param {Object} cliente El cliente al que pertenece el pedido.
 * @param {Object} options Las opciones de la fila.
 */
function OrderRow(client, options) {
    /**
     * El color de fondo actual. Puede tener dos, dependiendo si es una línea de prepedido o de pedido.
     * @private
     * @type String
     */
    var backgroundColor = options.Venta > 0 || options.Regalo > 0 ? Global.Theme.ROW.BACKGROUND : Global.Theme.OBJECT_DISABLED;

    /**
     * El controlador de "Parametros".
     * @private
     * @type Controller
     */
    var parameters = Global.Parameters.Configuracion;

    /**
     * El controlador de "Iva y recargos".
     * @private
     * @type Controller
     */
    var ivaRecargo = Global.Parameters.IvaRecargo;

    /**
     * El modelo para las Últimas ventas.
     * @private
     * @type Model
     */
    var modelLastSales = new Global.Model.UltimasVentas();

    /**
     * La fila.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var row = Ti.UI.createTableViewRow({
        backgroundColor : backgroundColor,
        //className : options.Venta > 0 || options.Regalo > 0 ? 'orderList' : 'preOrderList',
        height : Ti.UI.SIZE,
        layout : 'vertical'
    });

    /**
     * El contenedor de arriba (Descripción y botón).
     * @private
     * @type Ti.UI.View
     */
    var viewItem = Ti.UI.createView({
        height : Ti.UI.SIZE,
        touchEnabled : false
    });
    row.add(viewItem);

    /**
     * El contenedor de abajo (Unidades).
     * @private
     * @type Ti.UI.View
     */
    var viewTexts = Ti.UI.createView({
        height : Ti.UI.SIZE,
        layout : 'horizontal',
        touchEnabled : false
    });
    row.add(viewTexts);

    /**
     * Nombre comercial.
     * @private
     * @type Ti.UI.Label
     */
    var labelName = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 17,
            fontWeight : 'bold'
        },
        text : options.Descripcion,
        height : Ti.UI.SIZE,
        left : 2,
        right : 30,
        touchEnabled : false
    });
    viewItem.add(labelName);

    /**
     * Los valores de los campos de la fila.
     * @private
     * @type Object[]
     */
    var values = [{
        text : options.CodigoArticulo,
        width : '14%'
    }, {
        text : Global.Functions.numToEuro(options.Precio),
        width : '20%'
    }, {
        text : options.Venta,
        width : '12%'
    }, {
        text : options.Regalo,
        width : '12%'
    }, {
        text : Global.Functions.numToEuro(options.DtoFijo + options.DtoEspecial),
        width : '20%'
    }];

    // Insertamos los valores
    for (var i = 0, j = values.length; i < j; i++) {
        viewTexts.add(Ti.UI.createLabel({
            color : Global.Theme.TEXT_SECONDARY,
            font : {
                fontSize : 11
            },
            text : values[i].text,
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
            height : Ti.UI.SIZE,
            width : values[i].width,
        touchEnabled : false
        }));
    };

    /**
     * Total.
     * @private
     * @type Ti.UI.Label
     */
    var labelTotal = Ti.UI.createLabel({
        backgroundColor : Global.Theme.ORDER.TOTAL_BACKGROUND,
        borderWidth : 1,
        borderColor : Global.Theme.ORDER.TOTAL_BORDER,
        color : Global.Theme.ORDER.TOTAL_TEXT,
        font : {
            fontSize : 12,
            fontWeight : 'bold'
        },
        text : '0,00€',
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        width : '21%', //Ti.UI.FILL,
        height : Ti.UI.SIZE,
        touchEnabled : false
    });
    viewTexts.add(labelTotal);

    /**
     * El botón para el HISTORIAL.
     * @private
     * @type Ti.UI.Button
     */
    var but = Ti.UI.createImageView({
        image : "/images/source_h_32.png",
        right : 2,
        height : 25,
        bubbleParent : false
    });
    viewItem.add(but);

    /**
     * El evento 'click' del botón HISTORIAL.
     * @private
     * @event Click
     */
    but.addEventListener('click', function() {
        var list = modelLastSales.select("WHERE CodigoCliente = '" + client.CodigoCliente + "' AND CodigoArticulo = '" + options.CodigoArticulo + "' ORDER BY FechaFactura DESC");
        // Ti.API.info("WHERE CodigoCliente = '" + client.CodigoCliente + "' AND CodigoArticulo = '" + options.CodigoArticulo + "' ORDER BY FechaFactura DESC");
        //Si hay resultados
        if (list.length > 0) {
            var win = Ti.UI.createWindow({
                backgroundColor : '#000000',
                navBarHidden : false,
                opacity : 0.5,
                url : Global.Path.VIEW + 'Pedido/HistoryArticle.js',
                article : options,
                list : list,
                Global : Global,
                fullscreen : true
            });

            win.open();
        } else {
            var alert = new Global.Control.Windows.Alert({
                title : "HISTORIAL DE VENTAS",
                message : "No existe historial para este artículo.",
                icon : Global.Control.Windows.ICON.INFORMATION
            });

            alert.open();
        };
    });

    /**
     * Calcula el total de la línea con los impuestos y lo retorna.
     * @return {Double} El importe total con los impuestos redondeado a 2 decimales.
     */
    function totalRow() {
        //Los decimales que se van a mostrar
        var decimals = Math.pow(10, parameters.getDecimalesPrecio());
        //El total para la línea
        var totalLine = Math.round(((options.Precio - options.DtoFijo - options.DtoEspecial) * options.Venta) * decimals) / decimals;
        //El IVA en %
        var iva_per = client.CodigoIVA == "N" ? ivaRecargo["getIva" + options.IVA]() : client.CodigoIVA == "R" ? parseFloat(ivaRecargo["getIva" + options.IVA]()) + parseFloat(ivaRecargo["getRecargo" + options.IVA]()) : 0;
        //El IVA en formato númerico para multiplicar.Ej: 21% --> 1,21.
        var iva = (parseInt(iva_per) + 100) / 100;
        //El Punto Verde mas el IVA x la cantidad de venta.
        var pv = (options.PuntoVerde * iva) * options.Venta;
        //El total para la línea + IVA + PuntoVerde
        var total = Math.round(((totalLine * iva) + pv) * 100);

        //Pasamos los importes a las etiquetas correspondientes.
        labelTotal.text = Global.Functions.numToEuro(totalLine);
        row.totalLine = total;

    };

    //Calculamos el total de línea.
    totalRow();

    return row;
};

module.exports = OrderRow;
