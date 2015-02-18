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
function DiscountUnitGroupWin(articles, model, articulos, rates, numPedido) {
    //Los artículos que forman esta agrupación.
    var articlesGroup = model.select("WHERE CodigoAgrupacion ='" + articles[0].CodigoAgrupacion + "'");
    //El total de los productos vendidos.
    var totalSale = 0;
    //Los artículos temporales
    var tmpArticles = new Array();
    //Indica la cantidad de líneas que no son correctas.
    var errorLines = 0;
    //Llenamos los artículos temporales
    for (var y = 0; y < articlesGroup.length; y++) {
        var articleLine = articulos.getArticle(articlesGroup[y].CodigoArticulo);
        articleLine.Precio = rates.getRate(articlesGroup[y].CodigoArticulo);
        articleLine.DtoUnitario = articlesGroup[y].DtoUnitario;
        articleLine.DtoPorcenUnit = articlesGroup[y].DtoPorcenUnit;
        articleLine.PromocionDesde = articlesGroup[y].PromocionDesde;
        tmpArticles.push(articleLine);
    };
    //La primera vez no tenemos artículos, así que utilizamos los originales.
    if (Object.keys(articles[0]).length == 1) {
        articles = tmpArticles;
    } else {
        for (var i = 0; i < tmpArticles.length; i++) {
            //Buscamos el artículo
            var art = articles.filter(function(element) {
                return element.CodigoArticulo == tmpArticles[i].CodigoArticulo;
            });
            //Si lo ha encontrado...
            if (art.length > 0) {
                tmpArticles[i].Venta = art[0].Venta;
                tmpArticles[i].DtoFijo = art[0].DtoFijo;
            };
        };
        articles = tmpArticles;
    };

    //Activa o bloquea el botón aceptar según convengan.
    function buttonState() {
        //Ti.API.info("totalSale= " + totalSale + " || errorLines= " + errorLines);
        if (totalSale >= articles[0].PromocionDesde && errorLines == 0) {
            popup.setEnabledButton('accept', true);
        } else {
            popup.setEnabledButton('accept', false);
        };
    };

    //Crea una línea de artículo
    function createLine(articleLine) {
        //Indica que TextField tiene el foco. Las opciones son "€" o "%"
        var focusText;
        //El porcentage máximo que se le puede aplicar.
        var maxim = articleLine.DtoUnitario > 0 ? articleLine.DtoUnitario : percentToEuro(articleLine.DtoPorcenUnit);
        //Pasa una valor en "€" a "%" sobre el precio del artículo.
        function euroToPercent(euro) {
            return Math.round(((euro * 100) / (articleLine.Precio)) * 100) / 100;
        };
        //Pasa una valor en "%" a "€" sobre el precio del artículo.
        function percentToEuro(percent) {
            return Math.round(articleLine.Precio * percent) / 100;
        };
        //Indica el estado de la linea.
        function lineState() {
            //Si TIENE CANTIDAD miramos que esté OK.
            if (textSale.value > 0) {
                //Comprobamos que no pase el límite permitido.
                if (textEuro.value > maxim) {
                    if (line.state) {
                        line.setBackgroundColor("gray");
                        errorLines += 1;
                        line.state = false;
                    };
                } else {
                    if (!line.state) {
                        line.setBackgroundColor("transparent");
                        errorLines -= 1;
                        line.state = true;
                    };
                };
            } else {
                if (!line.state) {
                    line.setBackgroundColor("transparent");
                    errorLines -= 1;
                    line.state = true;
                };
            };
        };
        //Calcular el importe por línea
        function totalLine() {
            var finalPrice = articleLine.Precio - textEuro.value;
            var totalLine = textSale.value * finalPrice;
            labelTotalLine.text = parseInt(totalLine * 100) / 100;
            lineState();
        };

        //Line
        var line = Ti.UI.createView({
            width : Ti.UI.FILL,
            height : Ti.UI.SIZE,
            layout : 'vertical',
            state : true
        });
        //Line Name
        var lineName = Ti.UI.createView({
            width : Ti.UI.FILL,
            height : Ti.UI.SIZE,
            layout : 'vertical'
        });
        //Line Discount
        var lineDiscount = Ti.UI.createView({
            width : Ti.UI.FILL,
            height : Ti.UI.SIZE,
            layout : 'horizontal'
        });
        //Line Quantity
        var lineQuantity = Ti.UI.createView({
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
        //Label Precio
        var labelPrice = Ti.UI.createLabel({
            color : '#000000',
            font : {
                fontSize : 20
            },
            text : articleLine.Precio + " - "
        });
        //Label Igual
        var labelEqual = Ti.UI.createLabel({
            color : '#000000',
            font : {
                fontSize : 20
            },
            text : " = "
        });
        //Label "€"
        var labelEuro = Ti.UI.createLabel({
            color : '#000000',
            font : {
                fontSize : 20
            },
            text : "€"
        });
        //Label "%"
        var labelPercent = Ti.UI.createLabel({
            color : '#000000',
            font : {
                fontSize : 20
            },
            text : "%"
        });
        //Label total line
        var labelTotalLine = Ti.UI.createLabel({
            color : '#000000',
            font : {
                fontSize : 20
            }
        });
        //Text euro
        var textEuro = Ti.UI.createTextField({
            height : 40,
            width : 60,
            value : articleLine.DtoFijo > 0 ? articleLine.DtoFijo : maxim,
            keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
        });
        //Text %
        var textPercent = Ti.UI.createTextField({
            height : 40,
            width : 60,
            value : articleLine.DtoFijo > 0 ? euroToPercent(articleLine.DtoFijo) : euroToPercent(maxim),
            keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
            bottom : 0,
            left : 0
        });
        //Text Sale
        var textSale = Ti.UI.createTextField({
            height : 40,
            width : 50,
            value : articleLine.Venta != undefined ? articleLine.Venta : 0,
            textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
            keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD
        });
        //Contamos las cantidades.
        totalSale += textSale.value;

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
            totalLine();
            buttonState();
        });

        //Butremove 'click'
        butRemove.addEventListener('click', function(e) {
            var unit = parseInt(textSale.value);
            if (unit <= 0) {
                unit = 0;
            } else {
                unit -= 1;
                totalSale -= 1;
            };
            textSale.value = unit.toString();
            totalLine();
            buttonState();
        });

        //TextSale 'change'
        textSale.addEventListener('change', function(e) {
            totalSale = (totalSale - textSale.value) + parseInt(e.value);
            totalLine();
            buttonState();
        });

        //TextEuro "focus"
        textEuro.addEventListener('focus', function(e) {
            focusText = "€";
        });
        //TextEuro "change"
        textEuro.addEventListener('change', function(e) {
            if (focusText === "€") {
                textPercent.value = euroToPercent(e.value).toString();
                totalLine();
                buttonState();
            };
        });

        //TextPercent"focus"
        textPercent.addEventListener('focus', function(e) {
            focusText = "%";
        });
        //TextPercent "change"
        textPercent.addEventListener('change', function(e) {
            if (focusText === "%") {
                textEuro.value = percentToEuro(e.value).toString();
                totalLine();
                buttonState();
            };
        });

        //Retorna el descuento Fijo
        line.getDiscount = function() {
            return textEuro.value;
        };
        //Retorna la cantidad
        line.getSale = function() {
            return textSale.value;
        };

        lineName.add(labelName);

        lineDiscount.add(labelPrice);
        lineDiscount.add(textPercent);
        lineDiscount.add(labelPercent);
        lineDiscount.add(textEuro);
        lineDiscount.add(labelEuro);

        lineQuantity.add(textSale);
        lineQuantity.add(butPlus);
        lineQuantity.add(butRemove);
        lineQuantity.add(labelEqual);
        lineQuantity.add(labelTotalLine);

        line.add(lineName);
        line.add(lineDiscount);
        line.add(lineQuantity);

        totalLine();

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

    body.add(lines);

    var options = {
        title : "Descuento unitario €-%",
        body : body
    };

    var popup = new Global.Control.Windows.Popup(options);
    popup.addEventClickButton("accept", function() {
        for (var x = 0; x < articles.length; x++) {
            var line = lines.children[x];

            articles[x].DtoFijo = line.getDiscount();
            articles[x].Venta = line.getSale();
            articles[x].typeOffer = Global.Order.DISCOUNT;
            articles[x].CodigoPromocion = articlesGroup[0].CodigoPromocion;
            articles[x].DescripcionPromocion = articlesGroup[0].Descripcion;
            articles[x].CodigoAgrupacion = articlesGroup[0].CodigoAgrupacion;
            articles[x].NumPedido = numPedido;

            //Añadimos la ventana de edición de la oferta.
            articles[x].winOffer = function() {
                return DiscountUnitGroupWin(articles, model, articulos, rates, numPedido);
            };
        };

        popup.fireEvent('save', {
            article : articles
        });

        popup.close();
    });

    return popup;
};

module.exports = DiscountUnitGroupWin;