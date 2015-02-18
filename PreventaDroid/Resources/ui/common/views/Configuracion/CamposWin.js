/**
 * @fileOverview En este archivo se crea el punto de menú "Administración".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La ventana padre
var parentWin = win.parentWin;
//La variable Global
var Global = win.Global;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Desplegables", "Configuración", function(){win.close();});
//
// ---------------------------------------------------------------- ROWS -------------------------------------------------
//
//Los desplegables a editar.
var dropdowns = [{
    title : 'Tipo de vía',
    image : 'road_56.png'
}, {
    title : 'Tipo de establecimiento',
    image : 'store_56.png'
}, {
    title : 'Tipo de artículo',
    image : 'product_56.png'
}, {
    title : 'Tipo de pago',
    image : 'credit_card_56.png'
}, {
    title : 'Tipo de movimiento',
    image : 'cash_register_56.png'
}, {
    title : 'Tipo de incidencia',
    image : 'warning_56.png'
}, {
    title : 'Serie',
    image : 'system-config_56.png'
}];

//Añadimos los datos de los desplegables para formar una tabla.
var data = new Array();

for (var i = 0, j = dropdowns.length; i < j; i++) {
    data.push({
        title : dropdowns[i].title,
        leftImage : '/images/' + dropdowns[i].image,
        font : {
            fontSize : 18
        },
        color : Global.Theme.ROW.TITLE,
        backgroundColor : Global.Theme.ROW.BACKGROUND
    });
};

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Table 'click'
table.addEventListener('click', function(e) {
    var options;
    switch(e.index) {
        case 0:
            options = {
                type : Global.Class.TypeDropdown.TYPE.VIA,
                title : "Tipo de vía"
            };
            break;
        case 1:
            options = {
                type : Global.Class.TypeDropdown.TYPE.STORE,
                title : "Tipo de establecimiento"
            };
            break;
        case 2:
            options = {
                type : Global.Class.TypeDropdown.TYPE.ITEM,
                title : "Tipo de artículo"
            };
            break;
        case 3:
            options = {
                type : Global.Class.TypeDropdown.TYPE.PAY,
                title : "Tipo de pago"
            };
            break;
        case 4:
            options = {
                type : Global.Class.TypeDropdown.TYPE.MOVEMENT,
                title : "Tipo de movimiento"
            };
            break;
        case 5:
            options = {
                type : Global.Class.TypeDropdown.TYPE.INCIDENCE,
                title : "Tipo de incidencia"
            };
            break;
        case 6:
            options = {
                type : Global.Class.TypeDropdown.TYPE.SERIE,
                title : "Tipo de serie"
            };
            break;
    };
    Global.Class.TypeDropdown.Dropdown(options);
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(table);
