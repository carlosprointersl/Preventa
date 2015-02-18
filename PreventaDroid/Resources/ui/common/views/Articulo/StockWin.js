/**
 * @fileOverview Es la vista MainWin del controlador Articulo.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
var global = win.global;

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Head
// var viewHead = Ti.UI.createView({
	// backgroundColor : 'green',
	// height : '10%',
	// width : Ti.UI.FILL,
// });

//Body
var viewBody = Ti.UI.createView({
	backgroundColor : 'blue',
	width : Ti.UI.FILL,
	height : '90%',
	layout : 'vertical'
});

//Foot
var viewFoot = Ti.UI.createView({
	backgroundColor : 'yellow',
	height : '10%',
	width : Ti.UI.FILL,
	layout : 'horizontal'
});

//
// ---------------------------------------------------------------- TABLEVIEWROW -------------------------------------------------
//
function createRow(title, value) {
	var row = Ti.UI.createTableViewRow({
		className : 'config',
		backgroundSelectedColor : 'white',
		height : 70
	});

	var labelTitle = Ti.UI.createLabel({
		color : '#FFFFFF',
		font : {
			fontFamily : 'Arial',
			fontSize : 22,
			fontWeight : 'bold'
		},
		text : title,
		left : 5,
		top : 5,
		width : Ti.UI.FILL,
		height : 45
	});

	var labelValue = Ti.UI.createLabel({
		color : '#808080',
		font : {
			fontFamily : 'Arial',
			fontSize : 16
		},
		text : value,
		left : 5,
		bottom : 5,
		width : Ti.UI.FILL,
		height : 25
	});

	row.add(labelTitle);
	row.add(labelValue);

	return row;
};

var data = [];

//
// ---------------------------------------------------------------- TABLEVIEW -------------------------------------------------
//
var itemTable = Ti.UI.createTableView({
	data : data
});

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//

win.add(itemTable);
