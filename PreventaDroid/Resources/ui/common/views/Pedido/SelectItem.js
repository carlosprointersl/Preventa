/**
 * @fileOverview Es la vista MainWin del controlador Pedido.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La ventana actual
var Global = win.Global;
//Modelo de familias
var familys = win.familys;
//Los datos de los artículos que se están visualizando
var dataArticles = [];
//Las Rows de artículos que se están visualizando
var rowArticles = [];
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Familia " + win.nameFamily, "Familias", function() {
    win.close();
});
//Indica si el catálogo está activo
var viewCatalog = Global.Parameters.Configuracion.getViewArticles() == "C" ? true : false;

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Head
var viewHead = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    height : Ti.UI.SIZE,
    width : Ti.UI.FILL,
    layout : 'horizontal'
});

//Button
var viewButLabel = Ti.UI.createView({
    height : 50,
    top : 10,
    layout : 'horizontal'
});

//SearchBar-TextField
var viewHeaderText = Ti.UI.createView({
    // backgroundColor : Global.Theme.HEADER,
    height : viewCatalog ? 0 : 50
});

//Cabecera de columnas
var viewColumn = Ti.UI.createView({
    width : Ti.UI.FILL,
    height : 17,
    layout : 'horizontal'
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
// La etiqueta de ayuda para el botón.
var labelBut = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 20,
        fontWeight : 'bold'
    },
    text : viewCatalog ? 'Pulsa para listado' : 'Pulsa para catálogo',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : Ti.UI.SIZE,
    left : 5
});


//Los nombres de las etiquetas para las unidades.
var labelsUnits = [{
    text : 'Código',
    width : '33%'
}, {
    text : 'Unidades Caja',
    width : '34%'
}, {
    text : 'Tarifa',
    width : '33%'
}];

for (var i = 0, j = labelsUnits.length; i < j; i++) {
    viewColumn.add(Ti.UI.createLabel({
        //backgroundColor : 'red',
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 11
        },
        text : labelsUnits[i].text,
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        height : Ti.UI.FILL,
        width : labelsUnits[i].width
    }));
};

//
// ---------------------------------------------------------------- SEARCH BAR -------------------------------------------------
//
var search = Ti.UI.createTextField({
    width : Ti.UI.FILL,
    height : 50,
    editable : false,
    hintText : 'Código / Descripción'
});

var searchBar = Ti.UI.createSearchBar({
    height : 0
});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
var butCatalog = Ti.UI.createButton({
    image : '/images/' + ( viewCatalog ? 'catalog_32.png' : 'list_32.png'),
    height : Ti.UI.FILL,
    left : 5
});

//
// ---------------------------------------------------------------- TABLE VIEW -------------------------------------------------
//
var table = Ti.UI.createTableView({
    data : win.rows,
    search : searchBar,
    filterAttribute : 'filter'
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Click en la tabla
table.addEventListener('click', function(e) {
    //Devolvemo el "índice" del artículo seleccionado.
    win.fireEvent('tableClick', {
        index : e.index
    });

});

//Modifica el searchBar para que el filtro se aplique
search.addEventListener('change', function(e) {
    searchBar.setValue(search.getValue());
});

butCatalog.addEventListener('click', function() {
    viewCatalog = !viewCatalog;
    //Cambiamos el icono del botón
    butCatalog.setImage('/images/' + ( viewCatalog ? 'catalog_32.png' : 'list_32.png'));
    //Guardamos la forma de visualizar los artículos.
    Global.Parameters.Configuracion.setViewArticles( viewCatalog ? "C" : "L");
    //Escondemos o mostramos el filtro de las filas.
    viewHeaderText.animate(Ti.UI.createAnimation({
        height : viewCatalog ? 0 : 50,
        duration : 200
    }));
    //Cambiamos el texto de la etiqueta
    labelBut.setText(viewCatalog ? 'Pulsa para listado' : 'Pulsa para catálogo');

    //Quitamos el tercer elemento de la ventana.
    if (viewCatalog) {
        if (win.children[2]) {
            win.remove(win.children[2]);
        };
        win.add(win.catalog);
    } else {
        table.setData(win.rows);
        //Si NO HAY UNA TABLA, hemos de quitar la "view" y añadir la tabla.
        if (!(win.children[2] instanceof Ti.UI.TableView)) {
            win.remove(win.children[2]);
            win.add(table);
        };
    };
});

//
// ---------------------------------------------------------------- WIN EVENTS -------------------------------------------------
//
//Postlayout activa el Campo de texto del buscador.
win.addEventListener('postlayout', searchEditable);

//
// ---------------------------------------------------------------- FUNCTIONS -------------------------------------------------
//
function searchEditable() {
    search.blur();
    setTimeout(function() {
        search.setEditable(true);
    }, 500);
    win.removeEventListener('postlayout', searchEditable);
};

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
viewButLabel.add(butCatalog);
viewButLabel.add(labelBut);

viewHead.add(viewButLabel);
viewHead.add(viewHeaderText);
//Línea horizontal
viewHead.add(Ti.UI.createView({
    backgroundColor : Global.Theme.BACKGROUND,
    width : Ti.UI.FILL,
    height : 0.5,
    layout : 'horizontal'
}));
viewHead.add(viewColumn);

viewHeaderText.add(search);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(headerMenu);
win.add(viewHead);
// win.add(viewHeaderText);
win.add(viewCatalog ? win.catalog :  table);

