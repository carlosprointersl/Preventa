/**
 * @fileOverview En este archivo se crea el punto de menú "Artículos".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//La variable Log
var Log = win.log;
//El control para crear diferentes filas
var typesRows = Global.Control.TypesRows;
//Los parámetros
var param = Global.Parameters;
//La función strToBool()
var strToBool = Global.Functions.strToBool;
//La función stringToDate
var strToDate = Global.Functions.strToDate;
//Secciones
var section = new (require(Global.Path.CONTROL + 'Row/SectionRow'))();
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Configuración del preventista", "Principal", function(){win.close();});

//
// ---------------------------------------------------------------- SECTIONS -------------------------------------------------
//
//Configuración
var sectionConfig = section.getRow('Configuración');
//Contraseña
var sectionPassword = section.getRow('Contraseña');
//Fecha envío
var sectionDate = section.getRow('Fecha de envío');

//
// ---------------------------------------------------------------- ROWS -------------------------------------------------
//
//Nombre
var textName = new typesRows.TextRow("Nombre", param.Preventista.getNombre());
//Nº terminal
var textNumTerminal = new typesRows.TextRow("Nº de terminal", param.Preventista.getTerminal(), Ti.UI.KEYBOARD_NUMBER_PAD);

//Fecha preventa
var preSaleDate = new typesRows.DateRow("Fecha preventa", new Date(param.Preventista.getFechaPreventa()));
//Fecha servicio
var serviceDate = new typesRows.DateRow("Fecha servicio", new Date(param.Preventista.getFechaServicio()));

// Password
var changePassword = new typesRows.SingleRow("Cambio de contraseña", "Permite cambiar la contraseña del preventista.");

//Feche de envío
var sendDate = new typesRows.DateRow("Última fecha de envío", new Date(param.Preventista.getFechaEnvio()));

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
sectionConfig.add(textName.getRow());
sectionConfig.add(textNumTerminal.getRow());
sectionConfig.add(preSaleDate.getRow());
sectionConfig.add(serviceDate.getRow());

sectionPassword.add(changePassword.getRow());

sectionDate.add(sendDate.getRow());

var data = [sectionConfig, sectionPassword, sectionDate];

var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Nombre
textName.addEventListener('save', function(e) {
    Log.info("Se cambia el nombre del \"Preventista\". " + param.Preventista.getNombre() + " -> " + e.value);
    textName.setSubTitle(e.value);
    param.Preventista.setNombre(e.value);
    //Cambiamos el preventista del terminal en la vista PRINCIPAL
    win.fireEvent('changePreven', {
        preventista : e.value
    });
});
//Nº terminal
textNumTerminal.addEventListener('save', function(e) {
    textNumTerminal.setSubTitle(e.value);
    //Ruta actual
    var currentRoute = Global.ConfigDB.PIT_NAME.replace("pit", "");
    param.Preventista.setTerminal(e.value);
    Log.info("Se ha cambiado la ruta. \"" + currentRoute + "\" -> \"" + e.value + "\"");
    //Cambiamos el número de terminal en la vista PRINCIPAL
    win.fireEvent('changeRoute', {
        newRoute : e.value
    });
});

//Fecha preventa
preSaleDate.addEventListener('dateTime:value', function(e) {
    Log.info("Se cambia la fecha preventa. " + param.Preventista.getFechaPreventa() + " -> " + Global.Functions.dateFormat(e.value));
    preSaleDate.setSubTitle(Global.Functions.dateFormat(e.value));
    param.Preventista.setFechaPreventa(Global.Functions.dateSQliteFormat(e.value));
});
//Fecha servicio
serviceDate.addEventListener('dateTime:value', function(e) {
    Log.info("Se cambia la fecha servicio. " + param.Preventista.getFechaServicio() + " -> " + Global.Functions.dateFormat(e.value));
    serviceDate.setSubTitle(Global.Functions.dateFormat(e.value));
    param.Preventista.setFechaServicio(Global.Functions.dateSQliteFormat(e.value));
});
//Cambio de contraseña
changePassword.addEventListener('click', function() {
    new Global.Control.ChangePassword(0);
});
//Fecha de envío
sendDate.addEventListener('dateTime:value', function(e) {
    Log.info("La última fecha de envío  -> " + Global.Functions.dateFormat(e.value));
    sendDate.setSubTitle(Global.Functions.dateFormat(e.value));
    param.Preventista.setFechaEnvio(Global.Functions.dateSQliteFormat(e.value));
});
//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(table);
