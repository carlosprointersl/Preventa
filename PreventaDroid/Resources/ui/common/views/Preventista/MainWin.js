/**
 * @fileOverview Es la vista MainWin del controlador Principal.
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
var viewHead = Ti.UI.createView({
	//backgroundColor : 'green',
	height : '10%',
	width : Ti.UI.FILL,
});

//Body
var viewBody = Ti.UI.createView({
	//backgroundColor : 'blue',
	width : Ti.UI.FILL,
	height : '80%',
	layout : 'vertical'
});

//Foot
var viewFoot = Ti.UI.createView({
	//backgroundColor : 'yellow',
	height : '10%',
	width : Ti.UI.FILL,
	layout : 'horizontal'
});

//
// ---------------------------------------------------------------- SECTIONS TABLEVIEW -------------------------------------------------
//

var sectionConfig = Ti.UI.createTableViewSection({
	headerTitle : 'Configuración'
});
sectionConfig.add(createRow('Nombre', 'Juan Carlos'));
sectionConfig.add(createRow('Nº Terminal', '011'));
sectionConfig.add(createRow('Preventa', '27/02/2013'));
sectionConfig.add(createRow('Servicio', 'Juan Carlos'));
sectionConfig.add(createRow('Origen de datos', '/Preventa/Datos/'));
sectionConfig.add(createRow('Destino copia de seguridad', '/Preventa/Datos/'));

var sectionPassword = Ti.UI.createTableViewSection({
	headerTitle : 'Contraseña'
});
sectionPassword.add(createRow('Modificar', 'Cambiar la contraseña del preventista.'));

var sectionRestoreDB = Ti.UI.createTableViewSection({
	headerTitle : 'Restauración BD'
});
sectionRestoreDB.add(createRow('Origen de datos', '/Preventa/Datos/'));

var sectionSendDate = Ti.UI.createTableViewSection({
	headerTitle : 'Fecha de envío'
});
sectionSendDate.add(createRow('Última fecha de envío', '25/02/2013 21:00:00'));

var tableSections = [sectionConfig, sectionPassword, sectionRestoreDB, sectionSendDate];
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

//
// ---------------------------------------------------------------- TABLEVIEW -------------------------------------------------
//
var configTable = Ti.UI.createTableView({
	data : tableSections
});

//
// ---------------------------------------------------------------- TEXTFIELD -------------------------------------------------
//
//Nombre
var textName = Ti.UI.createTextField({
	height : 40,
	width : Ti.UI.FILL,
	value : sectionConfig.rows[0].children[1].text,
	keyboardType : Ti.UI.KEYBOARD_ASCII
});

//Nº Terminal
var textTerminal = Ti.UI.createTextField({
	height : 40,
	width : Ti.UI.FILL,
	value : sectionConfig.rows[1].children[1].text,
	keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD
});

//Password
var textPass = Ti.UI.createTextField({
	height : 40,
	width : Ti.UI.FILL,
	passwordMask : true
});

//
// ---------------------------------------------------------------- PICKER DATE -------------------------------------------------
//
var minDate = new Date(1900, 0, 1);
var maxDate = new Date(2100, 11, 31);

var picker = Ti.UI.createPicker({
	type : Ti.UI.PICKER_TYPE_DATE,
	minDate : minDate,
	maxDate : maxDate
});

picker.selectionIndicator = true;

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
configTable.addEventListener('click', function(e) {
	var row = e.row;
	var children = row.children;
	var key = children[0].text;
	var value = children[1].text;

	switch(e.index) {
		case 0 :
			win.fireEvent('editField', {
				keys : [key],
				controls : [textName],
				labelValue : children[1]
			});
			break;
		case 1:
			win.fireEvent('editField', {
				keys : [key],
				controls : [textTerminal],
				labelValue : children[1]
			});
			break;
		case 6:
			win.fireEvent('editField', {
				keys : ['Password', 'Nuevo Password', 'Repetir Password'],
				controls : [textPass, textPass, textPass],
				labelValue : children[1]
			});
			break;
	};

});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
viewBody.add(configTable);
//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
// win.add(viewHead);
// win.add(viewBody);
// win.add(viewFoot);

win.add(configTable);
