/**
 * @fileOverview En este archivo se crea el formulario para crear/editar los parámetros.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

var win = Ti.UI.currentWindow;
var global = win.global;
//el artículo seleccionado.
var article = win.article;
//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//CONTENT
var content = Ti.UI.createView({
    height : Ti.UI.SIZE,
    borderRadius : 10,
    borderColor : 'gray',
    layout : 'vertical',
    left : 20,
    right : 20
});

//HEADER
var header = Ti.UI.createView({
    //backgroundColor : 'white',
    height : Ti.UI.SIZE,
    width : Ti.UI.FILL,
    top : 0
});

//Body
var body = Ti.UI.createView({
    backgroundColor : '#E3E3E3',
    layout : 'vertical',
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE
});

//BodyUp
var bodyUp = Ti.UI.createView({
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE,
    layout : 'vertical'
});

//BodyDown
var bodyDown = Ti.UI.createView({
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE,
    layout : 'vertical'
});

//Foot
var foot = Ti.UI.createView({
    backgroundColor : 'gray',
    height : Ti.UI.SIZE,
    width : Ti.UI.FILL,
    layout : 'horizontal',
    bottom : 0
});

var viewsBody = new Array();
for (var i = 0; i < 7; i++) {
    viewsBody.push(Ti.UI.createView({
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        layout : 'horizontal'
    }));
};

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

//Las etiquetas que forman parte de la vista "bodyUp".
//Promo
var labelPromo = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontFamily : 'Arial',
        fontSize : 16
    },
    text : 'Promo',
    width : '30%',
    height : Ti.UI.SIZE,
    horizontalWrap : false
});

//Tipo
var labelType = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontFamily : 'Arial',
        fontSize : 16
    },
    text : 'Tipo',
    width : '30%',
    height : Ti.UI.SIZE,
    horizontalWrap : false
});

//Concepto
var labelConcept = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontFamily : 'Arial',
        fontSize : 16
    },
    text : 'Concepto',
    width : '30%',
    height : Ti.UI.SIZE,
    horizontalWrap : false
});

//Las etiquetas que forman parte de la vista "bodyDown".
//Cargo
var labelCharge = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontFamily : 'Arial',
        fontSize : 16
    },
    text : 'Cargo',
    width : '18%',
    height : Ti.UI.SIZE
});

//Regalo
var labelGift = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontFamily : 'Arial',
        fontSize : 16
    },
    text : 'Regalo',
    width : '18%',
    height : Ti.UI.SIZE
});

//Tarifa
var labelRate = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontFamily : 'Arial',
        fontSize : 16
    },
    text : 'Tarifa',
    width : '18%',
    height : Ti.UI.SIZE
});

//Valor Tarifa
var labelRateValue = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontFamily : 'Arial',
        fontSize : 16
    },
    text : global.Functions.numToEuro(article.Tarifa).slice(0, -1),
    width : '20%',
    height : Ti.UI.SIZE
});

//Precio
var labelPrice = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontFamily : 'Arial',
        fontSize : 16
    },
    text : 'Precio',
    width : '18%',
    height : Ti.UI.SIZE
});

//Dto1
var labelDto1 = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontFamily : 'Arial',
        fontSize : 16
    },
    text : 'Dto1',
    width : '14%',
    height : Ti.UI.SIZE
});

//Depósito
var labelDeposit = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontFamily : 'Arial',
        fontSize : 16
    },
    text : 'Depósito',
    width : '23%',
    height : Ti.UI.SIZE
});

//Dto2
var labelDto2 = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontFamily : 'Arial',
        fontSize : 16
    },
    text : 'Dto2',
    width : '14%',
    height : Ti.UI.SIZE
});

//El resto de las etiquetas
//Nombre
var labelName = Ti.UI.createLabel({
    color : '#FFFFFF',
    backgroundColor : 'black',
    font : {
        fontFamily : 'Arial',
        fontSize : 20
    },
    text : article.Descripcion,
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE,
    horizontalWrap : false
});

//% =
var labelPor = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontSize : 16
    },
    text : '%',
    height : 40,
    width : '8%'
});

//€
var labelEuro = Ti.UI.createLabel({
    color : '#000000',
    font : {
        fontSize : 16
    },
    text : '€',
    height : 40,
    width : '8%'
});

//
// ---------------------------------------------------------------- PICKERS -------------------------------------------------
//
//Tipo
var pickerType = Ti.UI.createPicker({
    selectionIndicator : true,
    width : '70%',
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
    width : '70%',
    height : 40
});
var dataConept = ['COMPRA', 'ABONO'];
for (var i = 0; i < dataConept.length; i++) {
    pickerConept.add(Ti.UI.createPickerRow({
        title : dataConept[i]
    }));
};

//Promoción
var pickerPromo = Ti.UI.createPicker({
    selectionIndicator : true,
    width : '70%',
    height : 40
});
var dataPromo = ['NIGUNA', 'TARIFA 0', 'TARIFA 1'];
for (var i = 0; i < dataPromo.length; i++) {
    pickerPromo.add(Ti.UI.createPickerRow({
        title : dataPromo[i]
    }));
};

//Guardamos todos los PICKERS en este Array para añadirlos dinámicamente.
var pickers = [pickerPromo, pickerType, pickerConept];

//
// ---------------------------------------------------------------- TEXT FIELDS -------------------------------------------------
//
//Cargo
var textCharge = Ti.UI.createTextField({
    width : '20%',
    keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
    value : article.Venta
});

//Regalo
var textGift = Ti.UI.createTextField({
    width : '35%',
    keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
    value : article.Regalo
});

//Precio
var textPrice = Ti.UI.createTextField({
    width : '35%',
    keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
    value : global.Functions.numToEuro(article.Precio).slice(0, -1)
});

//Dto1
var textDto1 = Ti.UI.createTextField({
    width : '20%',
    keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
    value : article.DtoFijo
});

//Depósito
var textDeposit = Ti.UI.createTextField({
    width : '35%',
    keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
    value : article.Deposito || '0'
});

//Dto2 %
var textDto2_por = Ti.UI.createTextField({
    width : '25%',
    keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
    value : article.Dto2_por || '0'
});

//Dto2 €
var textDto2 = Ti.UI.createTextField({
    width : '35%',
    keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
    value : article.DtoEspecial || '0,00'
});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
//Save
var butSave = Ti.UI.createButton({
    title : 'Guardar',
    width : '25%',
    height : 50
});

//LatestSales - Últimas ventas
var butLatestSales = Ti.UI.createButton({
    title : 'Ult Ventas',
    width : '25%',
    height : 50
});

//Cost - Coste
var butCost = Ti.UI.createButton({
    title : 'Coste',
    width : '25%',
    height : 50
});

//Photo
var butPhoto = Ti.UI.createButton({
    title : 'Foto',
    width : '25%',
    height : 50
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Button Save
butSave.addEventListener('click', function() {
        
    article.Venta = textCharge.value;
    article.Regalo = textGift.value;
    article.Precio = textPrice.value.toString().replace(',', '.');
    article.DtoFijo = textDto1.value.toString().replace(',', '.');
    
    win.fireEvent('butSave', {
        article : article   
    });
    
    win.close();
});

//Text Dto2 %
textDto2_por.addEventListener('change', function(e) {
    var price = parseInt(textPrice.value.toString().replace(',', '.') * 1000);
    var por = e.value.toString().replace(',', '.');
    var result = (price * (por / 100)) / 1000;

    textDto2.value = result.toString().replace('.', ',');
});

//Text Dto2
textDto2.addEventListener('change', function(e) {
    var price = parseInt(textPrice.value.toString().replace(',', '.') * 1000);
    var euro = e.value.toString().replace(',', '.') * 1000;
    var result = (euro * 100) / price;

    textDto2_por.value = result.toString().replace('.', ',');
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//

viewsBody[0].add(labelPromo);
viewsBody[0].add(pickerPromo);

viewsBody[1].add(labelType);
viewsBody[1].add(pickerType);

viewsBody[2].add(labelConcept);
viewsBody[2].add(pickerConept);

viewsBody[3].add(labelCharge);
viewsBody[3].add(textCharge);
viewsBody[3].add(labelGift);
viewsBody[3].add(textGift);

viewsBody[4].add(labelRate);
viewsBody[4].add(labelRateValue);
viewsBody[4].add(labelPrice);
viewsBody[4].add(textPrice);

viewsBody[5].add(labelDto1);
viewsBody[5].add(textDto1);
viewsBody[5].add(labelDeposit);
viewsBody[5].add(textDeposit);

viewsBody[6].add(labelDto2);
viewsBody[6].add(textDto2_por);
viewsBody[6].add(labelPor);
viewsBody[6].add(textDto2);
viewsBody[6].add(labelEuro);

bodyDown.add(viewsBody[0]);
bodyDown.add(viewsBody[1]);
bodyDown.add(viewsBody[2]);
bodyDown.add(viewsBody[3]);
bodyDown.add(viewsBody[4]);
bodyDown.add(viewsBody[5]);
bodyDown.add(viewsBody[6]);

header.add(labelName);

body.add(bodyUp);
body.add(bodyDown);

foot.add(butSave);
foot.add(butLatestSales);
foot.add(butCost);
foot.add(butPhoto);

content.add(header);
content.add(body);
content.add(foot);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//

win.add(content);
