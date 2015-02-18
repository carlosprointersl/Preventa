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
 * Crea la vista del cuerpo para la edición de las unidades del artículo para un pedido. También podemos crear alguna oferta para el artículo.
 * @param {Object} article Los datos del artículo.
 * @param {String} ivaCliente Indica el tipo de IVA ("N" o "R") que tiene el CLIENTE.
 * @param {Boolean} [isBudget] Indica si es un presupuesto.
 */
function SaleWin(article, ivaCliente, isBudget) {
    //El presupuesto
    var isBudget = isBudget || false;

    /**
     * El objeto para crear la ventana de edición.
     * @private
     * @type Object
     */
    var promo = new (require(Global.Path.VIEW + 'Promociones/CreateWindow/CreateWin'))(article, isBudget ? "Presupuesto" : "Venta artículo");

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
        height : 0.5
    });
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
     * Comprueba que se cumplan las restricciones de la promoción y activa o desactiva el botón aceptar según covenga.
     */
    function checkOffer() {
        var check = true;
        //Recorremos todos los controles
        for (var i = 0, j = controls.length; i < j; i++) {
            var con = controls[i].isValid();
            check = check && con;
        };
        promo.setButtonState(check);

        if (check) {
            // Nuevo Precio - Descuento Fijo - Descuento € - (Venta + Regalo) €
            var newPrice = parseFloat(controls[2].getValue().replace(",", "."));
            var dtoFixe = parseFloat(controls[3].getValue().replace(",", "."));
            var dtoEuro = parseFloat(controls[4].getValue().replace(",", "."));

            var countArt = parseInt(controls[0].getValue()) + parseInt(controls[1].getValue());
            var dtoGift = newPrice - ((parseInt(controls[0].getValue()) * newPrice) / countArt);

            var dto = newPrice - dtoFixe - dtoEuro - dtoGift;
            controlPrice.setEndPrice(Global.Functions.numToEuro(dto));

            var tarifaUnit = dto / article.UnidadesCaja;
            controlPrice.setUnitPrice(Global.Functions.numToEuro(tarifaUnit, 3));
        };
    };

    /**
     * Contiene los tipos de controles que hay que añadir y sus datos.
     * @private
     * @type Object
     */
    var controls = [promo.createControl({
        title : "Unidades de Venta",
        value : article.Venta > 0 ? article.Venta.toString() : '1',
        typeValue : Constants.INTEGER,
        minim : 1,
        enabled : true
    }), promo.createControl({
        title : "Unidades de Regalo",
        value : article.Regalo.toString(),
        typeValue : Constants.INTEGER,
        enabled : isBudget || Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getModifRegalo())
    }), promo.createControl({
        title : "Nuevo Precio",
        value : article.Precio.toString().replace(".", ","),
        typeValue : Constants.FLOAT,
        enabled : isBudget || Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getModifPrecio())
    }), promo.createControl({
        title : "Descuento fijo",
        value : article.DtoFijo.toString().replace(".", ","),
        typeValue : Constants.FLOAT,
        enabled : isBudget || Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getModifDto1())
    }), promo.createControl({
        title : "Descuento especial €",
        value : article.DtoEspecial.toString().replace(".", ","),
        typeValue : Constants.FLOAT,
        enabled : isBudget || Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getModifDto2())
    }), promo.createControl({
        title : "Descuento especial %",
        value : article.DtoEspecial.toString(),
        typeValue : Constants.INTEGER,
        enabled : isBudget || Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getModifDto2())
    })];

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

    //Si es un presupuesto quitamos los botones que puedan haber en el pie.
    if (isBudget) {
        // _.each(win._children, function(element, index) {
            // if ( element instanceof Ti.UI.Button) {
                // win.remove(element);
            // };
        // });
//         
        for(var i=0,j=win._children.length; i<j; i++){
          var element = win._children[i];
          if ( element instanceof Ti.UI.Button) {
                win.remove(element);
                j -= 1;
                i -= 1;
            };
        };

        line_h.parent.setBottom(0);
    } else {
        var butAcept = Global.Functions.recursiveObject("title", "Aceptar", win);
        var butDel = Global.Functions.recursiveObject("title", "Eliminar", win);

        var lines = ["50%"];
        /**
         * El botón para mostrar el presupuesto.
         * @private
         * @type Ti.UI.Button
         */
        var butBudget = Ti.UI.createButton({
            backgroundColor : Global.Theme.BUTTON.BACKGROUND,
            backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
            color : Global.Theme.BUTTON.TITLE,
            title : 'Presupuesto',
            width : '50%',
            height : 60,
            right : 0,
            image : '/images/calculator_32.png',
            bottom : 0
        });

        //El vento 'click' del botón
        butBudget.addEventListener('click', function() {
            var winBudget = new SaleWin(article, ivaCliente, true);
            winBudget.open();
        });

        //Modificamos el tamaño de los botones según convenga.
        if (butDel != undefined) {
            butAcept.setWidth("33%");
            butDel.setWidth("33%");
            butDel.setLeft("33%");
            butBudget.setWidth("34%");
            lines = ["33%", "33%"];
            //Quitamos la línea divisoria.
            //var line = Global.Functions.recursiveObject("width", "0.5", win);
            win.remove(win._children[4]);
        } else {
            butAcept.setWidth("50%");
        };

        butAcept.setLeft(0);

        win.add(butBudget);
        
        //Añadimos las líneas divisorias
        for (var i = 0, j = lines.length; i < j; i++) {
            win.add(Ti.UI.createView({
                backgroundColor : Global.Theme.BACKGROUND,
                width : 0.5,
                height : 60,
                bottom : 0,
                zIndex : 1,
                center : {
                    x : lines[i]
                }
            }));
        };
    };

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

    //Ponemos los controles en el cuerpo.
    for (var i = 0, j = controls.length; i < j; i++) {
        if (i < 5)
            controls[i].addEventListener(Constants.TEXT, 'change', checkOffer);
        viewControl.add(controls[i].getControl());
    };

    //El el evento "change" del "Descuento especial %" calculamos el "Descuento especial €".
    controls[5].addEventListener(Constants.TEXT, 'change', function(e) {
        controls[4].setValue((Math.round((controls[5].getValue().replace(",", ".") * article.Tarifa)) / 100).toString().replace(".", ","));
    });

    if (!isBudget) {
        //Añade un evento cuando se ha aceptado la operación.
        promo.addEventAcceptListener(function() {
            article.Venta = controls[0].getValue();
            article.Regalo = controls[1].getValue().replace(",", ".");
            article.Precio = controls[2].getValue().replace(",", ".");
            article.DtoFijo = controls[3].getValue().replace(",", ".");
            article.DtoEspecial = controls[4].getValue().replace(",", ".");
            article.typeOffer = Global.Order.NO_OFFER;
            article.CodigoPromocion = '0';
            article.CodigoAgrupacion = '0';
            article._del = true;
        });

    };

    return win;
}

module.exports = SaleWin;
