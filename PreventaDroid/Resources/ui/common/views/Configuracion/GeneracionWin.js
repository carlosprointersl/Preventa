/**
 * @fileOverview En este archivo se crea el punto de menú "Generación de pedido".
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

//
// ---------------------------------------------------------------- ROWS -------------------------------------------------
//
//Vendedor
var textSeller = new typesRows.TextRow("Vendedor", param.getVendedor());
//Punto de entrega
var textSale = new typesRows.TextRow("Punto de entrega", param.getPuntoVenta());
//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
var data = [textSeller.getRow(), textSale.getRow()];

var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Vendedor
textSeller.addEventListener('save', function(e) {
    textSeller.setSubTitle(e.value);
    param.setVendedor(e.value);
});
//Punto de entrega
textSale.addEventListener('save', function(e) {
    textSale.setSubTitle(e.value);
    param.setPuntoVenta(e.value);
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(table);
