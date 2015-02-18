/**
 * @fileOverview Es la vista MainWin del controlador Pedido.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La libreria underscoje.js 
 */
var _ = require('/lib/underscore');

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global.
var Global = win.Global;
// Los pedidos del cliente.
var dates = win.dates;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Últimos pedidos", "Pedido", function() {
    win.close();
});

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Head
var viewHead = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    height : 50,
    width : Ti.UI.FILL
});

//Filtro día
var viewDayFilter = Ti.UI.createView({
    layout : 'horizontal',
    left : 0,
    right : 51
    
});

//Los nombres de los campos
var viewTitlesFields = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    height : Ti.UI.SIZE,
    width : Ti.UI.FILL,
    layout : 'horizontal'
});

//Las columnas
var labelsTitleName = ['Código', 'Cantidad', 'Precio', 'Descuento', 'P.U.'];
//Ponemos los datos.
for (var i = 0; i < labelsTitleName.length; i++) {
    viewTitlesFields.add(Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 13
        },
        text : labelsTitleName[i],
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        height : Ti.UI.FILL,
        width : '20%'
    }));
};

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
var button = Ti.UI.createButton({
    image : '/images/' + ( Global.Parameters.Configuracion.getViewLastOrders() === "S" ? 'maximize_32.png' : 'minimize_32.png'),
    width : viewHead.getHeight(),
    height : viewHead.getHeight(),
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
//Filtro por fecha
var labelDate = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 20
    },
    text : 'Fecha',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- TABLE VIEW -------------------------------------------------
//

var table = Ti.UI.createTableView();

//
// ---------------------------------------------------------------- PICKERS -------------------------------------------------
//
//DAY PICKER
var dayPicker = Ti.UI.createPicker({
    width : Ti.UI.FILL,
    selectionIndicator : true,
    first : true
});

for (var i = 0; i < dates.length; i++) {
    dayPicker.add(Ti.UI.createPickerRow({
        title : dates[i]
    }));
};

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
button.addEventListener('click', function(){
    Global.Parameters.Configuracion.setViewLastOrders(Global.Parameters.Configuracion.getViewLastOrders() === "C" ? "S" : "C");
    button.setImage('/images/' + ( Global.Parameters.Configuracion.getViewLastOrders() === "S" ? 'maximize_32.png' : 'minimize_32.png'));
    _.each(table.sections[0].getRows(), function(element){
        element.setType();
    });
});

//Los cambios de día
dayPicker.addEventListener('change', function(e) {
    //fillOrdersDate(e.rowIndex);
    win.fireEvent('fillOrders', {
        date : e.row.getTitle()
    });
});

//Cuando es la primera vez marcamos el día actual
dayPicker.addEventListener('postlayout', function(e) {
    if (dayPicker.first) {
        dayPicker.first = false;
        win.fireEvent('fillOrders', {
            date : dates[0]
        });
    };
});

//
// ---------------------------------------------------------------- WIN EVENTS -------------------------------------------------
//
//Retorna las filas a mostrar.
win.addEventListener('returnOrders', function(o) {
    table.setData(o.orders);
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
viewDayFilter.add(imageFilter);
viewDayFilter.add(labelDate);
viewDayFilter.add(dayPicker);

viewHead.add(viewDayFilter);
viewHead.add(button);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(headerMenu);
win.add(viewHead);
win.add(viewTitlesFields);
win.add(table);
