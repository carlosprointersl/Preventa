/**
 * @fileOverview En este archivo se crea el formulario para crear/editar los parámetros.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

//La ventana actual
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//El artículo
var article = win.article;
//Listado
var list = win.list;

var model = new Global.Model.Articulos();
var cantidad = model.selectCantidadCaja(list[0].CodigoArticulo);
cantidad = cantidad[0].UnidadesCaja;
//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//La principal
var viewMain = Ti.UI.createView({
    opacity : 1,
    left : 10,
    right : 10,
    top : 20,
    bottom : 20,
    backgroundColor : Global.Theme.BACKGROUND,
    layout : 'vertical'
});

//title
var viewTitle = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE,
    top : 0
});

//El encabezado
var viewHeader = Ti.UI.createView({
    backgroundColor : Global.Theme.ROW.BACKGROUND,
    height : 45,
    layout : 'horizontal'
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
//Nombre artículo
var labelName = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 20
    },
    text : article.Descripcion,
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE,
    horizontalWrap : false
});

//Fecha
var labelDate = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 12
    },
    text : 'Fecha Factura',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : "15%"
});

//Cantidad
var labelQuantity = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 12
    },
    text : 'Cant.',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : "10%"
});

//Precio
var labelPrice = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 12
    },
    text : 'Precio',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : "15%"
});

//Dto
var labelDto = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 12
    },
    text : 'Desc.',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : "15%"
});

//Dto%
var labelDtoPorc = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 12
    },
    text : 'Desc. %',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : "15%"
});

//Precio Final
var labelPrecioFinal = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 12
    },
    text : 'Precio Final',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : "15%"
});

//Precio Unidad
var labelPrecioUni = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 12
    },
    text : 'Precio Unidad',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : "15%"
});

//
// ---------------------------------------------------------------- TABLE VIEW -------------------------------------------------
//
var rows = new Array();

for (var i = 0; i < list.length; i++) {
    var row = Ti.UI.createTableViewRow({
        layout : 'horizontal'
    });    

    //Fecha
    var labelDateRow = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 9
        },
        text : Global.Functions.dateTimeFormat(new Date(list[i].FechaFactura)),
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        width : "15%"
    });

    //Cantidad
    var labelQuantityRow= Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 12
        },
        text : list[i].Cantidad,
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        width : "10%"
    });

    //Precio
    var labelPriceRow = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 12
        },
        text : Global.Functions.numToEuro(list[i].Precio),
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        width : "15%"
    });

    //Dto
    var labelDtoRow = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 12
        },
        text : Global.Functions.numToEuro(list[i].Descuento),
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        width : "15%"
    });
    
    //Dto
    var desc_porc = (list[i].Descuento / (list[i].Precio * list[i].Cantidad)) * 100;
    var labelDtPorcRow = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 12
        },
        text : desc_porc.toFixed(2) + " %",
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        width : "15%"
    });
    
    var precio_final = Global.Functions.numToEuro((list[i].Precio * list[i].Cantidad) - list[i].Descuento);
    
    var labelPrecioFinalRow = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 12
        },
        text : precio_final,
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        width : "15%"
    });
    
    
    var precio_uni = Global.Functions.numToEuro(((list[i].Precio * list[i].Cantidad) - list[i].Descuento) / (cantidad * list[i].Cantidad));
    
    var labelPrecioUniRow = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 12
        },
        text : precio_uni,
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        width : "15%"
    });
    
    row.add(labelDateRow);
    row.add(labelQuantityRow);
    row.add(labelPriceRow);
    row.add(labelDtoRow);
    row.add(labelDtPorcRow);
    row.add(labelPrecioFinalRow);
    row.add(labelPrecioUniRow);

    rows.push(row);
};

var table = Ti.UI.createTableView({
    data : rows
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
viewTitle.add(labelName);

viewHeader.add(labelDate);
viewHeader.add(labelQuantity);
viewHeader.add(labelPrice);
viewHeader.add(labelDto);
viewHeader.add(labelDtoPorc);
viewHeader.add(labelPrecioFinal);
viewHeader.add(labelPrecioUni);

viewMain.add(viewTitle);
viewMain.add(viewHeader);
viewMain.add(table);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//

win.add(viewMain);
