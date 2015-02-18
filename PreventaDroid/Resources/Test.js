/**
 * ------------------------------------------------- CATALOG TEST -------------------------------------------
 *
 */
function Test() {
    //Modelo de familias
    var familys = new Global.Model.Familias().select();
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
        familys : familys
    });

    //Cargamos los datos de la familia.
    win.addEventListener('codeFamily', function(e) {
        rowArticles = new Array();
        dataArticles = article.select("WHERE CodigoFamilia = '" + e.code + "'");

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
    win.addEventListener('tableClick', function(e) {
        win.fireEvent('article:return', {
            article : dataArticles[e.index]
        });
    });

    return win;

};

module.exports = Test();
