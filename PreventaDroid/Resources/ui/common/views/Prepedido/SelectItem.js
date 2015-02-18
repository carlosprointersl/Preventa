/**
 * @fileOverview Es la vista MainWin del controlador Pedido.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La ventana actual
var global = win.global;
//Las familias Array
var familys = win.familys;
//Modelo de Articulos
var article = win.article;
//Modelo de tarifas
var rates = win.rates;
//Los datos de los artículos que se están visualizando
var dataArticles = []; 
//Las Rows de artículos que se están visualizando
var rowArticles = [];
//La table donde se va a añadir el artículo
var tableArticles = win.table;

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Head
var viewHead = Ti.UI.createView({
    backgroundColor : '#154A63',
    borderRadius : 5,
    height : Ti.UI.SIZE,
    width : Ti.UI.FILL,
    layout : 'horizontal'
});

//Picker - LOADING...
var viewPicker = Ti.UI.createView({
    height : Ti.UI.SIZE,
    width : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- IMAGES -------------------------------------------------
//
var imageFilter = Ti.UI.createImageView({
    image : global.Path.IMAGES + 'filter.png',
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
//Filtro por familía
var labelFamily = Ti.UI.createLabel({
    color : '#FFFFFF',
    font : {
        fontSize : 20
    },
    text : 'Familía',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- ACTIVITY INDICATOR -------------------------------------------------
//
var activityIndicator = Ti.UI.createActivityIndicator({
    color : 'white',
    font : {
        fontFamily : 'Helvetica Neue',
        fontSize : 22,
        fontWeight : 'bold'
    },
    message : 'Cargando...',
    style : Ti.UI.ActivityIndicatorStyle.DARK,
    height : Ti.UI.SIZE,
    width : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- SEARCH BAR -------------------------------------------------
//
var search = Ti.UI.createSearchBar({
    showCancel : false,
    hintText : 'Código / Descripción',
    first : true
});

//
// ---------------------------------------------------------------- TABLE VIEW -------------------------------------------------
//

var table = Ti.UI.createTableView({
    borderRadius : 5,
    search : search,
    filterAttribute : 'filter'
});

//
// ---------------------------------------------------------------- TABLE VIEW ROW -------------------------------------------------
//
//options.description : La descripción del artículo
//options.code : El código del artículo
//options.index : El índice de la fila en la tabla.
//options.rate : La tarifa del artículo.
function createRow(options) {

    //La fila
    var row = Ti.UI.createTableViewRow({
        backgroundColor : '#6BAECE',
        className : 'client',
        backgroundSelectedColor : 'orange',
        height : Ti.UI.SIZE,
        layout : 'horizontal',
        filter : options.code + options.description,
        index : options.index
    });

    //El contenedor para los textos
    var viewTexts = Ti.UI.createView({
        // backgroundColor : 'yellow',
        borderRadius : 5,
        height : Ti.UI.FILL,
        layout : 'vertical'
    });

    //Contenedor para el código y la tarifa.
    var viewCodeRate = Ti.UI.createView({
        // backgroundColor : 'yellow',
        height : Ti.UI.SIZE,
        left : 2,
        right : 2
    });

    //Descripción
    var labelDescription = Ti.UI.createLabel({
        //backgroundColor : 'gray',
        color : '#FFFFFF',
        font : {
            fontFamily : 'Arial',
            fontSize : 22,
            fontWeight : 'bold'
        },
        text : options.description,
        left : 2,
        right : 2,
        height : Ti.UI.SIZE
    });

    //Tarifa
    var labelRate = Ti.UI.createLabel({
        //backgroundColor : 'white',
        color : '#000000',
        font : {
            fontFamily : 'Arial',
            fontSize : 16
        },
        text : 'Tarifa: ' + global.Functions.numToEuro(options.rate),
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        right : 0,
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE
    });

    //Código
    var labelCode = Ti.UI.createLabel({
        //backgroundColor : 'white',
        color : '#000000',
        font : {
            fontFamily : 'Arial',
            fontSize : 16
        },
        text : options.code,
        textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
        left : 0,
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE
    });

    viewCodeRate.add(labelCode);
    viewCodeRate.add(labelRate);

    viewTexts.add(labelDescription);
    viewTexts.add(viewCodeRate);

    row.add(viewTexts);

    return row;
};

//
// ---------------------------------------------------------------- PICKERS -------------------------------------------------
//

function createPickerFamily() {
    var column = Ti.UI.createPickerColumn();
    column.addRow(Ti.UI.createPickerRow({
        title : 'NINGUNA'
    }));

    for (var i = 0; i < familys.length; i++) {
        var row = Ti.UI.createPickerRow({
            title : familys[i].Descripcion
        });

        column.addRow(row);
    };

    //FAMILY PICKER
    var familyPicker = Ti.UI.createPicker({
        //width : '80%',
        selectionIndicator : true,
        columns : column
    });

    familyPicker.addEventListener('change', function(e) {
        var index = e.rowIndex - 1;
        rowArticles = new Array();
        if (index > 0) {
            dataArticles = article.select("WHERE CodigoFamilia = '" + familys[index].CodigoFamilia + "'");

            for (var i = 0; i < dataArticles.length; i++) {
                dataArticles[i].Tarifa = rates.getRate(dataArticles[i].CodigoArticulo); 
                var dataRow = {
                    description : dataArticles[i].Descripcion,
                    code : dataArticles[i].CodigoArticulo,
                    rate : dataArticles[i].Tarifa
                };

                rowArticles.push(createRow(dataRow));
            };

            table.setData(rowArticles);
        };

    });

    return familyPicker;
};

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Click en la tabla
table.addEventListener('click', function(e) {
    
    var winQuantity = Ti.UI.createWindow({
        backgroundColor : '#808080',
        navBarHidden : false,
        opacity : 0.50,
        url : global.Path.VIEW + 'Prepedido/QuantityItem.js',
        article : dataArticles[e.index],
        global : global
    });

    winQuantity.open();
    
    winQuantity.addEventListener('butSave', function(e){
        tableArticles.fireEvent('tableAdd', {
            article : e.article
        });
        
        win.close();
    });

});

//Cuando se ha formado la ventana principal
win.addEventListener('postlayout', function() {
    if (viewPicker.children[0] instanceof Ti.UI.ActivityIndicator) {
        viewHead.add(createPickerFamily());
        viewPicker.remove(activityIndicator);
    };
});

//Gana el foco el buscador
search.addEventListener('focus', function(e){
    if(e.source.first){
        e.source.blur();
        e.source.first = false;
    };
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//

viewPicker.add(activityIndicator);
activityIndicator.show();

viewHead.add(imageFilter);
viewHead.add(labelFamily);
viewHead.add(viewPicker);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(viewHead);
win.add(table);

