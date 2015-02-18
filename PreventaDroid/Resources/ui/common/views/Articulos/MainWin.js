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
var modelFamily = new Global.Model.Familias();
//Modelo de Articulos
var article = new Global.Model.Articulos();
//Modelo de tarifas
var rates = new Global.Controller.Tarifas();
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
    image : Global.Path.IMAGES + '48/filter.png',
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
        text : 'Tarifa: ' + Global.Functions.numToEuro(options.rate),
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
    var familys = modelFamily.select();

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
        if (index > -1) {
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
    var sdcardPath = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).parent.nativePath;
    var filePhoto = Ti.Filesystem.getFile(sdcardPath, Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.PHOTO_DIRECTORY + "/" + dataArticles[e.index].CodigoArticulo + ".jpg");
    
    var photoWin = Ti.UI.createWindow({
        backgroundColor : '#000000',
        navBarHidden : true,
        opacity : 0.5
    });
    
    var photoView = Ti.UI.createView({
        backgroundColor : 'white',
        opacity : 1,
        height : Ti.UI.SIZE,
        width : Ti.UI.SIZE
    });
    
    var photoImage = Ti.UI.createImageView({
        width : (400 / Ti.Platform.displayCaps.logicalDensityFactor),
        defaultImage : Global.Path.IMAGES + "no_image.png",
        enableZoomControls : true
    });
    
    if(filePhoto.exists()){
        // photoImage.setLeft(10);
        // photoImage.setRight(10);
        photoImage.setImage(filePhoto);
    } else {
        //photoImage.setImage(Global.Path.IMAGES + "no_image.png");   
    };
    
    photoView.add(photoImage);
    
    photoWin.add(photoView);
    
    photoWin.open();
});

//Cuando se ha formado la ventana principal
win.addEventListener('postlayout', function() {
    if (viewPicker.children[0] instanceof Ti.UI.ActivityIndicator) {
        viewHead.add(createPickerFamily());
        viewPicker.remove(activityIndicator);
    };
});

//Gana el foco el buscador
search.addEventListener('focus', function(e) {
    if (e.source.first) {
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

Ti.API.info("WIDTH: " + Ti.Platform.displayCaps.platformWidth);
