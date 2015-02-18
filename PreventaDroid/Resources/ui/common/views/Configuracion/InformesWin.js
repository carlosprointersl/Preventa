/**
 * @fileOverview En este archivo se crea el punto de menú "Informes".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//El control para crear diferentes filas
var typesRows = Global.Control.TypesRows;
//Los parámetros
var paramConfig = Global.Parameters.Configuracion;
//Los parámetros
var paramEmail = Global.Parameters.Email;
//Función pasar "Y"-"N" -> Boolean
var strToBool = Global.Functions.strToBoolSqlite;
//Función pasar Boolean -> "Y"-"N"
var boolToStrSqlite = Global.Functions.boolToStrSqlite;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Informes", "Configuración", function() {
    win.close();
});

//
// ---------------------------------------------------------------- SECTIONS -------------------------------------------------
//
//General
var sectionGeneral = Ti.UI.createTableViewSection({
    headerTitle : 'Configuración general'
});
//Artículos
var sectionSend = Ti.UI.createTableViewSection({
    headerTitle : 'Configuración del envío del informe'
});

//
// ---------------------------------------------------------------- ROWS -------------------------------------------------
//
//Tipo de imforme
var pickOptions = ["Pedido de bebidas", "Pedido de snacks"];
//var pickReport = new typesRows.PickerRow("Tipo informe de salida", paramConfig.getTipoInforme() == "B" ? pickOptions[0] : pickOptions[1], pickOptions, "Tipo de envío");
//Mostrar datos enviados
var chDataShow = new typesRows.CheckRow("Mostrar datos enviados", "Indica si se deben mostrar los datos ya enviados en un informe anterior para poder incluirlos en el nuevo informe a enviar.", strToBool(paramConfig.getMostrarEnviados()));
//Destinatario
var textTo = new typesRows.TextRow("Destinatario", paramEmail.getPara());
//CC
var textCc = new typesRows.TextRow("CC", paramEmail.getCc());
//CCO
var textCco = new typesRows.TextRow("CCO", paramEmail.getCco());
//Asunto
var textSubject = new typesRows.TextRow("Asunto", paramEmail.getAsunto());
//Cuerpo
var textBody = new typesRows.TextRow("Cuerpo", paramEmail.getCuerpo());

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
sectionGeneral.add(chDataShow.getRow());

sectionSend.add(textTo.getRow());
sectionSend.add(textCc.getRow());
sectionSend.add(textCco.getRow());
sectionSend.add(textSubject.getRow());
sectionSend.add(textBody.getRow());

var data = [sectionGeneral, sectionSend];

var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Mostrar enviados - Modificamos el valor del CHECKBOX
chDataShow.addEventListener('change', function(e) {
    paramConfig.setMostrarEnviados(boolToStrSqlite(e.value));
});

//Preventa, Autoventa y Repartidor
// pickReport.addEventListener('click', function(e) {
// pickReport.setSubTitle(pickOptions[e.index]);
// if (e.index == 0) {
// paramConfig.setTipoInforme(boolToStrSqlite("B"));
// } else {
// paramConfig.setTipoInforme(boolToStrSqlite("S"));
// };
// });
//Destinatario
textTo.addEventListener('save', function(e) {
    textTo.setSubTitle(e.value);
    paramEmail.setPara(e.value);
});
//CC
textCc.addEventListener('save', function(e) {
    textCc.setSubTitle(e.value);
    paramEmail.setCc(e.value);
});
//CCO
textCco.addEventListener('save', function(e) {
    textCco.setSubTitle(e.value);
    paramEmail.setCco(e.value);
});
//Asunto
textSubject.addEventListener('save', function(e) {
    textSubject.setSubTitle(e.value);
    paramEmail.setAsunto(e.value);
});
//Cuerpo
textBody.addEventListener('save', function(e) {
    textBody.setSubTitle(e.value);
    paramEmail.setCuerpo(e.value);
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(table);
