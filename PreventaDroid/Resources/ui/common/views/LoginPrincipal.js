/**
 * @fileOverview En este archivo se crea el objeto "Window" principal.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

// La ventana actual, con la que vamos a trabajar.
var win = Ti.UI.currentWindow;

// La variable Global que le hemos pasado.
var Global = win.Global;

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
// La vista principal donde estarán los controles.
var view = Ti.UI.createView({
	layout : 'vertical',
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
// El título.
var labelTitle = Ti.UI.createLabel({
	color : Global.Theme.TEXT_PRINCIPAL,
	font : {
		fontSize : 18
	},
	text : 'Projectes Informàtics de Terrassa, S.L.',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	top : 10,
	width : 'auto',
	height : 'auto'
});

// Súbtitulo de la vista.
var labelSubTitle = Ti.UI.createLabel({
	top : 10,
	color : Global.Theme.TEXT_PRINCIPAL,
	font : {
		fontSize : 18
	},
	text : 'Validación de Usuario',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 'auto',
	height : 'auto'
});

// Etiqueta del campo de texto.
var labelText = Ti.UI.createLabel({
	top : 10,
	color : Global.Theme.TEXT_PRINCIPAL,
	font : {
		fontSize : 14
	},
	left : 0,
	text : 'Introduce la contraseña:',
	width : 'auto',
	height : 'auto'
});

//
// ---------------------------------------------------------------- IMAGES -------------------------------------------------
//
// El logo de la empresa
var logo = Ti.UI.createImageView({
	image : '/images/padlock_171.png',
});

//
// ---------------------------------------------------------------- TEXTFIELDS -------------------------------------------------
//
// El campo de texto para introducir la contraseña
var textPassword = Ti.UI.createTextField({
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	width : Ti.UI.FILL,
	height : 50,
	passwordMask : true
});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
// Botón para aceptar el login
var butAcept = Ti.UI.createButton({
    backgroundColor : Global.Theme.BUTTON.BACKGROUND,
    backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
    borderColor : Global.Theme.LINES,
    borderWidth : 0.5,
    color : Global.Theme.BUTTON.TITLE,
	title : 'Aceptar',
	width : '100',
	height : '50'
});

// El evento del botón "Aceptar".
butAcept.addEventListener('click', function(e) {
	win.fireEvent('login', {
		textPassword : textPassword
	});
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
// Añadimos los controles a la vista
win.add(labelTitle);
win.add(logo);
win.add(labelSubTitle);
win.add(labelText);
win.add(textPassword);
win.add(butAcept);

