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
 * @param {String[]} gifts Los códigos de los artículos de regalo.
 * @param {Object[]} articlesGroup Loas artículos que forman esta agrupación.
 * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
 */
function GiftSaleGroup(offer, articles, model, articulos, rates, numPedido, gifts, articlesGroup) {
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
     * Busca entre los artículos el que es para regalo y retorna su posición.
     * @return {Number} La posición del artículo que es para regalo. En caso de no haber ninguno retorna -1.
     */
    function giftIndex() {
        return giftArticle == undefined ? 0 : _.indexOf(gifts, giftArticle.CodigoArticulo);
    };

    /**
     * Comprueba que se cumplan las restricciones de la promoción y activa o desactiva el botón aceptar según covenga.
     */
    function checkOffer() {
        var state = true;
        var count = 0;

        for (var i = 0, j = controls.length - 1; i < j; i++) {
            state = state && controls[i].isValid();
            count += parseInt(controls[i].getValue());
        };
        // _.each(controls, function(element) {
        // state = state && element.isValid();
        // count += element.title == "" ? 0 : parseInt(element.getValue());
        // });

        var desde = count >= offer.PromocionDesde;
        var regalos = controlGift.getValue() <= Math.floor(count / rule);
        state = state && (count >= offer.PromocionDesde) && (controlGift.getValue() <= Math.floor(count / rule));

        promo.setButtonState(state);
    };

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

    //La cantidad mínima para aplicar la promoción.
    // var minim = offer.PromocionDesde < offer.Venta ? offer.Venta : offer.PromocionDesde;
    //Proporción de regalo
    var rule = offer.Venta / offer.Regalo;
    //La cantidad mínima para regalar.
    //var minimGift = Math.floor(minim / rule);
    //El artículo para regalo.
    var giftArticle;
    // Las unidades de regalo.
    //var giftUnits = 0;

    /**
     * Los artículos que forman esta agrupación.
     * @private
     * @type Object[]
     */
    //var articlesGroup = model.select("WHERE CodigoAgrupacion ='" + offer.CodigoAgrupacion + "'");

    /**
     * Los artículos temporales.
     * @private
     * @type Array
     */
    var tmpArticles = new Array();

    //Llenamos los artículos temporales
    _.each(articlesGroup, function(element) {
        if (element.CodigoArticulo != 0) {
            var articleLine = articulos.getArticle(element.CodigoArticulo);
            articleLine.Precio = rates.getRate(element.CodigoArticulo);
            articleLine.DtoFijo = 0;
            tmpArticles.push(articleLine);
        };
    });

    /**
     * Los artículos de "obsequio".
     * @private
     * @type Array
     */
    // var gifts = [offer.ArticuloObsequio1, offer.ArticuloObsequio2, offer.ArticuloObsequio3, offer.ArticuloObsequio4, offer.ArticuloObsequio5];

    //La primera vez no tenemos artículos, así que utilizamos los originales.
    if (articles == undefined) {
        articles = tmpArticles;
    } else {
        _.each(tmpArticles, function(element, index) {
            var art = _.findWhere(articles, {
                CodigoArticulo : element.CodigoArticulo
            });
            element.Venta = art != undefined ? art.Venta : element.Venta;
            // element.Regalo = art != undefined ? art.Regalo : element.Regalo;
        });

        giftArticle = articles[articles.length - 1];
        articles = tmpArticles;
        articles.push(giftArticle);
    };

    /**
     * Los controles para las unidades de los artículos.
     * @private
     * @type Object[]
     */
    var controls = new Array();

    //Añadimos los controles a la variable "controls" y a la vista.
    _.each(articles, function(element, index, list) {
        //Si NO TIENE regalo es un control válido
        if (element.Regalo == undefined || element.Regalo == 0) {
            //El control temporal
            var tmpControl = promo.createControl({//new controlUnit({
                title : element.Descripcion,
                value : (element.Venta > 0 ? element.Venta : 0).toString(),
                typeValue : Constants.INTEGER
            });
            //El evento 'change' del control temporal
            tmpControl.addEventListener(Constants.TEXT, 'change', function() {
                checkOffer();
            });

            controls.push(tmpControl);

            viewControl.add(tmpControl.getControl());
        };
    });

    /**
     * El campo de texto que queremos evitar que coja el foco.
     * @private
     * @type Ti.UI.TextField
     */
    var text = controls[0].getControl().children[1].children[0];
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

    /**
     * El desplegable con los artículos de "obsequio".
     * @private
     * @type Ti.UI.Picker
     */
    var pickerGifts = Ti.UI.createPicker();
    viewControl.add(pickerGifts);

    /**
     * El control de las unidades de regalo.
     * @private
     * @type Object
     */
    var controlGift = promo.createControl({//new controlUnit({
        title : "",
        value : giftArticle != undefined ? giftArticle.Regalo.toString() : "0", //giftUnits,
        typeValue : Constants.INTEGER
    });
    controls.push(controlGift);
    viewControl.add(controlGift.getControl());
    //El evento 'change' del control de Regalo
    controlGift.addEventListener(Constants.TEXT, 'change', function() {
        checkOffer();
    });

    //Añadimos el "picker" con los artículos de "obsequio"
    _.each(gifts, function(element) {
        //if (element != 0) {
            var tmpArticle = articulos.getArticle(element);
            tmpArticle.Precio = rates.getRate(element);
            tmpArticle.DtoFijo = 0;
            var tmpRow = Ti.UI.createPickerRow({
                title : tmpArticle.Descripcion,
                _article : tmpArticle
            });
            pickerGifts.add(tmpRow);
        //};
    });

    //Seleccionamos el artículo de regalo si lo hubiera
    pickerGifts.setSelectedRow(0, giftIndex());

    //Añade un evento cuando se ha aceptado la operación.
    promo.addEventAcceptListener(function() {
        //El artículo para regalar.
        var rowGift = pickerGifts.getSelectedRow(0);
        rowGift._article.Regalo = controlGift.getValue();
        //Lo añadimos a los artículos si no lo está ya. Si hay un artículo con regalo lo sustituimos.
        if (giftArticle == undefined)
            articles.push(rowGift._article);
        else
            articles[articles.length - 1] = rowGift._article;

        promo.addArticles(articles);

        _.each(articles, function(element, index) {
            element.Tarifa = rates.getRate(element.CodigoArticulo);
            element.Venta = element.Regalo > 0 ? 0 : controls[index].getValue();
            element.Regalo = element.Regalo > 0 ? controls[index].getValue() : 0;
            element.typeOffer = Global.Order.GIFT_SALE_GROUP;
            element.CodigoPromocion = offer.CodigoPromocion;
            element.DescripcionPromocion = offer.Descripcion;
            element.CodigoAgrupacion = offer.CodigoAgrupacion;
            element.NumPedido = numPedido;
            element._del = true;

            //Añadimos la ventana de edición de la oferta.
            element.winOffer = function() {
                return GiftSaleGroup(offer, articles, model, articulos, rates, numPedido, gifts, articlesGroup);
            };
        });

    });

    return win;
};

module.exports = GiftSaleGroup;
