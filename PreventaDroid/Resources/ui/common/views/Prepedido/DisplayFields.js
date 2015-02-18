/**
 * @fileOverview En este archivo se crea el formulario para crear/editar los parámetros.
 *
 * @author Juan Carlos Matilla
 * @version 1.0
 *
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
win.layout = "vertical";
var global = win.global;

// La cabecera
var viewHead = Ti.UI.createView({
	width : Ti.UI.FILL,
	height : Ti.UI.SIZE
});

// El cuerpo
var viewBody = Ti.UI.createView({
	width : Ti.UI.Fill,
	height : Ti.UI.SIZE,
	layout : 'horizontal'
});

// El cuerpo-izquierda
var viewBodyLeft = Ti.UI.createView({
	width : '50%',
	height : Ti.UI.FILL,
	layout : 'vertical'
});

// EL cuerpo-derecha
var viewBodyRight = Ti.UI.createView({
	width : '50%',
	height : Ti.UI.FILL,
	layout : 'vertical'
});

var butLeft1 = Ti.UI.createButton({
	title : 'Agregar ->',
	width : Ti.UI.FILL,
	height : 40
});

var butLeft2 = Ti.UI.createButton({
	title : '<- Quitar',
	width : Ti.UI.FILL,
	height : 40
});

var butRight1 = Ti.UI.createButton({
	title : 'Subir Orden',
	width : Ti.UI.FILL,
	height : 40
});

var butRight2 = Ti.UI.createButton({
	title : 'Bajar Orden',
	width : Ti.UI.FILL,
	height : 40
});

// Table left
var dataLeft = [{
	title : 'CodigoAgrupador'
}, {
	title : 'EsRegalo'
}, {
	title : 'CodigoFamilia'
}, {
	title : 'TipoArticulo'
}, {
	title : 'Concepto'
}, {
	title : 'Regalo'
}, {
	title : 'Promocion'
}, {
	title : 'Precio'
}, {
	title : '2_CodigoAgrupador'
}, {
	title : '2_EsRegalo'
}, {
	title : '2_CodigoFamilia'
}, {
	title : '2_TipoArticulo'
}, {
	title : '2_Concepto'
}, {
	title : '2_Regalo'
}, {
	title : '2_Promocion'
}, {
	title : '2_Precio'
}];

var tableLeft = Ti.UI.createTableView({
	borderColor : 'white',
	borderWidth : 1.5,
	left : 5,
	right : 2.5,
	height : '77.5%',
	data : dataLeft
});

// Table Right
var dataRight = [{
	title : 'CodigoArticulo'
}, {
	title : 'Descripcion'
}, {
	title : 'Familia'
}, {
	title : 'Venta'
}];

var tableRight = Ti.UI.createTableView({
	borderColor : 'white',
	borderWidth : 1.5,
	left : 2.5,
	right : 5,
	height : '77.5%',
	data : dataRight
});

// Título
var labelTitle = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 24
	},
	text : 'Campos a mostrar en la tabla'
});

// Título izqiuerdo
var labelLeft = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 16
	},
	text : 'Campos no visibles'
});

// Título derecho
var labelRight = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 16
	},
	text : 'Campos visibles'
});

// Montamos las views
viewHead.add(labelTitle);

viewBodyLeft.add(labelLeft);
viewBodyLeft.add(tableLeft);
viewBodyLeft.add(butLeft1);
viewBodyLeft.add(butLeft2);

viewBodyRight.add(labelRight);
viewBodyRight.add(tableRight);
viewBodyRight.add(butRight1);
viewBodyRight.add(butRight2);

viewBody.add(viewBodyLeft);
viewBody.add(viewBodyRight);

// Añadimos las vistas a la ventana.
win.add(viewHead);
win.add(viewBody);
