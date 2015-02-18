/**
 * @fileOverview En este archivo se crea el punto de menú "Temas".
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
//La fila con el tema seleccionado.
var themeRow;
//Los temas
var themes = win.themes;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Selección de tema", "Configuración", function(){win.close();});
headerMenu.setTop(0);

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
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
    top : 50,
    bottom : viewFoot.height
});

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
//Los temas para la tabla
var data = new Array();
//La fila
var row = require(Global.Path.VIEW + 'Tema/ThemeRow');
//La fila del título.
var titleRow = require(Global.Path.VIEW + 'Tema/TitleThemeRow');

//Añadimos el título de la sección de temas originales.
data.push(titleRow("Temas originales"));
//Insertamos los temas originales
var i = 0;
for (i; i < themes.length && !Global.Functions.strToBoolSqlite(themes[i].editable); i++) {
    var tmp_row = row(themes[i]);
    //Si el ID coincide con el de la configuración la marcamos como la actual.
    if (Global.Parameters.Configuracion.getTema_id() === themes[i].id) {
        tmp_row.setHasCheck(true);
        themeRow = tmp_row;
    };

    data.push(tmp_row);
};

//Añadimos el título de la sección de temas personalizados.
data.push(titleRow("Temas personalizados"));
//Insertamos los temas personalizados, si los hay.
for (i; i < themes.length; i++) {
    var tmp_row = row(themes[i]);
    //Si el ID coincide con el de la configuración la marcamos como la actual.
    if (Global.Parameters.Configuracion.getTema_id() === themes[i].id) {
        tmp_row.setHasCheck(true);
        themeRow = tmp_row;
    };

    data.push(tmp_row);
};

//La tabla
var table = Ti.UI.createTableView({
    data : data
});

//
// ---------------------------------------------------------------- LOADING... -------------------------------------------------
//
var loading = require(Global.Path.CONTROL + 'Loading')();

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
var menuButton = require(Global.Path.CONTROL + 'Button/MenuButton');

//Añadir
var butAdd = menuButton("Añadir", "edit_add_48.png", "20%");
//Modificar
var butModify = menuButton("Modificar", "document-edit_48.png", "20%");
//Eliminar
var butDelete = menuButton("Eliminar", "edit_remove_48.png", "20%");
//Duplicar
var butDuplicate = menuButton("Duplicar", "copy_48.png", "20%");
//Seleccionar
var butSelect = menuButton("Seleccionar", "check_48.png", "20%");

//
// ---------------------------------------------------------------- LINES -------------------------------------------------
//
for (var i = 0; i < 5; i++) {
    win.add(Ti.UI.createView({
        backgroundColor : Global.Theme.BACKGROUND,
        bottom : 0,
        height : 70,
        width : 0.5,
        center : {
            x : (20 + (20 * i)) + '%'
        },
        zIndex : 1
    }));
};

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Button NEW
butAdd.addEventListener('click', function() {
    win.fireEvent('butAdd');
});

//Button Modify
butModify.addEventListener('click', function() {
    if (selectedRow) {
        //Miramos se es editable.
        if (Global.Functions.strToBoolSqlite(selectedRow.getTheme().editable)) {
            win.fireEvent('butModify', {
                theme : selectedRow.getTheme()
            });
        } else {
            var alert = new Global.Control.Windows.Alert({
                icon : Global.Control.Windows.ICON.EXCLAMATION,
                title : 'TEMA NO EDITABLE',
                message : "Este tema no se puede modificar."
            });
            alert.open();
        };
    } else {
        var alert = new Global.Control.Windows.Alert({
            icon : Global.Control.Windows.ICON.INFORMATION,
            title : 'MODIFICAR TEMA',
            message : "No ha seleccionado ningún tema."
        });
        alert.open();
    };
});

//Button Delete
butDelete.addEventListener('click', function() {
    if (selectedRow) {
        //Si es NO ES EDITABLE, es un ORIGINAL.
        if (Global.Functions.strToBoolSqlite(selectedRow.getTheme().editable)) {
            //SI NO es el tema actual
            if (selectedRow.getTheme().id != Global.Parameters.Configuracion.getTema_id()) {
                win.fireEvent('butDelete', {
                    theme : selectedRow.getTheme()
                });
            } else {
                var alert = new Global.Control.Windows.Alert({
                    icon : Global.Control.Windows.ICON.EXCLAMATION,
                    title : 'TEMA ACTUAL',
                    message : "Este tema no se puede eliminar. Es el tema actual."
                });
                alert.open();
            };
        } else {
            var alert = new Global.Control.Windows.Alert({
                icon : Global.Control.Windows.ICON.EXCLAMATION,
                title : 'TEMA ORIGINAL',
                message : "Este tema no se puede eliminar."
            });
            alert.open();
        };

    } else {
        var alert = new Global.Control.Windows.Alert({
            icon : Global.Control.Windows.ICON.INFORMATION,
            title : 'ELIMINAR TEMA',
            message : "No ha seleccionado ningún tema."
        });
        alert.open();
    };
});

//Button Duplicate
butDuplicate.addEventListener('click', function() {
    if (selectedRow) {
        win.fireEvent('butDuplicate', {
            theme : selectedRow.getTheme()
        });
    } else {
        var alert = new Global.Control.Windows.Alert({
            icon : Global.Control.Windows.ICON.INFORMATION,
            title : 'DUPLICAR TEMA',
            message : "No ha seleccionado ningún tema."
        });
        alert.open();
    };
});

//Button Select
butSelect.addEventListener('click', function() {
    if (selectedRow) {
        //Si el tema selecciona NO ES el actual.
        if (selectedRow.getTheme().id != Global.Parameters.Configuracion.getTema_id()) {
            var alert = new Global.Control.Windows.Alert({
                icon : Global.Control.Windows.ICON.QUESTION,
                title : 'SELECCIONAR TEMA',
                message : "¿Seguro que desea cambiar al tema \"" + selectedRow.getTheme().nombre + "\"?",
                buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
            });

            alert.addEventClickButton("accept", function() {
                themeRow.setHasCheck(false);
                selectedRow.setHasCheck(true);
                win.fireEvent('butSelect', {
                    theme : selectedRow.getTheme()
                });
                selectedRow.click();
                selectedRow = null;
            });

            alert.open();
        };
    } else {
        var alert = new Global.Control.Windows.Alert({
            icon : Global.Control.Windows.ICON.INFORMATION,
            title : 'SELECCIONAR TEMA',
            message : "No ha seleccionado ningún tema."
        });
        alert.open();
    };
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
//Añade un tema a la tabla.
win.addEventListener('appendTheme', function(e) {
    table.appendRow(row(e.theme));
});

//Actualiza un tema a la tabla.
win.addEventListener('updateTheme', function() {
    table.updateRow(table.sections[0].rows.indexOf(selectedRow), row(selectedRow.getTheme()));
});

//Elimina un tema de la tabla.
win.addEventListener('deleteTheme', function(e) {
    table.deleteRow(selectedRow);
    selectedRow = null;
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//

viewBody.add(table);

viewFoot.add(butAdd);
viewFoot.add(butModify);
viewFoot.add(butDelete);
viewFoot.add(butDuplicate);
viewFoot.add(butSelect);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(headerMenu);
win.add(viewBody);
win.add(viewFoot);
win.add(loading);
