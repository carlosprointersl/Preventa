/**
 * @fileOverview Es la vista de los datos de la Cantidad del cliente.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

function ViewQuantity(global) {
	//Los campos que intervienen en esta vista.
	var fields = ['NIF', 'NombreFiscal', 'NombreComercial', 'Propietario', 'Contacto', 'Telefono1', 'Telefono2'];

	//
	// ---------------------------------------------------------------- VIEWS -------------------------------------------------
	//
	//SectionCantidad
	var viewCantidad = Ti.UI.createView({
		backgroundColor : '#E3E3E3',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		layout : 'vertical',
		borderRadius : 10,
		top : 2
	});

	//HeadCantidad
	var headCantidad = Ti.UI.createView({
		backgroundColor : '#313131',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		layout : 'horizontal'
	});

	//BodyCantidad
	var bodyCantidad = Ti.UI.createView({
		//backgroundColor : 'yellow',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		layout : 'vertical'
	});

	//Title-Image
	var bodyTitle = Ti.UI.createView({
		//backgroundColor : 'yellow',
		height : '8%',
		width : Ti.UI.FILL,
		layout : 'horizontal'
	});

	//BodyBody
	var bodyBody = Ti.UI.createView({
		//backgroundColor : 'red',
		//height : '92%',
		width : Ti.UI.FILL,
		layout : 'horizontal'
	});

	//LeftBody
	var leftBody = Ti.UI.createView({
		// backgroundColor : 'red',
		height : Ti.UI.SIZE,
		width : '30%',
		layout : 'vertical'
	});

	//RightBody
	var rightBody = Ti.UI.createView({
		// backgroundColor : 'green',
		height : Ti.UI.SIZE,
		width : '70%',
		layout : 'vertical'
	});

	//View Dto2
	var viewDto2 = Ti.UI.createView({
		height : 40,
		width : Ti.UI.FILL,
		layout : 'horizontal'
	});

	//
	// ---------------------------------------------------------------- IMAGE -------------------------------------------------
	//
	var photo = Ti.UI.createImageView({
		image : global.Path.IMAGES + 'Caja_Alhambra.jpg',
		width : '25%'
	});
	//
	// ---------------------------------------------------------------- LABELS -------------------------------------------------
	//
	//Label Title section
	var labTitle = Ti.UI.createLabel({
		color : '#FFFFFF',
		font : {
			fontSize : 13
		},
		text : 'Cantidades',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		left : 5
	});

	//Imagen y nombre
	var labName = Ti.UI.createLabel({
		color : '#000000',
		font : {
			fontSize : 16,
			fontWeight : 'bold'
		},
		text : 'ALHAMBRA RESERVA 1925',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		left : 5
	});

	//% =
	var labPor = Ti.UI.createLabel({
		color : '#000000',
		font : {
			fontSize : 16
		},
		text : '%',
		height : 40,
		width : '8%'
	});

	//€
	var labEuro = Ti.UI.createLabel({
		color : '#000000',
		font : {
			fontSize : 16
		},
		text : '€',
		height : 40,
		width : '8%'
	});

	//Data Labels
	var labelData = ['Tipo', 'Concepto', 'Cargo', 'Regalo', 'Tarifa', 'Precio', 'Dto 1', 'Dto 2', 'Depósito'];

	//
	// ---------------------------------------------------------------- PICKERS -------------------------------------------------
	//
	//Tipo
	var pickerType = Ti.UI.createPicker({
		selectionIndicator : true,
		width : Ti.UI.FILL,
		height : 40
	});
	var dataType = ['CAJA VENTA', 'UNIDAD', 'BOTELLA envase', 'CAJA envase', 'PLASTICO envase', 'Suelto U'];
	for (var i = 0; i < dataType.length; i++) {
		pickerType.add(Ti.UI.createPickerRow({
			title : dataType[i]
		}));
	};

	//Concepto
	var pickerConept = Ti.UI.createPicker({
		selectionIndicator : true,
		width : Ti.UI.FILL,
		height : 40
	});
	var dataConept = ['COMPRA', 'ABONO'];
	for (var i = 0; i < dataConept.length; i++) {
		pickerConept.add(Ti.UI.createPickerRow({
			title : dataConept[i]
		}));
	};

	//
	// ---------------------------------------------------------------- TEXT FIELDS -------------------------------------------------
	//
	var dto2 = Ti.UI.createTextField({
		width : '42%'
	});

	var dto2_por = Ti.UI.createTextField({
		width : '42%'
	});

	//
	// ---------------------------------------------------------------- EVENTS -------------------------------------------------
	//
	photo.addEventListener('click', function() {
		var winPhoto = Ti.UI.createWindow({
			photo : photo.image,
			title : labName.text,
			backgroundColor : '#808080',
			navBarHidden : false,
			opacity : 0.50,
			url : global.Path.VIEW + 'Prepedido/SelectItem/showPhoto.js'
		});

		winPhoto.open();
	});
	//
	// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
	//
	headCantidad.add(labTitle);

	bodyTitle.add(photo);
	bodyTitle.add(labName);

	viewDto2.add(dto2);
	viewDto2.add(labPor);
	viewDto2.add(dto2_por);
	viewDto2.add(labEuro);

	//Añadimos las Labels
	for (var i = 0; i < labelData.length; i++) {
		leftBody.add(Ti.UI.createLabel({
			color : '#000000',
			left : 2,
			font : {
				fontSize : 16
			},
			text : labelData[i],
			height : 40
		}));
	};

	rightBody.add(pickerType);
	rightBody.add(pickerConept);

	//Añadimos los TextFields
	for (var i = 2; i < labelData.length; i++) {
		if (i == 7) {
			rightBody.add(viewDto2);
		} else {
			rightBody.add(Ti.UI.createTextField({
				height : 40,
				width : Ti.UI.FILL,
				font : {
					fontSize : 16
				}
			}));
		};
	};

	bodyBody.add(leftBody);
	bodyBody.add(rightBody);

	bodyCantidad.add(bodyTitle);
	bodyCantidad.add(bodyBody);

	viewCantidad.add(headCantidad);
	viewCantidad.add(bodyCantidad);

	return viewCantidad;
};

module.exports = ViewQuantity;
