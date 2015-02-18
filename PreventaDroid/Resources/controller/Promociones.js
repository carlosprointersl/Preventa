/**
 * @fileOverview En este archivo se crea el controlador "Promociones".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * La libreria Underscore.-
 */
var _ = require("/lib/underscore");

/**
 * Crea un controlador de nombre "Promociones".
 * @class Es la clase que define al controlador "Promociones". Interactua con el modelo "Promociones".
 * @memberOf Global.Controller
 * @param {Object} client El cliente al que se le hacen las promociones.
 * @param {Object} article El artículo al que se le aplican las promociones.
 */
var Promociones = function(client, article) {
    /**
     * El objeto actual "this".
     * @private
     * @type Object
     */
    var self = this;

    /**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    var model = new Global.Model.Promociones();

    /**
     * El controlador de los artículos.
     * @private
     * @type Controller
     */
    var articulos = new Global.Controller.Articulos();

    /**
     * El controlador de las tarifas.
     * @private
     * @type Controller
     */
    var rates = new Global.Controller.Tarifas(client.Tarifa);

    /**
     * Las ofertas que tiene el cliente para este artículo.
     * @private
     * @type Object
     */
    var clientOffers;
    // = model.select("WHERE CodigoArticulo = '" + article.CodigoArticulo + "' AND CodigoCliente = '" + client.CodigoCliente + "'");

    /**
     * Las ofertas que tiene el artículo sin AGRUPACIÓN.
     * @private
     * @type Object
     */
    var articleOffers;
    // = model.select("WHERE CodigoArticulo = '" + article.CodigoArticulo + "' AND CodigoCliente = '0' AND CodigoAgrupacion = '0'");

    /**
     * Las ofertas que tiene el artículo con AGRUPACIÓN.
     * @private
     * @type Object
     */
    var groupOffers;
    // = model.select("WHERE CodigoArticulo = '" + article.CodigoArticulo + "' AND CodigoCliente = '0' AND CodigoAgrupacion != '0'");

    /**
     * Nos indica si el artículo está vetado para este cliente.
     * @private
     * @type Boolean
     */
    var isVetoed = false;

    /**
     * La cadena para filtrar por fecha.
     * @type String
     */
    var whereDate = " AND (Desde <= '" + Global.Functions.dateSQliteFormat(new Date()) + "' OR Desde IS NULL) AND (Hasta >= '" + Global.Functions.dateSQliteFormat(new Date()) + "' OR Hasta IS NULL)";

    /**
     * La cadena para filtrar por tipo de establecimiento.
     * @type String
     */
    var whereEstablecimiento = " AND (TipoEstablecimiento = 0 OR TipoEstablecimiento = " + client.TipoEstablecimiento + ")";

    /**
     * Indica si hay ofertas para este artículo.
     * @return {Boolean} Retorna TRUE en caso de que el artículo tenga 1 o mas ofertas.
     */
    function hasOffers() {
        var vetados = new Global.Controller.Vetados();
        isVetoed = vetados.isVetoed(article.CodigoArticulo, client.CodigoCliente);

        //Si el cliente NO TIENE vetado este artículo buscamos las posibles ofertas.
        if (!isVetoed) {
            clientOffers = getClientOffers();
            articleOffers = getArticleOffers();
            groupOffers = getGroupOffers();
            filterGroupOffers();
            // Ti.API.warn("LONGITUD ARRAYS ---- " + clientOffers.length + " ---- " + articleOffers.length + " ---- " + groupOffers.length);
            return clientOffers.length > 0 || articleOffers.length > 0 || groupOffers.length > 0;
        };
        return false;
    };

    /**
     * Retorna las ofertas para un cliente.
     * @return {Object[]} Las ofertas para un cliente.
     */
    function getClientOffers() {
        return clientOffers = model.select("WHERE CodigoArticulo = '" + article.CodigoArticulo + "' AND CodigoCliente = '" + client.CodigoCliente + "'" + whereDate);
    };

    /**
     * Retorna las ofertas de un artículo para todos los clientes.
     * @return {Object[]} Las ofertas para un cliente.
     */
    function getArticleOffers() {
        return article.AutorizacionDtos === 0 ? model.select("WHERE CodigoArticulo = '" + article.CodigoArticulo + "' AND CodigoCliente = '0' AND (CodigoAgrupacion = '0' OR CodigoAgrupacion IS NULL)" + whereEstablecimiento + whereDate) : new Array();
    };

    /**
     * Retorna las ofertas con grupo de agrupación.
     * @param {Boolean} [allOffers] Indica si se deben obtener todas las ofertas. En caso afirmativo no se tendrá en cuenta el Código del artículo.
     * @return {Object[]} Las ofertas para un cliente.
     */
    function getGroupOffers(allOffers) {
        var where = "WHERE 1";
        where += allOffers ? "" : " AND CodigoArticulo = '" + article.CodigoArticulo + "'";
        where += " AND CodigoCliente = '0' AND (CodigoAgrupacion > '0')" + whereEstablecimiento + whereDate;
        where += allOffers ? " GROUP BY CodigoAgrupacion" : "";

        return (article.AutorizacionDtos != undefined ? article.AutorizacionDtos === 0 : true) ? model.select(where) : new Array();
    };

    /**
     * Filtra las ofertas que tiene el artículo para dejar las que son válidas. Para que una oferta sea válida deben de aparecer al menos un artículo.
     * Los artículos de la oferta que no están autorizados o los que no existen no pueden formar parte de la oferta.
     */
    function filterGroupOffers() {
        var codesGroup = [];
        var articlesGroup;
        //Recuperamos los artículos válidos de cada oferta. Si no tiene artículos lo anotamos para quitarla posteriormente.
        _.each(groupOffers, function(element, index) {
            //var articlesGroup = model.select("WHERE CodigoAgrupacion = " + element.CodigoAgrupacion);
            articlesGroup = getValidArticles(element.CodigoAgrupacion);
            if (articlesGroup.length == 0)
                codesGroup.push(element.CodigoAgrupacion);

        });

        //Quitamos las ofertas que no tienen ningún artículo.
        if (codesGroup.length > 0) {
            codesGroup = _.uniq(codesGroup);
            //Filtramos las ofertas sólo dejando las que no están guardadas en "codesGroup".
            groupOffers = _.filter(groupOffers, function(element) {
                return _.indexOf(codesGroup, element.CodigoAgrupacion) == -1;
            });
        };
    };

    /**
     * Crea el listado de ofertas disponibles para este artículo.
     * @private
     * @return {Ti.UI.Window} El objeto "Window" que formará el listado.
     */
    function createMainWin() {
        var win = Ti.UI.createWindow({
            // title : 'Promociones',
            backgroundColor : Global.Theme.BACKGROUND,
            url : Global.Path.VIEW + 'Promociones/MainWin.js',
            navBarHidden : true,
            Global : Global,
            article : article,
            offers : [clientOffers, articleOffers, groupOffers],
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });


        //El evento "offer:save" del listado de promociones.
        win.addEventListener('offer:save', function(e) {
            //Si NO TIENE ninguna oferta ...
          if (e.row == undefined) {
                var noOffer = createNoOfferWin();
                //El evento "save" que retorna el artículo con sus cantidades.
                noOffer.addEventListener('save', function(o) {
                    win.fireEvent('save', {
                        article : o.article
                    });
                });

                //win.close();
                noOffer.open();
            } else {
                switch(e.row.offer.Tipo) {
                case null:
                case "":
                case "A":
                    switch(typeOffer(e.row.offer)) {
                    case Global.Order.DISCOUNT:
                        var discount = createDiscountWin(e.row.offer);
                        var R = e.row.offer;
                        //El evento "save" que retorna el artículo con sus cantidades.
                        discount.addEventListener('save', function(o) {
                            win.fireEvent('save', {
                                article : o.article
                            });
                        });

                        //win.close();
                        discount.open();
                        break;
                    case Global.Order.FIXED_PRICE:
                        var fixedPrice = createFixedPriceWin(e.row.offer);
                        //El evento "save" que retorna el artículo con sus cantidades.
                        fixedPrice.addEventListener('save', function(o) {
                            win.fireEvent('save', {
                                article : o.article
                            });
                        });

                        //win.close();
                        fixedPrice.open();
                        break;
                    case Global.Order.GIFT_SALE:
                        var giftSale = createGiftSaleWin(e.row.offer);
                        //El evento "save" que retorna el artículo con sus cantidades.
                        giftSale.addEventListener('save', function(o) {
                            win.fireEvent('save', {
                                article : o.article
                            });
                        });

                        //win.close();
                        giftSale.open();
                        break;
                        
                    case Global.Order.NO_OFFER:
                        var giftNoOffer = createGiftNoOfferWin(article);
                        //El evento "save" que retorna el artículo con sus cantidades.
                        giftNoOffer.addEventListener('save', function(o) {
                            win.fireEvent('save', {
                                article : o.article
                            });
                        });

                        //win.close();
                        giftNoOffer.open();
                        break;
                    };
                    break;
                case "B":
                    switch(typeOffer(e.row.offer)) {
                    
                    case Global.Order.DISCOUNT:
                        var discount = createDiscountWin(e.row.offer);
                        var R = e.row.offer;
                        //El evento "save" que retorna el artículo con sus cantidades.
                        discount.addEventListener('save', function(o) {
                            win.fireEvent('save', {
                                article : o.article
                            });
                        });

                        //win.close();
                        discount.open();
                        break;
                    
                    case Global.Order.GROUP_DISCOUNT:
                        var discountGroup = createDiscountGroupWin(e.row.offer);
                        //El evento "save" que retorna el artículo con sus cantidades.
                        discountGroup.addEventListener('save', function(o) {
                            win.fireEvent('save', {
                                article : o.article
                            });
                        });

                        //win.close();
                        discountGroup.open();
                        break;
                    case Global.Order.FIXED_PRICE:

                        break;
                    case Global.Order.GIFT_SALE:
                    var giftSale = createGiftSaleWin(e.row.offer);
                        //El evento "save" que retorna el artículo con sus cantidades.
                        giftSale.addEventListener('save', function(o) {
                            win.fireEvent('save', {
                                article : o.article
                            });
                        });

                        //win.close();
                        giftSale.open();
                        break;
                                           
                    case Global.Order.GIFT_SALE_GROUP:
                        var giftSaleGroup = createGiftSaleGroupWin(e.row.offer);
                        //El evento "save" que retorna el artículo con sus cantidades.
                        giftSaleGroup.addEventListener('save', function(o) {
                            win.fireEvent('save', {
                                article : o.article
                            });
                        });

                        //win.close();
                        giftSaleGroup.open();
                        break;
                        
                       case Global.Order.NO_OFFER:
                        var giftNoOffer = createGiftNoOfferWin(article);
                        //El evento "save" que retorna el artículo con sus cantidades.
                        giftNoOffer.addEventListener('save', function(o) {
                            win.fireEvent('save', {
                                article : o.article
                            });
                        });

                        //win.close();
                        giftNoOffer.open();
                        break; 
                    };
                    break;
                case "C":
     
     
                var toast = Ti.UI.createNotification({
                    message: "Offer: " + typeOffer(e.row.offer) + " Constant: " + Global.Order.GIFT_SALE_GROUP,
                    duration : Ti.UI.NOTIFICATION_DURATION_SHORT
                });
                
                toast.show();
                
     
                  switch(typeOffer(e.row.offer)) {
                        
                        
                    case Global.Order.DISCOUNT:
                        var discountGroup = createDiscountUnitGroupWin(e.row.offer);
                        //El evento "save" que retorna el artículo con sus cantidades.
                        discountGroup.addEventListener('save', function(o) {
                            win.fireEvent('save', {
                                article : o.article
                            });
                        });

                        //win.close();
                        discountGroup.open();
                        break;
                        
                   case Global.Order.NO_OFFER:
                        var giftNoOffer = createGiftNoOfferWin(article);
                        //El evento "save" que retorna el artículo con sus cantidades.
                        giftNoOffer.addEventListener('save', function(o) {
                            win.fireEvent('save', {
                                article : o.article
                            });
                        });

                        //win.close();
                        giftNoOffer.open();
                        break; 
                    };
                    break;
                case "D":
                    var giftSaleGroup2 = createGiftSaleGroupWin2(e.row.offer);
                    //El evento "save" que retorna el artículo con sus cantidades.
                    giftSaleGroup2.addEventListener('save', function(o) {
                        win.fireEvent('save', {
                            article : o.article
                        });
                    });

                    win.close();
                    giftSaleGroup2.open();

                    break;

                };

            };
        });

        return win;
    };

    /**
     * Crea la ventana para introducir la cantidad. Esta no tiene promoción.
     * @private
     * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
     */
    function createNoOfferWin() {
        if (isVetoed || (article.AutorizacionDtos === 1 && clientOffers.length === 0))
            var noOfferWin = require(Global.Path.VIEW + 'Promociones/SaleWin')(article, client.CodigoIVA);
        else
            var noOfferWin = require(Global.Path.VIEW + 'Promociones/SaleEditWin')(article, client.CodigoIVA);

        noOfferWin.addWinOffer(createNoOfferWin);

        return noOfferWin;

    };

    function createGiftNoOfferWin() {
        return (require(Global.Path.VIEW + 'Promociones/SaleWin'))(article);
    };


    /**
     * Crea la ventana para introducir la cantidad + regalo.
     * @private
     * @param {Object} offer La promoción con sus propiedades para aplicarle el filtro.
     * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
     */
    function createGiftSaleWin(offer) {
        return (require(Global.Path.VIEW + 'Promociones/GiftSaleWin'))(offer, article);
    };

    /**
     * Crea la ventana para introducir el precio fijo. Substituye al precio original con un mínimo aceptable.
     * @private
     * @param {Object} offer La promoción con sus propiedades para aplicarle el filtro.
     * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
     */
    function createFixedPriceWin(offer) {
        return (require(Global.Path.VIEW + 'Promociones/FixedPriceWin'))(offer, article);
    };

    /**
     * Crea la ventana para introducir el descuento unitario. Puede ser en "€" o en "%".
     * @private
     * @param {Object} offer La promoción con sus propiedades para aplicarle el filtro.
     * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
     */
    function createDiscountWin(offer) {
        return (require(Global.Path.VIEW + 'Promociones/DiscountWin'))(offer, article, client.CodigoIVA);
    };

    /**
     * Crea la ventana para introducir el descuento unitario. Puede ser en "€" o en "%".
     * @private
     * @param {Object} offer La promoción con sus propiedades para aplicarle el filtro.
     * @param {Object[]} [articles] Los artículos que forman la promoción.
     * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
     */
    function createDiscountGroupWin(offer, articles) {
        return (require(Global.Path.VIEW + 'Promociones/DiscountGroupWin'))(offer, articles, model, articulos, rates, article.NumPedido, getValidArticles(offer.CodigoAgrupacion));
    };

    /**
     * Crea la ventana para introducir el descuento Venta + Regalo.
     * @private
     * @param {Object} offer La promoción con sus propiedades para aplicarle el filtro.
     * @param {Object[]} [articles] Los artículos que formar la promoción.
     * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
     */
    function createGiftSaleGroupWin(offer, articles) {
        //return (require(Global.Path.VIEW + 'Promociones/GiftSaleGroupWin'))(offer, articles, model, articulos, rates, article.NumPedido, getGifts(offer), getValidArticles(offer.CodigoAgrupacion));
        var validArticles = getValidArticles(offer.CodigoAgrupacion);
        if (validArticles.length > 0) {
            return (require(Global.Path.VIEW + 'Promociones/GiftSaleGroupWin'))(offer, articles, articulos, rates, article.NumPedido, getGifts(offer), validArticles, client.CodigoIVA);
        } else {
            var alert = new Global.Control.Windows.Alert({
                message : "Esta oferta no tiene productos válidos.",
                icon : Global.Control.Windows.ICON.INFORMATION,
                title : 'OFERTA SIN ARTÍCULOS'
            });

            return alert;
        }
    };

    /**
     * Crea la ventana para introducir el descuento unitario por artículo de una agrupación. Puede ser en "€" o en "%".
     * @private
     * @param {Object[]} [articles] Los artículos que formar la promoción.
     * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
     */
    function createDiscountUnitGroupWin(offer, articles) {
        return (require(Global.Path.VIEW + 'Promociones/DiscountUnitGroupWin'))(offer, articles, model, articulos, rates, article.NumPedido, getValidArticles(offer.CodigoAgrupacion));
    };

    /**
     * Crea la ventana para introducir el descuento Venta + Regalo. Donde el regalo se divide en dos grupos.
     * @param {Object} offer La promoción con sus propiedades para aplicarle el filtro.
     * @param {Object[]} [articles] Los artículos que formar la promoción.
     * @return {Ti.UI.Window} El objeto "Window" para introducir la cantidad de venta.
     */
    function createGiftSaleGroupWin2(offer, articles) {
        return (require(Global.Path.VIEW + 'Promociones/GiftSaleGroupWin2'))(offer, articles, articulos, rates, article.NumPedido, getGifts2(offer), getValidArticles(offer.CodigoAgrupacion, "AND p.CodigoArticulo > 0"));
    };

    /**
     * Indica que tipo de promoción es.
     * @private
     * @param {Object} offer La oferta.
     * @return {Integer} Este valor representa a un constante de Global.Order.*.
     */
    function typeOffer(offer) {
        //Si tiene "Regalo" es del tipo V+R
        if (offer.Regalo > 0) {
            //Si "CodigoAgrupacion != 0" pertenece a una.
            if (offer.CodigoAgrupacion != 0 && offer.CodigoAgrupacion != null) {
                return Global.Order.GIFT_SALE_GROUP;
            } else {
                return Global.Order.GIFT_SALE;
            };
        };
        //Si tiene "PrecioEspecial" es del tipo "PrecioFijo"
        if (offer.PrecioEspecial > 0) {
            return Global.Order.FIXED_PRICE;
        };
        //Si tiene "DtoUnitario" o "DtoPorcenUnit" es del tipo Descuento.
        if (offer.DtoUnitario > 0 || offer.DtoPorcenUnit > 0) {
            if (offer.CodigoAgrupacion != 0 && offer.CodigoAgrupacion != null) {
                return Global.Order.DISCOUNT_GROUP;
            } else {
                return Global.Order.DISCOUNT;
            };
        };
        //Si no tiene ninguna.
        return Global.Order.NO_OFFER;
    };

    /**
     * Busca todos los artículos de obsequio que puede tener una agrupación.
     * @param {Object} offer Los datos de la promoción.
     * @return {String[]} Un Array con los códigos de los artículos de obsequio de la agrupación.
     */
    function getGifts(offer) {
        //Los artículos de obsequio
        var gifts = new Array();

        //Añadimos los artículos de obsequio base.
        for (var i = 1; i <= 5; i++) {
            if (offer["ArticuloObsequio" + i] != 0 && !_.contains(gifts, offer["ArticuloObsequio" + i]))
                gifts.push(offer["ArticuloObsequio" + i]);
        };

        //Si tiene mas líneas las buscamos y añadimos
        if (offer.NuevaPlantilla == 1) {
            //Las líneas con los artículos de obsequio añadidos.
            var articlesAdd = model.select("WHERE CodigoAgrupacion = " + offer.CodigoAgrupacion + " AND CodigoArticulo = 0");

            //Añadimos los artículos de obsequio añadidos.
            _.each(articlesAdd, function(element) {
                for (var i = 1; i <= 5; i++) {
                    if (element["ArticuloObsequio" + i] != 0 && !_.contains(gifts, element["ArticuloObsequio" + i]))
                        gifts.push(element["ArticuloObsequio" + i]);
                };
            });
        };

        return gifts;
    };

    /**
     * Busca todos los artículos de obsequio que puede tener una agrupación del tipo "D".
     * @param {Object} offer Los datos de la promoción.
     * @return {Object} El objeto resultante tiene dos propiedades.</br>
     * <ol>
     * <li>first {String[]} : Los artículos de obsequio del primer grupo.</li>
     * <li>second {String[]} : Los artículos de obsequio del segundo grupo.</li>
     * </ol>
     */
    function getGifts2(offer) {
        //Los artículos de obsequio
        var gifts = {
            first : new Array(),
            second : new Array()
        };

        //Añadimos los artículos de obsequio base.
        for (var i = 1; i <= 5; i++) {
            if (offer["ArticuloObsequio" + i] != 0 && !_.contains(gifts.first, offer["ArticuloObsequio" + i]))
                gifts.first.push(offer["ArticuloObsequio" + i]);
        };

        //Las líneas con los artículos de obsequio añadidos.
        var articlesAdd = model.select("WHERE CodigoAgrupacion = " + offer.CodigoAgrupacion + " AND CodigoArticulo = 0");

        //Añadimos los artículos de obsequio añadidos.
        _.each(articlesAdd, function(element) {
            for (var i = 1; i <= 5; i++) {
                if (element["ArticuloObsequio" + i] != 0 && !_.contains(gifts.second, element["ArticuloObsequio" + i]))
                    gifts.second.push(element["ArticuloObsequio" + i]);
            };
        });

        return gifts;
    };

    /**
     * Busca los artículos que pertenecen a una agrupación y que deben existir en la tabla ARTÍCULOS y estar autorizados para ofertas (AutorizacionDtos == 0).
     * @param {Integer} codAgrupacion El código de la agrupación.
     * @param {String} [where] Se añade alguna condición más a la claúsula Where de la consulta.
     * @return {}
     */
    function getValidArticles(codAgrupacion, where) {
        var dtoOfertas = Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getDtosOfertas());

        var query = " p INNER JOIN Articulos a ON a.CodigoArticulo = p.CodigoArticulo WHERE p.CodigoAgrupacion = " + codAgrupacion + " AND a.AutorizacionDtos = 0 ";
        query += !dtoOfertas ? "AND (SELECT COUNT(pr.CodigoPromocion) FROM Promociones pr WHERE pr.CodigoArticulo = p.CodigoArticulo AND pr.CodigoCliente = " + client.CodigoCliente + ") = 0 " : "";
        query += "AND (p.Desde <= '" + Global.Functions.dateSQliteFormat(new Date()) + "' OR p.Desde IS NULL) AND (p.Hasta >= '" + Global.Functions.dateSQliteFormat(new Date()) + "' OR p.Hasta IS NULL) ";
        query += "AND (TipoEstablecimiento = 0 OR TipoEstablecimiento = " + client.TipoEstablecimiento + ") ";
        query += where != undefined ? where : "";

        Ti.API.warn("GETVALIDARTICLES QUERY: " + query);

        return model.selectFields("p.*", query);
    }

    /**
     * Abre el listado de ofertas para seleccionar una en caso de que tenga. Sino abrirá la ventana de cantidad.
     * @return {Ti.UI.Window} La ventana que se abrirá para la promoción.
     */
    this.getWin = function() {
        if (hasOffers()) {
            return createMainWin;
        } else {
            return createNoOfferWin;
        };
    };

    /**
     * Retorna la ventana que le corresponde para la oferta determinada.
     * @param {Integer} idOffer El código de la promoción.
     * @param {Object[]} articles Los artículos que forman una agrupación.
     * @return {Ti.UI.Window} La ventana que se abrirá para la promoción.
     */
    this.getWinId = function(idOffer, articles) {
        var offer = model.select("WHERE CodigoPromocion = '" + idOffer + "'")[0];
        //Seleccionamos la ventana emergente según la oferta
        switch(offer.Tipo) {
        case "A":
            switch(typeOffer(offer)) {
            case Global.Order.DISCOUNT:
                return function() {
                    return createDiscountWin(offer);
                };
                break;
            case Global.Order.FIXED_PRICE:
                return function() {
                    return createFixedPriceWin(offer);
                };
                break;
            case Global.Order.GIFT_SALE:
                return function() {
                    return createGiftSaleWin(offer);
                };
                break;
            };
            break;
        case "B":
            switch(typeOffer(offer)) {
            case Global.Order.DISCOUNT:
                return function() {
                    return createDiscountGroupWin(offer, articles);
                };
                break;
            case Global.Order.FIXED_PRICE:

                break;
            case Global.Order.GIFT_SALE_GROUP:
                return function() {
                    return createGiftSaleGroupWin(offer, articles);
                };
                break;
            };
            break;
        case "C":
            switch(typeOffer(offer)) {
            case Global.Order.DISCOUNT:
                return function() {
                    return createDiscountUnitGroupWin(offer, articles);
                };
                break;
            };
            break;
        case "D":
            return function() {
                return createGiftSaleGroupWin2(offer, articles);
            };
            break;

        };
    };

    /**
     * Retorna la promoción según el "id" de esta.
     * @param {Integer} idOffer El código de la promoción.
     * @return {Object} La promoción o null si el código no existe.
     */
    this.getOffer = function(idOffer) {
        var offer = model.select("WHERE CodigoPromocion = '" + idOffer + "'");
        return offer.length > 0 ? offer[0] : null;
    };

    /**
     * Retorna el tipo de promoción según el "id" de esta.
     * @return {Integer} El código que hace referencia al tipo de promoción que coincide que el valor de una constante
     * del tipo "Global.Order.xxx".
     */
    this.getTypeOffer = function(idOffer) {
        var offer = self.getOffer(idOffer);
        return offer == null ? Global.Order.NO_OFFER : typeOffer(offer);
    };

    /**
     * Retorna la vista para seleccionar una oferta del listado de todas las ofertas disponibles para el cliente actual.
     * @return {Ti.UI.Window} La ventana para seleccionar una oferta.
     */
    this.getWinOffers = function() {
        var createOfferWin = require(Global.Path.VIEW + 'Pedido/SelectOffer');
        var winOffer = new createOfferWin(getGroupOffers(true));

        return winOffer;
    };
};

module.exports = Promociones;
