/**
 * ------------------------------------------------- CATALOG TEST -------------------------------------------
 *
 */

function AddTest() {

    var Global = require('/global/class/ReturnGlobal')();

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
    var winSelectItem = Ti.UI.createWindow({
        title : 'Selección de artículos',
        backgroundColor : '#FFFFFF',
        navBarHidden : false,
        url : Global.Path.VIEW + 'Pedido/SelectItem.js',
        layout : 'vertical',
        Global : Global,
        familys : familys
    });

    //Cargamos los datos de la familia.
    winSelectItem.addEventListener('codeFamily', function(e) {
        rowArticles = new Array();
        dataArticles = article.select("WHERE CodigoFamilia = '" + e.code + "'");

        for (var i = 0; i < dataArticles.length; i++) {
            dataArticles[i].Tarifa = rates.getRate(dataArticles[i].CodigoArticulo);

            rowArticles.push(row(dataArticles[i]));
        };

        //Enviamos a la vista las filas.
        winSelectItem.fireEvent('setTable', {
            rows : rowArticles,
            catalog : new Global.Control.Catalog(dataArticles)
        });

    });

    return winSelectItem;
};

module.exports = AddTest;
