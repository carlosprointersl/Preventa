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
var viewHead = Ti.UI.createView({
	backgroundColor : 'green',
	height : '10%',
	width : Ti.UI.FILL,
});

//Body
var viewBody = Ti.UI.createView({
	backgroundColor : 'blue',
	width : Ti.UI.FILL,
	height : '80%',
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
// ---------------------------------------------------------------- SECTIONS TABLEVIEW -------------------------------------------------
//

var sectionSearch = Ti.UI.createTableViewSection({
	headerTitle : 'Buscar artículo'
});
sectionSearch.add(createRow('Selecciona un artículo', 'Artículo no seleccionado'));

var sectionItem = Ti.UI.createTableViewSection({
	headerTitle : 'Artículo'
});
sectionItem.add(createRow('Descripción', 'Descripción completa del artículo'));
sectionItem.add(createRow('Família', 'CERVEZAS PILSENER'));
sectionItem.add(createRow('I.V.A.', '7%'));
sectionItem.add(createRow('Tipo de artículo', 'CAJA VENTA'));

var sectionImports = Ti.UI.createTableViewSection({
	headerTitle : 'Importes'
});
sectionImports.add(createRow('Precio Coste', '0,00 €'));
sectionImports.add(createRow('Unidad por caja', '0 unidades'));
sectionImports.add(createRow('PV', '0'));
sectionImports.add(createRow('Precio mínimo', '0'));
sectionImports.add(createRow('Cantidad mínima', '0'));
sectionImports.add(createRow('Precio oferta', '0'));

var sectionRates = Ti.UI.createTableViewSection({
	headerTitle : 'Tarifas'
});
sectionRates.add(createRow('Tarifa 0', '2,7'));
sectionRates.add(createRow('Tarifa 1', '2,7'));
sectionRates.add(createRow('Tarifa 2', '2,7'));
sectionRates.add(createRow('Tarifa 3', '0'));
sectionRates.add(createRow('Tarifa 4', '0'));
sectionRates.add(createRow('Tarifa 5', '0'));
sectionRates.add(createRow('Tarifa 6', '0'));
sectionRates.add(createRow('Tarifa 7', '0'));
sectionRates.add(createRow('Tarifa 8', '0'));
sectionRates.add(createRow('Tarifa 9', '2,7'));

var sectionNote = Ti.UI.createTableViewSection({
	headerTitle : 'Nota'
});
var note = 'En este apartado se utiliza para hacer cualquier anotación referente con el artículo descrito.\nTambién puede hacerse alguna anotación no realcionada directamente con dicho artículo';
sectionNote.add(createRow('Nota', note));


var tableSections = [sectionSearch, sectionItem, sectionImports, sectionRates, sectionNote];
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
var itemTable = Ti.UI.createTableView({
	data : tableSections
});

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
// win.add(viewHead);
// win.add(viewBody);
// win.add(viewFoot);

win.add(itemTable);
