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
 * Crea la ventana para introducir un precio especial.
 * @param {Object} offer La promoción con sus propiedades para aplicarle el filtro.
 * @param {Object} article El artículo al que se le aplicacn las promociones.
 * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
 */
function FixedPriceWin(offer, article) {
    /**
     * El objeto para crear la ventana de edición.
     * @private
     * @type Object
     */
    var promo = new (require(Global.Path.VIEW + 'Promociones/CreateWindow/CreateWin'))(article, "Precio Fijo");
    
    /**
     * La cantidad mínima para aplicar la promoción.
     * @private
     * @type Numeric
     */
    var minim = offer.PromocionDesde < offer.Venta ? offer.Venta : offer.PromocionDesde;
    
    /**
     * El precio mínimo para aplicar la promoción.
     * @private
     * @type Numeric 
     */
    var minimPrice = offer.PrecioEspecial;
    
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
        value : article.Venta >= minim ? article.Venta : minim.toString(),
        typeValue : Constants.INTEGER,
        minim : minim
    });
    controlSale.addEventListener(Constants.TEXT, 'change', checkOffer);
    viewControl.add(controlSale.getControl());
    
    /**
     * El control del precio especial.
     * @private
     * @type Object 
     */
    var controlPrice = promo.createControl({
        title : "Precio especial",
        value : article.Precio < minimPrice ? minimPrice.toString().replace(".", ",") : article.Precio.toString().replace(".", ","),
        typeValue : Constants.FLOAT,
        //enabled : Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getModifPrecio()),
        minim : minimPrice
    });
    controlPrice.addEventListener(Constants.TEXT, 'change', checkOffer);
    viewControl.add(controlPrice.getControl());

    /**
     * Comprueba que se cumplan las restricciones de la promoción y activa o desactiva el botón aceptar según covenga.
     */
    function checkOffer() {
        promo.setButtonState(controlSale.isValid() && controlPrice.isValid());
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
        article.Precio = controlPrice.getValue().replace(",", ".");
        article.Venta = controlSale.getValue();
        article.typeOffer = Global.Order.FIXED_PRICE;
        article.CodigoPromocion = offer.CodigoPromocion;
        article.CodigoAgrupacion = offer.CodigoAgrupacion;
        //Añadimos la ventana de edición de la oferta
        article.winOffer = function() {
            return FixedPriceWin(offer, article);
        };
    });

    return win;
};

module.exports = FixedPriceWin;
