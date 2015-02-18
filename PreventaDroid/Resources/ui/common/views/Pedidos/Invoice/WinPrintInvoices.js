/**
 * @fileOverview En este archivo se crea el objeto "Window" principal.
 *
 * @author Juan Carlos Matilla
 * @version 1.0
 *
 */

var win = Ti.UI.currentWindow;
/**
 * ------------------------------------------------------ VIEWS -------------------------------------------------------------
 */
// La cabecera
var viewHeader = Ti.UI.createView({
	//	backgroundColor : 'orange',
	layout : 'vertical',
	height : Ti.UI.SIZE,
	width : Ti.UI.FILL
});

// La cabecera + el cuerpo
var viewHeaderBody = Ti.UI.createView({
	// backgroundColor : 'green',
	layout : 'vertical',
	height : '85%',
	width : Ti.UI.FILL
});

// La parte superior de la cabecera
var viewHeaderTop = Ti.UI.createView({
	// backgroundColor : 'red',
	layout : 'vertical',
	height : Ti.UI.SIZE,
	width : Ti.UI.FILL
});

// La parte inferior de la cabecera
var viewHeaderBottom = Ti.UI.createView({
	// backgroundColor : 'green',
	layout : 'horizontal',
	height : Ti.UI.SIZE,
	width : Ti.UI.FILL
});

// Primera de la parte inferior de la cabecera
var viewHeaderBottom1 = Ti.UI.createView({
	// backgroundColor : 'yellow',
	layout : 'vertical',
	height : Ti.UI.SIZE,
	width : '25%'
});

// Segunda de la parte inferior de la cabecera
var viewHeaderBottom2 = Ti.UI.createView({
	// backgroundColor : 'blue',
	layout : 'vertical',
	height : Ti.UI.SIZE,
	width : '25%'
});

// Tecera de la parte inferior de la cabecera
var viewHeaderBottom3 = Ti.UI.createView({
	// backgroundColor : 'yellow',
	layout : 'vertical',
	height : Ti.UI.SIZE,
	width : '25%'
});

// Cuarta de la parte inferior de la cabecera
var viewHeaderBottom4 = Ti.UI.createView({
	// backgroundColor : 'blue',
	layout : 'vertical',
	height : Ti.UI.SIZE,
	width : '25%'
});

// Inferior de la cuarta de la parte inferior de la cabecera
var viewHeaderBottom41 = Ti.UI.createView({
	// backgroundColor : 'orange',
	layout : 'horizontal',
	height : Ti.UI.SIZE,
	width : Ti.UI.FILL
});

// El pie
var viewFoot = Ti.UI.createView({
	// backgroundColor : 'orange',
	layout : 'vertical',
	height : Ti.UI.SIZE,
	width : Ti.UI.FILL
});

/**
 * ------------------------------------------------------ LABELS -------------------------------------------------------------
 */

// Tipo de pago
var labelTypePayment = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 14
	},
	text : 'Tipo de pago',
	textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
	width : Ti.UI.FILL,
	height : 'auto'
});

// Total Fac.
var labelTotalInvoice = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 14
	},
	text : 'Total Fac.',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

// Cobrado
var labelCharged = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 14
	},
	text : 'Cobrado',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

// Pendiente
var labelPendent = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 14
	},
	text : 'Pendiente',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

// Dto PP
var labelDiscount = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 14
	},
	text : 'Dto. PP',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

// %
var labelPercentage = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 14
	},
	text : '%',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

/**
 * ------------------------------------------------------ PICKER COMBO -------------------------------------------------------------
 */
var comboTypePay = Ti.UI.createPicker();

var column = Ti.UI.createPickerColumn({
	width : Ti.UI.FILL
});
column.addRow(Ti.UI.createPickerRow({
	title : '0 - CONTADO'
}));
column.addRow(Ti.UI.createPickerRow({
	title : '1 - TARJETA'
}));
column.addRow(Ti.UI.createPickerRow({
	title : '2 - TALÓN'
}));

