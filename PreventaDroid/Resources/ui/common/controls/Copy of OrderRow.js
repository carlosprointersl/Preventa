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
     * El modelo para los Últimos pedidos.
     * @private
     * @type Model
     */
    var modelLastOrders = new Global.Model.UltimosPedidos();

    /**
     * La fila.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var row = Ti.UI.createTableViewRow({
        backgroundColor : backgroundColor,
        //className : options.Venta > 0 || options.Regalo > 0 ? 'orderList' : 'preOrderList',
        height : 90
    });

    /**
     * El contenedor de todo.
     * @private
     * @type Ti.UI.View
     */
    var viewContent = Ti.UI.createView({
        //backgroundColor : backgroundColor,
        height : 90,
        layout : 'vertical'
    });

    /**
     * El contenedor de arriba (Foto, descripcion y código).
     * @private
     * @type Ti.UI.View
     */
    var viewItem = Ti.UI.createView({
        height : '45%',
        layout : 'horizontal'
    });

    /**
     * El contenedor de abajo (Unidades).
     * @private
     * @type Ti.UI.View
     */
    var viewTexts = Ti.UI.createView({
        height : '25%',
        layout : 'vertical'
    });

    /**
     * El contenedor para el código y la descripción.
     * @private
     * @type Ti.UI.View
     */
    var viewCodeDes = Ti.UI.createView({
        height : Ti.UI.FILL,
        width : '75%',
        layout : 'vertical'
    });

    // /**
     // * El contenedor para las Labels (Unidades).
     // * @private
     // * @type Ti.UI.View
     // */
    // var viewLabels = Ti.UI.createView({
        // height : '45%',
        // layout : 'horizontal'
    // });

    /**
     * El contenedor para los datos (Unidades).
     * @private
     * @type Ti.UI.View
     */
    var viewDataItem = Ti.UI.createView({
        // height : '55%',
        layout : 'horizontal'
    });

    /**
     * Nombre comercial.
     * @private
     * @type Ti.UI.Label
     */
    var labelName = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontFamily : 'Arial',
            fontSize : 17,
            fontWeight : 'bold'
        },
        text : options.Descripcion,
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,
        left : 2
    });

    /**
     * Código.
     * @private
     * @type Ti.UI.Label
     */
    var labelCode = Ti.UI.createLabel({
        //backgroundColor : 'red',
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 13
        },
        text : options.CodigoArticulo,
        height : Ti.UI.SIZE,
        left : 2
    });

    // /**
     // * Los nombres de las etiquetas para las unidades.
     // * @private
     // * @type String[]
     // */
    // var labelsUnits = ['Precio', 'Venta', 'Regalo', 'Descuento', 'Total'];
// 
    // /**
     // * El ancho de las etiquetas para las unidades.
     // * @private
     // * @type String[]
     // */
    // var labelsWidths = ['23', '15', '15', '23', '24'];
