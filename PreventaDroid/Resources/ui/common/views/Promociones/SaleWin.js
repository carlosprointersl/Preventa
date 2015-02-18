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
 * Crea la vista del cuerpo para la edición de las unidades del artículo para un pedido.
 * @param {Object} article Los datos del artículo.
 * @param {String} ivaCliente Indica el tipo de IVA ("N" o "R") que tiene el CLIENTE.
 */
function SaleWin(article, ivaCliente) {
    /**
     * El objeto para crear la ventana de edición.
     * @private
     * @type Object
     */
    var promo = new (require(Global.Path.VIEW + 'Promociones/CreateWindow/CreateWin'))(article, "Venta artículo");

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
        value : article.Venta > 0 ? article.Venta.toString() : '1',
        typeValue : Constants.INTEGER,
        minim : 1,
        buttonInfo : true
    });
    controlSale.addEventListener(Constants.TEXT, 'change', checkOffer);
    viewControl.add(controlSale.getControl());
    
    //El evento click del botón de información.
    controlSale.addEventListener(Constants.INFO, 'click', function(){
        var controlPrice = new (require(Global.Path.CONTROL + 'ShowPrices'))(ivaCliente, article.IVA);
        controlPrice.setEndPrice(Global.Functions.numToEuro(article.Tarifa));
        controlPrice.setUnitPrice(Global.Functions.numToEuro(article.Tarifa / article.UnidadesCaja, 3));
        controlPrice.setColorText(Global.Theme.TEXT_PRINCIPAL);        
    
        var modalInfo = new Global.Control.Windows.Popup({
            title : "Información",
            icon : Global.Control.Windows.ICON.INFORMATION,
            body : controlPrice.getContent(),
            buttons : Global.Control.Windows.BUTTON.ACCEPT
        });
        
        modalInfo.addEventClickButton("accept", function(){
            modalInfo.close();
        });
        
        modalInfo.open();
    });
    
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

    /**
     * Comprueba que se cumplan las restricciones de la promoción y activa o desactiva el botón aceptar según covenga.
     */
    function checkOffer() {
        promo.setButtonState(controlSale.isValid());
    };
    
    //Añade un evento cuando se ha aceptado la operación.
    promo.addEventAcceptListener(function() {
        article.Venta = controlSale.getValue();
        article.typeOffer = Global.Order.NO_OFFER;
        article.CodigoPromocion = '0';
        article.CodigoAgrupacion = '0';
        article._del = true;
    });

    return win;
};

module.exports = SaleWin;