/**
 * @fileOverview En este archivo se crea el objeto "Window" principal.
 *
 * @author Juan Carlos Matilla
 * @version 1.0
 *
 */

var win = Ti.UI.currentWindow;
var Global = win.global;

/**
 * ------------------------------------------------------ VIEWS -------------------------------------------------------------
 */
// La cabecera
var viewHeader = Ti.UI.createView({
	// backgroundColor : 'orange',
	layout : 'vertical',
	height : '90%',
	width : Ti.UI.FILL
});

// El pie
var viewFoot = Ti.UI.createView({
	// backgroundColor : 'green',
	layout : 'vertical',
	width : Ti.UI.FILL
});

/**
 * ------------------------------------------------------ LABELS -------------------------------------------------------------
 */
// El título
var labelTitle = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 20
	},
	text : 'Facturas pendientes:',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

// El título
var labelFoot = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 14
	},
	text : 'Total Cobros realizados hoy:          0,00€',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : Ti.UI.FILL,
	height : 'auto'
});

/**
 * ------------------------------------------------------ TABLE -------------------------------------------------------------
 */
// La tabla con el listado de artículos.
var data = [{
	numFac : '21345',
	serie : "000001",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000002",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000003",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000004",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000005",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000006",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000007",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000008",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000009",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000010",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000011",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000012",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000013",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000014",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000001",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000002",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000003",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000004",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000005",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000006",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000007",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000008",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000009",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000010",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000011",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000012",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000013",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000014",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000001",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000002",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000003",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000004",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000005",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000006",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000007",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000008",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000009",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000010",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000011",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000012",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000013",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000014",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000001",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000002",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000003",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000004",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000005",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000006",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000007",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000008",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000009",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000010",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000011",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000012",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000013",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000014",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000001",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000002",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000003",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000004",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000005",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000006",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000007",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000008",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000009",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000010",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000011",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000012",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000013",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}, {
	numFac : '21345',
	serie : "000014",
	fechaFactura : "10/10/2012",
	impPagado : "100,56€",
	impDevido : "25,45€"
}];

var DataTable = Global.Control.DataTable;
var dataTable = new DataTable.Table();

dataTable.addColumn({
	name : "numFac",
	text : "Num Fac."
});

dataTable.addColumn({
	name : "serie",
	text : "Serie"
});

dataTable.addColumn({
	name : "fechaFactura",
	text : "Fecha factura"
});

dataTable.addColumn({
	name : "impPagado",
	text : "Importe pagado"
});

dataTable.addColumn({
	name : "impDevido",
	text : "Importe devido"
});

for (var i = 0; i < data.length; i++) {
	dataTable.addRow(dataTable.newRow(data[i]));
};

// Añadir eventos al DataTable
// dataTable.addEventListener('click', function(e) {
// var index = e.index; // El índice del TableView donde se ha pulsado.
// var viewRow = e.row; // TableViewRow.children --> Las etiquetas que lo forman.
// var rowData = e.rowData; // Los campos del TableViewRow que se han introducido.
//
// var win = Ti.UI.createWindow({
// url : Global.Path.VIEW + 'WinFormNewEdit.js',
// title : 'Formulario',
// global : Global,
// backgroundColor : '#808080',
// navBarHidden : false,
// opacity : 0.50,
// viewRow : viewRow,
// columns : dataTable.getColumns()
// });
//
// win.addEventListener('save', function(e){
// var newRow = e.newRow;
// });
//
// win.open();
//
// });

dataTable.addEventListener('longclick', function(e) {
	var index = e.index;
	// El índice del TableView donde se ha pulsado.
	var viewRow = e.row;
	// TableViewRow.children --> Las etiquetas que lo forman.
	var rowData = e.rowData;
	// Los campos del TableViewRow que se han introducido.

	var win = Ti.UI.createWindow({
		url : Global.Path.VIEW + 'Invoice/OptionsMenu.js',
		title : 'Opciones',
		global : Global,
		backgroundColor : '#808080',
		navBarHidden : false,
		opacity : 0.40,
		viewRow : viewRow,
		dataTable : dataTable
	});

	win.addEventListener('save', function(e) {
		var row = {
			numFac : e.data[0],
			serie : e.data[1],
			fechaFactura : e.data[2],
			impPagado : e.data[3],
			impDevido : e.data[4]
		};

		dataTable.addRow({
			row : row
		});
	});

	win.addEventListener('remove', function() {
		dataTable.removeRow(index);
	});

	win.open();

});

/**
 * ------------------------------------------------------ ADD VIEW CONTROLS -------------------------------------------------------------
 */
viewHeader.add(labelTitle);
viewHeader.add(dataTable.getTable());

viewFoot.add(labelFoot);

/**
 * ------------------------------------------------------ ADD WINDOW VIEWS -------------------------------------------------------------
 */
win.add(viewHeader);
win.add(viewFoot);
