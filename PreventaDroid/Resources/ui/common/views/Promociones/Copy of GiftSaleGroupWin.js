/**
 * @fileOverview En este archivo se crea la vista para editar la promoción de descuento en € o % para un grupo de productos.</br>
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La variable Global
 */
var Global = new (require('/global/class/ReturnGlobal'))();

/**
 * Las constantes para las promociones.
 */
var Constants = require(Global.Path.VIEW + 'Promociones/Constants');

/**
 * La librería underscore.
 */
var _ = require('/lib/underscore');

/**
 * Crea la ventana para introducir el descuento al artículo.
 * @param {Object} offer La promoción con sus propiedades para aplicarle el filtro.
 * @param {Object[]} [articles] Los artículos que forman la promoción.
 * @param {Object} model El modelo de las promociones.
 * @param {Object} articulos El controlador de los artículos.
 * @param {Object} rates El controlador de las tarifas.
 * @param {Number} numPedido El número de pedido al que pertenece esta promoción.
 * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
 */
function GiftSaleGroup(offer, articles, model, articulos, rates, numPedido) {
    //La cantidad mínima para aplicar la promoción.
    var minim = offer.PromocionDesde < offer.Venta ? offer.Venta : offer.PromocionDesde;
    //Proporción de regalo
    var rule = offer.Venta / offer.Regalo;
    //La cantidad mínima para regalar.
    var minimGift = Math.floor(minim / rule);
    //El total de los productos vendidos.
    var totalSale = 0;
    //Los artículos que forman esta agrupación.
    var articlesGroup = model.select("WHERE CodigoAgrupacion ='" + offer.CodigoAgrupacion + "'");
    //Los artículos temporales
    var tmpArticles = new Array();
    //El índice del artículo seleccionado para regalo.
    var indexSelected = 0;
    //Llenamos los artículos temporales
    for (var y = 0; y < articlesGroup.length; y++) {
        var articleLine = articulos.getArticle(articlesGroup[y].CodigoArticulo);
        articleLine.Precio = rates.getRate(articlesGroup[y].CodigoArticulo);
        articleLine.DtoFijo = 0;
        tmpArticles.push(articleLine);
    };
    //La primera vez no tenemos artículos, así que utilizamos los originales.
    if (articles == undefined) {
        articles = tmpArticles;
    } else {
        for (var i = 0; i < tmpArticles.length; i++) {
            //Buscamos el artículo
            var art = articles.filter(function(element) {
                return element.CodigoArticulo == tmpArticles[i].CodigoArticulo;
            });
            //Si lo ha encontrado...
            if (art.length > 0) {
                tmpArticles[i].Regalo = art[0].Regalo;
                tmpArticles[i].Venta = art[0].Venta;
                indexSelected = tmpArticles[i].Regalo > 0 ? i : indexSelected;
            };
        };
        articles = tmpArticles;
    };

    //Activa o bloquea el botón aceptar según convengan.
    function buttonState() {
        var tmpGift = Math.floor(totalSale / rule);
        if (totalSale < minim || textGift.getValue() > tmpGift) {
            popup.setEnabledButton('accept', false);
        } else {
            popup.setEnabledButton('accept', true);
        };
    };

    //Crea una línea de artículo
    function createLine(articleLine) {
        //Line
        var line = Ti.UI.createView({
            width : Ti.UI.FILL,
            height : Ti.UI.SIZE,
            layout : 'vertical'
        });
        //Line UP
        var lineUp = Ti.UI.createView({
            width : Ti.UI.FILL,
            height : Ti.UI.SIZE,
            layout : 'horizontal'
        });
        //Line Down
        var lineDown = Ti.UI.createView({
            width : Ti.UI.FILL,
            height : Ti.UI.SIZE,
            layout : 'horizontal'
        });
        //Label Name
        var labelName = Ti.UI.createLabel({
            color : '#000000',
            font : {
                fontSize : 20
            },
            text : articleLine.Descripcion
        });
        //Button PLUS
        var butPlus = Ti.UI.createButton({
            image : '/images/edit_add_32.png',
            width : Ti.UI.SIZE,
            height : Ti.UI.SIZE
        });
        //Button REMOVE
        var butRemove = Ti.UI.createButton({
            image : '/images/edit_remove_32.png',
            width : Ti.UI.SIZE,
            height : Ti.UI.SIZE
        });
        //Text Sale
        var textSale = Ti.UI.createTextField({
            height : 40,
            width : 50,
            value : articleLine.Venta != undefined ? articleLine.Venta : 0,
            textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
            keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
            name : "textSale"
        });
        //Sumamos las ventas en el total de estas.
        totalSale += textSale.value;

        //Butplus "click"
        butPlus.addEventListener('click', function() {
            var unit = parseInt(textSale.value);
            if (unit <= 0) {
                unit = 1;
            } else {
                unit += 1;
            };
            totalSale += 1;
            textSale.value = unit.toString();
            buttonState();
        });

        //Butremove 'click'
        butRemove.addEventListener('click', function(e) {
            var unit = parseInt(textSale.value);
            if (unit <= 0) {
                unit = 0;
            } else {
                totalSale -= 1;
                unit -= 1;
            };
            textSale.value = unit.toString();
            buttonState();
        });

        //TextSale 'change'
        textSale.addEventListener('change', function(e) {
            totalSale = (totalSale - textSale.value) + parseInt(e.value);
            buttonState();
        });

        lineUp.add(labelName);
        lineDown.add(textSale);
        lineDown.add(butPlus);
        lineDown.add(butRemove);

        line.add(lineUp);
        line.add(lineDown);

        return line;
    };

    // body
    var body = Ti.UI.createView({
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        layout : 'vertical'
    });
    // lines
    var lines = Ti.UI.createView({
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        layout : 'vertical'
    });
    //Añadimos los artículos.
    for (var x = 0; x < articles.length; x++) {
        lines.add(createLine(articles[x]));
    };

    //Gift
    var gift = Ti.UI.createView({
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        layout : 'horizontal'
    });
    //Label Regalo
    var labelGift = Ti.UI.createLabel({
        color : '#000000',
        font : {
            fontSize : 20
        },
        text : "Regalo"
    });
    //Text Gift
    var textGift = Ti.UI.createTextField({
        height : 40,
        width : 60,
        value : 1,
        keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
        bottom : 0,
        left : 0
    });
    //Picker Gift
    var pickerGift = Ti.UI.createPicker();
    var pickerData = new Array();
    for (var i = 0; i < articles.length; i++) {
        pickerData.push(Ti.UI.createPickerRow({
            title : articles[i].Descripcion,
            code : articles[i].CodigoArticulo
        }));
    };
    pickerGift.add(pickerData);
    pickerGift.selectionIndicator = true;
    pickerGift.setSelectedRow(0, indexSelected);

    //Button PLUS
    var butPlus = Ti.UI.createButton({
        image : '/images/edit_add_32.png',
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE
    });
    //Button REMOVE
    var butRemove = Ti.UI.createButton({
        image : '/images/edit_remove_32.png',
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE
    });

    //TextGift "change"
    textGift.addEventListener('change', function(e) {
        Ti.API.info("TextGift change");
        buttonState();
    });
    //Butplus "click"
    butPlus.addEventListener('click', function() {
        var unit = parseInt(textGift.value);
        if (unit <= 0) {
            unit = 1;
        } else {
            unit += 1;
        };
        textGift.value = unit.toString();
        buttonState();
    });

    //Butremove 'click'
    butRemove.addEventListener('click', function(e) {
        var unit = parseInt(textGift.value);
        if (unit <= minimGift) {
            unit = minimGift;
        } else {
            unit -= 1;
        };
        textGift.value = unit.toString();
        buttonState();
    });

    //Añadimos los elementos a las vistas.
    gift.add(labelGift);
    gift.add(textGift);
    gift.add(butPlus);
    gift.add(butRemove);

    body.add(lines);
    body.add(pickerGift);
    body.add(gift);

    var options = {
        title : offer.Descripcion,
        body : body
    };

    var popup = new Global.Control.Windows.Popup(options);
    popup.addEventClickButton("accept", function() {
        //El artículo para regalar.
        var rowGift = pickerGift.getSelectedRow(0);

        for (var x = 0; x < articles.length; x++) {
            //Si es la fila de regalo.
            articles[x].Regalo = articles[x].CodigoArticulo == rowGift.code ? textGift.value : 0;
            articles[x].Venta = Global.Functions.recursiveObject("name", "textSale", lines.children[x]).value;
            articles[x].typeOffer = Global.Order.GIFT_SALE_GROUP;
            articles[x].CodigoPromocion = offer.CodigoPromocion;
            articles[x].DescripcionPromocion = offer.Descripcion;
            articles[x].CodigoAgrupacion = offer.CodigoAgrupacion;
            articles[x].NumPedido = numPedido;

            //Añadimos la ventana de edición de la oferta.
            articles[x].winOffer = function() {
                return GiftSaleGroup(offer, articles, model, articulos, rates, numPedido);
            };
        };

        popup.fireEvent('save', {
            article : articles
        });

        popup.close();
    });

    return popup;

};

module.exports = GiftSaleGroup; 