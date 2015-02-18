/**
 * @fileOverview Es la vista CustomerData para la edición de Clientes.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
var global = win.global;
var row = win.row;
//La fila con los datos a modificar. Si está vacía será un registro nuevo.

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//AllView
var viewAll = Ti.UI.createView({
	height : Ti.UI.FILL,
	width : Ti.UI.FILL
});

//Body
var viewBody = Ti.UI.createScrollView({
	contentHeight : 'auto',
	height : Ti.UI.FILL,
	layout : 'vertical',
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : false,
	scrollType : 'vertical',
	top : 0
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
viewBody.add(new (require(global.Path.VIEW + 'Prepedido/SelectItem/select'))(global));
viewBody.add(new (require(global.Path.VIEW + 'Prepedido/SelectItem/quantity'))(global));

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
viewAll.add(viewBody);

win.add(viewAll);

