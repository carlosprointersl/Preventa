/**
 * @fileOverview En este archivo se crea el la vista del cuerpo de la ventana para las unidades del artículo en el pedido.</br>
 * Se aplica la promoción de descuento para un artículo.
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
 * @param {Object} article El artículo al que se le aplicacn las promociones.
 * @param {String} ivaCliente Indica el tipo de IVA ("N" o "R") que tiene el CLIENTE.
 * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
 */
function DiscountWin(offer, article, ivaCliente) {
    /**
     * El objeto para crear la ventana de edición.
     * @private
     * @type Object
     */
    var promo = new (require(Global.Path.VIEW + 'Promociones/CreateWindow/CreateWin'))(article, "Descuento unitario €-%");

    /**
     * La cantidad mínima para aplicar la promoción.
     * @private
     * @type Numeric
     */
    var minim = offer.PromocionDesde < offer.Venta ? offer.Venta : (offer.PromocionDesde > 0 ? offer.PromocionDesde : 1);

    /**
     * El descuento en €.
     * @private
     * @type Number
     */
    var euro = offer.DtoUnitario > 0 ? offer.DtoUnitario : Math.round(article.Precio * offer.DtoPorcenUnit) / 100;

    /**
     * El descuento en %.
     * @private
     * @type Number
     */
    var percent = offer.DtoPorcenUnit > 0 ? offer.DtoPorcenUnit : Math.round((100 * offer.DtoUnitario) / article.Precio);

    /**
     * El control de los precios.
     * @private
     * @type Object
     */
    var controlPrice = new (require(Global.Path.CONTROL + 'ShowPrices'))(ivaCliente, article.IVA);
    promo.bodyAdd(controlPrice.getContent());

    /**
     * Línea divisoria horizontal.
     * @private
     * @type Ti.UI.View
     */
    var line_h = Ti.UI.createView({
        backgroundColor : Global.Theme.TEXT_SECONDARY,
        height : 0.5,
        bottom : 0
    });
    //viewEndPrice.add(line_h);
    promo.bodyAdd(line_h);

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
     * Los controles.
     * @private
     * @type Object[]
     */
    
    
    var controls = {
        sale : promo.createControl({
            title : "Unidades de venta",
            value : article.Venta >= minim ? article.Venta.toString() : minim.toString(),
            typeValue : Constants.INTEGER,
            minim : minim
        }),
        dtoEuro : promo.createControl({
            title : "Descuento en €",
            value : article.DtoFijo > 0 ? article.DtoFijo.toString().replace(".", ",") : euro.toString().replace(".", ","), //Inicializacion de los parametros
            typeValue : Constants.FLOAT,
            maxim : euro,
            minim : 0
        }),
        dtoPer : promo.createControl({
            title : "Descuento en %",
            value : article.DtoFijo > 0 ? Math.round((100 * article.DtoFijo) / article.Precio).toString() : percent.toString(),
            typeValue : Constants.INTEGER,
            maxim : percent,
            minim : 0
        })
    };

    /**
     * Activa el descuento "€" y desactiva el descuento "%".
     */
    function changeDtoEuro() {
        controls.dtoEuro._change = true;
        controls.dtoPer._change = false;
    };

    /**
     * Activa el descuento "%" y desactiva el descuento "€".
     */
    function changeDtoPer() {
        controls.dtoEuro._change = false;
        controls.dtoPer._change = true;
    };

    //Añadimos la propiedad "_change" al control para poder editar los camos de descuento.
    controls.dtoEuro._change = false;
    controls.dtoPer._change = false;

    //Añadimos las funciones a los controles de descuentos para el evento "focus".
    controls.dtoEuro.addEventListener(Constants.TEXT, 'focus', changeDtoEuro);
    controls.dtoPer.addEventListener(Constants.TEXT, 'focus', changeDtoPer);

    //Añadimos las funciones a los controles de descuentos para el evento "change".
    controls.dtoEuro.addEventListener(Constants.TEXT, 'change', function(e) {
        if (controls.dtoEuro._change) {
            if (controls.dtoEuro.getValue().replace(",", ".") != euro)
                controls.dtoPer.setValue(Math.round((100 * controls.dtoEuro.getValue().replace(",", ".")) / article.Precio).toString());
            else
                controls.dtoPer.setValue(percent.toString());
        };
    });
    controls.dtoPer.addEventListener(Constants.TEXT, 'change', function(e) {
        if (controls.dtoPer._change) {
            if (controls.dtoPer.getValue().replace(".", ",") != percent)
                controls.dtoEuro.setValue((Math.round((controls.dtoPer.getValue().replace(",", ".") * article.Tarifa)) / 100).toString().replace(".", ","));
            else
                controls.dtoEuro.setValue(euro.toString().replace(".", ","));
        };
    });

    //Añadimos las funciones a los controles de descuentos para el evento "click" de los botones.
    controls.dtoEuro.addEventListener(Constants.ADD, 'click', changeDtoEuro);
    controls.dtoEuro.addEventListener(Constants.REMOVE, 'click', changeDtoEuro);
    controls.dtoPer.addEventListener(Constants.ADD, 'click', changeDtoPer);
    controls.dtoPer.addEventListener(Constants.REMOVE, 'click', changeDtoPer);

    //Añadimos el vento "change" a los controles.
    _.each(controls, function(element) {
        element.addEventListener(Constants.TEXT, 'change', checkOffer);
    });

    viewControl.add(controls.sale.getControl());
    viewControl.add(controls.dtoEuro.getControl());
    viewControl.add(controls.dtoPer.getControl());

    /**
     * El campo de texto que queremos evitar que coja el foco.
     * @private
     * @type Ti.UI.TextField
     */
    var text = controls.sale.getControl().children[1].children[0];
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
     * Comprueba que se cumplan las restricciones de la promoción y activa o desactiva el botón aceptar según covenga.
     */
    function checkOffer() {
        var state = controls.sale.isValid() && controls.dtoEuro.isValid() && controls.dtoPer.isValid();
        if (state) {
            var dto = controls.dtoEuro.getValue().replace(",", ".");
            controlPrice.setEndPrice(Global.Functions.numToEuro(article.Tarifa - dto));

            var tarifaUnit = article.Tarifa / article.UnidadesCaja;
            var dtoUnit = (controls.dtoPer.getValue().replace(",", ".") / 100) * tarifaUnit;
            controlPrice.setUnitPrice(Global.Functions.numToEuro(tarifaUnit - dtoUnit, 3));
        };
        promo.setButtonState(state);
    };

    //Añade un evento cuando se ha aceptado la operación.
    promo.addEventAcceptListener(function() {
        article.DtoFijo = controls.dtoEuro.getValue().replace(",", ".");
        article.Venta = controls.sale.getValue();
        article.typeOffer = Global.Order.DISCOUNT;
        article.CodigoPromocion = offer.CodigoPromocion;
        article.CodigoAgrupacion = offer.CodigoAgrupacion;
        //Añadimos la ventana de edición de la oferta
        article.winOffer = function() {
            return DiscountWin(offer, article);
        };
    });

    return win;
};

module.exports = DiscountWin;
