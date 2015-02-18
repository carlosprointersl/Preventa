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
//serie controller
var serieController = new Global.Controller.Serie();
//La serie actualmente seleccionada
var serie;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Pedidos", "Configuración", function() {
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
var sectionArticles = Ti.UI.createTableViewSection({
    headerTitle : 'Configuración de los artículos'
});
//Pedido
var sectionOrder = Ti.UI.createTableViewSection({
    headerTitle : 'Configuración datos del pedido'
});

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

//Mensaje de los CHECKBOXS
var subTitle = "Permite modificar el campo '%s' al añadir o modificar un artículo a un pedido.";
//Precio
var chPrice = new typesRows.CheckRow("Modificar precio del artículo", String.format(subTitle, "Precio"), strToBool(param.Configuracion.getModifPrecio()));
//Regalo
var chGift = new typesRows.CheckRow("Modificar regalo del artículo", String.format(subTitle, "Regalo"), strToBool(param.Configuracion.getModifRegalo()));
//Dto1
var chDto1 = new typesRows.CheckRow("Modificar Dto1 del artículo", String.format(subTitle, "Dto Fijo"), strToBool(param.Configuracion.getModifDto1()));
//Dto2
var chDto2 = new typesRows.CheckRow("Modificar Dto2 del artículo", String.format(subTitle, "Dto Especial"), strToBool(param.Configuracion.getModifDto2()));

//Puerto de impresión
// var pickOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// var pickPort = new typesRows.PickerRow("Puerto de impresión", param.Configuracion.getPuertoImpresion(), pickOptions, "Puerto impresión");

//Número de pedido
var textNumOrder = new typesRows.TextRow("Número pedido", param.Configuracion.getNumPedido());

//Serie
var series = serieController.getSeries();
serie = series[0];
var pickOptions = new Array();
for (var i = 0, j = series.length; i < j; i++) {
    pickOptions.push(series[i].nombre);
};

var pickSeries = new typesRows.PickerRow("Serie", pickOptions[0], pickOptions, "Tipo de series");
//Número factura
var textNumInvoice = new typesRows.TextRow("Número de factura", series[0].numFactura);
//IVA
var chOptions = ["Activar el IVA a la factura", "Desactivar el IVA a la factura"];
var chIva = new typesRows.CheckRow("Aplicar IVA a la factura", series[0].iva === "Y" ? chOptions[1] : chOptions[0], Global.Functions.strToBoolSqlite(series[0].iva));
//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//

sectionGeneral.add(chRate.getRow());
sectionGeneral.add(chUnitPrice.getRow());
sectionGeneral.add(chModify.getRow());

//Los datos de la tabla
var data = [sectionOrder];

    sectionArticles.add(chPrice.getRow());
    sectionArticles.add(chGift.getRow());
    sectionArticles.add(chDto1.getRow());
    sectionArticles.add(chDto2.getRow());

    sectionOrder.add(textNumOrder.getRow());
    sectionOrder.add(pickSeries.getRow());
    sectionOrder.add(textNumInvoice.getRow());
    sectionOrder.add(chIva.getRow());
    
    data = [sectionOrder, sectionGeneral, sectionArticles];


// var data = [chRate.getRow(), chUnitPrice.getRow(), chModify.getRow()];//chPrint.getRow(), chPrintHeader.getRow(), chPage.getRow(), chModify.getRow(), textLines.getRow(), textHeader.getRow(), pickPort.getRow()];

var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//

function eventSave(e) {
    textNumInvoice.setSubTitle(e.value);
    serie.numFactura = e.value;
    serieController.saveSerie(serie);
};

//Número de pedido
textNumOrder.addEventListener('save', function(e) {
    textNumOrder.setSubTitle(e.value);
    param.Configuracion.setNumPedido(e.value);
});

//Número de factura
textNumInvoice.addEventListener('save', eventSave);

//Serie
pickSeries.addEventListener('click', function(e) {
    serie = series[e.index];
    pickSeries.setSubTitle(pickOptions[e.index]);
    textNumInvoice = new typesRows.TextRow("Número de factura", serie.numFactura);
    textNumInvoice.addEventListener('save', eventSave);
    table.updateRow(2, textNumInvoice.getRow());
    //textNumInvoice.setSubTitle(serie.numFactura);
    chIva.setValueCheck(Global.Functions.strToBoolSqlite(serie.iva));
});

//IVA - Modificamos el valor del CHECKBOX
chIva.addEventListener('change', function(e) {
    chIva.setSubTitle(e.value ? chOptions[1] : chOptions[0]);
    serie.iva = Global.Functions.boolToStrSqlite(e.value);
    serieController.saveSerie(serie);
});

//Selección de tarifas
chRate.addEventListener('change', function(e) {
    param.Configuracion.setControlTarifas(boolToStrSqlite(e.value));
});
//Precio unitario
chUnitPrice.addEventListener('change', function(e) {
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
chModify.addEventListener('change', function(e) {
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

//Precio
chPrice.addEventListener('change', function(e) {
    param.Configuracion.setModifPrecio(boolToStrSqlite(e.value));
});
//Regalo
chGift.addEventListener('change', function(e) {
    param.Configuracion.setModifRegalo(boolToStrSqlite(e.value));
});
//Dto1
chDto1.addEventListener('change', function(e) {
    param.Configuracion.setModifDto1(boolToStrSqlite(e.value));
});
//Dto2
chDto2.addEventListener('change', function(e) {
    param.Configuracion.setModifDto2(boolToStrSqlite(e.value));
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(table);
