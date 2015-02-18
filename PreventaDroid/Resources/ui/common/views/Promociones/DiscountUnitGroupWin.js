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
 * @param {Object} offer La promoción con sus propiedades.
 * @param {Object[]} [articles] Los artículos que forman la promoción.
 * @param {Object} model El modelo de las promociones.
 * @param {Object} articulos El controlador de los artículos.
 * @param {Object} rates El controlador de las tarifas.
 * @param {Number} numPedido El número de pedido al que pertenece esta promoción.
 * @param {Object[]} articlesGroup Loas artículos que forman esta agrupación.
 * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
 */
function DiscountUnitGroupWin(offer, articles, model, articulos, rates, numPedido, articlesGroup) {
    /**
     * Los artículos que forman esta agrupación.
     * @private
     * @type Object[]
     */
    //var articlesGroup = model.select("WHERE CodigoAgrupacion ='" + articles[0].CodigoAgrupacion + "'");

    /**
     * El objeto para crear la ventana de edición.
     * @private
     * @type Object
     */
    var promo = new (require(Global.Path.VIEW + 'Promociones/CreateWindowGroup/CreateWin'))({
        Descripcion : offer.Descripcion, //"SIN NOMBRE",
        _del : articles != undefined ? articles[0]._del : false,
        articles : articles
    }, "Descuento unitario €-%", "ControlUnitsGroupDiscount");

    //El total de los productos vendidos.
    var totalSale = 0;
    /**
     * Los artículos temporales.
     * @private
     * @type Array
     */
    var tmpArticles = new Array();
    //Indica la cantidad de líneas que no son correctas.
    var errorLines = 0;

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

    //Llenamos los artículos temporales
    _.each(articlesGroup, function(element) {
        var articleLine = articulos.getArticle(element.CodigoArticulo);
        articleLine.Precio = rates.getRate(element.CodigoArticulo);
        articleLine.DtoUnitario = element.DtoUnitario;
        articleLine.DtoPorcenUnit = element.DtoPorcenUnit;
        articleLine.PromocionDesde = element.PromocionDesde;
        tmpArticles.push(articleLine);
    });

    //La primera vez no tenemos artículos, así que utilizamos los originales.
    //if (Object.keys(articles[0]).length == 1) {
    if (articles === undefined) {
        articles = tmpArticles;
    } else {
        _.each(tmpArticles, function(element) {
            var art = _.findWhere(articles, {
                CodigoArticulo : element.CodigoArticulo
            });
            element.Venta = art != undefined ? art.Venta : element.Venta;
            element.DtoFijo = art != undefined ? art.DtoFijo : element.DtoFijo;
        });
        articles = tmpArticles;
    };
    promo.addArticles(articles);

    /**
     * Los controles para las unidades de los artículos.
     * @private
     * @type Object[]
     */
    var controls = new Array();

    //Añadimos los controles a la variable "controls" y a la vista.
    _.each(articles, function(element, index, list) {
        //El control temporal
        var tmpControl = promo.createControl({
            name : element.Descripcion,
            price : element.Precio,
            value : (element.Venta > 0 ? element.Venta : 0).toString(),
            typeValue : Constants.INTEGER,
            euro : (element.DtoUnitario > 0 ? element.DtoUnitario : Math.round(element.Precio * element.DtoPorcenUnit) / 100).toString(),
            percent : (element.DtoPorcenUnit > 0 ? element.DtoPorcenUnit : Math.round((100 * element.DtoUnitario) / element.Precio)).toString()
        });
        //El evento 'change' del control
        tmpControl.addChangeEvent(function() {
            checkOffer();
        });

        controls.push(tmpControl);

        viewControl.add(tmpControl.getControl());
    });
    
    /**
     * El campo de texto que queremos evitar que coja el foco.
     * @private
     * @type Ti.UI.TextField
     */
    var text = controls[0].getControl().children[1].children[2];
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
        var count = 0;
        var state = true;
        _.each(controls, function(element) {
            state = state && element.isValid();
            count += parseInt(element.getValue());
        });

        state = state && (count >= articlesGroup[0].PromocionDesde);

        promo.setButtonState(state);
    };

    //Añade un evento cuando se ha aceptado la operación.
    promo.addEventAcceptListener(function() {
        _.each(articles, function(element, index) {
            var control = controls[index];
            
            element.Tarifa = rates.getRate(element.CodigoArticulo);            
            element.DtoFijo = parseInt((control.getDtoE().replace(",", ".") * 100) / control.getValue()) / 100;
            element.Venta = control.getValue();
            element.typeOffer = Global.Order.DISCOUNT;
            element.CodigoPromocion = articlesGroup[0].CodigoPromocion;
            element.DescripcionPromocion = articlesGroup[0].Descripcion;
            element.CodigoAgrupacion = articlesGroup[0].CodigoAgrupacion;
            element.NumPedido = numPedido;
            element._del = true;

            //Añadimos la ventana de edición de la oferta.
            element.winOffer = function() {
                return DiscountUnitGroupWin(offer, articles, model, articulos, rates, numPedido, articlesGroup);
            };
        });
    });

    return win;
};

module.exports = DiscountUnitGroupWin;