// 
    // for (var i = 0; i < labelsUnits.length; i++) {
        // viewLabels.add(Ti.UI.createLabel({
            // //backgroundColor : 'red',
            // color : Global.Theme.TEXT_SECONDARY,
            // font : {
                // fontSize : 13
            // },
            // text : labelsUnits[i],
            // textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
            // height : Ti.UI.FILL,
            // width : labelsWidths[i] + '%'
        // }));
    // };

    /**
     * Precio.
     * @private
     * @type Ti.UI.Label
     */
    var labelPrice = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 15
        },
        text : Global.Functions.numToEuro(options.Precio),
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        height : Ti.UI.FILL,
        width : '23%'
    });

    /**
     * Edición Venta.
     * @private
     * @type Ti.UI.Label
     */
    var labelEditVenta = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 15
        },
        text : options.Venta,
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        height : Ti.UI.FILL,
        width : '15%'
    });

    /**
     * Edición regalo.
     * @private
     * @type Ti.UI.Label
     */
    var labelEditRegalo = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 15
        },
        text : options.Regalo,
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        height : Ti.UI.FILL,
        width : '15%'
    });

    /**
     * Edición Dto.
     * @private
     * @type Ti.UI.Label
     */
    var labelEditDto = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 15
        },
        text : Global.Functions.numToEuro(options.DtoFijo + options.DtoEspecial),
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        height : Ti.UI.FILL,
        width : '23%'
    });

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
            fontSize : 15,
            fontWeight : 'bold'
        },
        text : '0,00€',
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        height : Ti.UI.FILL,
        width : '24%'
    });

    /**
     * El botón para el HISTORIAL.
     * @private
     * @type Ti.UI.Button
     */
    var but = Ti.UI.createButton({
        title : "H",
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,
        bubbleParent : false
    });

    /**
     * El evento 'click' del botón HISTORIAL.
     * @private
     * @event Click
     */
    but.addEventListener('click', function() {
        var list = modelLastOrders.select("WHERE CodigoCliente = '" + client.CodigoCliente + "' AND CodigoArticulo = '" + options.CodigoArticulo + "' ORDER BY FechaFactura DESC");
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
                Global : Global
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
     * Marca o desmarca la fila, según convenga, cambiando el color de fondo de la fila.
     */
    row.click = function() {
        if (row.getBackgroundColor() === backgroundColor) {
            row.setBackgroundColor(Global.Theme.ROW.PRESS);
        } else {
            row.setBackgroundColor(backgroundColor);
        };
    };

    /**
     * Según el tipo de oferta que tenga el artículo se muestra un determinado número de opciones.
     * @private
     */
    function applyOffer() {
        // function sale() {
        // viewLabels.children[1].setVisible(true);
        // labelEditVenta.setVisible(true);
        // viewLabels.children[2].setVisible(false);
        // labelEditRegalo.setVisible(false);
        // viewLabels.children[3].setVisible(false);
        // labelEditDto.setVisible(false);
        // row.setClassName("sale");
        // };
        //
        // function discount() {
        // viewLabels.children[1].setVisible(true);
        // labelEditVenta.setVisible(true);
        // viewLabels.children[2].setVisible(false);
        // labelEditRegalo.setVisible(false);
        // viewLabels.children[3].setVisible(true);
        // labelEditDto.setVisible(true);
        // row.setClassName("discount");
        // };
        //
        // function giftSale() {
        // viewLabels.children[1].setVisible(true);
        // labelEditVenta.setVisible(true);
        // viewLabels.children[2].setVisible(true);
        // labelEditRegalo.setVisible(true);
        // viewLabels.children[3].setVisible(false);
        // labelEditDto.setVisible(false);
        // row.setClassName("giftSale");
        // };
        //
        // function giftOnly() {
        // viewLabels.children[1].setVisible(false);
        // labelEditVenta.setVisible(false);
        // viewLabels.children[2].setVisible(true);
        // labelEditRegalo.setVisible(true);
        // viewLabels.children[3].setVisible(false);
        // labelEditDto.setVisible(false);
        // // viewLabels.children[4].setVisible(false);
        // // labelTotal.setVisible(false);
        // row.setClassName("giftOnly");
        // };
        //
        // //Según la oferta que tenga ...
        // switch(options.typeOffer) {
        // case undefined:
        // case Global.Order.NO_OFFER:
        // case Global.Order.FIXED_PRICE:
        // sale();
        // break;
        // case Global.Order.DISCOUNT:
        // discount();
        // break;
        // case Global.Order.GIFT_SALE:
        // giftSale();
        // break;
        // case Global.Order.GIFT_SALE_GROUP:
        // //Si tiene "Regalo" ...
        // if (options.Regalo > 0) {
        // //Si tiene también "Venta"...
        // if (options.Venta > 0) {
        // giftSale();
        // } else {
        // giftOnly();
        // };
        // } else {
        // sale();
        // };
        // break;
        // };

        viewLabels.children[1].setVisible(options.Venta > 0);
        labelEditVenta.setVisible(options.Venta > 0);
        viewLabels.children[2].setVisible(options.Regalo > 0);
        labelEditRegalo.setVisible(options.Regalo > 0);
        viewLabels.children[3].setVisible(options.DtoFijo > 0 || options.DtoEspecial > 0);
        labelEditDto.setVisible(options.DtoFijo > 0 || options.DtoEspecial > 0);
        row.setClassName("row_" + options.typeOffer);
    };

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

    //Ejecutamos la función para mostrar los campos necesarios,
    // applyOffer();

    //Añadimos los controles
    viewDataItem.add(labelPrice);
    viewDataItem.add(labelEditVenta);
    viewDataItem.add(labelEditRegalo);
    viewDataItem.add(labelEditDto);
    viewDataItem.add(labelTotal);

    viewCodeDes.add(labelName);
    viewCodeDes.add(labelCode);

    viewItem.add(viewCodeDes);
    viewItem.add(but);

    // viewTexts.add(viewLabels);
    viewTexts.add(viewDataItem);

    viewContent.add(viewItem);
    viewContent.add(viewTexts);

    row.add(viewContent);

    //Calculamos el total de línea.
    totalRow();

    return row;
};

module.exports = OrderRow;
