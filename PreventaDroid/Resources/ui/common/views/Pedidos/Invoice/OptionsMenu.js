/**
 * @fileOverview Las opciones para una tabla.
 *
 * @author Juan Carlos Matilla
 * @version 1.0
 *
 */

var win = Ti.UI.currentWindow;
var Global = win.global;

/**
 * ---------------------------------------------------------------- VIEWS -------------------------------------------------
 */
//La principal
var viewMain = Ti.UI.createView({
	opacity : 1,
	borderRadius : 10,
	left : 20,
	right : 20,
	height : Ti.UI.SIZE,
	backgroundColor : '#FFFFFF',
	layout : "vertical"
});

/**
 * ---------------------------------------------------------------- BUTTONS -------------------------------------------------
 */
var options = [{
	title : "Nuevo"
}, {
	title : "Editar"
}, {
	title : "Eliminar"
}];

var table = Ti.UI.createTableView({
	backgroundColor : "#000000",
	data : options
});

/**
 * ---------------------------------------------------------------- FUNCTIONS -------------------------------------------------
 */
function editEvent() {

	var winEdit = Ti.UI.createWindow({
		url : Global.Path.VIEW + 'WinFormNewEdit.js',
		title : 'Formulario',
		global : Global,
		backgroundColor : '#808080',
		navBarHidden : false,
		opacity : 0.50,
		viewRow : win.viewRow,
		columns : win.dataTable.getColumns()
	});
	
	win.close();
	winEdit.open(); 

}

function newEvent() {

	var winNew = Ti.UI.createWindow({
		url : Global.Path.VIEW + 'WinFormNewEdit.js',
		title : 'Formulario',
		global : Global,
		backgroundColor : '#808080',
		navBarHidden : false,
		opacity : 0.50,
		columns : win.dataTable.getColumns()
	});

	winNew.addEventListener('save', function(e) {
		win.fireEvent('save', {
			data : e.data
		});
	});
	
	win.close();
	winNew.open(); 
	
}

function removeEvent() {
	var dialog = Ti.UI.createAlertDialog({
		cancel : 0,
		buttonNames : ['No', 'Si'],
		message : '¿Quiere borra esta fila?',
		title : 'Eliminar registro'
	});
	
	dialog.addEventListener('click', function(e){
		if(e.index === 1){
			win.fireEvent('remove');
			win.close();
		}
	});
	
	dialog.show();
}

/**
 * ---------------------------------------------------------------- EVENTS -------------------------------------------------
 */
table.addEventListener('click', function(e) {
	switch(e.index) {
		case 0:
			newEvent();
			break;
		case 1:
			editEvent();
			break;
		case 2:
			removeEvent();
			break;
	}
});

/**
 * ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
 */
viewMain.add(table);

/**
 * ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
 */

win.add(viewMain);
