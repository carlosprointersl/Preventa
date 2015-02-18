/**
 * @fileOverview En este archivo se crea el punto de menú "Pedidos".
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
var param = Global.Parameters;
//Función pasar "Y"-"N" -> Boolean
var strToBool = Global.Functions.strToBoolSqlite;
//Función pasar Boolean -> "Y"-"N"
var boolToStrSqlite = Global.Functions.boolToStrSqlite;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Pedidos", "Configuración", function(){win.close();});
//
// ---------------------------------------------------------------- ROWS -------------------------------------------------
//
//Tarifas
var chRate = new typesRows.CheckRow("Seleccionar tarifas", "Indica si se debe seleccionar la tarifa a la que pertenece un cliente a la hora de realizar el pedido.", strToBool(param.Configuracion.getControlTarifas()));
//Precio unitario
var chUnitPrice = new typesRows.CheckRow("Mostrar precio unitario", "Indica si se debe mostrar el precio unitario al seleccionar un artículo en el grid de pedido.", strToBool(param.Configuracion.getMostrarPrecioU()));
//Impresión papel continuo
// var chPrint = new typesRows.CheckRow("Impresión papel continuo", "Indica si la impresión se realiza en papel continuo.", strToBool(param.Configuracion.getPapelContinuo()));
//Impresión cabecera
// var chPrintHeader = new typesRows.CheckRow("Impresión de la cabecera", "Indica si en la impresión se debe añadire la cabecera.", strToBool(param.Configuracion.getImpresionCabecera()));
//Salto de página
// var chPage = new typesRows.CheckRow("Salto de página", "Se utiliza para evitar una página en blanco en algunas impresoras.", strToBool(param.Configuracion.getSaltoPagina()));
//Modificar pedidos guardados
var chModify = new typesRows.CheckRow("Modificar pedidos guardados", "Indica si se pueden modificar los pedidos anteriores.", strToBool(param.Configuracion.getModifPedido()));
//Líneas de detalle
// var textLines = new typesRows.TextRow("Líneas de detalle", param.Configuracion.getLineasDetalle());
//Líneas cabecera impresion
// var textHeader = new typesRows.TextRow("Líneas cab. impresa", param.Configuracion.getLineasCabImpresion());

//Puerto de impresión
// var pickOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// var pickPort = new typesRows.PickerRow("Puerto de impresión", param.Configuracion.getPuertoImpresion(), pickOptions, "Puerto impresión");
//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
var data = [chRate.getRow(), chUnitPrice.getRow(), chModify.getRow()];//chPrint.getRow(), chPrintHeader.getRow(), chPage.getRow(), chModify.getRow(), textLines.getRow(), textHeader.getRow(), pickPort.getRow()];

var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Selección de tarifas
chRate.addEventListener('change', function(e){
    param.Configuracion.setControlTarifas(boolToStrSqlite(e.value));
});
//Precio unitario
chUnitPrice.addEventListener('change', function(e){
    param.Configuracion.setMostrarPrecioU(boolToStrSqlite(e.value));
});
/*
//Impresión papel continuo
chPrint.addEventListener('change', function(e){
    param.Configuracion.setPapelContinuo(boolToStrSqlite(e.value));
});
//Impresión cabecera
chPrintHeader.addEventListener('change', function(e){
    param.Configuracion.setImpresionCabecera(boolToStrSqlite(e.value));
});
//Salto de página
chPage.addEventListener('change', function(e){
    param.Configuracion.setSaltoPagina(boolToStrSqlite(e.value));
});*/
//Modificar pedidos guardados
chModify.addEventListener('change', function(e){
    param.Configuracion.setModifPedido(boolToStrSqlite(e.value));
});
/*
//Líneas de detalle
textLines.addEventListener('save', function(e) {
    textLines.setSubTitle(e.value);
    param.Configuracion.setLineasDetalle(e.value);
});
//Líneas cabecera impresion
textHeader.addEventListener('save', function(e) {
    textHeader.setSubTitle(e.value);
    param.Configuracion.setLineasCabImpresion(e.value);
});

//Puerto de impresión
pickPort.addEventListener('click', function(e) {
    pickPort.setSubTitle(pickOptions[e.index]);
    param.Configuracion.setPuertoImpresion(pickOptions[e.index]);
});
*/
//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(table);
