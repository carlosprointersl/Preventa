/**
 * @fileOverview Es la vista de los datos de la Select del cliente.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

function ViewSelect(global) {
	//Los campos que intervienen en esta vista.
	var fields = ['NIF', 'NombreFiscal', 'NombreComercial', 'Propietario', 'Contacto', 'Telefono1', 'Telefono2'];

	//
	// ---------------------------------------------------------------- VIEWS -------------------------------------------------
	//
	//SectionSelect
	var viewSelect = Ti.UI.createView({
		backgroundColor : '#E3E3E3',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		layout : 'vertical',
		borderRadius : 10,
		top : 2
	});

	//HeadSelect
	var headSelect = Ti.UI.createView({
		backgroundColor : '#313131',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		layout : 'vertical'
	});

	//BodySelect
	var bodySelect = Ti.UI.createView({
		//backgroundColor : 'yellow',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		layout : 'horizontal'
	});

	//BodyHead
	var bodyHead = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		layout : 'horizontal'
	});

	//BodyBody
	var bodyBody = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		layout : 'vertical'
	});

	//View1
	var view1 = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		layout : 'horizontal'
	});

	//View2
	var view2 = Ti.UI.createView({
		// backgroundColor : 'gray',
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		layout : 'horizontal'
	});

	//View2Left
	var view2Left = Ti.UI.createView({
		// backgroundColor : 'yellow',
		height : Ti.UI.SIZE,
		width : '20%',
		layout : 'vertical'
	});

	//View2Right
	var view2Right = Ti.UI.createView({
		// backgroundColor : 'red',
		height : Ti.UI.SIZE,
		width : '80%',
		layout : 'vertical'
	});

	//View3
	var view3 = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		layout : 'horizontal'
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
		text : 'Seleccionar artículo', //'Artículo : 484848',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		left : 5
	});

	//Artículo 2343
	var labCodeItem = Ti.UI.createLabel({
		color : '#000000',
		left : 2,
		font : {
			fontSize : 16,
			fontWeight : 'bold'
		},
		text : 'Artículo: 2343' ,
		height : 40,
		width : Ti.UI.FILL
	});
	
	//Buscar por:
	var labSearch = Ti.UI.createLabel({
		color : '#000000',
		left : 2,
		font : {
			fontSize : 16
		},
		text : 'Buscar por:' ,
		height : 40
	});

	//Familia
	var labFamily = Ti.UI.createLabel({
		color : '#000000',
		left : 2,
		font : {
			fontSize : 16
		},
		text : 'Familia: ' ,
		height : 40
	});

	//Artículo
	var labItem = Ti.UI.createLabel({
		color : '#000000',
		left : 2,
		font : {
			fontSize : 16
		},
		text : 'Artículo: ' ,
		height : 40
	});

	//Promo
	var labPromo = Ti.UI.createLabel({
		color : '#000000',
		left : 2,
		font : {
			fontSize : 16
		},
		text : 'Promo: ' ,
		height : 40
	});

	//Tarifa:
	var labRate = Ti.UI.createLabel({
		color : '#000000',
		left : 2,
		font : {
			fontSize : 16
		},
		text : 'Tarifa: 10,95€' ,
		height : 40
	});

	//
	// ---------------------------------------------------------------- CHECKBOX SWITCH-------------------------------------------------
	//
	var checkPhoto = Ti.UI.createSwitch({
		style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		color : '#000000',
		title : 'Solo artículo con foto',
		value : false,
		left : 10
	});

	//
	// ---------------------------------------------------------------- PICKERS -------------------------------------------------
	//
	//Buscar por
	var pickerSearch = Ti.UI.createPicker({
		selectionIndicator : true,
		width : '50%'
	});
	var dataSearch = ['FAMILIA', 'IVA', 'CODIGO ARTÍCULO', 'DESCRIPCION', 'PUNTO VERDE', 'UNIDADES'];
	for (var i = 0; i < dataSearch.length; i++) {
		pickerSearch.add(Ti.UI.createPickerRow({
			title : dataSearch[i]
		}));
	};

	//Familia
	var pickerFamily = Ti.UI.createPicker({
		selectionIndicator : true,
		width : Ti.UI.FILL,
		height : 40
	});
	var dataFamily = ['AGUA NATURA', 'FOLLETO', 'DESPLAZAMIENTOI', 'SNACKS', 'ACEITUNAS', 'ACEITES'];
	for (var i = 0; i < dataFamily.length; i++) {
		pickerFamily.add(Ti.UI.createPickerRow({
			title : dataFamily[i]
		}));
	};

	//Item
	var pickerItem = Ti.UI.createPicker({
		selectionIndicator : true,
		width : Ti.UI.FILL,
		height : 40
	});
	var dataItem = ['COLA CAO EN SOBRES', 'AZUCAR RUBI 8 KILOS', 'DELTA VASO TERMIC', 'ALHAMBRA RESERVA 1925', 'COCA-COLA', 'FANTA NARANJA'];
	for (var i = 0; i < dataItem.length; i++) {
		pickerItem.add(Ti.UI.createPickerRow({
			title : dataItem[i]
		}));
	};

	//Promo
	var pickerPromo = Ti.UI.createPicker({
		selectionIndicator : true,
		width : Ti.UI.FILL,
		height : 40
	});
	var dataPromo = ['TARIFA', '<SIN PROMOCION>'];
	for (var i = 0; i < dataPromo.length; i++) {
		pickerPromo.add(Ti.UI.createPickerRow({
			title : dataPromo[i]
		}));
	};

	//
	// ---------------------------------------------------------------- TEXTFIELD -------------------------------------------------
	//
	var textSearch = Ti.UI.createTextField({
		width : '50%'
	});
	//
	// ---------------------------------------------------------------- EVENTS -------------------------------------------------
	//

	//
	// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
	//
	headSelect.add(labTitle);

	view1.add(pickerSearch);
	view1.add(textSearch);

	bodyHead.add(labCodeItem);
	bodyHead.add(labSearch);
	bodyHead.add(view1);

	view2Left.add(labFamily);
	view2Left.add(labItem);
	view2Left.add(labPromo);

	view2Right.add(pickerFamily);
	view2Right.add(pickerItem);
	view2Right.add(pickerPromo);

	view3.add(labRate);
	view3.add(checkPhoto);

	//
	// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
	//

	view2.add(view2Left);
	view2.add(view2Right);

	bodyBody.add(view1);
	bodyBody.add(view2);
	bodyBody.add(view3);

	bodySelect.add(bodyHead);
	bodySelect.add(bodyBody);

	viewSelect.add(headSelect);
	viewSelect.add(bodySelect);

	return viewSelect;
};

module.exports = ViewSelect;
