/**
 * @fileOverview En este archivo se crea el punto de menú "Envio pedidos".
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
var param = Global.Parameters.Email;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Envío pedido", "Configuración", function(){win.close();});
//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Destinatario
var textTo = new typesRows.TextRow("Destinatario", param.getPara());
//CC
var textCc = new typesRows.TextRow("CC", param.getCc());
//CCO
var textCco = new typesRows.TextRow("CCO", param.getCco());
//Asunto
var textSubject = new typesRows.TextRow("Asunto", param.getAsunto());
//Cuerpo
var textBody = new typesRows.TextRow("Cuerpo", param.getCuerpo());

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
var data = [textTo.getRow(), textCc.getRow(), textCco.getRow(), textSubject.getRow(), textBody.getRow()];

var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Destinatario
textTo.addEventListener('save', function(e) {
    textTo.setSubTitle(e.value);
    param.setPara(e.value);
});
//CC
textCc.addEventListener('save', function(e) {
    textCc.setSubTitle(e.value);
    param.setCc(e.value);
});
//CCO
textCco.addEventListener('save', function(e) {
    textCco.setSubTitle(e.value);
    param.setCco(e.value);
});
//Asunto
textSubject.addEventListener('save', function(e) {
    textSubject.setSubTitle(e.value);
    param.setAsunto(e.value);
});
//Cuerpo
textBody.addEventListener('save', function(e) {
    textBody.setSubTitle(e.value);
    param.setCuerpo(e.value);
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(table);
