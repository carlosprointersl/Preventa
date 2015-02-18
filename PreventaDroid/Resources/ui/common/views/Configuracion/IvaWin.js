/**
 * @fileOverview En este archivo se crea el punto de menú "Iva y recargos".
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
var param = Global.Parameters.IvaRecargo;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("IVA y Recargos", "Configuración", function(){win.close();});
//
// ---------------------------------------------------------------- SECTIONS -------------------------------------------------
//
//IVA
var sectionIva = Ti.UI.createTableViewSection({
    headerTitle : 'Configuración del IVA'
});
//Recargo
var sectionSurcharge = Ti.UI.createTableViewSection({
    headerTitle : 'Configuración del recargo'
});

//
// ---------------------------------------------------------------- ROWS -------------------------------------------------
//
//IVA1
var textIva1 = new typesRows.TextRow("Cantidad del IVA1 en %", param.getIva1());
//IVA2
var textIva2 = new typesRows.TextRow("Cantidad del IVA2 en %", param.getIva2());
//IVA3
var textIva3 = new typesRows.TextRow("Cantidad del IVA3 en %", param.getIva3());
//IVA4
var textIva4 = new typesRows.TextRow("Cantidad del IVA4 en %", param.getIva4());

//Recargo1
var textSurcharge1 = new typesRows.TextRow("Cantidad del RECARGO1", param.getRecargo1());
//Recargo2
var textSurcharge2 = new typesRows.TextRow("Cantidad del RECARGO2", param.getRecargo2());
//Recargo3
var textSurcharge3 = new typesRows.TextRow("Cantidad del RECARGO3", param.getRecargo3());
//Recargo4
var textSurcharge4 = new typesRows.TextRow("Cantidad del RECARGO4", param.getRecargo4());

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
sectionIva.add(textIva1.getRow());
sectionIva.add(textIva2.getRow());
sectionIva.add(textIva3.getRow());
sectionIva.add(textIva4.getRow());

sectionSurcharge.add(textSurcharge1.getRow());
sectionSurcharge.add(textSurcharge2.getRow());
sectionSurcharge.add(textSurcharge3.getRow());
sectionSurcharge.add(textSurcharge4.getRow());

var data = [sectionIva, sectionSurcharge];

var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//IVA 1
textIva1.addEventListener('save', function(e) {
    textIva1.setSubTitle(e.value);
    param.setIva1(e.value);
});
//IVA 2
textIva2.addEventListener('save', function(e) {
    textIva2.setSubTitle(e.value);
    param.setIva2(e.value);
});
//IVA 3
textIva3.addEventListener('save', function(e) {
    textIva3.setSubTitle(e.value);
    param.setIva3(e.value);
});
//IVA 4
textIva4.addEventListener('save', function(e) {
    textIva4.setSubTitle(e.value);
    param.setIva4(e.value);
});
//Recargo 1
textSurcharge1.addEventListener('save', function(e) {
    textSurcharge1.setSubTitle(e.value);
    param.setRecargo1(e.value);
});
//Recargo 2
textSurcharge2.addEventListener('save', function(e) {
    textSurcharge2.setSubTitle(e.value);
    param.setRecargo2(e.value);
});
//Recargo 3
textSurcharge3.addEventListener('save', function(e) {
    textSurcharge3.setSubTitle(e.value);
    param.setRecargo3(e.value);
});
//Recargo 4
textSurcharge4.addEventListener('save', function(e) {
    textSurcharge4.setSubTitle(e.value);
    param.setRecargo4(e.value);
});
//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(table);
