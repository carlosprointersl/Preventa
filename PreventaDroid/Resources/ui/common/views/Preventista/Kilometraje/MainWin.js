/**
 * @fileOverview Es la vista MainWin del controlador Kilometraje.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
var global = win.global;
var data = win.data;

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Head
var viewHead = Ti.UI.createView({
	height : '10%',
	width : Ti.UI.FILL,
});

//Body
var viewBody = Ti.UI.createView({
	width : Ti.UI.FILL,
	height : '80%',
	layout : 'vertical'
});

//Foot
var viewFoot = Ti.UI.createView({
	height : '10%',
	width : Ti.UI.FILL,
	layout : 'horizontal'
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
//Título
var labelTitle = Ti.UI.createLabel({
	color : '#FFFFFF',
	font : {
		fontSize : 18
	},
	text : 'Kilometraje',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	top : 10,
	width : 'auto',
	height : 'auto'
});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
var butContinuar = Ti.UI.createButton({
	height : 50,
	width : 100,
	title : 'Continuar'
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//

butContinuar.addEventListener('click', function(){
	win.fireEvent('continue');	
});
//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
///
viewHead.add(labelTitle);

viewBody.add(butContinuar);
//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(viewHead);
win.add(viewBody);
win.add(viewFoot);
