/**
 * @fileOverview Es la vista MainWin del controlador Pedido.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La librería underscore.js
 */
var _ = require('/lib/underscore');

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//Indica si se han llenado los listados de clientes para la tabla
var fillCustomers = false;
// El cliente actualmente seleccionado.
var actualClient;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Selección de cliente", "Principal", function() {
    win.close();
});
headerMenu.setTop(0);
//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Header
var viewHeader = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    top : 50,
    height : 50,
    width : Ti.UI.FILL
});

//Filtro día
var viewDayFilter = Ti.UI.createView({
    layout : 'horizontal',
    left : 0,
    right : 50
    
});

//SearchBar-TextField
var viewHeaderText = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    height : 50,
    top : viewHeader.top + viewHeader.height,
});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
var button = Ti.UI.createButton({
    image : '/images/' + ( Global.Parameters.Configuracion.getViewClients() === "S" ? 'maximize_32.png' : 'minimize_32.png'),
    width : viewHeader.getHeight(),
    height : viewHeader.getHeight(),
    right : 0
});

//
// ---------------------------------------------------------------- IMAGES -------------------------------------------------
//
var imageFilter = Ti.UI.createImageView({
    image : '/images/filter_48.png',
    height : 40
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
//Filtro por día
var labelDay = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 19
    },
    text : 'Filtro día',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- SEARCH BAR -------------------------------------------------
//
var search = Ti.UI.createTextField({
    width : Ti.UI.FILL,
    height : 50,
    editable : false,
    hintText : 'Nombre comercial'
});

var searchBar = Ti.UI.createSearchBar({
    height : 0
});

//
// ---------------------------------------------------------------- TABLE VIEW -------------------------------------------------
//
var table = Ti.UI.createTableView({
    top : viewHeaderText.top + viewHeaderText.height,
    search : searchBar,
    filterAttribute : 'filter'
});

//
// ---------------------------------------------------------------- PICKERS -------------------------------------------------
//
//DAY PICKER
var dayPicker = Ti.UI.createPicker({
    width : Ti.UI.FILL,
    selectionIndicator : true,
    first : true
});
var days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO", "TODA LA SEMANA"];

for (var i = 0; i < days.length; i++) {
    dayPicker.add(Ti.UI.createPickerRow({
        title : days[i]
    }));
};

//
// ---------------------------------------------------------------- LOADING -------------------------------------------------
//
var loading = require(Global.Path.CONTROL + 'Loading')();
//loading.show();
//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
button.addEventListener('click', function(){
    Global.Parameters.Configuracion.setViewClients(Global.Parameters.Configuracion.getViewClients() === "C" ? "S" : "C");
    button.setImage('/images/' + ( Global.Parameters.Configuracion.getViewClients() === "S" ? 'maximize_32.png' : 'minimize_32.png'));
    _.each(table.sections[0].getRows(), function(element){
        element.setType();
    });
});


//Los cambios de día
dayPicker.addEventListener('change', function(e) {
    //Los días de la semana en la base de datos.
    var days = ["L", "M", "X", "J", "V", "S", "D", "T"];
    //Vaciamos la tabla
    table.setData(null);
    //Mostramos el mensaje de cargando
    loading.show();
    //Pedimos al controlador los clientes.
    win.fireEvent('fillCustomersDay', {
        dayWeek : days[e.rowIndex]
    });

});

//Click en la tabla
table.addEventListener('click', function(e) {
    actualClient = e.row.getClient();
    actualClient.index = e.index;
    win.fireEvent('tableClick', {
        client : e.row.getClient(),
        table : table
    });
});

//Modifica el searchBar para que el filtro se aplique
search.addEventListener('change', function(e) {
    searchBar.setValue(search.getValue());
});

//
// ---------------------------------------------------------------- GLOBALS EVENTS -------------------------------------------------
//
//Marcamos la fila como que tiene un pedido.
function isOrder() {
    //La fila.
    var row = require(Global.Path.VIEW + 'Pedidos/ClientRow');

    actualClient.hasOrders = true;
    actualClient.state = 'pedido';

    table.updateRow(actualClient.index, row(actualClient));
};
Ti.App.addEventListener('orders:isOrder', isOrder);

//Marcamos la fila como que tiene una incidencia.
function isIncidence() {
    //La fila.
    var row = require(Global.Path.VIEW + 'Pedidos/ClientRow');

    actualClient.hasIncidence = true;
    actualClient.state = 'incidencia';

    table.updateRow(actualClient.index, row(actualClient));
};
Ti.App.addEventListener('orders:isIncidence', isIncidence);

//Marcamos la fila como que NO tiene NADA.
function isNothing() {
    //La fila.
    var row = require(Global.Path.VIEW + 'Pedidos/ClientRow');

    actualClient.hasIncidence = false;
    actualClient.hasOrders = false;
    actualClient.state = undefined;

    table.updateRow(actualClient.index, row(actualClient));
};
Ti.App.addEventListener('orders:isNothing', isNothing);
// Al salir del aparatado "pedidos" quitamos los eventos globales.
Ti.Android.currentActivity.addEventListener('destroy', function(e) {
    Ti.App.removeEventListener('orders:isOrder', isOrder);
    Ti.App.removeEventListener('orders:isIncidence', isIncidence);
    Ti.App.removeEventListener('orders:isNothing', isNothing);
});

//
// ---------------------------------------------------------------- WIN EVENTS -------------------------------------------------
//
win.addEventListener('postlayout', searchEditable);

//Despues de que se forma la ventana.
win.addEventListener('postlayout', function(e) {
    if (!e.source.first) {
        e.source.first = true;
        //loading.show();
        var day = new Date().getDay() - 1;
        //setTimeout(function() {
        //Si es LUNES forzamos el evento "CHANGE" para que rellene los datos.
        if (day == 0) {
            dayPicker.fireEvent('change', {
                rowIndex : 0
            });
        } else {
            dayPicker.setSelectedRow(0, day);
        };
        //}, 500);
    };
});

//Las filas de los clientes del controlador
win.addEventListener('main:clients', function(e) {
    //Escondemos el mensaje de Cargando
    loading.hide();
    //Añadimos las filas a la tabla
    table.setData(e.rows);
});

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
viewDayFilter.add(imageFilter);
viewDayFilter.add(labelDay);
viewDayFilter.add(dayPicker);

viewHeader.add(viewDayFilter);
viewHeader.add(button);

viewHeaderText.add(search);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(headerMenu);
win.add(viewHeader);
win.add(viewHeaderText);
win.add(table);
win.add(loading);