comboTypePay.add(column);
comboTypePay.selectionIndicator = true;

/**
 * ------------------------------------------------------ TEXT FIELDS -------------------------------------------------------------
 */
// Total Fac.
var textTotalInvoice = Ti.UI.createTextField({
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color : '#336699',
	height : 40,
	width : Ti.UI.FILL,
	first : true
});

// Cobrado
var textCharged = Ti.UI.createTextField({
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color : '#336699',
	height : 40,
	width : Ti.UI.FILL
});

// Pendiente
var textPendent = Ti.UI.createTextField({
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color : '#336699',
	height : 40,
	width : Ti.UI.FILL
});

// Dto PP
var textDiscount = Ti.UI.createTextField({
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color : '#336699',
	height : 40,
	width : '85%'
});

/**
 * ------------------------------------------------------ TABLE -------------------------------------------------------------
 */
// La tabla con el listado de artículos.
var tableData = [{
	title : 'ESTRELLA 33Cl.'
}, {
	title : 'ESTRELLA 1/5'
}, {
	title : 'ESTRELLA 1/3'
}, {
	title : 'Alambhra 1925'
}, {
	title : 'MANTEQUILLA CASTILLO 1KG'
}, {
	title : 'MANTEQUILLA CASTILLO 1/2KG'
}, {
	title : 'CHIPS MAT. JAMÓN'
}, {
	title : 'CHIPS DORITOS'
}, {
	title : 'CHIPS PANDILLA'
}, {
	title : 'Alambhra 1925'
}, {
	title : 'MANTEQUILLA CASTILLO 1KG'
}, {
	title : 'MANTEQUILLA CASTILLO 1/2KG'
}, {
	title : 'CHIPS MAT. JAMÓN'
}, {
	title : 'CHIPS DORITOS'
}, {
	title : 'CHIPS PANDILLA'
}];

var table = Ti.UI.createTableView({
	data : tableData
});

/**
 * ------------------------------------------------------ CHECKBOX -------------------------------------------------------------
 */
var checkBox = Ti.UI.createSwitch({
	style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
	title : 'Mostrar todas las facturas.',
	value : true,
	width : Ti.UI.FILL
});

/**
 * ------------------------------------------------------ EVENTOS -------------------------------------------------------------
 */
// Evento para quitar el foco cuando se abre automáticamente
textTotalInvoice.addEventListener('focus', function(e) {
	if (e.source.first) {
		textTotalInvoice.blur();
		textTotalInvoice.first = false;
	}
});

/**
 * ------------------------------------------------------ ADD VIEW CONTROLS -------------------------------------------------------------
 */
//viewHeaderTop.add(labelTitle);
viewHeaderTop.add(labelTypePayment);
viewHeaderTop.add(comboTypePay);

viewHeaderBottom1.add(labelTotalInvoice);
viewHeaderBottom1.add(textTotalInvoice);

viewHeaderBottom2.add(labelCharged);
viewHeaderBottom2.add(textCharged);

viewHeaderBottom3.add(labelPendent);
viewHeaderBottom3.add(textPendent);

viewHeaderBottom41.add(textDiscount);
viewHeaderBottom41.add(labelPercentage);

viewHeaderBottom4.add(labelDiscount);
viewHeaderBottom4.add(viewHeaderBottom41);

viewHeaderBottom.add(viewHeaderBottom1);
viewHeaderBottom.add(viewHeaderBottom2);
viewHeaderBottom.add(viewHeaderBottom3);
viewHeaderBottom.add(viewHeaderBottom4);

viewHeader.add(viewHeaderTop);
viewHeader.add(viewHeaderBottom);

viewHeaderBody.add(viewHeader);
viewHeaderBody.add(table);

viewFoot.add(checkBox);

/**
 * ------------------------------------------------------ ADD WINDOW VIEWS -------------------------------------------------------------
 */
win.add(viewHeaderBody);
win.add(viewFoot);

