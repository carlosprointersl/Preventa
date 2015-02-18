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
//La clase FTP para realizar la descarga.
var Ftp = require(Global.Path.CLASSES + 'Ftp');
//El control para crear diferentes filas
var typesRows = Global.Control.TypesRows;
//Los parámetros
var param = Global.Parameters.Ftp;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("FTP", "Configuración", function(){win.close();});
//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Servidor
var textServer = new typesRows.TextRow("Servidor", param.getServidor());
//Puerto
var textPort = new typesRows.TextRow("Puerto", param.getPuerto());
//Usuario
var textUser = new typesRows.TextRow("Usuario", param.getUsuario());
//Password
var textPass = new typesRows.TextRow("Password", param.getPassword());
//Test
var rowTest = new typesRows.SingleRow("Test de conexión", "Realiza una test para comprobar que los datos son correctos");

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
var data = [textServer.getRow(), textPort.getRow(), textUser.getRow(), textPass.getRow(), rowTest.getRow()];

var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Servidor
textServer.addEventListener('save', function(e) {
    textServer.setSubTitle(e.value);
    param.setServidor(e.value);
});
//Puerto
textPort.addEventListener('save', function(e) {
    textPort.setSubTitle(e.value);
    param.setPuerto(e.value);
});
//Usuario
textUser.addEventListener('save', function(e) {
    textUser.setSubTitle(e.value);
    param.setUsuario(e.value);
});
//Pass
textPass.addEventListener('save', function(e) {
    textPass.setSubTitle(e.value);
    param.setPassword(e.value);
});
//Test
rowTest.addEventListener('click', function(e){
    Ftp.test();
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(table);
