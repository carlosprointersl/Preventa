/**
 * ------------------------------------------------- CATALOG TEST -------------------------------------------
 *
 */

function CatalogTest(){
    
    var Global = require('/global/class/ReturnGlobal')();
    
    var model = new Global.Model.Articulos();
    
    var articles = model.select("WHERE CodigoArticulo = 9045 OR CodigoArticulo = 9230 OR CodigoArticulo = 10699 OR CodigoArticulo = 10700 OR CodigoArticulo = 12050");
    
    var win = Ti.UI.createWindow({
        backgroundColor : '#FFFFFF',
        navBarHidden: false
    });
    
    var catalog = new Global.Control.Catalog(articles);
    
    catalog.addEventListener('data:click', function(){
        var article = articles[catalog.getCurrentPage()];
        alert("Descripción: " + article.Descripcion);
    }); 
    
    
    var header = Ti.UI.createView({
        backgroundColor : 'gray',
        top : 0,
        height : 70
    });
    
    var body = Ti.UI.createView({
        top : 70,
        bottom : 70
    });
    
    var foot = Ti.UI.createView({
        backgroundColor : 'blue',
        bottom : 0,
        height : 70
    });
    
    body.add(catalog);
    
    win.add(header);
    win.add(body);
    win.add(foot);
    
    return win;
};

module.exports = CatalogTest;
