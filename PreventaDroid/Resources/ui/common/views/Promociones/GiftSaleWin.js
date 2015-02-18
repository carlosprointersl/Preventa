/**
 * @fileOverview En este archivo se crea el la vista del cuerpo de la ventana para las unidades del artículo en el pedido.
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
 * Crea la ventana para introducir la cantidad + regalo.
 * @param {Object} offer La promoción con sus propiedades para aplicarle el filtro.
 * @param {Object} article El artículo al que se le aplican las promociones.
 * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
 */
function GiftSale(offer, article) {
    /**
     * El objeto para crear la ventana de edición.
     * @private
     * @type Object
     */
    var promo = new (require(Global.Path.VIEW + 'Promociones/CreateWindow/CreateWin'))(article, "Promoción V+R");

    /**
     * La cantidad mínima para aplicar la promoción.
     * @private
     * @type Numeric
     */
    var minim = offer.PromocionDesde > 0 ? offer.PromocionDesde : 1;

    /**
     * Proporción de regalo.
     * @private
     * @type Numeric
     */
    var rule = offer.Venta / offer.Regalo;

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
     * El control de las unidades de venta.
     * @private
     * @type Object
     */
    var controlSale = promo.createControl({
        title : "Unidades de venta",
        value : article.Venta >= offer.Venta ? article.Venta : offer.Venta,
        typeValue : Constants.INTEGER,
        minim : minim
    });
    controlSale.addEventListener(Constants.TEXT, 'change', function(){
        var s = Math.floor(controlSale.getValue() / rule);
        controlGift.setValue(s.toString());
        checkOffer();});
    viewControl.add(controlSale.getControl());

    /**
     * El control de las unidades de regalo.
     * @private
     * @type Object
     */
    // var controlGift = new createControl("Unidades de Regalo", article.Regalo > 0 ? article.Regalo : offer.Regalo);
    var controlGift = promo.createControl({
        title : "Unidades de Regalo",
        value : article.Regalo > 0 ? article.Regalo.toString() : offer.Regalo.toString(),
        typeValue : Constants.INTEGER,
        minim : (offer.PromocionDesde > 0 ? offer.Regalo : 0)
    });
    controlGift.addEventListener(Constants.TEXT, 'change', checkOffer);
    viewControl.add(controlGift.getControl());

    /**
     * Comprueba que se cumplan las restricciones de la promoción y activa o desactiva el botón aceptar según covenga.
     */
    function checkOffer() {        
        var tmpGift = Math.floor(controlSale.getValue() / rule);
               
        promo.setButtonState(controlSale.isValid() && controlGift.isValid() && controlGift.getValue() <= tmpGift);
    };
    
    /**
     * El campo de texto que queremos evitar que coja el foco.
     * @private
     * @type Ti.UI.TextField
     */
    var text = controlSale.getControl().children[1].children[0];
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
    function editable(){
        text.blur();
        setTimeout(function(){
            text.setEditable(true);
        }, 500);
        
        win.removeEventListener('postlayout', editable);
    };
    win.addEventListener('postlayout', editable);

    //Añade un evento cuando se ha aceptado la operación.
    promo.addEventAcceptListener(function() {
        article.Venta = controlSale.getValue();
        article.Regalo = controlGift.getValue();
        article.typeOffer = Global.Order.GIFT_SALE;
        article.CodigoPromocion = offer.CodigoPromocion;
        article.CodigoAgrupacion = offer.CodigoAgrupacion;
        article._del = true;
        //Añadimos la ventana de edición de la oferta
        article.winOffer = function() {
            return GiftSale(offer, article);
        };
    });
    
    return win;
};

module.exports = GiftSale;
