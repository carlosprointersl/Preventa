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
 * @param {Object} articulos El controlador de los artículos.
 * @param {Object} rates El controlador de las tarifas.
 * @param {Number} numPedido El número de pedido al que pertenece esta promoción.
 * @param {String[]} gifts Los códigos de los artículos de regalo.
 * @param {Object[]} articlesGroup Loas artículos que forman esta agrupación.
 * @param {String} ivaCliente Indica el tipo de IVA ("N" o "R") que tiene el CLIENTE.
 * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
 */
function GiftSaleGroup(offer, articles, articulos, rates, numPedido, gifts, articlesGroup, ivaCliente) {
    //Inicalizamos el campo "PromocionDesde" por si no tiene ningún valor
    offer.PromocionDesde = offer.PromocionDesde > 0 ? offer.PromocionDesde : 1;

    /**
     * La regla de la promoción.
     * @private
     * @type Number
     */
    var rule = offer.Venta / offer.Regalo;

    /**
     * El objeto para crear la ventana de edición.
     * @private
     * @type Object
     */
    var promo = new (require(Global.Path.VIEW + 'Promociones/CreateWindowGroup/CreateWin'))({
        Descripcion : offer.Descripcion,
        _del : articles != undefined ? articles[0]._del : false,
        articles : articles
    }, "Venta + Regalo por grupo", "ControlUnitsGiftSale");

    /**
     * Comprueba que se cumplan las restricciones de la promoción y activa o desactiva el botón aceptar según covenga.
     */
    function checkOffer() {
        var state = true;
        var countSale = 0;
        var countGift = 0;

        _.each(controlsSale, function(element) {
            state = state && element.isValid();
            countSale += parseInt(element.getValue());
        });

        _.each(controlsGift, function(element) {
            state = state && element.isValid();
            countGift += parseInt(element.getValue());
        });

        state = state && (countSale >= offer.PromocionDesde) && (countGift <= Math.floor(countSale / rule));

        promo.setButtonState(state);
    };

    /**
     * Crea una cabecera de sección con una etiqueta y una línea divisoria.
     * @param {String} title El título de la cabecera.
     * @return {Ti.UI.View} La cabecera montada.
     */
    function createHeader(title) {
        var content = Ti.UI.createView({
            height : Ti.UI.SIZE,
            layout : 'vertical'
        });

        var labelTitle = Ti.UI.createLabel({
            top : 2,
            left : 5,
            color : Global.Theme.TEXT_SECONDARY,
            font : {
                fontSize : 20
            },
            text : title
        });
        content.add(labelTitle);

        var line = Ti.UI.createView({
            backgroundColor : '#000000',
            height : 1,
            left : 5,
            right : 5,
            top : 2
        });
        content.add(line);

        return content;

    }

    /**
     * El contenedor de los controles.
     * @private
     * @type Ti.UI.View
     */
    var viewControl = Ti.UI.createScrollView({
        width : Ti.UI.FILL,
        contentHeight : 'auto',
        layout : 'vertical',
        showVerticalScrollIndicator : true,
        showHorizontalScrollIndicator : false,
        scrollType : 'vertical'
    });
    promo.bodyAdd(viewControl);

    /**
     * El contenedor para los controles de venta.
     * @private
     * @type Ti.UI.View
     */
    var contentSale = Ti.UI.createView({
        //backgroundColor : 'green',
        height : Ti.UI.SIZE,
        layout : 'vertical'
    });
    contentSale.add(createHeader("VENTA"));
    viewControl.add(contentSale);

    /**
     * El contenedor para los controles de regalo.
     * @private
     * @type Ti.UI.View
     */
    var contentGift = Ti.UI.createView({
        backgroundColor : '#AFFBA1',
        height : Ti.UI.SIZE,
        layout : 'vertical'
    });
    contentGift.add(createHeader("REGALO"));
    viewControl.add(contentGift);

    /**
     * Los artículos temporales de venta.
     * @private
     * @type Array
     */
    var tmpArticles = new Array();

    //Llenamos los artículos temporales de venta
    _.each(articlesGroup, function(element) {
        if (element.CodigoArticulo != 0) {
            var articleLine = articulos.getArticle(element.CodigoArticulo);
            articleLine.Precio = rates.getRate(element.CodigoArticulo);
            articleLine.DtoFijo = 0;
            tmpArticles.push(articleLine);
        };
    });

    /**
     * Los artículos temporales de regalo.
     * @private
     * @type Array
     */
    var tmpGifts = new Array();

    //Llenamos los artículos temporales
    _.each(gifts, function(element) {
        var articleLine = articulos.getArticle(element);
        articleLine.Precio = rates.getRate(element);
        articleLine.DtoFijo = 0;
        tmpGifts.push(articleLine);
    });

    //Si no tenemos artículos utilizaremos los temporales. En caso contrario hemos de separar los artícuslo de venta de los de regalo.
    if (articles != undefined) {
        var position = articles.length - gifts.length;
        var artSale = articles.slice(0, position);
        var artGift = articles.slice(position);

        //Buscamos los artículos de venta
        _.each(tmpArticles, function(element, index) {
            var art = _.findWhere(artSale, {
                CodigoArticulo : element.CodigoArticulo
            });
            element.Venta = art != undefined ? art.Venta : element.Venta;
        });

        //Buscamos los artículos de regalo
        _.each(tmpGifts, function(element, index) {
            var art = _.findWhere(artGift, {
                CodigoArticulo : element.CodigoArticulo
            });
            element.Regalo = art != undefined ? art.Regalo : element.Regalo;
        });
    };

    /**
     * Los controles para las unidades de venta de los artículos.
     * @private
     * @type Object[]
     */
    var controlsSale = new Array();

    //Añadimos los controles de venta a la variable "controlsSale" y a la vista.
    _.each(tmpArticles, function(element) {

        //El control temporal
        var tmpControl = promo.createControl({
            title : element.Descripcion,
            value : (element.Venta > 0 ? element.Venta : 0).toString(),
            typeValue : Constants.INTEGER,
            fontSize : 17,
            buttonInfo : true
        });
        //El evento 'change' del control temporal
        tmpControl.addEventListener(Constants.TEXT, 'change', function() {
            checkOffer();
        });

        //El evento click del botón de información.
        tmpControl.addEventListener(Constants.INFO, 'click', function() {
            var controlPrice = new (require(Global.Path.CONTROL + 'ShowPrices'))(ivaCliente, element.IVA);
            controlPrice.setEndPrice(Global.Functions.numToEuro(element.Precio));
            controlPrice.setUnitPrice(Global.Functions.numToEuro(element.Precio / element.UnidadesCaja, 3));
            controlPrice.setColorText(Global.Theme.TEXT_PRINCIPAL);

            var modalInfo = new Global.Control.Windows.Popup({
                title : "Información",
                icon : Global.Control.Windows.ICON.INFORMATION,
                body : controlPrice.getContent(),
                buttons : Global.Control.Windows.BUTTON.ACCEPT
            });

            modalInfo.addEventClickButton("accept", function() {
                modalInfo.close();
            });

            modalInfo.open();
        });

        controlsSale.push(tmpControl);

        contentSale.add(tmpControl.getControl());

    });

    /**
     * Los controles para las unidades de regalo de los artículos.
     * @private
     * @type Object[]
     */
    var controlsGift = new Array();

    //Añadimos los controles de regalo a la variable "controlsGift" y a la vista.
    _.each(tmpGifts, function(element, index, list) {
        //El control temporal
        var tmpControl = promo.createControl({
            title : element.Descripcion,
            value : (element.Regalo > 0 ? element.Regalo : 0).toString(),
            typeValue : Constants.INTEGER,
            fontSize : 17,
            buttonInfo : true
        });
        //El evento 'change' del control temporal
        tmpControl.addEventListener(Constants.TEXT, 'change', function() {
            checkOffer();
        });

        //El evento click del botón de información.
        tmpControl.addEventListener(Constants.INFO, 'click', function() {
            var controlPrice = new (require(Global.Path.CONTROL + 'ShowPrices'))(ivaCliente, element.IVA);
            controlPrice.setEndPrice(Global.Functions.numToEuro(element.Precio));
            controlPrice.setUnitPrice(Global.Functions.numToEuro(element.Precio / element.UnidadesCaja, 3));
            controlPrice.setColorText(Global.Theme.TEXT_PRINCIPAL);

            var modalInfo = new Global.Control.Windows.Popup({
                title : "Información",
                icon : Global.Control.Windows.ICON.INFORMATION,
                body : controlPrice.getContent(),
                buttons : Global.Control.Windows.BUTTON.ACCEPT
            });

            modalInfo.addEventClickButton("accept", function() {
                modalInfo.close();
            });

            modalInfo.open();
        });

        controlsGift.push(tmpControl);

        contentGift.add(tmpControl.getControl());

    });

    /**
     * El campo de texto que queremos evitar que coja el foco.
     * @private
     * @type Ti.UI.TextField
     */
    var text = controlsSale[0].getControl().children[1].children[0];
    text.setEditable(false);

    /**
     * La ventana principal que hemos de retornar.
     * @private
     * @type Ti.UI.Window
     */
    var win = promo.getWin();

    /**
     * Quita el foco del campo de texto y lo vuelve editable para poder operar con el. Esto se hace para evitar
     * que el teclado aparezca al abrir la ventana.
     */
    function editable() {
        text.blur();
        setTimeout(function() {
            text.setEditable(true);
        }, 500);

        win.removeEventListener('postlayout', editable);
    };
    win.addEventListener('postlayout', editable);

    //Añade un evento cuando se ha aceptado la operación.
    promo.addEventAcceptListener(function() {
        //El artículo para regalar.
        // var rowGift = pickerGifts.getSelectedRow(0);
        // rowGift._article.Regalo = controlGift.getValue();
        //Lo añadimos a los artículos si no lo está ya. Si hay un artículo con regalo lo sustituimos.
        // if (giftArticle == undefined)
        // articles.push(rowGift._article);
        // else
        // articles[articles.length - 1] = rowGift._article;
        articles = tmpArticles.concat(tmpGifts);

        promo.addArticles(articles);

        var positionGifts = tmpArticles.length;

        for (var index = 0, j = articles.length; index < j; index++) {
            var element = articles[index];
            //};

            //_.each(articles, function(element, index) {

            element.Tarifa = rates.getRate(element.CodigoArticulo);
            element.typeOffer = Global.Order.GIFT_SALE_GROUP;
            element.CodigoPromocion = offer.CodigoPromocion;
            element.DescripcionPromocion = offer.Descripcion;
            element.CodigoAgrupacion = offer.CodigoAgrupacion;
            element.NumPedido = numPedido;
            element._del = true;
            element.Venta = (index < positionGifts) ? controlsSale[index].getValue() : 0;
            element.Regalo = (index < positionGifts) ? 0 : controlsGift[index - positionGifts].getValue();

            //Añadimos la ventana de edición de la oferta.
            element.winOffer = function() {
                return GiftSaleGroup(offer, articles, articulos, rates, numPedido, gifts, articlesGroup);
            };
            //});
        };

    });

    return win;
};

module.exports = GiftSaleGroup;
