/**
 * @fileOverview Es la vista MainWin del controlador Pedido.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//Datos del cliente
var client = win.client;
//Los tipos de incidencias
var types;
//El índice de la fila actualmente seleccionada
var indexRow;
//La incidencia actual
var incidence = win.incidence;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Incidencias", "Cliente", function(){win.close();});
headerMenu.setTop(0);
//Constantes con las laturas de las partes de la ventana.
const HEADER_HEIGHT = 110;
const FOOT_HEIGHT = 60;

// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Header
var viewHeader = Ti.UI.createView({
    height : HEADER_HEIGHT,
    width : Ti.UI.FILL,
    top : 50
});
//Cliente
var viewClient = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    top : 0,
    height : 54.5,
    width : Ti.UI.FILL,
    layout : 'vertical'
});
//La incidencia seleccionada
var viewIncidence = Ti.UI.createView({
    backgroundColor : Global.Theme.POPUP.BACKGROUND,
    height : 54.5,
    bottom : 0,
    width : Ti.UI.FILL,
    layout : 'vertical'
});
//La incidencia y el botón para eliminarla
var viewIncidenceButton = Ti.UI.createView({
    height : 35,
    width : Ti.UI.FILL,
    layout : 'horizontal'
});
//El pie, botón GUARDAR
var viewFoot = Ti.UI.createView({
    //backgroundColor : 'gray',
    height : FOOT_HEIGHT,
    width : Ti.UI.FILL,
    bottom : 0
});
//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
//Nombre comercial
var labelName = Ti.UI.createLabel({
    //backgroundColor : 'gray',
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 22,
        fontWeight : 'bold'
    },
    text : client.NombreComercial,
    left : 2,
    width : Ti.UI.FILL,
    height : 33,
    horizontalWrap : false
});

//Dirección
var labelAddress = Ti.UI.createLabel({
    //backgroundColor : 'white',
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 17
    },
    text : client.Direccion + ' - ' + client.Poblacion,
    left : 2,
    textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE,
    horizontalWrap : false
});

//Título de la incidencia
var labelTitleIncidence = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 20,
        fontWeight : 'bold'
    },
    text : "Incidencia seleccionada",
    left : 2,
    width : Ti.UI.FILL,
    height : 33,
    horizontalWrap : false
});

//La incidencia
var labelIncidence = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 15
    },
    text : incidence.length > 0 ? incidence[0].Descripcion : "Ninguna",
    left : 2,
    textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE,
    horizontalWrap : false
});

//
// ---------------------------------------------------------------- TABLE VIEW -------------------------------------------------
//
//Llenamos los datos de la tabla según el día de la semana.
function fillTypesIncidences() {
    //Mostramos el mensaje de cargando
    activityIndicator.show();
    //Consultamos los tipos de incidencias
    types = win.type.getItems();
    //Las filas
    var rows = new Array();
    //Creamos las filas con las incidencias
    for (var i = 0; i < types.length; i++) {
        rows.push(Ti.UI.createTableViewRow({
            //backgroundColor : '#6BAECE',
            className : 'incidence',
            height : 55,
            font : {
                fontSize : 20
            },
            color : Global.Theme.TEXT_SECONDARY,
            title : types[i].descripcion
        }));
        if (incidence.length > 0 && incidence[0].NumIncidencia == types[i].id) {
            rows[i].setHasCheck(true);
            rows[i].setClassName("checked");
            indexRow = i;
        };
    };

    //Escondemos el mensaje de Cargando
    activityIndicator.hide();
    //Añadimos las filas a la tabla
    table.setData(rows);
    //Nos situamos en la fila seleccionada.
    table.scrollToIndex(indexRow || 0);
    //Quitamos el evento "PostLayout" de la Window
    win.removeEventListener('postlayout', fillTypesIncidences);
};

var table = Ti.UI.createTableView({
    top : viewHeader.top + HEADER_HEIGHT,
    bottom : FOOT_HEIGHT
});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
var buttonSave = Ti.UI.createButton({
    backgroundColor : Global.Theme.BUTTON.BACKGROUND,
    backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
    color : Global.Theme.BUTTON.TITLE,
    title : 'Aceptar',
    width : Ti.UI.FILL,
    height : Ti.UI.FILL,
    image : '/images/save_32.png'
});

//
// ---------------------------------------------------------------- ACTIVITY INDICATOR -------------------------------------------------
//
var activityIndicator = Ti.UI.createActivityIndicator({
    color : Global.Theme.POPUP.TEXT,
    font : {
        fontSize : 22,
        fontWeight : 'bold'
    },
    message : 'Cargando...',
    style : Ti.UI.ActivityIndicatorStyle.PLAIN,
    height : Ti.UI.SIZE,
    width : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Click en la tabla
table.addEventListener('click', function(e) {
    if (indexRow != undefined) {
        table.sections[0].rows[indexRow].setHasCheck(false);
    };
    if (indexRow != e.index) {
        indexRow = e.index;
        e.row.setHasCheck(true);
        labelIncidence.setText(e.row.title);
    } else {
        indexRow = undefined;
        labelIncidence.setText("Ninguna");
    };
});

//Guardar
buttonSave.addEventListener('click', function() {
    win.fireEvent('save', {
        index : indexRow,
        type : types[indexRow]
    });
});

//Postlayout Window
win.addEventListener('postlayout', fillTypesIncidences);
//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//

viewIncidenceButton.add(labelIncidence);

viewIncidence.add(labelTitleIncidence);
viewIncidence.add(viewIncidenceButton);

viewClient.add(labelName);
viewClient.add(labelAddress);

viewHeader.add(viewClient);
viewHeader.add(viewIncidence);

viewFoot.add(buttonSave);
//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(headerMenu);
win.add(viewHeader);
win.add(table);
win.add(viewFoot);
win.add(activityIndicator);

