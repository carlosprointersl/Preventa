/**
 * @fileOverview Es la vista "MainWin" del controlador "Clientes".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

//La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//La fila seleccionada
var selectedRow;
//Los clientes con alguna modificación.
var customersEdit = win.customersEdit;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Clientes", "Principal", function() {
    win.close();
});
headerMenu.setTop(0);
//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Head
var viewHead = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    height : 85,
    top : 50,
    width : Ti.UI.FILL,
    layout : 'vertical'
});
//Head-Up
var viewHeadUp = Ti.UI.createView({
    height : '50%',
    width : Ti.UI.FILL,
    layout : 'horizontal'
});
//Head-Down
var viewHeadDown = Ti.UI.createView({
    height : '50%',
    width : Ti.UI.FILL,
});

//Foot
var viewFoot = Ti.UI.createView({
    height : 70,
    bottom : 0,
    width : Ti.UI.FILL,
    layout : 'horizontal'
});

//Body
var viewBody = Ti.UI.createView({
    width : Ti.UI.FILL,
    top : viewHead.height + viewHead.top,
    bottom : viewFoot.height
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
//Buscar por
var labelSearch = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 17
    },
    text : 'Buscar por: ',
    width : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//

//La tabla
var table = Ti.UI.createTableView();
createData(customersEdit);
//
// ---------------------------------------------------------------- LOADING... -------------------------------------------------
//
var loading = require(Global.Path.CONTROL + 'Loading')();

//
// ---------------------------------------------------------------- PICKER -------------------------------------------------
//
var picker = Ti.UI.createPicker();
//Las opciones del desplegable.
var columns = ["Telef. Principal", "Nombre comercial", "Código cliente", "N.I.F."];
//Los campos de la tabla "Clientes". Deben coincidir en posición con las opciones del desplegable.
var filters = ["Telefono1", "NombreComercial", "CodigoCliente", "NIF"];
var dataPicker = new Array();
for (var i = 0; i < columns.length; i++) {
    dataPicker.push(Ti.UI.createPickerRow({
        title : columns[i],
        filter : filters[i]
    }));

};
picker.add(dataPicker);
//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//

var menuButton = require(Global.Path.CONTROL + 'Button/MenuButton');

//Nuevo
var butNew = menuButton("Nuevo", "add-user_48.png", "25%");
//Modificar
var butModify = menuButton("Modificar", "edit-user_48.png", "25%");
//Eliminar
var butDelete = menuButton("Borrar", "remove-user_48.png", "25%");
//Duplicar
var butDuplicate = menuButton("Duplicar", "user-mapping_48.png", "25%");
//Lupa
var butLens = Ti.UI.createButton({
    image : '/images/search_32.png',
    right : 0,
    // height : 40,
    // width : 40
});

//
// ---------------------------------------------------------------- LINES -------------------------------------------------
//
for (var i = 0; i < 3; i++) {
    win.add(Ti.UI.createView({
        backgroundColor : Global.Theme.BACKGROUND,
        bottom : 0,
        height : 70,
        width : 0.5,
        center : {
            x : (25 + (25 * i)) + '%'
        },
        zIndex : 1
    }));
};

//
// ---------------------------------------------------------------- TEXTFIELDS -------------------------------------------------
//
//El TextField que simula a la barra de search
var search = Ti.UI.createTextField({
    hintText : "Busqueda ...",
    left : 0,
    right : 50,
    height : Ti.UI.SIZE,
    first : true,
    keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
    editable : false
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Al cambiar el picker modificamos el teclado a mostrar del TextField
picker.addEventListener('change', function(e) {
    search.setKeyboardType(e.rowIndex === 0 ? Ti.UI.KEYBOARD_NUMBER_PAD : Ti.UI.KEYBOARD_ASCII);
});

//Button NEW
butNew.addEventListener('click', function() {
    win.fireEvent('butNew');
});

//Button Modify
butModify.addEventListener('click', function() {
    if (selectedRow) {
        win.fireEvent('butModify', {
            row : selectedRow
        });
    } else {
        var alert = new Global.Control.Windows.Alert({
            icon : Global.Control.Windows.ICON.INFORMATION,
            title : 'MODIFICAR CLIENTE',
            message : "No ha seleccionado ningún cliente."
        });
        alert.open();
    };
});

//Button Delete
butDelete.addEventListener('click', function() {
    if (selectedRow) {
        //Si no está de BAJA
        if (selectedRow.getClient().Tratado != "BAJA") {
            //Mostramos las filas "tratadas".
            selectedRow.treated = function(clients) {
                win.fireEvent('search:data', {
                    data : clients
                });
            };
            win.fireEvent('butDelete', {
                row : selectedRow
            });
        };
    } else {
        var alert = new Global.Control.Windows.Alert({
            icon : Global.Control.Windows.ICON.INFORMATION,
            title : 'ELIMINAR CLIENTE',
            message : "No ha seleccionado ningún cliente."
        });
        alert.open();
    };
});

//Button Duplicate
butDuplicate.addEventListener('click', function() {
    if (selectedRow) {
        win.fireEvent('butDuplicate', {
            row : selectedRow
        });
    } else {
        var alert = new Global.Control.Windows.Alert({
            icon : Global.Control.Windows.ICON.INFORMATION,
            title : 'DUPLICAR CLIENTE',
            message : "No ha seleccionado ningún cliente."
        });
        alert.open();
    };
});

//Button Lens
butLens.addEventListener('click', function() {
    loading.show();
    win.fireEvent('butLens', {
        filter : picker.getSelectedRow(0).filter,
        value : search.value
    });
});

//Table 'click'
table.addEventListener('click', function(e) {
    //Si hay una fila seleccionada la marcamos.
    if (selectedRow != undefined) {
        selectedRow.click();
    };
    //Si la fila es la actual
    if (selectedRow == e.row) {
        selectedRow = undefined;
    } else {
        selectedRow = e.row;
        selectedRow.index = e.index;
        selectedRow.click();
    };

});

//
// ---------------------------------------------------------------- WIN EVENTS -------------------------------------------------
//
//Postlayout
win.addEventListener('postlayout', showSearch);

// win.addEventListener('open', function(){
    // setTimeout(function(){
        // search.show();
    // },1000) ;
// });

//Win Search Data
win.addEventListener('search:data', function(e) {
    selectedRow = undefined;
    createData(e.data);
    loading.hide();
});

//
// ---------------------------------------------------------------- FUNCTIONS -------------------------------------------------
//
/**
 * Muestra el campo de texto.
 */
function showSearch(){
    search.blur();
    setTimeout(function(){
        search.setEditable(true);
    }, 500);
    win.removeEventListener('postlayout', showSearch);
};

/**
 * Crea las filas para la tabla.
 * @param{Object[]} data El array con los clientes editados.
 */
function createData(data) {
    var dataTable = new Array();
    var row = require(Global.Path.VIEW + 'Clientes/ClientRow');
    for (var i = 0, j = data.length; i < j; i++) {
        dataTable.push(row(data[i]));
    };
    table.setData(dataTable);
};
//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
viewHeadUp.add(labelSearch);
viewHeadUp.add(picker);

viewHeadDown.add(search);
viewHeadDown.add(butLens);

viewHead.add(viewHeadUp);
viewHead.add(viewHeadDown);

viewBody.add(table);

viewFoot.add(butNew);
viewFoot.add(butModify);
viewFoot.add(butDelete);
viewFoot.add(butDuplicate);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(headerMenu);
win.add(viewHead);
win.add(viewBody);
win.add(viewFoot);
win.add(loading);
