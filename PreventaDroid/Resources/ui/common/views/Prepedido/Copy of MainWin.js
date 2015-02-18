/**
 * @fileOverview En este archivo se crea el formulario para crear/editar los parámetros.
 *
 * @author Juan Carlos Matilla
 * @version 1.0
 *
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
var global = win.global;

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
// la view de cabecera
var viewHead = Ti.UI.createView({
	layout : 'horizontal',
	width : Ti.UI.FILL,
	height : Ti.UI.SIZE
});

// la view del cuerpo
var viewBody = Ti.UI.createView({
	layout : 'vertical',
	width : Ti.UI.FILL,
	height : Ti.UI.FILL
});

// la view de la tabla
var viewTable = Ti.UI.createView({
	width : Ti.UI.FILL,
	height : '90%'
});

// La vies de la cabecera y el cuerpo juntos.
var viewHeadBody = Ti.UI.createView({
	layout : 'vertical',
	height : '75%'
});

// la view del pie
var viewFoot = Ti.UI.createView({
	layout : 'horizontal',
	width : Ti.UI.FILL,
	height : Ti.UI.SIZE
});

//View Buttons
var viewButtons = Ti.UI.createView({
	layout : 'horizontal',
	width : Ti.UI.FILL
});

// la view del pie-izquierdo
var viewFootLeft = Ti.UI.createView({
	layout : 'vertical',
	width : '50%',
	height : Ti.UI.SIZE
});

// la view del pie-derecho
var viewFootRight = Ti.UI.createView({
	layout : 'vertical',
	width : '50%',
	height : Ti.UI.SIZE
});

// la view de cabecera-izquierda
var viewHeadLeft = Ti.UI.createView({
	layout : 'vertical',
	width : '70%',
	height : Ti.UI.SIZE
});

// la view de cabecera-derecha
var viewHeadRight = Ti.UI.createView({
	layout : 'vertical',
	width : '30%',
	height : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- LABEL -------------------------------------------------
//
// la etiqueta del nº de pedido
var labelNumOrder = Ti.UI.createLabel({
	color : '#FFFFFF',
	left : 0,
	font : {
		fontSize : 14
	},
	text : 'Pedido :   57',
	//textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

// la etiqueta del nombre del cliente
var labelNameClient = Ti.UI.createLabel({
	color : '#FFFFFF',
	left : 0,
	font : {
		fontSize : 14
	},
	text : '2-PASTISSERIA SERRA',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

// la etiqueta del nombre del cliente
var dateNow = new Date();

var labelDate = Ti.UI.createLabel({
	color : '#FFFFFF',
	left : 0,
	font : {
		fontSize : 14
	},
	text : dateNow.getDate() + '/' + dateNow.getMonth() + 1 + '/' + dateNow.getFullYear(),
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

labelDate.addEventListener('click', function(e) {
	var winDate = Ti.UI.createWindow({
		title : 'Picker Date',
		backgroundColor : 'gray',
		opacity : 0.5,
		url : global.Path.VIEW + 'PickerDate.js',
		modal : true
	});

	winDate.addEventListener('save', function(e) {
		labelDate.text = e.date;
	});

	winDate.open();
});

// la etiqueta del nombre del producto
var labelNameProduct = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 14
	},
	text : 'MANTEQUILLA CASTILLO 1/2KG',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

// la etiqueta del descuento
var labelDescount = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 14
	},
	text : 'Dto.: 13,3',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

// la etiqueta del total
var labelTotal = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 14
	},
	text : '0,00 €',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
// El botón de los últimos 3 pedidos
var butLast3Orders = Ti.UI.createButton({
	zIndex : 0,
	title : 'Ult3Ped',
	height : 50,
	width : 100
});

// El botón del prepedido
var butPrepe = Ti.UI.createButton({
	title : 'Prep.',
	height : 50,
	width : 100
});

//Botón  Pedido
var butOrder = Ti.UI.createButton({
	title : 'Pedido',
	height : Ti.UI.SIZE,
	width : '25%'
});

//Botón  Añadir
var butAdd = Ti.UI.createButton({
	title : 'Añadir',
	height : Ti.UI.SIZE,
	width : '25%'
});

//Botón Modificar
var butModi = Ti.UI.createButton({
	title : 'Modificar',
	height : Ti.UI.SIZE,
	width : '25%'
});

//Botón Eliminar
var butDelete = Ti.UI.createButton({
	title : 'Eliminar',
	height : Ti.UI.SIZE,
	width : '25%'
});



//
// ---------------------------------------------------------------- PICKER -------------------------------------------------
//
// El desplegable
var desple = Ti.UI.createPicker({
	left : 0
});

var column = Ti.UI.createPickerColumn();
column.addRow(Ti.UI.createPickerRow({
	title : '0 - FACTURAS',
	custom_item : 'f'
}));
column.addRow(Ti.UI.createPickerRow({
	title : '1 - VENTAS',
	custom_item : 'v'
}));
column.addRow(Ti.UI.createPickerRow({
	title : '2 - DEVOLUCIONES',
	custom_item : 'd'
}));

desple.add(column);
desple.selectionIndicator = true;

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
// La tabla con el listado de artículos.
var DataTable = global.Control.DataTable;
var dataTable = new DataTable.Table();

dataTable.addColumn({
	name : "codigo",
	text : "Código artículo"
});

dataTable.addColumn({
	name : "descripcion",
	text : "Descripción"
});

dataTable.addColumn({
	name : "familia",
	text : "Familia"
});

dataTable.addColumn({
	name : "venta",
	text : "Venta"
});

dataTable.addColumn({
	name : "regalo",
	text : "regalo"
});

dataTable.addColumn({
	name : "precio",
	text : "Precio"
});

dataTable.addColumn({
	name : "total",
	text : "Total"
});

var data = [{
	codigo : '21345',
	descripcion : "ESTRELLA 33Cl.",
	familia : "BEBIDAS",
	venta : "1",
	regalo : "NO",
	precio : "0,56€",
	total : "0,56€"
}, {
	codigo : '39849',
	descripcion : "ALHAMBRA 33Cl.",
	familia : "BEBIDAS",
	venta : "10",
	regalo : "SI",
	precio : "0,56€",
	total : "5,60€"
}, {
	codigo : '4325',
	descripcion : "MAT. JAMÓN",
	familia : "CHIPS",
	venta : "5",
	regalo : "NO",
	precio : "0,25€",
	total : "1,25€"
}, {
	codigo : '341324',
	descripcion : "MAT. DORITOS",
	familia : "CHIPS",
	venta : "10",
	regalo : "NO",
	precio : "0,22€",
	total : "2,20€"
}, {
	codigo : '1234312',
	descripcion : "ESTRELLA 20Cl.",
	familia : "BEBIDAS",
	venta : "20",
	regalo : "NO",
	precio : "0,33€",
	total : "6,6€"
}, {
	codigo : '324234',
	descripcion : "COLA 33Cl.",
	familia : "BEBIDAS",
	venta : "10",
	regalo : "NO",
	precio : "0,15€",
	total : "1,15€"
}, {
	codigo : '0012932',
	descripcion : "RED BULL 33Cl.",
	familia : "BEBIDAS",
	venta : "50",
	regalo : "SI",
	precio : "0,10€",
	total : "5,00€"
}];

for (var i=0; i < data.length; i++) {
  dataTable.addRow(dataTable.newRow(data[i]));
};

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
butOrder.addEventListener('click', function(){
	win.fireEvent('butOrder');
});

butAdd.addEventListener('click', function(){
	win.fireEvent('butAdd');
});

butModi.addEventListener('click', function(){
	win.fireEvent('butModify');
});

butDelete.addEventListener('click', function(){
	win.fireEvent('butDelete');
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
//Añadimos los controles a la vista viewHeadLeft
viewHeadLeft.add(labelNumOrder);
viewHeadLeft.add(labelNameClient);
viewHeadLeft.add(desple);

//Añadimos los controles a la vista viewHeadRight
viewHeadRight.add(labelDate);
viewHeadRight.add(butLast3Orders);

//Añadimos los controles a la vista viewHead
viewHead.add(viewHeadLeft);
viewHead.add(viewHeadRight);

//Añadimos los controles a la vista viewBody
viewTable.add(dataTable.getTable());
viewBody.add(viewTable);
viewBody.add(labelNameProduct);

//Añadimos los controles a la vista viewHeadBody
viewHeadBody.add(viewHead);
viewHeadBody.add(viewBody);

//Añadimos los controles a la vista viewHFootLeft
viewFootLeft.add(labelDescount);

//Añadimos los controles a la vista viewHFootRight
viewFootRight.add(labelTotal);
viewFootRight.add(butPrepe);

//Añadimos los controles a la vista viewHFoot
viewFoot.add(viewFootLeft);
viewFoot.add(viewFootRight);

//Añadimos los controles a la vista viewButtons
viewButtons.add(butOrder);
viewButtons.add(butAdd);
viewButtons.add(butModi);
viewButtons.add(butDelete);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
// Añadimos las vistas a la ventana.
win.add(viewHeadBody);
win.add(viewFoot);
win.add(viewButtons);
