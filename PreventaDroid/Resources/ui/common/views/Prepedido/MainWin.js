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
//El Array con las líneas del pedido.
var dataLines = win.dataLines;
var totalOrder = 0;
var lastClick = -1;
//Modelo de tarifas
var rates = win.rates;
//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
// Cabecera
var viewHead = Ti.UI.createView({
    layout : 'vertical',
    width : Ti.UI.FILL,
    height : '15%'//Ti.UI.SIZE
});

//La 2ª linea de la cabecera
var viewHead2 = Ti.UI.createView({
    layout : 'horizontal',
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE
});

// Cuerpo
var viewBody = Ti.UI.createView({
    layout : 'vertical',
    width : Ti.UI.FILL,
    height : '70%'//Ti.UI.SIZE
});

//Pie
var viewFoot = Ti.UI.createView({
    layout : 'vertical',
    width : Ti.UI.FILL,
    height : '15%'//Ti.UI.SIZE
});

//La 1ª línea del pie
var viewFoot1 = Ti.UI.createView({
    layout : 'horizontal',
    width : Ti.UI.FILL,
    height : 35
});

//Botones
var viewButtons = Titanium.UI.createView({
    layout : 'horizontal',
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- LABEL -------------------------------------------------
//
//Nombre comercial
var labelName = Ti.UI.createLabel({
    color : '#FFFFFF',
    font : {
        fontFamily : 'Arial',
        fontSize : 17,
        fontWeight : 'bold'
    },
    text : win.client.NombreComercial,
    width : Ti.UI.SIZE,
    height : Ti.UI.SIZE,
    left : 0
});

//Serie
var labelSerie = Ti.UI.createLabel({
    color : '#FFFFFF',
    font : {
        fontFamily : 'Arial',
        fontSize : 15
    },
    text : 'Serie',
    width : Ti.UI.SIZE,
    height : Ti.UI.SIZE
});

//Total pedido - cantidad
var labelTotalOrder = Ti.UI.createLabel({
    backgroundColor : 'white',
    borderRadius : 5,
    borderWidth : 2,
    borderColor : 'gray',
    color : 'red',
    font : {
        fontFamily : 'Arial',
        fontSize : 15,
        fontWeight : 'bold'
    },
    text : '0,00€',
    textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
    height : Ti.UI.SIZE,
    top : 8,
    width : '25%'
});

//Total pedido - Etiqueta
var labelTotal = Ti.UI.createLabel({
    color : '#FFFFFF',
    font : {
        fontFamily : 'Arial',
        fontSize : 15
    },
    text : 'Total del pedido: ',
    textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
    width : '75%',
    top : 8,
    height : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
//Guardar
var butSave = Ti.UI.createButton({
    title : 'Guardar',
    height : Ti.UI.FILL,
    width : '25%'
});

//Eliminar
var butDelete = Ti.UI.createButton({
    title : 'Eliminar',
    height : Ti.UI.FILL,
    width : '25%'
});

//Añadir
var butAdd = Ti.UI.createButton({
    title : 'Añadir',
    height : Ti.UI.FILL,
    width : '25%'
});

//Modificar
var butModify = Ti.UI.createButton({
    title : 'Modificar',
    height : Ti.UI.FILL,
    width : '25%'
});

var butLastOrders = Ti.UI.createButton({
    title : 'Ult3Ped',
    height : Ti.UI.SIZE,
    width : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- PICKER -------------------------------------------------
//
// El desplegable
var desple = Ti.UI.createPicker();

var column = Ti.UI.createPickerColumn();
column.addRow(Ti.UI.createPickerRow({
    title : '0 - FACTURAS',
    custom_item : 'f'
}));
column.addRow(Ti.UI.createPickerRow({
    title : '1 - VENTAS',
    custom_item : 'v'
}));
column.addRow(Ti.UI.createPickerRow({
    title : '2 - DEVOLUCIONES',
    custom_item : 'd'
}));

desple.add(column);
desple.selectionIndicator = true;

//
// ---------------------------------------------------------------- TABLE VIEW ROW -------------------------------------------------
//
function createRow(options) {
    //El objeto donde guardamos los datos de la fila para luego insertarlo en DetallePedido.
    var detail = {
        NumPedido : '2390',
        Serie : '0',
        CodigoArticulo : options.CodigoArticulo,
        Descripcion : options.Descripcion,
        Venta : options.Venta,
        Regalo : options.Regalo,
        Precio : options.Precio,
        DtoFijo : options.DtoFijo,
        Total : '0'
    };
    //La fila
    var row = Ti.UI.createTableViewRow({
        //backgroundColor : 'gray',
        className : 'orderList',
        backgroundSelectedColor : 'orange',
        height : 90,
        //layout : 'vertical'
    });

    //El contenedor de todo
    var viewContent = Ti.UI.createView({
        backgroundColor : 'transparent',
        height : 90,
        left : 2,
        right : 2,
        layout : 'vertical'
    });

    //El contenedor de arriba (Foto, descripcion y código)
    var viewItem = Ti.UI.createView({
        //backgroundColor : 'yellow',
        height : '45%',
        layout : 'horizontal'
    });

    //El contenedor de abajo (Unidades)
    var viewTexts = Ti.UI.createView({
        //backgroundColor : 'red',
        height : '55%',
        layout : 'vertical'
    });

    //El contenedor para el código y la descripción
    var viewCodeDes = Ti.UI.createView({
        //backgroundColor : 'red',
        height : Ti.UI.FILL,
        width : '75%',
        layout : 'vertical'
    });

    //El contenedor para las Labels (Unidades)
    var viewLabels = Ti.UI.createView({
        //backgroundColor : 'green',
        height : '45%',
        layout : 'horizontal'
    });

    //El contenedor para los datos (Unidades)
    var viewDataItem = Ti.UI.createView({
        //backgroundColor : 'orange',
        height : '55%',
        layout : 'horizontal'
    });

    //Nombre comercial
    var labelName = Ti.UI.createLabel({
        color : '#FFFFFF',
        font : {
            fontFamily : 'Arial',
            fontSize : 17,
            fontWeight : 'bold'
        },
        text : options.Descripcion,
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,
        left : 0
    });

    //Código
    var labelCode = Ti.UI.createLabel({
        //backgroundColor : 'red',
        color : '#808080',
        font : {
            fontFamily : 'Arial',
            fontSize : 13
        },
        text : options.CodigoArticulo,
        height : Ti.UI.SIZE,
        left : 0
    });

    var labelsUnits = ['Precio', 'Venta', 'Regalo', 'Dto Fijo', 'Total'];
    var labelsWidths = ['23', '15', '15', '23', '24'];

    for (var i = 0; i < labelsUnits.length; i++) {
        viewLabels.add(Ti.UI.createLabel({
            //backgroundColor : 'red',
            color : '#808080',
            font : {
                fontFamily : 'Arial',
                fontSize : 13
            },
            text : labelsUnits[i],
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
            height : Ti.UI.FILL,
            width : labelsWidths[i] + '%'
        }));
    };

    //Precio
    var labelPrice = Ti.UI.createLabel({
        //backgroundColor : 'red',
        color : '#808080',
        font : {
            fontFamily : 'Arial',
            fontSize : 15
        },
        text : global.Functions.numToEuro(options.Precio),
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        height : Ti.UI.FILL,
        width : '23%'
    });

    //EditVenta
    var labelEditVenta = Ti.UI.createLabel({
        //backgroundColor : 'red',
        color : '#808080',
        font : {
            fontFamily : 'Arial',
            fontSize : 15
        },
        text : options.Venta,
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        height : Ti.UI.FILL,
        width : '15%'
    });

    //EditRegalo
    var labelEditRegalo = Ti.UI.createLabel({
        //backgroundColor : 'red',
        color : '#808080',
        font : {
            fontFamily : 'Arial',
            fontSize : 15
        },
        text : options.Regalo,
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        height : Ti.UI.FILL,
        width : '15%'
    });

    //EditDto
    var labelEditDto = Ti.UI.createLabel({
        //backgroundColor : 'red',
        color : '#808080',
        font : {
            fontFamily : 'Arial',
            fontSize : 15
        },
        text : global.Functions.numToEuro(options.DtoFijo),
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        height : Ti.UI.FILL,
        width : '23%'
    });

    //Total
    var labelTotal = Ti.UI.createLabel({
        backgroundColor : 'white',
        borderRadius : 5,
        borderWidth : 2,
        borderColor : 'gray',
        color : 'red',
        font : {
            fontFamily : 'Arial',
            fontSize : 15,
            fontWeight : 'bold'
        },
        text : '0,00€',
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        height : Ti.UI.FILL,
        width : '24%'
    });

    //EVENTS

    //EVENT LabelEditVenta
    labelEditVenta.addEventListener('click', function() {
        var winVenta = Ti.UI.createWindow({
            title : 'Unidades para la venta',
            backgroundColor : '#808080',
            navBarHidden : true,
            opacity : 0.50,
            url : global.Path.VIEW + 'Prepedido/WinUnits.js',
            units : 'uni.',
            text : labelEditVenta.text,
            global : global
        });

        winVenta.addEventListener('save', function(e) {
            if (options.Venta != e.data) {
                labelEditVenta.text = e.data;
                options.Venta = e.data;
                detail.Venta = e.data;
                totalRow();
            };
        });

        winVenta.open();
    });

    //EVENT LabelEditRegalo
    labelEditRegalo.addEventListener('click', function() {
        var winRegalo = Ti.UI.createWindow({
            title : 'Unidades para regalo',
            backgroundColor : '#808080',
            navBarHidden : true,
            opacity : 0.50,
            url : global.Path.VIEW + 'Prepedido/WinUnits.js',
            units : 'uni.',
            text : labelEditRegalo.text,
            global : global
        });

        winRegalo.addEventListener('save', function(e) {
            if (options.Regalo != e.data) {
                labelEditRegalo.text = e.data;
                options.Regalo = e.data;
                detail.Regalo = e.data;
            };
        });

        winRegalo.open();
    });

    viewDataItem.add(labelPrice);
    viewDataItem.add(labelEditVenta);
    viewDataItem.add(labelEditRegalo);
    viewDataItem.add(labelEditDto);
    viewDataItem.add(labelTotal);

    viewCodeDes.add(labelName);
    viewCodeDes.add(labelCode);

    //viewItem.add(photo);
    viewItem.add(viewCodeDes);

    viewTexts.add(viewLabels);
    viewTexts.add(viewDataItem);

    viewContent.add(viewItem);
    viewContent.add(viewTexts);

    row.add(viewContent);

    function totalRow() {
        var price = parseInt(options.Precio * 100);
        var dto = parseInt(options.DtoFijo * 100);
        var total = ((price - dto) * options.Venta);
        var beforeTotal = parseInt(global.Functions.euroToNum(labelTotal.text) * 100);

        detail.Total = total / 100;

        totalOrder = totalOrder == 0 ? total : (totalOrder - beforeTotal) + total;

        labelTotalOrder.text = global.Functions.numToEuro(totalOrder / 100);
        labelTotal.text = global.Functions.numToEuro(total / 100);
    };
    
    row.addEventListener('delete', function(){
        totalOrder -= parseInt(global.Functions.euroToNum(labelTotal.text) * 100);
        
        labelTotalOrder.text = global.Functions.numToEuro(totalOrder / 100);
    });

    totalRow();

    return row;
};

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//

var dataRows = [];

for (var i = 0; i < dataLines.length; i++) {
    dataLines[i].Venta = 0;
    dataLines[i].Regalo = 0;
    dataLines[i].Precio = rates.getRate(dataLines[i].CodigoArticulo);
    dataLines[i].DtoFijo = 0;
    dataRows.push(createRow(dataLines[i]));
};

var table = Ti.UI.createTableView({
    data : dataRows,
    borderRadius : 5,
    borderWidth : 2,
    borderColor : 'gray'
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//

butLastOrders.addEventListener('click', function(){
    new win.global.Controller.UltimosPedidos(win.client.CodigoCliente);
});

butSave.addEventListener('click', function() {
    var data = {
        header : {
            NumPedido : '234',
            Serie : '0',
            CodigoCliente : win.client.CodigoCliente,
            ImporteBrutoAlbaran : parseFloat(totalOrder / 100)
        },
        detail : dataLines,
        table : table
    };
    new global.Controller.GuardarPedido(data);
    win.close();
});

butAdd.addEventListener('click', function() {
    win.fireEvent('butAdd', {
        table : table
    });
});

butModify.addEventListener('click', function() {
    if (lastClick != -1) {
        win.fireEvent('butModify', {
            table : table,
            article : dataLines[lastClick]
        });
    };
});

//Elimina una fila si hay alguna seleccionada o todas si no lo hay.
butDelete.addEventListener('click', function() {
    var dialog = Ti.UI.createAlertDialog({
        cancel : 1,
        buttonNames : ['Si', 'No'],
        message : '¿Desea eliminar esta fila?',
        title : 'ELIMINAR FILA'
    });

    //Si hay una fila seleccionada
    if (lastClick >= 0) {
        if (dataLines.length > 0) {
            dialog.addEventListener('click', function(r) {
                if (r.index != r.source.cancel) {
                    table.sections[0].rows[lastClick].fireEvent('delete');
                    table.deleteRow(lastClick);
                    dataLines.splice(lastClick, 1);
                    lastClick = -1;
                };
            });

        };
    } else {//Si no hay ninguna fila seleccionada eliminamos todas las filas
        dialog.message = '¿Desea eliminar todas las filas?';
        dialog.title = 'LIMPIAR PEDIDO';
        dialog.addEventListener('click', function(r) {
            if (r.index != r.source.cancel) {
                dataLines = new Array();
                table.setData(null);
                lastClick = -1;
                labelTotalOrder.text = '0,00€';
            };
        });
    };

    dialog.show();
});

table.addEventListener('click', function(e) {
    if (lastClick >= 0) {
        e.row.setClassName('orderList');
        e.section.rows[lastClick].children[0].backgroundColor = 'transparent';
    };
    e.row.setClassName('orderClick');
    e.row.children[0].backgroundColor = '#90BACE';
    lastClick = e.index;
});

//Para añadir filas a la tabla 
table.addEventListener('tableAdd', function(e){
    table.appendRow(createRow(e.article));
    dataLines.push(e.article);
});

//Para editar filas de la tabla 
table.addEventListener('tableUpdate', function(e){
    table.updateRow(lastClick, createRow(e.article));
    dataLines[lastClick]= e.article;
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
viewHead2.add(labelSerie);
viewHead2.add(desple);
viewHead2.add(butLastOrders);

viewHead.add(labelName);
viewHead.add(viewHead2);

viewBody.add(table);

viewButtons.add(butAdd);
viewButtons.add(butModify);
viewButtons.add(butDelete);
viewButtons.add(butSave);

viewFoot1.add(labelTotal);
viewFoot1.add(labelTotalOrder);

viewFoot.add(viewFoot1);
viewFoot.add(viewButtons);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(viewHead);
win.add(viewBody);
win.add(viewFoot);
