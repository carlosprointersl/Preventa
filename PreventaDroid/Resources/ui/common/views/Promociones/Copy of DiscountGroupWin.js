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
function DiscountGroupWin(offer, articles, model, articulos, rates, numPedido) {
    //El porcentage máximo que se le puede aplicar.
    var maxim = offer.DtoPorcenUnit;
    //El total de todas las líneas
    var totalLines = 0;
    //El total descontado
    var totalDiscount = 0;
    //El total de los productos vendidos.
    var totalSale = 0;
    //Los artículos que forman esta agrupación.
    var articlesGroup = model.select("WHERE CodigoAgrupacion ='" + offer.CodigoAgrupacion + "'");
    //Los artículos temporales
    var tmpArticles = new Array();
    //Llenamos los artículos temporales
    for (var y = 0; y < articlesGroup.length; y++) {
        var articleLine = articulos.getArticle(articlesGroup[y].CodigoArticulo);
        articleLine.Precio = rates.getRate(articlesGroup[y].CodigoArticulo);
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
                tmpArticles[i].Venta = art[0].Venta;
            };
        };
        articles = tmpArticles;
    };

    //Activa o bloquea el botón aceptar según convengan.
    function buttonState() {
        if (totalSale < offer.PromocionDesde) {
            popup.setEnabledButton('accept', false);
        } else {
            if (textPercent.getValue() > maxim) {
                popup.setEnabledButton('accept', false);
            } else {
                popup.setEnabledButton('accept', true);
            };
        };
    };

    //Suma todas las líneas
    function calculateTotalLines() {
        var total = 0;
        totalDiscount = 0;
        totalSale = 0;
        //Recorre todas las líneas y suma los totales
        for (var i = 0; i < lines.children.length; i++) {
            lines.children[i].fireEvent('totalLine');
            var label = Global.Functions.recursiveObject("name", "totalLine", lines.children[i]);
            total += parseInt(label.text * 100);
            totalDiscount += label.discount;
            totalSale += parseInt(label.sale);
        };
        totalLines = total;
    };

    //Aplica el descuento a las líneas
    function totalOffer() {
        textEuro.value = (totalDiscount / 100).toString();
        labelTotalResult.text = (totalLines / 100).toString();
    };

    //Crea una línea de artículo
    function createLine(articleLine) {
        //Calcular el importe por línea
        function totalLine() {
            var discount = Math.round(articleLine.Precio * (textPercent == undefined ? maxim : textPercent.value));
            labelTotalLine.discount = textSale.value * discount;
            labelTotalLine.sale = textSale.value;
            labelTotalLine.text = (Math.round((textSale.value * ((parseInt(articleLine.Precio * 100)) - discount))) / 100).toString();
        };
        //Calcula todos los datos
        function calculateAll() {
            totalLine();
            calculateTotalLines();
            totalOffer();
            buttonState();
        };
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
        //Label Precio
        var labelPrice = Ti.UI.createLabel({
            color : '#000000',
            font : {
                fontSize : 20
            },
            text : articleLine.Precio + " x "
        });
        //Label Igual
        var labelEqual = Ti.UI.createLabel({
            color : '#000000',
            font : {
                fontSize : 20
            },
            text : " = "
        });
        //Label total line
        var labelTotalLine = Ti.UI.createLabel({
            color : '#000000',
            font : {
                fontSize : 20
            },
            name : "totalLine"
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
            value : articleLine.Venta != undefined ? articleLine.Venta : '0',
            textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
            keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD
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
            textSale.value = unit.toString();
            calculateAll();
        });

        //Butremove 'click'
        butRemove.addEventListener('click', function(e) {
            var unit = parseInt(textSale.value);
            if (unit <= 0) {
                unit = 0;
            } else {
                unit -= 1;
            };
            textSale.value = unit.toString();
            calculateAll();
        });

        //TextSale 'change'
        textSale.addEventListener('change', function(e) {
            totalSale = (totalSale - textSale.value) + e.value;
            calculateAll();
        });

        lineUp.add(labelName);
        lineDown.add(labelPrice);
        lineDown.add(textSale);
        lineDown.add(butPlus);
        lineDown.add(butRemove);
        lineDown.add(labelEqual);
        lineDown.add(labelTotalLine);

        line.add(lineUp);
        line.add(lineDown);

        totalLine();

        line.addEventListener('totalLine', totalLine);

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

    //discount
    var discount = Ti.UI.createView({
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        layout : 'horizontal'
    });
    //total
    var total = Ti.UI.createView({
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        layout : 'horizontal'
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
    //Label Descuento
    var labelDiscount = Ti.UI.createLabel({
        color : '#000000',
        font : {
            fontSize : 20
        },
        text : "Descuento"
    });
    //Label Total
    var labelTotal = Ti.UI.createLabel({
        color : '#000000',
        font : {
            fontSize : 20
        },
        text : "Total = "
    });
    //Calculamos el total de las líneas.
    calculateTotalLines();

    //Text euro
    var textEuro = Ti.UI.createTextField({
        height : 40,
        width : 60,
        value : articles[0].DtoFijo > 0 ? articles[0].DtoFijo : totalDiscount,
        editable : false
    });
    //Text %
    var textPercent = Ti.UI.createTextField({
        height : 40,
        width : 60,
        value : articles[0].DtoFijo > 0 ? Math.round((articles[0].DtoFijo * 100) / articles[0].Precio) : maxim,
        keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
        bottom : 0,
        left : 0
    });
    //Label Total result
    var labelTotalResult = Ti.UI.createLabel({
        color : '#000000',
        font : {
            fontSize : 20
        },
        left : 5,
        text : (Math.round((totalLines - textEuro.value) * 100) / 100).toString()
    });

    //TextPercent "change"
    textPercent.addEventListener('change', function(e) {
        //textEuro.value = (Math.round(totalLines * textPercent.value) / 100).toString();
        calculateTotalLines();
        totalOffer();
        buttonState();
    });

    //Añadimos los elementos a las vistas.
    discount.add(textPercent);
    discount.add(labelPercent);
    discount.add(labelDiscount);
    discount.add(textEuro);
    discount.add(labelEuro);

    total.add(labelTotal);
    total.add(labelTotalResult);

    body.add(lines);
    body.add(discount);
    body.add(total);

    var options = {
        title : "Descuento unitario €-%",
        body : body
    };

    var popup = new Global.Control.Windows.Popup(options);
    popup.addEventClickButton("accept", function() {
        for (var x = 0; x < articles.length; x++) {
            var label = Global.Functions.recursiveObject("name", "totalLine", lines.children[x]);

            articles[x].DtoFijo = (label.discount / label.sale) / 100;
            articles[x].Venta = label.sale;
            articles[x].typeOffer = Global.Order.DISCOUNT;
            articles[x].CodigoPromocion = offer.CodigoPromocion;
            articles[x].DescripcionPromocion = offer.Descripcion;
            articles[x].CodigoAgrupacion = offer.CodigoAgrupacion;
            articles[x].NumPedido = numPedido;
            articles[x].Tarifa = rates.getRate(articles[x].CodigoArticulo);

            //Añadimos la ventana de edición de la oferta.
            articles[x].winOffer = function() {
                return DiscountGroupWin(offer, articles, model, articulos, rates, numPedido);
            };
        };

        popup.fireEvent('save', {
            article : articles
        });

        popup.close();
    });

    return popup;
};

module.exports = DiscountGroupWin;

/*
 *
 function DiscountGroupWin(offer, articles, model, articulos, rates, numPedido) {
 //El porcentage máximo que se le puede aplicar.
 var maxim = offer.DtoPorcenUnit;
 //El total de todas las líneas
 var totalLines = 0;
 //El total descontado
 var totalDiscount = 0;
 //El total de los productos vendidos.
 var totalSale = 0;
 //Los artículos que forman esta agrupación.
 var articlesGroup = model.select("WHERE CodigoAgrupacion ='" + offer.CodigoAgrupacion + "'");
 //Los artículos temporales
 var tmpArticles = new Array();
 //Llenamos los artículos temporales
 for (var y = 0; y < articlesGroup.length; y++) {
 var articleLine = articulos.getArticle(articlesGroup[y].CodigoArticulo);
 articleLine.Precio = rates.getRate(articlesGroup[y].CodigoArticulo);
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
 tmpArticles[i].Venta = art[0].Venta;
 };
 };
 articles = tmpArticles;
 };

 //Activa o bloquea el botón aceptar según convengan.
 function buttonState() {
 if (totalSale < offer.PromocionDesde) {
 popup.setEnabledButton('accept', false);
 } else {
 if (textPercent.getValue() > maxim) {
 popup.setEnabledButton('accept', false);
 } else {
 popup.setEnabledButton('accept', true);
 };
 };
 };

 //Suma todas las líneas
 function calculateTotalLines() {
 var total = 0;
 totalDiscount = 0;
 totalSale = 0;
 //Recorre todas las líneas y suma los totales
 for (var i = 0; i < lines.children.length; i++) {
 lines.children[i].fireEvent('totalLine');
 var label = Global.Functions.recursiveObject("name", "totalLine", lines.children[i]);
 total += parseInt(label.text * 100);
 totalDiscount += label.discount;
 totalSale += parseInt(label.sale);
 };
 totalLines = total;
 };

 //Aplica el descuento a las líneas
 function totalOffer() {
 textEuro.value = (totalDiscount / 100).toString();
 labelTotalResult.text = (totalLines / 100).toString();
 };

 //Crea una línea de artículo
 function createLine(articleLine) {
 //Calcular el importe por línea
 function totalLine() {
 var discount = Math.round(articleLine.Precio * (textPercent == undefined ? maxim : textPercent.value));
 labelTotalLine.discount = textSale.value * discount;
 labelTotalLine.sale = textSale.value;
 labelTotalLine.text = (Math.round((textSale.value * ((parseInt(articleLine.Precio * 100)) - discount))) / 100).toString();
 };
 //Calcula todos los datos
 function calculateAll() {
 totalLine();
 calculateTotalLines();
 totalOffer();
 buttonState();
 };
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
 //Label Precio
 var labelPrice = Ti.UI.createLabel({
 color : '#000000',
 font : {
 fontSize : 20
 },
 text : articleLine.Precio + " x "
 });
 //Label Igual
 var labelEqual = Ti.UI.createLabel({
 color : '#000000',
 font : {
 fontSize : 20
 },
 text : " = "
 });
 //Label total line
 var labelTotalLine = Ti.UI.createLabel({
 color : '#000000',
 font : {
 fontSize : 20
 },
 name : "totalLine"
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
 value : articleLine.Venta != undefined ? articleLine.Venta : '0',
 textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
 keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD
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
 textSale.value = unit.toString();
 calculateAll();
 });

 //Butremove 'click'
 butRemove.addEventListener('click', function(e) {
 var unit = parseInt(textSale.value);
 if (unit <= 0) {
 unit = 0;
 } else {
 unit -= 1;
 };
 textSale.value = unit.toString();
 calculateAll();
 });

 //TextSale 'change'
 textSale.addEventListener('change', function(e) {
 totalSale = (totalSale - textSale.value) + e.value;
 calculateAll();
 });

 lineUp.add(labelName);
 lineDown.add(labelPrice);
 lineDown.add(textSale);
 lineDown.add(butPlus);
 lineDown.add(butRemove);
 lineDown.add(labelEqual);
 lineDown.add(labelTotalLine);

 line.add(lineUp);
 line.add(lineDown);

 totalLine();

 line.addEventListener('totalLine', totalLine);

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

 //discount
 var discount = Ti.UI.createView({
 width : Ti.UI.FILL,
 height : Ti.UI.SIZE,
 layout : 'horizontal'
 });
 //total
 var total = Ti.UI.createView({
 width : Ti.UI.FILL,
 height : Ti.UI.SIZE,
 layout : 'horizontal'
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
 //Label Descuento
 var labelDiscount = Ti.UI.createLabel({
 color : '#000000',
 font : {
 fontSize : 20
 },
 text : "Descuento"
 });
 //Label Total
 var labelTotal = Ti.UI.createLabel({
 color : '#000000',
 font : {
 fontSize : 20
 },
 text : "Total = "
 });
 //Calculamos el total de las líneas.
 calculateTotalLines();

 //Text euro
 var textEuro = Ti.UI.createTextField({
 height : 40,
 width : 60,
 value : articles[0].DtoFijo > 0 ? articles[0].DtoFijo : totalDiscount,
 editable : false
 });
 //Text %
 var textPercent = Ti.UI.createTextField({
 height : 40,
 width : 60,
 value : articles[0].DtoFijo > 0 ? Math.round((articles[0].DtoFijo * 100) / articles[0].Precio) : maxim,
 keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
 bottom : 0,
 left : 0
 });
 //Label Total result
 var labelTotalResult = Ti.UI.createLabel({
 color : '#000000',
 font : {
 fontSize : 20
 },
 left : 5,
 text : (Math.round((totalLines - textEuro.value) * 100) / 100).toString()
 });

 //TextPercent "change"
 textPercent.addEventListener('change', function(e) {
 //textEuro.value = (Math.round(totalLines * textPercent.value) / 100).toString();
 calculateTotalLines();
 totalOffer();
 buttonState();
 });

 //Añadimos los elementos a las vistas.
 discount.add(textPercent);
 discount.add(labelPercent);
 discount.add(labelDiscount);
 discount.add(textEuro);
 discount.add(labelEuro);

 total.add(labelTotal);
 total.add(labelTotalResult);

 body.add(lines);
 body.add(discount);
 body.add(total);

 var options = {
 title : "Descuento unitario €-%",
 body : body
 };

 var popup = new Global.Control.Windows.Popup(options);
 popup.addEventClickButton("accept", function() {
 for (var x = 0; x < articles.length; x++) {
 var label = Global.Functions.recursiveObject("name", "totalLine", lines.children[x]);

 articles[x].DtoFijo = (label.discount / label.sale) / 100;
 articles[x].Venta = label.sale;
 articles[x].typeOffer = Global.Order.DISCOUNT;
 articles[x].CodigoPromocion = offer.CodigoPromocion;
 articles[x].DescripcionPromocion = offer.Descripcion;
 articles[x].CodigoAgrupacion = offer.CodigoAgrupacion;
 articles[x].NumPedido = numPedido;
 articles[x].Tarifa = rates.getRate(articles[x].CodigoArticulo);

 //Añadimos la ventana de edición de la oferta.
 articles[x].winOffer = function() {
 return DiscountGroupWin(offer, articles, model, articulos, rates, numPedido);
 };
 };

 popup.fireEvent('save', {
 article : articles
 });

 popup.close();
 });

 return popup;
 };
 */