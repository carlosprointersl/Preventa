/**
 * @fileOverview En este archivo se crea el controlador "Pedido". Este controlador se encarga de crear/editar pedidos.
 * Cuando un pedido es nuevo carga la tabla "Prepedido" del cliente. Y al terminar crea uno nuevo.
 * En caso de que sea un pedido anterior carga las líneas de pedido de este. Y al terminar actualiza los datos.
 * Trabaja con la base de datos "pedxxx" en sus dos tablas, "CabeceraPedido" y "DetallePedido".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Pedido".
 * @class Es la clase que define al controlador "Pedido". Interactua con los modelos "CabeceraPedido" y "DetallePedido".
 * @memberOf Global.Controller
 * @param {String} action La acción que debe realizar el controlador. Hay dos posibles: "new" o "previous".
 * @param {Object} client Los datos del cliente del que queremos realizar un pedido.
 * @param {Object} buttonState Contiene las funciones para activar o bloquear los botones "Anteriores" e "Incidencia" del mneú del cliente.
 */
var Pedido = function(client, action, buttonState) {
    /**
     * El modelo CabeceraPedido.
     * @private
     * @type Model
     */
    var modelHeader = new Global.Model.CabeceraPedido();

    /**
     * El modelo DetallePedido.
     * @private
     * @type Model
     */
    var modelDetail = new Global.Model.DetallePedido();

    /**
     * Datos del registro para la cabecera. Simula un Array asociativo.
     * @private
     * @type Object
     */
    var rowHeader = modelHeader.getData();

    /**
     * Las líneas de pedido a mostrar por defecto.
     * @private
     * @type Array
     */
    var dataLines = [];

    /**
     * Indica si el pedido es nuevo
     * @private
     * @type Boolean
     */
    var isNew = true;

    /**
     * El número de pedido actual
     * @private
     * @type {String}
     */
    // var numOrder = Global.Parameters.Configuracion.getNumPedido();

    /**
     * Selecciona el número de pedido correspondiente teniendo en cuenta si es Preventista o Autoventa.
     */

    /**
     * Esta función se encarga de abrir la ventana principal del pedido. Pero antes muestra el mensaje de "Cargando..." para que
     * no parezca que la aplicación está bloqueada.
     * @private
     */
    function openMain() {
        //La ventana Loading.
        var winLoading = require(Global.Path.CONTROL + 'WinLoading')();
        //La abrimos
        winLoading.open();
        //El evento "postlayout" de la ventana Loading.
        winLoading.addEventListener('postlayout', function() {
            //Vigilamos que solo lo haga una vez
            if (!winLoading._one) {
                winLoading._one = true;
                //Cargamos el prepedido
                //Ti.API.warn("Load PreOrder: " + new Date());
                loadPreorder();
                //Ti.API.warn("Loaded PreOrder: " + new Date());
                //La ventana principal.
                var mainWin = createMainWin();
                //Al crear la ventana principal cerramos la Loading.
                mainWin.addEventListener('postlayout', function() {
                    winLoading.close();
                });

                mainWin.open();
            };
        });
    };

    /**
     * Muestra la pantalla para realizar un pedido. Si el control de tarifas está activa se ha de seleccionar
     * una tarifa. En caso de que no se seleccione ninguna no contniua.
     * @private
     */
    function index() {
        //Le ponemos a la cabecera la tarifa que tiene asignada el cliente.
        rowHeader.Tarifa = client.Tarifa;
        //Si está activa la selección de tarifas mostramos dicha selección.
        if (Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getControlTarifas())) {
            var selectRate = Ti.UI.createOptionDialog({
                options : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                title : "Selección de tarifa",
            });

            //Al seleccionar una tarifa
            selectRate.addEventListener('click', function(e) {
                if (e.index > -1) {
                    rowHeader.Tarifa = e.index;
                    client.Tarifa = e.index;
                    openMain();
                };
            });

            selectRate.show();
        } else {
            openMain();
        };
    };

    /**
     * Muestra un listado de pedidos anteriores.
     */
    function selectOrder() {
        var orders = loadOrders();
        if (orders.length > 0) {
            createSelectOrderWin(orders).open();
        };
    };

    /**
     * Crea un nuevo pedido con sus líneas.
     * @private
     */
    function create() {
        //Insertamos la cabecera de pedido
        rowHeader.send = 0;
        modelHeader.setData(rowHeader);
        modelHeader.insert();

        //Insertamos las líneas
        for (var i = 0; i < dataLines.length; i++) {
            dataLines[i].Total = dataLines[i].Venta * (dataLines[i].Precio - dataLines[i].DtoFijo);
            dataLines[i].send = 0;
            modelDetail.setData(dataLines[i]);
            modelDetail.insert();
        };

        //Sumamos uno al Numero de pedido que corresponda según sea "Preventa" o "Autoventa".
        if (Global.Parameters.Configuracion.getModoApp() === "P") {
            Global.Parameters.Configuracion.setNumPedido((parseInt(rowHeader.NumPedido) + 1).toString());
        } else {
            var serie = new Global.Controller.Serie();
            var row = serie.getSerieId(rowHeader.Serie);
            row.numFactura += 1;
            serie.saveSerie(row);
        };

        buttonState.anteriores(Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getModifPedido()) && true);
        buttonState.incidencia(false);

    };

    /**
     * Actualiza un pedido y sus líneas.
     * @private
     */
    function update() {
        //Actualizamos la cabecera
        modelHeader.setData(rowHeader);
        modelHeader.update();

        //Eliminamos las líneas anteriores.
        modelDetail.delWhere("WHERE NumPedido = '" + rowHeader.NumPedido + "' AND Serie = '" + rowHeader.Serie + "'");

        //Insertamos las líneas del pedido.
        for (var i = 0; i < dataLines.length; i++) {
            dataLines[i].Total = dataLines[i].Venta * (dataLines[i].Precio - dataLines[i].DtoFijo);
            dataLines[i].send = 0;
            modelDetail.setData(dataLines[i]);
            modelDetail.insert();
           };
    };

    /**
     * Elemina un pedido y sus líneas.
     * @private
     */
    function destroy() {
        modelDetail.delWhere("WHERE NumPedido = '" + rowHeader.NumPedido + "' AND Serie = '" + rowHeader.Serie + "'");

        modelHeader.setData(rowHeader);
        modelHeader.del();
        if (loadOrders().length < 1) {
            Ti.App.fireEvent('orders:isNothing');
            buttonState.anteriores(false);
            buttonState.incidencia(true);
        };
    };

    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @private
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createMainWin() {
        //La tabla que activa algunos eventos.
        var table;
        //El evento que hemos de llamar de la tabla.
        var tableEvent;
        //La venta principal
        var win = Ti.UI.createWindow({
            // title : client.NombreComercial,
            backgroundColor : Global.Theme.BACKGROUND, //'#FFFFFF',
            url : Global.Path.VIEW + 'Pedido/MainWin.js',
            Global : Global,
            navBarHidden : true,
            client : client,
            //numOrder : numOrder,
            dataLines : dataLines,
            rowHeader : rowHeader,
            serie : new Global.Controller.Serie(),
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        //Guardar el pedido
        win.addEventListener('save', function(e) {
            rowHeader = e.rowHeader;
            dataLines = e.detail;
            if (isNew) {
                create();
                //Llamamos al evento "isOrder" para marcar al cliente como que tiene un pedido.
                Ti.App.fireEvent('orders:isOrder');
            } else {
                update();
            };
        });

        //Añadir un elemento al pedido
        win.addEventListener('butAdd', function() {
            winSelectItem(win);
        });

        //Mostrar/Editar las notas del pedido (Preventa - Albaran)
        win.addEventListener('butNotes', function(e) {
            winNotes();
        });

        return win;
    };

    /**
     * Crea la vista de selección de artículo. Es invocado cuando queremos añadir un artículo al pedido.
     * Le retorna a la ventana o vista que le ha llamado el artículo seleccionado.
     * @private
     * @param {Window/View} view La ventana o vista que ha creado esta nueva ventana.
     */
    function winNotes(view) {
        //Ventana edición notas del pedido.
        var winNotes = Ti.UI.createWindow({
            title : 'Notas del pedido',
            backgroundColor : Global.Theme.HEADER,
            navBarHidden : true,
            url : Global.Path.VIEW + 'Pedido/NotesWin.js',
            Global : Global,
            rowHeader : rowHeader,
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        winNotes.open();
    };

    /**
     * Crea la vista de selección de artículo. Es invocado cuando queremos añadir un artículo al pedido.
     * @param {Ti.UI.Window} win La ventana "padre" donde se debe/n retornar el/los artículo/s.
     * @return {Ti.UI.Window} La ventana para la selección de un artículo.
     */
    function winSelectItem(win) {
        //La ventana Loading.
        var winLoading = require(Global.Path.CONTROL + 'WinLoading')();
        winLoading.open();

        winLoading.addEventListener('postlayout', function() {
            //Vigilamos que solo lo haga una vez
            if (!winLoading._one) {
                winLoading._one = true;

                //Modelo de Articulos
                var article = new Global.Model.Articulos();
                //Modelo de tarifas
                var rates = new Global.Controller.Tarifas(rowHeader.Tarifa);
                //Los artículos actuales
                var dataArticles = new Array();
                //La fila.
                var row = require(Global.Path.VIEW + 'Pedido/ArticleRow');

                //Ventana de selección de familias
                var createWindow = require(Global.Path.VIEW + 'Pedido/SelectFamily');
                var winFamily = new createWindow();

                //Hemos de añadirle el botón para mostrar las ofertas.
                var MenuButton = require(Global.Path.CONTROL + 'Button/MenuButton');

                var butOffer = Ti.UI.createButton({
                    backgroundColor : Global.Theme.BUTTON.BACKGROUND,
                    backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
                    color : Global.Theme.BUTTON.TITLE,
                    title : 'Ofertas',
                    height : 60,
                    width : Ti.UI.FILL,
                    image : '/images/label_red_32.png',
                    bottom : 0
                });

                winFamily.children[0].setBottom(60);
                winFamily.add(butOffer);

                //Mostramos la ventana de ofertas y cerramos la de familias.
                butOffer.addEventListener('click', function() {
                    winSelectOffer(win, winFamily);
                });

                //Cuando hemos seleccionado una familia cargamos los artículos.
                winFamily.addEventListener('codeFamily', function(e) {

                    rowArticles = new Array();
                    dataArticles = article.select((e.code > -1 ? "WHERE CodigoFamilia = '" + e.code + "'" : "") + " ORDER BY Descripcion");
                    //Añadimos las tarifas y creamos las filas
                    for (var i = 0; i < dataArticles.length; i++) {
                        dataArticles[i].Tarifa = rates.getRate(dataArticles[i].CodigoArticulo);
                        rowArticles.push(row(dataArticles[i]));
                    };
                    //El catálogo
                    var catalog = new Global.Control.Catalog(dataArticles);

                    //Ventana de selección de artículos
                    var winSelectItem = Ti.UI.createWindow({
                        // title : 'Selección de artículos',
                        backgroundColor : Global.Theme.BACKGROUND,
                        navBarHidden : true,
                        url : Global.Path.VIEW + 'Pedido/SelectItem.js',
                        layout : 'vertical',
                        Global : Global,
                        rows : rowArticles,
                        catalog : catalog,
                        nameFamily : e.name,
                        orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
                    });

                    //Cuando seleccionamos un artículo del catálogo disparamos el evento 'tableClick'.
                    catalog.addEventListener('data:click', function() {
                        winSelectItem.fireEvent('tableClick', {
                            //Devolvemo el "índice" del artículo seleccionado.
                            index : catalog.getCurrentPage()
                        });
                    });

                    //Al seleccionar un artículo abrimos la ventana para editar la cantidad.
                    winSelectItem.addEventListener('tableClick', function(e) {
                        //Si el artículo tiene precio es que está dentro de la tarifa actual
                        //if (dataArticles[e.index].Tarifa > 0) {
                        var promociones = new Global.Controller.Promociones(client, toOrderDetail(dataArticles[e.index]));
                        var winOffer = promociones.getWin()();
                        //Al guardar los datos
                        winOffer.addEventListener('save', function(o) {
                            win.fireEvent('tableAdd', {
                                article : o.article
                            });

                            winSelectItem.close();
                            winFamily.close();
                            winOffer.close();
                        });

                        winOffer.open();
                        // } else {
                        // var alert = new Global.Control.Windows.Alert({
                        // message : "El artículo seleccionado no dispone de precio para la tarifa seleccionada.",
                        // icon : Global.Control.Windows.ICON.INFORMATION,
                        // title : 'ARTÍCULO SIN TARIFA'
                        // });
                        //
                        // alert.open();
                        // };

                    });

                    winSelectItem.open();

                });

                //Cerramos la ventan cargando.
                winFamily.addEventListener('postlayout', function() {
                    winLoading.close();
                });

                winFamily.open();
            };
        });

    };

    /**
     * Crea la vista de selección de artículo. Es invocado cuando queremos añadir un artículo al pedido.
     * @param {Ti.UI.Window} win La ventana "principal" donde se debe/n retornar el/los artículo/s.
     * @param {Ti.UI.Window} winFamily La ventana de selección de familia.
     */
    function winSelectOffer(win, winFamily) {
        //La ventana Loading.
        var winLoading = require(Global.Path.CONTROL + 'WinLoading')();
        winLoading.open();

        winLoading.addEventListener('postlayout', function() {
            //Vigilamos que solo lo haga una vez
            if (!winLoading._one) {
                winLoading._one = true;

                //Ventana de selección de ofertas
                var promociones = new Global.Controller.Promociones(client, {
                    NumPedido : undefined
                });
                var winSelectOffer = promociones.getWinOffers();
                //Al seleccionar una oferta abrimos la ventana para editarla.
                
                winSelectOffer.addEventListener('codeOffer', function(e) {
                    try {
                        
                        var winOffer = promociones.getWinId(e.code)();

                        //Al guardar los datos
                        winOffer.addEventListener('save', function(o) {
                            win.fireEvent('tableAdd', {
                                article : o.article
                            });

                            winSelectOffer.close();
                            winOffer.close();
                        });

                        winOffer.open();
                    } catch (err) {
                        var alert = new Global.Control.Windows.Alert({
                            message : "Esta oferta no está bien montada y no se puede aplicar.",
                            icon : Global.Control.Windows.ICON.ERROR,
                            title : 'OFERTA NO FUNCIONAL'
                        });
                        
                        alert.open();
                    }

                });

                //Cerramos la ventan cargando.
                winSelectOffer.addEventListener('postlayout', function() {
                    winLoading.close();
                    winFamily.close();
                });

                winSelectOffer.open();
            };
        });

    };

    /**
     * Crea la vista de edición del artículo. Es invocado cuando queremos modificar los datos del artículo.
     * @private
     * @param {Object} article El artículo del que queremos modificar los datos.
     * @param {Window/View} view La ventana o vista que ha creado esta nueva ventana.
     */
    function winQuantity(article, view) {
        //Ventana de edición del artículo
        var winQuantity = Ti.UI.createWindow({
            backgroundColor : '#808080',
            navBarHidden : false,
            opacity : 0.50,
            url : Global.Path.VIEW + 'Pedido/QuantityItem.js',
            article : toOrderDetail(article),
            Global : Global
        });

        //Guardar la edición del artículo y lo retorna a la ventana padre.
        winQuantity.addEventListener('butSave', function(e) {
            view.fireEvent('returnArticle', {
                article : e.article
            });
        });

        winQuantity.open();
    };

    /**
     * Crea la vista donde se puede seleccionar un pedido de los pedidos anteriores.
     * @private
     * @return {Window} El objeto "Window" que formará la vista.
     */
    function createSelectOrderWin(orders) {
        var win = Ti.UI.createWindow({
            // title : 'Pedidos anteriores',
            backgroundColor : Global.Theme.BACKGROUND,
            url : Global.Path.VIEW + 'Pedido/SelectOrderWin.js',
            Global : Global,
            navBarHidden : true,
            orders : orders,
            nameClient : client.NombreComercial,
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });
        //Recuperamos el pedido seleccionado
        win.addEventListener('returnOrder', function(e) {
            //La ventana Loading.
            var winLoading = require(Global.Path.CONTROL + 'WinLoading')();
            winLoading.open();

            winLoading.addEventListener('postlayout', function() {
                //Vigilamos que solo lo haga una vez
                if (!winLoading._one) {
                    winLoading._one = true;

                    rowHeader = e.order;
                    preLines = modelDetail.select("WHERE NumPedido = '" + rowHeader.NumPedido + "' AND Serie = '" + rowHeader.Serie + "'");
                    //El código de agrupación actual.
                    var tmpCode = -1;
                    //Los artículos de la agrupación.
                    var tmpArticles;
                    //Pasamos a "líneas de detalle" válidas.
                    for (var i = 0; i < preLines.length; i++) {
                        var promociones = new Global.Controller.Promociones(client, preLines[i]);
                        //Si tiene Código de agrupación.
                        if (preLines[i].CodigoAgrupacion != 0) {
                            //Si el código temporal es igual al del artículo.
                            if (preLines[i].CodigoAgrupacion == tmpCode) {
                                preLines[i].winOffer = promociones.getWinId(preLines[i].CodigoPromocion, tmpArticles);
                            } else {
                                tmpCode = preLines[i].CodigoAgrupacion;
                                tmpArticles = preLines.filter(function(element) {
                                    return element.CodigoAgrupacion == tmpCode;
                                });
                                preLines[i].winOffer = promociones.getWinId(preLines[i].CodigoPromocion, tmpArticles);
                            };
                            //Añadimos la descripción de la agrupación.
                            preLines[i].DescripcionPromocion = promociones.getOffer(preLines[i].CodigoPromocion).Descripcion;
                        };
                        //Añadimos el tipo de promoción.
                        preLines[i].typeOffer = promociones.getTypeOffer(preLines[i].CodigoPromocion);
                        //Lo marcamos para que se puede eliminar del pedido.
                        preLines[i]._del = true;
                        dataLines.push(toOrderDetail(preLines[i]));
                    };
                    //Asignamos el número de pedido que le corresponde.
                    // numOrder = rowHeader.NumPedido;

                    var mainWin = createMainWin();
                    //Cerramos la ventan cargando.
                    mainWin.addEventListener('postlayout', function() {
                        winLoading.close();
                    });

                    mainWin.open();

                    win.close();
                };
            });
        });

        //Eliminamos el pedido seleccionado
        win.addEventListener('delete', function(e) {
            rowHeader = e.order;
            destroy();
        });

        return win;
    };

    /**
     * Buscar todos los pedidos que tenga el cliente y retorna sus datos.
     * @private
     * @return {Array} Un array con todos los pedidos y sus líneas
     */
    function loadOrders() {
        return modelHeader.select("WHERE CodigoCliente = '" + client.CodigoCliente + "'");
    };

    /**
     * Carga las líneas de pedido del "Prepedido" del cliente actual.
     * @private
     */
    function loadPreorder() {
        var preOrder = new Global.Controller.Prepedido(client);
        var preLines = preOrder.getPreorder();
        var format = Global.Functions.nextWorkDay(new Date());

        //Ponemos los datos de la cabecera
        //rowHeader.NumPedido = numOrder;
        rowHeader.CodigoCliente = client.CodigoCliente;
        rowHeader.FechaServicio = Global.Functions.compareDate(new Date(Global.Parameters.Preventista.getFechaServicio()), new Date()) == 2 ? new Date(Global.Parameters.Preventista.getFechaServicio()) : format;
        //Metemos todas las líneas del prepedido como líneas de pedido.
        for (var i = 0; i < preLines.length; i++) {
            //Marcamos para poder eliminar la línea del pedido.
            preLines[i]._del = true;
            dataLines.push(toOrderDetail(preLines[i]));
        };
    };

    /**
     * Pasa un registro de "Prepedido", de "Articulos" o de "DetallePedido" a una fila de "DetallePedido" con propiedades
     * extra para poder operar con ella.
     * @param {Object} register El registro para transformar.
     * @return {Object} Una línea de "DetallePedido" con campos extra.
     */
    function toOrderDetail(register) {
        //Objeto "DetallePedido"
        var detail = modelDetail.getData();
        //Tarifas
        var rates = new Global.Controller.Tarifas(rowHeader.Tarifa);
        //Artículos
        var articles = new Global.Controller.Articulos();
        var article = articles.getArticle(register.CodigoArticulo);

        //Pasamos los campos necesarios.
        detail.CodigoArticulo = register.CodigoArticulo;
        detail.Descripcion = article.Descripcion;
        detail.CodigoFamilia = article.CodigoFamilia;
        detail.Familia = article.Familia;
        detail.TipoArticulo = article.TipoArticulo;
        detail.TipoArticuloDescripcion = article.TipoArticuloDescripcion;
        detail.NumPedido = register.NumPedido;
        // != undefined ? register.NumPedido : numOrder;
        detail.CodigoPromocion = register.CodigoPromocion != undefined ? register.CodigoPromocion : 0;
        detail.CodigoAgrupacion = register.CodigoAgrupacion != undefined ? register.CodigoAgrupacion : 0;
        detail.Venta = register.NumPedido != undefined ? register.Venta : 0;
        detail.Regalo = register.NumPedido != undefined ? register.Regalo : 0;
        detail.Tarifa = rates.getRate(register.CodigoArticulo);
        detail.Precio = register.NumPedido != undefined ? register.Precio : detail.Tarifa;
        detail.DtoFijo = register.DtoFijo != undefined ? register.DtoFijo : 0;
        detail.DtoEspecial = register.NumPedido != undefined ? register.DtoEspecial : 0;
        detail.IVA = register.IVA != undefined ? register.IVA : article.IVA;
        detail.PuntoVerde = register.PuntoVerde != undefined ? register.PuntoVerde : article.PuntoVerde;
        detail.DescripcionPromocion = register.DescripcionPromocion;
        detail.AutorizacionDtos = article.AutorizacionDtos;
        detail.typeOffer = register.typeOffer;
        detail.UnidadesCaja = article.UnidadesCaja;
        detail._del = register._del;

        //Añadimos la ventana de edición que le corresponda según la oferta, si la tiene.
        var promociones = new Global.Controller.Promociones(client, detail);
        if (detail.CodigoPromocion != 0) {
            if (detail.CodigoAgrupacion == 0) {
                detail.winOffer = promociones.getWinId(detail.CodigoPromocion);
            } else {
                detail.winOffer = register.winOffer;
            };
        } else {
            detail.winOffer = promociones.getWin();
        };

        return detail;
    };

    /**
     * Indica si hay pedidos para el cliente.
     * @return {Boolean} TRUE si hay pedidos, FALSE en caso contrario.
     */
    this.hasOrders = function() {
        return loadOrders().length > 0;
    };

    //Se ejecuta cuando se instancia el objeto.
    (function() {
        switch(action) {
        case "new":
            index();
            break;
        case "previous":
            isNew = false;
            selectOrder();
            break;
        }
    })();

};

module.exports = Pedido;
