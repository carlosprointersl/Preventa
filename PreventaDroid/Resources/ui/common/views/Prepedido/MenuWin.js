/**
 * @fileOverview En este archivo se crea el formulario para crear/editar los parámetros.
 *
 * @author Juan Carlos Matilla
 * @version 1.0
 *
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
var global = win.global;

// la view de cabecera
var viewHead = Ti.UI.createView({
	layout : 'horizontal',
	width : Ti.UI.FILL,
	height : Ti.UI.FILL
});

function createRowImage(text, image) {
	var row = Ti.UI.createTableViewRow({
		selectedBackgroundColor : '#fff',
		height : 50,
		leftImage : global.Path.IMAGES + image,
		title : text
	});

	return row;
};

//var data = [createRow("Campos a mostrar", "modify_field.png", callback), createRow("Eliminar pedido completo", "delete.png"), createRow("Notas del pedido", "notes_order.png"), createRow("Notas del repartidor", "notes_dealer.png", callback), createRow("Salir (Sin guardar)", "log_out.png"), createRow("Guardar pedido", "save.png")];
var data = [createRowImage("Campos a mostrar", "stock_task.png"), createRowImage("Eliminar pedido completo", "Delete.png"), createRowImage("Notas del pedido", "Copy.png"), createRowImage("Notas del repartidor", "Copy v2.png"), createRowImage("Guardar pedido", "Save.png")];

var table = Ti.UI.createTableView({
	//headerTitle : 'Title',
	data : data
});

table.addEventListener('click', function(e) {
	switch(e.index) {
		case 0:
			win.fireEvent('row1');
			break;
		case 1:
			//win.fireEvent('row1');
			break;
		case 2:
			//win.fireEvent('row1');
			break;
		case 3:
			//win.fireEvent('row1');
			break;
		case 4:
			//win.fireEvent('row4');
			break;
	};
});

viewHead.add(table);

// Añadimos las vistas a la ventana.
win.add(viewHead);
