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
 * @param {Object[]} articlesGroup Loas artículos que forman esta agrupación.
 * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
 */
function DiscountGroupWin(offer, articles, model, articulos, rates, numPedido, articlesGroup) {
    /**
     * El control de los descuentos.
     * @private
     * @type Object
     */
    var controlDto = new createControlDto(offer);
    
    //Añadimos la función "checkOffer" al evento 'change' del campo de los descuentos en "%".
    controlDto.addChangeListener(checkOffer);

    /**
     * El objeto para crear la ventana de edición.
     * @private
     * @type Object
     */
    var promo = new (require(Global.Path.VIEW + 'Promociones/CreateWindowGroup/CreateWin'))({
        Descripcion : offer.Descripcion,
        _del : articles != undefined ? articles[0]._del : false,
        articles : articles
    }, "Descuento €-% por grupo", "ControlUnitsDiscount");
    
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
        var articleLine = articulos.getArticle(element.CodigoArticulo);
        articleLine.Precio = rates.getRate(element.CodigoArticulo);
        tmpArticles.push(articleLine);
    });

    //La primera vez no tenemos artículos, así que utilizamos los originales.
    if (articles == undefined) {
        articles = tmpArticles;
    } else {
        _.each(tmpArticles, function(element) {
            var art = _.findWhere(articles, {
                CodigoArticulo : element.CodigoArticulo
            });
            element.Venta = art != undefined ? art.Venta : element.Venta;
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
        var tmpControl = promo.createControl({//new controlUnit({
            name : element.Descripcion,
            price : element.Precio,
            value : (element.Venta > 0 ? element.Venta : 0).toString(),
            typeValue : Constants.INTEGER
        });
        //El evento 'change' del control temporal
        tmpControl.addEventListener(Constants.TEXT, 'change', function() {
            calculateTotal();
        });

        controls.push(tmpControl);

        viewControl.add(tmpControl.getControl());
    });

    //Añadimos una línea horizontal
    viewControl.add(Ti.UI.createView({
        backgroundColor : Global.Theme.TEXT_SECONDARY,
        height : 0.5,
        top : 1,
        bottom : 1
    }));

    //Añadimos el control para editar los descuentos.
    viewControl.add(controlDto.getControl());

    /**
     * Calcula el importe total de la promoción y se lo pasa al control de los descuentos.
     */
    function calculateTotal() {
        var total = 0;
        _.each(controls, function(element) {
            total += element.getTotal();
        });
        controlDto.setTotal(total);
        checkOffer();
    };

    /**
     * Comprueba que se cumplan las restricciones de la promoción y activa o desactiva el botón aceptar según covenga.
     */
    function checkOffer() {
        var state = controlDto.isValid();
        if(state){
            var count = 0;
            _.each(controls, function(element){
                state = state && element.isValid();
                count += parseInt(element.getValue());            
            });
            
            state = state && (count >= offer.PromocionDesde);
        };
        
        promo.setButtonState(state);
    };
    
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

    //Añade un evento cuando se ha aceptado la operación.
    promo.addEventAcceptListener(function() {
        _.each(articles, function(element, index){

            element.Tarifa = rates.getRate(element.CodigoArticulo);
            element.DtoFijo = Math.round(parseInt(controlDto.getDtoPer()) * element.Tarifa) / 100;//(label.discount / label.sale) / 100;
            element.Venta = parseInt(controls[index].getValue());
            element.typeOffer = Global.Order.DISCOUNT;
            element.CodigoPromocion = offer.CodigoPromocion;
            element.DescripcionPromocion = offer.Descripcion;
            element.CodigoAgrupacion = offer.CodigoAgrupacion;
            element.NumPedido = numPedido;
            element._del = true;

            //Añadimos la ventana de edición de la oferta.
            element.winOffer = function() {
                return DiscountGroupWin(offer, articles, model, articulos, rates, numPedido, articlesGroup);
            };

        });
    });

    return win;
};

module.exports = DiscountGroupWin;

/**
 * Crea la vista de los totales y los descuentos con sus procedimientos.
 * @class
 * @param {Object} offer La promoción con sus propiedades para aplicarle el filtro.
 */
