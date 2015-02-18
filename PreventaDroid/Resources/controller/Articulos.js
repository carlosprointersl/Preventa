/**
 * @fileOverview En este archivo se crea el controlador "Articulos".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Articulos".
 * @class Es la clase que define al controlador "Articulos". Interactua con el modelo "Articulos".
 * @memberOf Global.Controller
 * @param {String} action La acción que debe realizar el controlador.
 */
var Articulos = function(action) {
    /**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    var model = new Global.Model.Articulos();

    /**
     * Es la ventana principal, la vista "index".
     * @private
     * @type Ti.UI.Window
     */
    var mainWin;
    // = createMainWin();

    /**
     * Datos del registro con el que se esta trabajando. Simula un Array asociativo.
     * @private
     * @type Object
     */
    var currentRow = model.getData();

    /**
     * Muestra una tabla/listado de registros.
     * @private
     */
    function index() {
        mainWin = mainWin || createMainWin();
        mainWin.open();
    };

    /**
     * Muestra una registro.
     * @private
     */
    function show() {
        // Code here ...
    };

    /**
     * Muestra un formulario vacío para crear un registro. (Vista Edit vacía)
     * Si los datos son correctos se guarda en el modelo. (Create())
     * @private
     */
    function _new() {
        // Code here ...
        // View Edit
        // if(OK){create() };
    };

    /**
     * Muestra un formulario con datos para modificar. (Vista Edit llena)
     * Si los datos son correctos se actualiza en el modelo. (Update())
     * @private
     */
    function edit() {
        // Code here ...
        // View Edit
        // if(OK){update() };
    };

    /**
     * Crea un nuevo registro.
     * @private
     */
    function create() {
        // Code here ...
    };

    /**
     * Actualiza un registro.
     * @private
     */
    function update() {
        // Code here ...
    };

    /**
     * Elemina un registro.
     * @private
     */
    function destroy() {
        var dialog = Ti.UI.createAlertDialog({
            cancel : 1,
            buttonNames : ['Si', 'No'],
            message : '¿Desea eliminar esta fila?',
            title : 'ELIMINAR FILA'
        });

        dialog.addEventListener('click', function(r) {
            if (r.index != r.source.cancel) {
                // Code here ...
            }
        });
        dialog.show();
    };

    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @private
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createMainWin() {
        //Modelo de Articulos
        var article = new Global.Model.Articulos();
        //Modelo de tarifas
        var rates = new Global.Controller.Tarifas();
        //Los artículos actuales
        var dataArticles = new Array();
        //La fila.
        var row = require(Global.Path.VIEW + 'Pedido/ArticleRow');

        //Ventana de selección de familias
        var createWindow = require(Global.Path.VIEW + 'Pedido/SelectFamily');
        var winFamily = new createWindow("Menú");

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

            winSelectItem.open();

        });

        return winFamily;
    };

    /*function createMainWin() {
     //Modelo de familias
     var familys = new Global.Model.Familias().select("ORDER BY Descripcion");
     //Modelo de Articulos
     var article = new Global.Model.Articulos();
     //Modelo de tarifas
     var rates = new Global.Controller.Tarifas();
     //Los artículos actuales
     var dataArticles = new Array();
     //La fila.
     var row = require(Global.Path.VIEW + 'Pedido/ArticleRow');

     //Ventana de selección de artículos
     var win = Ti.UI.createWindow({
     // title : 'Listado de artículos',
     backgroundColor : Global.Theme.BACKGROUND,
     navBarHidden : true,
     url : Global.Path.VIEW + 'Pedido/SelectItem.js',
     layout : 'vertical',
     Global : Global,
     familys : familys,
     orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
     });

     //Cargamos los datos de la familia.
     win.addEventListener('codeFamily', function(e) {
     rowArticles = new Array();
     dataArticles = article.select((e.code > -1 ? "WHERE CodigoFamilia = '" + e.code +"'" : "") + " ORDER BY Descripcion");

     for (var i = 0; i < dataArticles.length; i++) {
     dataArticles[i].Tarifa = rates.getRate(dataArticles[i].CodigoArticulo);

     rowArticles.push(row(dataArticles[i]));
     };

     //El catálogo
     var catalog = new Global.Control.Catalog(dataArticles);

     //Enviamos a la vista las filas.
     win.fireEvent('setTable', {
     rows : rowArticles,
     catalog : catalog
     });

     //Cuando seleccionamos un artículo del catálogo disparamos el evento 'tableClick'.
     catalog.addEventListener('data:click', function() {
     win.fireEvent('tableClick', {
     //Devolvemo el "índice" del artículo seleccionado.
     index : catalog.getCurrentPage()
     });
     });

     });

     //El evento 'tableClick' retorna el artículo seleccionado.
     win.addEventListener('tableClick', function(e){
     win.fireEvent('article:return', {
     article : dataArticles[e.index]
     });
     });

     return win;
     };

     /**
     * Buscar un artículo por el código de este y lo retorna si lo encuentra. En caso contrario retorna "null".
     * @param {String} code El código del artículo. También podemos pasarle una secuencia sql("2130 AND CodigoArticulo = '2134'").
     * @return {Object/Null} El resultado del select o null si no encontró nada.
     */
    this.getArticle = function(code) {
        var rs = model.select("WHERE CodigoArticulo = '" + code + "'");

        return rs.length > 0 ? rs[0] : null;
    };

    /**
     * Retorna la ventana principal "MainWin". Esta contiene el listado de artículos. Para recuperar el artículo seleccionado
     * lo haremos controlando el evento "article:return".
     * @return {Ti.UI.Window} La ventana principal "MainWin".
     */
    this.getMainWin = function() {
        return mainWin != undefined ? mainWin : createMainWin();
    };

    //Se ejecuta cuando se instancia el objeto.
    (function() {
        switch(action) {
        case "index":
            index();
            break;
        case "show":
            show();
            break;
        case "new":
            _new();
            break;
        }
    })();

};

module.exports = Articulos;
