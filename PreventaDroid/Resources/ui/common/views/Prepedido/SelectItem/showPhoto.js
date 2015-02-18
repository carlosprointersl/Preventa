/**
 * @fileOverview En este archivo se crea el formulario para crear/editar los parámetros.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

var win = Ti.UI.currentWindow;

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

//
// ---------------------------------------------------------------- IMAGE -------------------------------------------------
//
var photo = Ti.UI.createImageView({
	image : win.photo
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
viewMain.add(photo);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//

win.add(viewMain); 