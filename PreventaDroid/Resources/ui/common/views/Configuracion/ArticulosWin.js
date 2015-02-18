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
//El control para crear diferentes filas
var typesRows = Global.Control.TypesRows;
//Los parámetros
var param = Global.Parameters.Configuracion;
//Función pasar "Y"-"N" -> Boolean
var strToBool = Global.Functions.strToBoolSqlite;
//Función pasar Boolean -> "Y"-"N"
var boolToStrSqlite = Global.Functions.boolToStrSqlite;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Artículos", "Configuración", function(){win.close();});
//
// ---------------------------------------------------------------- SECTIONS -------------------------------------------------
//
/*
//Campos de producto
var sectionFields = Ti.UI.createTableViewSection({
    headerTitle : 'Campos de producto'
});
//Decimales
var sectionDecimals = Ti.UI.createTableViewSection({
    headerTitle : 'Número de decimales'
});
//Otras
var sectionOthers = Ti.UI.createTableViewSection({
    headerTitle : 'Otras opciones'
});*/

//
// ---------------------------------------------------------------- ROWS -------------------------------------------------
//
//Mensaje de los CHECKBOXS
var subTitle = "Permite modificar el campo '%s' al añadir o modificar un artículo a un pedido.";
//Precio
var chPrice = new typesRows.CheckRow("Modificar precio del artículo", String.format(subTitle, "Precio"), strToBool(param.getModifPrecio()));
//Regalo
var chGift = new typesRows.CheckRow("Modificar regalo del artículo", String.format(subTitle, "Regalo"), strToBool(param.getModifRegalo()));
//Dto1
var chDto1 = new typesRows.CheckRow("Modificar Dto1 del artículo", String.format(subTitle, "Dto Fijo"), strToBool(param.getModifDto1()));
//Dto2
var chDto2 = new typesRows.CheckRow("Modificar Dto2 del artículo", String.format(subTitle, "Dto Especial"), strToBool(param.getModifDto2()));

/*var pickOptions = ["1", "2", "3", "4"];
//Número decimales cantidad
var pickQuantity = new typesRows.PickerRow("Nº decimales en cantidad", param.getDecimalesCantidad(), pickOptions, "Nº decimales cantidad");
//Número decimales precio
var pickPrice = new typesRows.PickerRow("Nº decimales en precio", param.getDecimalesPrecio(), pickOptions, "Nº decimales precio");

//Control de ofertas
var chDeals = new typesRows.CheckRow("Control de ofertas", "Da prioridad a los descuentos en detrimento de las ofertas.", strToBool(param.getControlOfertas()));
//Dtos + ofertas
var chDtoDeals = new typesRows.CheckRow("Descuentos + ofertas", "Permite seleccionar una oferta aunque el artículo tenga un descuento para el cliente.", strToBool(param.getDtosOfertas()));
*/
//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
/*
sectionFields.add(chPrice.getRow());
sectionFields.add(chGift.getRow());
sectionFields.add(chDto1.getRow());
sectionFields.add(chDto2.getRow());

sectionDecimals.add(pickQuantity.getRow());
sectionDecimals.add(pickPrice.getRow());
 
sectionOthers.add(chDeals.getRow());
sectionOthers.add(chDtoDeals.getRow());

var data = [sectionFields, sectionDecimals, sectionOthers];*/
var data = [chPrice.getRow(), chGift.getRow(), chDto1.getRow(), chDto2.getRow()];

var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Precio
chPrice.addEventListener('change', function(e){
    param.setModifPrecio(boolToStrSqlite(e.value));
});
//Regalo
chGift.addEventListener('change', function(e){
    param.setModifRegalo(boolToStrSqlite(e.value));
});
//Dto1
chDto1.addEventListener('change', function(e){
    param.setModifDto1(boolToStrSqlite(e.value));
});
//Dto2
chDto2.addEventListener('change', function(e){
    param.setModifDto2(boolToStrSqlite(e.value));
});
/*
//Decimales en la cantidad
pickQuantity.addEventListener('click', function(e) {
    pickQuantity.setSubTitle(pickOptions[e.index]);
    param.setDecimalesCantidad(pickOptions[e.index]);
});
//Decimales en el precio
pickPrice.addEventListener('click', function(e) {
    pickPrice.setSubTitle(pickOptions[e.index]);
    param.setDecimalesPrecio(pickOptions[e.index]);
});

//Control de ofertas
chDeals.addEventListener('change', function(e){
    param.setControlOfertas(boolToStrSqlite(e.value));
});
//Dto + ofertas
chDtoDeals.addEventListener('change', function(e){
    param.setDtosOfertas(boolToStrSqlite(e.value));
});
*/
//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(table);
