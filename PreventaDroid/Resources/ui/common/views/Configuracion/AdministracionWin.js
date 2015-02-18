/**
 * @fileOverview En este archivo se crea el punto de menú "Administración".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
win.setLayout("composite");
//La ventana padre
var parentWin = win.parentWin;
//La variable Global
var Global = win.Global;
//El control para crear diferentes filas
var typesRows = Global.Control.TypesRows;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Administración", "Configuración", function(){win.close();});
headerMenu.setTop(0);
//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Body
var viewBody = Ti.UI.createView({
    top : 50,
    height : Ti.UI.FILL,
    width : Ti.UI.FILL
});

//Activiy
var viewActivity = Ti.UI.createView({
    backgroundColor : 'gray',
    // borderRadius : 5,
    // borderWidth : 2,
    // borderColor : 'white',
    opacity : 0,
    height : 50,
    width : 150
});

//
// ---------------------------------------------------------------- ACTIVITY INDICATOR -------------------------------------------------
//
var activityIndicator = Ti.UI.createActivityIndicator({
    color : 'white',
    font : {
        fontFamily : 'Helvetica Neue',
        fontSize : "18ps",
        fontWeight : 'bold'
    },
    message : 'Eliminando...',
    style : Ti.UI.ActivityIndicatorStyle.PLAIN,
    height : Ti.UI.SIZE,
    width : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- ROWS -------------------------------------------------
//
//Cambiar la contraseña del "Administrador"
var changePassword = new typesRows.SingleRow("Cambio de contraseña", "Permite cambiar la contraseña del administrador.");
//Eliminar todas las bases de datos
var delAlldb = new typesRows.SingleRow("Borrar bases de datos", "Elimina todas las bases de datos instaladas en el dispositivo. No se podrán recuperar.");

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
var data = [changePassword.getRow(), delAlldb.getRow()];

var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Cambio de contraseña
changePassword.addEventListener('click', function() {
    new Global.Control.ChangePassword(1);
});

//Borar BBDD
delAlldb.addEventListener('click', function() {
    // var dialog = Ti.UI.createAlertDialog({
        // cancel : 1,
        // buttonNames : ['Eliminar', 'Cancelar'],
        // message : "¿Desea eliminar todas las bases de datos?",
        // title : 'Eliminar bases de datos'
    // });
// 
    // dialog.addEventListener('click', function(e) {
        // //Si presiona "Eliminar" eliminamos las bases de datos.
        // if (e.index === 0) {
            // activityIndicator.show();
            // var a = Ti.UI.createAnimation({
                // duration : 500,
                // opacity : 1
            // });
            // viewActivity.animate(a, function() {
                // var dir = Ti.Filesystem.getFile("file://data/data/" + Ti.App.getId() + "/databases/");
                // var files = dir.getDirectoryListing();
                // var databases = new Array();
                // var aniBack = Ti.UI.createAnimation({
                    // duration : 500,
                    // opacity : 0
                // });
//                 
                // //Nos quedamos con solo las bases de datos que nos interesan.
                // for (var i = 0; i < files.length; i++) {
                    // if (files[i] != Global.ConfigDB.PARAM_NAME && (files[i].slice(0, 3) == "pit" || files[i].slice(0, 3) == "ped")) {
                        // databases.push(files[i]);
                    // };
                // };
//                 
                // //Eliminamos las bases de datos
                // // for (var d=0; d < databases.length; d++) {
                    // // var dbDel = Ti.Database.open(databases[d]);
                    // // dbDel.remove();
                    // // dbDel.close();
                // // };
//                 
                // //Bloqueamos los botones de la vista principal
                // // parentWin.fireEvent('deleteDB');
//                                                 
                // viewActivity.animate(aniBack, function(){
                    // activityIndicator.hide();
                // });
            // });
// 
        // };
    // });
// 
    // dialog.show();

});
//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
viewBody.add(table);

viewActivity.add(activityIndicator);
//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(viewBody);
win.add(viewActivity);
