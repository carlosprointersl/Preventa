/**
 * @fileOverview En este archivo se crea el formulario para crear/editar los parámetros.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

var win = Ti.UI.currentWindow;
var global = win.global;

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
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

// viewBody
var viewBody = Ti.UI.createView({
	//height : '80%',
	width : Ti.UI.FILL,
	layout : "horizontal"
});

//Izquierda
var viewLeft = Ti.UI.createView({
	height : Ti.UI.FILL,
	width : '55%',
	layout : "vertical"
});

//Derecha
var viewRight = Ti.UI.createView({
	height : Ti.UI.SIZE,
	width : '45%',
	layout : "vertical"
});

//Foot
var viewFoot = Ti.UI.createView({
	height : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
for (var i = 0; i < win.columns.length; i++) {
	var label = Ti.UI.createLabel({
		color : '#000000',
		font : {
			fontSize : 2089
		},
		right : 5,
		text : win.columns[i],
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		width : Ti.UI.FILL,
		height : 40
	});

	viewLeft.add(label);
};

//
// ---------------------------------------------------------------- TEXT FIELDS -------------------------------------------------
//
for (var i = 0; i < win.columns.length; i++) {
	var value = "";
	if (win.viewRow) {
		var children = win.viewRow.getChildren();
		value = children[i].text;
	}

	var text = Ti.UI.createTextField({
		height : 40,
		width : Ti.UI.FILL,
		value : value
	});

	viewRight.add(text);
};

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
var btngroup = Ti.UI.createView({
	layout : "horizontal",
	width : Ti.UI.SIZE
});

var btnSave = Ti.UI.createButton({
	title : "Guardar",
	btnID : "btnSave",
	width : 100
});

var btnCancel = Ti.UI.createButton({
	title : "Cancelar",
	btnID : "btnCancel",
	width : 100
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//

btnCancel.addEventListener('click', function(e) {
	win.close();
});

btnSave.addEventListener('click', function(e) {
	var fieldsForm = viewRight.getChildren();
	if (win.viewRow) {
		var fieldsRow = win.viewRow.getChildren();
		for (var i = 0; i < fieldsRow.length; i++) {
			win.viewRow.children[i].text = fieldsForm[i].value;
		};
	} else {
		var data = new Array();
		for (var i = 0; i < fieldsForm.length; i++) {
			data[i] = fieldsForm[i].value;
		};
		win.fireEvent('save', {
			data : data
		});
	}

	win.close();
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
btngroup.add(btnCancel);
btngroup.add(btnSave);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
viewBody.add(viewLeft);
viewBody.add(viewRight);

viewFoot.add(btngroup);

viewMain.add(viewBody);
viewMain.add(viewFoot);

win.add(viewMain);