function createControlDto(offer) {
    /**
     * El total de las líneas antes del descuento.
     * @private
     * @type Number
     */
    var beforeTotal = 0;

    /**
     * El descuento en %.
     * @private
     * @type Number
     */
    // var percent = offer.DtoPorcenUnit > 0 ? offer.DtoPorcenUnit : Math.round((100 * offer.DtoUnitario) / article.Precio);

    /**
     * El descuento en €.
     * @private
     * @type Number
     */
    // var euro = Math.round(beforeTotal * offer.DtoPorcenUnit) / 100;

    /**
     * El total de las líneas después del descuento.
     * @private
     * @type Number
     */
    // var afterTotal = beforeTotal - euro > 0 ? beforeTotal - euro : 0;

    /**
     * La vista contenedor.
     * @private
     * @type Ti.UI.View
     */
    var content = Ti.UI.createView({
        height : Ti.UI.SIZE,
        layout : 'vertical'
    });

    /**
     * La vista contenedor del primer total.
     * @private
     * @type Ti.UI.View
     */
    var total1Content = Ti.UI.createView({
        height : 35
    });
    content.add(total1Content);

    /**
     * La vista contenedor de los descuentos.
     * @private
     * @type Ti.UI.View
     */
    var dtoContent = Ti.UI.createView({
        height : 35
    });
    content.add(dtoContent);

    /**
     * La vista contenedor del segundo total.
     * @private
     * @type Ti.UI.View
     */
    var total2Content = Ti.UI.createView({
        height : 35
    });
    content.add(total2Content);

    /**
     * El total del pedido antes del descuento.
     * @private
     * @type Ti.UI.Label
     */
    var labelTotal1 = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 15,
            fontWeight : 'bold'
        },
        text : 'Total:',
        height : Ti.UI.SIZE,
        width : Ti.UI.SIZE,
        right : 100
    });
    total1Content.add(labelTotal1);

    /**
     * La vista envoltorio del importe del total1.
     * @private
     * @type Ti.UI.View
     */
    var borderTotal1 = Ti.UI.createView({
        backgroundColor : "#808080",
        borderColor : '#000000',
        borderWidth : 1,
        right : 2,
        width : 86,
        height : Ti.UI.SIZE
    });
    total1Content.add(borderTotal1);

    /**
     * El importe de total1.
     * @private
     * @type Ti.UI.Label
     */
    var labelImportTotal1 = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 15,
            fontWeight : 'bold'
        },
        text : Global.Functions.numToEuro(beforeTotal),
        height : Ti.UI.SIZE,
        width : Ti.UI.SIZE,
        right : 2
    });
    borderTotal1.add(labelImportTotal1);

    /**
     * El total del pedido antes del descuento.
     * @private
     * @type Ti.UI.Label
     */
    var labelTotal2 = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 15,
            fontWeight : 'bold'
        },
        text : 'Total:',
        height : Ti.UI.SIZE,
        width : Ti.UI.SIZE,
        right : 100
    });
    total2Content.add(labelTotal2);

    /**
     * La vista envoltorio del importe del total1.
     * @private
     * @type Ti.UI.View
     */
    var borderTotal2 = Ti.UI.createView({
        backgroundColor : "#808080",
        borderColor : '#000000',
        borderWidth : 1,
        right : 2,
        width : 86,
        height : Ti.UI.SIZE
    });
    total2Content.add(borderTotal2);

    /**
     * El importe de total1.
     * @private
     * @type Ti.UI.Label
     */
    var labelImportTotal2 = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 15,
            fontWeight : 'bold'
        },
        text : "", //Global.Functions.numToEuro(afterTotal),
        height : Ti.UI.SIZE,
        width : Ti.UI.SIZE,
        right : 2
    });
    borderTotal2.add(labelImportTotal2);

    /**
     * El Dto en €.
     * @private
     * @type Ti.UI.Label
     */
    var labelEuroDto = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 15,
            fontWeight : 'bold'
        },
        text : 'Dto €:',
        height : Ti.UI.SIZE,
        width : Ti.UI.SIZE,
        right : 100
    });
    dtoContent.add(labelEuroDto);

    /**
     * El campo para indicar el descuento en €.
     * @private
     * @type Ti.UI.TextField
     */
    var editEuro = Ti.UI.createTextField({
        // height : 35,
        right : 2,
        width : 86,
        // value : options.value || options.minim.toString(),
        value : (Math.round(beforeTotal * offer.DtoPorcenUnit) / 100).toString().replace(".", ","),
        font : {
            fontSize : 15
        },
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD
    });
    dtoContent.add(editEuro);

    /**
     * El Dto en %.
     * @private
     * @type Ti.UI.Label
     */
    var labelPerDto = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 15,
            fontWeight : 'bold'
        },
        text : 'Dto %:',
        height : Ti.UI.SIZE,
        width : Ti.UI.SIZE,
        right : 250
    });
    dtoContent.add(labelPerDto);

    /**
     * El campo para indicar el descuento en €.
     * @private
     * @type Ti.UI.TextField
     */
    var editPer = Ti.UI.createTextField({
        // height : 35,
        right : 150,
        width : 86,
        // value : options.value || options.minim.toString(),
        value : offer.DtoPorcenUnit.toString(),
        font : {
            fontSize : 15
        },
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD
    });
    dtoContent.add(editPer);

    /**
     * Activa el descuento "€" y desactiva el descuento "%".
     */
    function changeDtoEuro() {
        editEuro._change = true;
        editPer._change = false;
    };

    /**
     * Activa el descuento "%" y desactiva el descuento "€".
     */
    function changeDtoPer() {
        editEuro._change = false;
        editPer._change = true;
    };

    /**
     * Calcula el total resultante de la resta del total menos el descuento aplicado.
     */
    function calculateTotal() {
        labelImportTotal2.setText(Global.Functions.numToEuro(beforeTotal - parseFloat(editEuro.getValue().replace(",", "."))));
    };

    //Añadimos la propiedad "_change" al control para poder editar los camos de descuento.
    editEuro._change = false;
    editPer._change = false;

    //Añadimos las funciones a los controles de descuentos para el evento "focus".
    editEuro.addEventListener('focus', changeDtoEuro);
    editPer.addEventListener('focus', changeDtoPer);

    //Añadimos las funciones a los controles de descuentos para el evento "change".
    editEuro.addEventListener('change', function(e) {
        if (editEuro._change) {
            var euroPer = parseInt((editEuro.getValue().replace(",", ".") * 10000) / beforeTotal) / 100;
            editPer.setValue(euroPer > offer.DtoPorcenUnit ? euroPer : Math.round((100 * editEuro.getValue().replace(",", ".")) / beforeTotal).toString());
            calculateTotal();
        };
    });
    editPer.addEventListener('change', function(e) {
        if (editPer._change) {
            editEuro.setValue((parseInt((editPer.getValue().replace(",", ".") * beforeTotal)) / 100).toString().replace(".", ","));
            calculateTotal();
        };
    });
    
    /**
     * Indica si el descuento del control es válido.
     * @return {Boolean} TRUE en caso de que el descuento sea válido. 
     */
    this.isValid = function(){
        return parseFloat(editPer.getValue()) <= offer.DtoPorcenUnit;   
    };

    /**
     * Retorna el control de descuentos.
     * @return {Ti.UI.View} El control montado.
     */
    this.getControl = function() {
        return content;
    };

    /**
     * Cambia el valor del total antes del descuento.
     * @param {Number} value El importe del campo del total.
     */
    this.setTotal = function(value) {
        beforeTotal = value;
        labelImportTotal1.setText(Global.Functions.numToEuro(beforeTotal));
        changeDtoPer();
        editPer.fireEvent('change');
        // calculateTotal();
    };
    
    /**
     * Añade una acción al evento 'change' del campo de descuento en '%'.
     * @param {Function} callback La acción ha realizar.
     */
    this.addChangeListener = function(callback){
        editPer.addEventListener('change', callback);
    };
    
    /**
     * Retorna el valor del descuento aplicado en "%".
     * @return {String} El valor del descuento aplicado. 
     */
    this.getDtoPer = function(){
        return editPer.getValue();
    };

};
