/**
 * @fileOverview En este archivo se crea el punto de menú "Clientes".
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
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Clientes", "Configuración", function(){win.close();});
//
// ---------------------------------------------------------------- ROWS -------------------------------------------------
//
//Mostrar cliente tiene DTO
var chDto = new typesRows.CheckRow("Mostrar si el cliente tiene descuento", "Indica si se debe mostrar que el cliente tiene descuento al seleccionarlo.", strToBool(param.getTieneDto()));
//Plantilla alta
var chTemplate = new typesRows.CheckRow("Edición de plantillas", "Indica si se permiten crear/editar plantillas en los datos de los clientes.", strToBool(param.getControlPlantillas()));
//Dtos + ofertas
var chDtoDeals = new typesRows.CheckRow("Descuentos + ofertas", "Permite seleccionar una oferta aunque el artículo tenga un descuento para el cliente.", strToBool(param.getDtosOfertas()));

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
var data = [chDto.getRow(), chTemplate.getRow(), chDtoDeals.getRow()];

var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Mostrar clientes tienen DTO
chDto.addEventListener('change', function(e){
    param.setTieneDto(boolToStrSqlite(e.value));
});
//Plantilla alta
chTemplate.addEventListener('change', function(e){
    param.setControlPlantillas(boolToStrSqlite(e.value));
});
//Dto + ofertas
chDtoDeals.addEventListener('change', function(e){
    param.setDtosOfertas(boolToStrSqlite(e.value));
});
//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(table);
