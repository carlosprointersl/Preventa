/**
 * @fileOverview En este archivo se crea la vista que permite la edición de los parámetros de la aplicación.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//El Log
var Log = win.log;
//El Geoposicionamiento
var Geo = win.geo;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Configuración de la aplicación", "Principal", function() {
    win.close();
});

//
// ---------------------------------------------------------------- FUNCTION FILTER -------------------------------------------------
//
//El filtro que le aplicamos a los ARRAY cuando el usuario es "Preventista"
function filterArray(element, index, array) {
    return element.preventista;
};
//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
//Crea la fila.
function createRow(options) {
    return Ti.UI.createTableViewRow({
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        backgroundSelectedColor : Global.Theme.ROW.PRESS,
        backgroundFocusedColor : Global.Theme.ROW.PRESS,
        backgroundDisabledColor : Global.Theme.ROW.PRESS,
        color : Global.Theme.ROW.TITLE,
        title : options.title, //'Parámetros',
        name : options.name, //'Parametros',
        preventista : options.preventista, //true,
        leftImage : options.leftImage, //'/images/settings_56.png',
        font : options.font /*{
         fontSize : 18
         }*/
    });
};

var data = [createRow({
    title : 'Clientes',
    name : 'Clientes',
    preventista : false,
    leftImage : '/images/customers_56.png',
    font : {
        fontSize : 18
    }
}), createRow({
    title : 'Pedidos',
    name : 'Pedidos',
    preventista : true,
    leftImage : '/images/purchase_order_56.png',
    font : {
        fontSize : 18
    }
}), createRow({
    title : 'GPS',
    name : 'Gps',
    preventista : false,
    leftImage : '/images/satelite_56.png',
    font : {
        fontSize : 18
    }
}), createRow({
    title : 'Otras',
    name : 'Otras',
    preventista : false,
    leftImage : '/images/other_56.png',
    font : {
        fontSize : 18
    }
}), createRow({
    title : 'Informes',
    name : 'Informes',
    preventista : true,
    leftImage : '/images/report_56.png',
    font : {
        fontSize : 18
    }
}), /* createRow({
 title : 'Generación pedidos',
 name : 'Generacion',
 leftImage : Global.Path.IMAGES + 'stock_task.png',
 font : {
 fontSize : 18
 }
 }), */
createRow({
    title : 'FTP',
    name : 'Ftp',
    preventista : false,
    leftImage : '/images/ftp_56.png',
    font : {
        fontSize : 18
    }
}), createRow({
    title : 'IVA y Recargos',
    name : 'Iva',
    preventista : true,
    leftImage : '/images/account_56.png',
    font : {
        fontSize : 18
    }
}), createRow({
    title : 'Administración',
    name : 'Administracion',
    preventista : false,
    leftImage : '/images/administrative_56.png',
    font : {
        fontSize : 18
    }
}), createRow({
    title : 'Edición campos desplegables',
    name : 'Campos',
    preventista : false,
    leftImage : '/images/drop_down_56.png',
    font : {
        fontSize : 18
    }
}), createRow({
    title : 'Temas',
    name : 'Temas',
    preventista : false,
    leftImage : '/images/theme_56.png',
    font : {
        fontSize : 18
    }
}), createRow({
    title : 'Vehículos',
    name : 'Vehiculos',
    preventista : true,
    leftImage : '/images/truck_56.png',
    font : {
        fontSize : 18
    }
})];

//Les añadimos a las filas los datos comunes.
for (var i = 0, j = data.length; i < j; i++) {
    data[i].backgroundColor = Global.Theme.ROW.BACKGROUND;
    data[i].backgroundSelectedColor = Global.Theme.ROW.PRESS;
    data[i].backgroundFocusedColor = Global.Theme.ROW.PRESS;
    data[i].backgroundDisabledColor = Global.Theme.ROW.PRESS;
    data[i].color = Global.Theme.ROW.TITLE;
};

//Aplicamos el filtro cuando es preventista
if (Global.App.TYPE_USER === 1) {
    data = data.filter(filterArray);
};

var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- OPEN WINDOW -------------------------------------------------
//
function openMenuWin(row) {
    //Si ES el apartado de "Temas".
    if (row.name === "Temas") {
        Global.Controller.Tema('index');
    } else if (row.name === "Vehiculos") {
        var winVehicle = require(Global.Path.VIEW + 'Vehiculo/MainWin');
        winVehicle.open();
    } else {
        var winMenu = Ti.UI.createWindow({
            //title : data[index].title,
            backgroundColor : Global.Theme.BACKGROUND,
            layout : 'vertical',
            Global : Global,
            log : win.log,
            geo : win.geo,
            navBarHidden : true,
            url : Global.Path.VIEW + "Configuracion/" + row.name + "Win.js",
            parentWin : win,
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        winMenu.open();
    }
    ;
};
//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
table.addEventListener('click', function(e) {
    openMenuWin(e.row);
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(table);
