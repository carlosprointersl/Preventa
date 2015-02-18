/**
 * @fileOverview En este archivo se crea el punto de menú "Parametros". En este archivo interviene el controlador "serie" para
 * editar los datos de la tabla "serie".
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
//serie controller
var serieController = new Global.Controller.Serie();
//La serie actualmente seleccionada
var serie;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Parámetros", "Configuración", function(){win.close();});
//
// ---------------------------------------------------------------- SECTIONS -------------------------------------------------
//
//Número de pedido
var sectionNumOrder = Ti.UI.createTableViewSection({
    headerTitle : 'Número de pedido'
});
//Serie
var sectionSeries = Ti.UI.createTableViewSection({
    headerTitle : 'Configuración de serie'
});

//
// ---------------------------------------------------------------- ROWS -------------------------------------------------
//
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
//Ti.API.info("Serie IVA : " + series[0].iva);
//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
sectionNumOrder.add(textNumOrder.getRow());
sectionSeries.add(pickSeries.getRow());
sectionSeries.add(textNumInvoice.getRow());
sectionSeries.add(chIva.getRow());

var data = [sectionNumOrder, sectionSeries];

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

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(table);
