/**
 * @fileOverview Es la vista MainWin del controlador Principal.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
var global = win.global; //Namespace Global.

//
//---------------------------------------------------------------- VIEWS -------------------------------------------------
//

//Head
var viewHead = Ti.UI.createView({
	height : Ti.UI.SIZE,
	width : Ti.UI.FILL
});

//Body
var viewBody = Ti.UI.createView({
	height : 400,
	width : Ti.UI.FILL
});

//Foot
var viewFoot = Ti.UI.createView({
	height : Ti.UI.SIZE,
	width : Ti.UI.FILL,
	layout : 'horizontal'
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
// El título.
var labelTitle = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 18
	},
	text : 'Default DataTable',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
var dataTable = new global.Control.DataTable.Table();
var Column = global.Control.DataTable.Column;

//
// ************************************************* AÑADIR COLUMNAS ********************************************************
//
//Una instancia de la clase Column con un objeto como parámetro.
var column1 = new Column({
	name : "col1",
	text : "Columna 1 - La mas grande del mundo"
});
dataTable.addColumn(column1);

//Un objeto
var column2 = {
	name : "col2"
};
dataTable.addColumn(column2);

//Un String
var column3 = "col3";
dataTable.addColumn(column3);

//Un Array de los tipos anteriores.
var arrayColumn = ["col4", { name : "col5", text : "Columna 5"}, new Column({name : "col6", text : "Columna 6"})];
dataTable.addColumn(arrayColumn);

//
// ************************************************* AÑADIR FILAS ********************************************************
// Primero hemos de crear la fila (Row) de la tabla para poder añadirla

// Array numérico
var arrayRow = ["array 1", "array 2", "array 3", "array 4", "array 5", "array 6"];
var array = dataTable.newRow(arrayRow);

//Object (Array asociativo) sin data
var objectRow = {col1 : "object 1", col2 : "object 2", col31 : "object 3", col4 : "object 4", col5 : "object 5", col6 : "object 6", col7 : "object 7"};
var object = dataTable.newRow(objectRow);

//Object (Array asociativo) con data - Aquí se puede modificar la fila y las celdas.
var objectRowData = {
	backgroundColor : "yellow",
	data : {
		col1 : { backgroundColor : 'red', text : "object 1"}, col12 : "object 2", col3 : "object 3", col4 : "object 4", col5 : "object 5", col6 : "object 6", col7 : "object 7"}
	};
var objectData = dataTable.newRow(objectRowData);

//Arguments
var argu = dataTable.newRow("argu 1", "argu 2", "argu 3", "argu 4");

//Array Rows
arrayToRows = [dataTable.newRow("ArrayRow 1", "ArrayRow 1", "ArrayRow 1", "ArrayRow 1"), 
dataTable.newRow("ArrayRow 2", "ArrayRow 2", "ArrayRow 2", "ArrayRow 2"), dataTable.newRow("ArrayRow 3", "ArrayRow 3", "ArrayRow 3", "ArrayRow 3")];

//Solo acepta "Row" como parámetro.
dataTable.addRow(array);
dataTable.addRow(object);
dataTable.addRow(objectData);
dataTable.addRow(argu);
dataTable.addRow(arrayToRows);

var table = dataTable.getTable();
//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
//New
var butAdd = Ti.UI.createButton({
	title : 'New Row',
	width : '33.33%',
	height : 50
});

//Remove
var butRemove = Ti.UI.createButton({
	title : 'Remove Row',
	width : '33.33%',
	height : 50
});

//Edit
var butEdit = Ti.UI.createButton({
	title : 'Edit Row',
	width : '33.33%',
	height : 50
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
butAdd.addEventListener('click', function(e) {
	var numRows = dataTable.getNumRows();
	var dataRow = {
		col1 : "Col1 + " + numRows,
		col2 : "Col2 + " + numRows,
		col3 : "Tercero + " + numRows,
	};

	var row = dataTable.newRow({
		data : dataRow
	});

	dataTable.addRow(row);
});

butRemove.addEventListener('click', function(e) {
	var numRows = dataTable.getNumRows();
	dataTable.removeRow(numRows - 1);
});

butEdit.addEventListener('click', function(e) {
	var numRows = dataTable.getNumRows() - 1;
	var dataRow = {
		col1 : "Col1 + " + numRows + " Edit",
		col2 : "Col2 + " + numRows + " Edit",
		col3 : "Tercero + " + numRows + " Edit",
	};

	var row = dataTable.newRow({
		backgroundColor : "red",
		className : "EditRow",
		data : dataRow
	});

	dataTable.updateRow(numRows, row);
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
//Añadimos los controles a la vista view
viewHead.add(labelTitle);

viewBody.add(table);

viewFoot.add(butAdd);
viewFoot.add(butEdit);
viewFoot.add(butRemove);
//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
// Añadimos los controles a la ventana.
win.add(viewHead);
win.add(viewBody);
win.add(viewFoot);
