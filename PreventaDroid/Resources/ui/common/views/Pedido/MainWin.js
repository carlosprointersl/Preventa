/**
 * @fileOverview En este archivo se crea el formulario para crear/editar los parámetros.
 *
 * @author Juan Carlos Matilla
 * @version 1.0
 *
 */

/**
 * La libreria underscore.js
 */
var _ = require('/lib/underscore');

//
// ---------------------------------------------------------------- VARIABLES -------------------------------------------------
//
//La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//El Array con las líneas del pedido.
var dataLines = win.dataLines;
//La cabecera del pedido
var rowHeader = win.rowHeader;
// El controlador de Serie
var serie = win.serie;
//El total de las líneas de pedido
var totalOrder = 0;
//Índice de la última linea "clickeada"
var lastClick = -1;
//El cliente
var client = win.client;
//Parámetros
var parameters = Global.Parameters.Configuracion;
// Modo de la aplicación.
var modoApp = parameters.getModoApp();
//Iva y recargos
var ivaRecargo = Global.Parameters.IvaRecargo;

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')(client.NombreComercial, "Acciones", backOrder);
headerMenu.setTop(0);
win.add(headerMenu);

//Body
var viewBody = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    layout : 'vertical',
    width : Ti.UI.FILL,
    top : 50,
    bottom : 95
});
win.add(viewBody);

//Pedido y fecha
var viewOrderDate = Ti.UI.createView({
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE
});
viewBody.add(viewOrderDate);

//La serie
var viewSerie = Ti.UI.createView({
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE
});
viewBody.add(viewSerie);

//Línea horizontal
viewBody.add(Ti.UI.createView({
    backgroundColor : Global.Theme.BACKGROUND,
    width : Ti.UI.FILL,
    height : 0.5,
    layout : 'horizontal'
}));

//Cabecera de columnas
var viewColumn = Ti.UI.createView({
    width : Ti.UI.FILL,
    height : 17,
    layout : 'horizontal'
});
viewBody.add(viewColumn);

//Total del pedido
var viewTotal = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    width : Ti.UI.FILL,
    layout : 'horizontal',
    height : 25,
    bottom : 70
});
win.add(viewTotal);
//La línea divisoria para el total
win.add(Ti.UI.createView({
    backgroundColor : Global.Theme.BACKGROUND,
    width : Ti.UI.FILL,
    height : 0.5,
    bottom : 70,
    zIndex : 1
}));
//La línea divisoria para el total
win.add(Ti.UI.createView({
    backgroundColor : Global.Theme.BACKGROUND,
    width : Ti.UI.FILL,
    height : 0.5,
    bottom : 95,
    zIndex : 1
}));

//Pie
var viewFoot = Ti.UI.createView({
    backgroundColor : Global.Theme.BUTTON.BACKGROUND,
    layout : 'horizontal',
    width : Ti.UI.FILL,
    height : 70,
    bottom : 0
});
win.add(viewFoot);

//
// ---------------------------------------------------------------- LABEL -------------------------------------------------
//
//Pedido
var labelOrder = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 17,
        fontWeight : 'bold'
    },
    text : "Pedido: ",
    width : Ti.UI.SIZE,
    height : Ti.UI.SIZE,
    left : 2
});
viewOrderDate.add(labelOrder);

//Fecha servicio
var labelDate = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 17,
        fontWeight : 'bold'
    },
    text : rowHeader.FechaServicio ? Global.Functions.dateFormat(new Date(rowHeader.FechaServicio)) : Global.Functions.dateFormat(new Date()),
    width : Ti.UI.SIZE,
    height : Ti.UI.SIZE,
    right : 2
});
viewOrderDate.add(labelDate);

//Serie
var labelSerie = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 17,
        fontWeight : 'bold'
    },
    text : 'Serie',
    width : Ti.UI.SIZE,
    left : 2
});
if (modoApp === "A")
    viewSerie.add(labelSerie);

//Total pedido - Etiqueta
var labelTotal = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 15,
        fontWeight : 'bold'
    },
    text : 'Total del pedido: ',
    height : Ti.UI.SIZE,
    width : Ti.UI.SIZE,
    left : 2
});
viewTotal.add(labelTotal);

//Total pedido - cantidad
var labelTotalOrder = Ti.UI.createLabel({
    backgroundColor : Global.Theme.ORDER.TOTAL_BACKGROUND,
    borderWidth : 1,
    borderColor : Global.Theme.ORDER.TOTAL_BORDER,
    color : Global.Theme.ORDER.TOTAL_TEXT,
    font : {
        fontSize : 15,
        fontWeight : 'bold'
    },
    text : '0,00€',
    height : Ti.UI.SIZE,
    width : Ti.UI.FILL,
    textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
    right : 2
});
viewTotal.add(labelTotalOrder);

//Los nombres de las etiquetas para las unidades.
var labelsUnits = [{
    text : 'Código',
    width : '14%'
}, {
    text : 'Precio',
    width : '20%'
}, {
    text : 'Venta',
    width : '12%'
}, {
    text : 'Regalo',
    width : '12%'
}, {
    text : 'Dto',
    width : '20%'
}, {
    text : 'Total',
    width : Ti.UI.FILL
}];

for (var i = 0, j = labelsUnits.length; i < j; i++) {
    viewColumn.add(Ti.UI.createLabel({
        //backgroundColor : 'red',
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 11
        },
        text : labelsUnits[i].text,
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        height : Ti.UI.FILL,
        width : labelsUnits[i].width
    }));
};

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
var menuButton = require(Global.Path.CONTROL + 'Button/MenuButton');

//Añadir
var butAdd = menuButton("Añadir", "edit_add_48.png", "20%");
viewFoot.add(butAdd);
//Eliminar
var butDelete = menuButton("Limpiar", "file_empty_48.png", "20%");
viewFoot.add(butDelete);
//Guardar
var butSave = menuButton("Guardar", "save_48.png", "20%");
viewFoot.add(butSave);
//Los últimos pedidos
var butLastOrders = menuButton("UltPed", "stock_task_48.png", "20%");
viewFoot.add(butLastOrders);
//Notas
var butNotes = menuButton("Notas", "notes_48.png", Ti.UI.FILL/*"16.66%"*/);
viewFoot.add(butNotes);

//Llenamos el grid de los botones.
for (var i = 1; i < 5; i++) {
    win.add(Ti.UI.createView({
        backgroundColor : Global.Theme.LINES,
        width : 0.5,
        height : 70,
        bottom : 0,
        zIndex : 1,
        center : {
            x : (20 * i) + "%"
        }
    }));
};

//
// ---------------------------------------------------------------- PICKER -------------------------------------------------
//
var pickerSerie;
if (modoApp === "A") {
    var series = serie.getSeries();

    if (rowHeader.Serie == undefined) {
        // El pickerSerie
        pickerSerie = Ti.UI.createPicker();
        var column = Ti.UI.createPickerColumn();

        for (var i = 0, j = series.length; i < j; i++) {
            column.addRow(Ti.UI.createPickerRow({
                title : series[i].nombre,
                index : i
            }));
        };

        pickerSerie.add(column);
        pickerSerie.selectionIndicator = true;
        var viewPicker = Ti.UI.createView({
            width : Ti.UI.SIZE,
            height : Ti.UI.SIZE,
            right : 2
        });
        viewPicker.add(pickerSerie);
        viewSerie.add(viewPicker);
    } else {
        pickerSerie = Ti.UI.createLabel({
            color : Global.Theme.TEXT_PRINCIPAL,
            font : {
                fontSize : 17,
                fontWeight : 'bold'
            },
            text : series.filter(function(element){
            return element.id === rowHeader.Serie;
            })[0].nombre,
            width : Ti.UI.SIZE,
            height : Ti.UI.SIZE,
            right : 2
        });

        viewSerie.add(pickerSerie);
    };
};

//Ponemos el número de pedido teniendo en cuenta si es "Autoventa" o "Preventa" o si ya lo tiene.
labelOrder.setText("Pedido: " + (rowHeader.NumPedido != undefined ? rowHeader.NumPedido : modoApp === "P" ? parameters.getNumPedido() : series[0].numFactura));

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//

//Función para sumar todos los totales.
function totalScore() {
    var tmpTotal = 0;

    //Recorremos todas las filas de la tabla.
    for (var i = 0; i < table.sections.length; i++) {
        var rows = table.sections[i].getRows();
        for (var y = 0; y < rows.length; y++) {
            tmpTotal += rows[y].totalLine;
        };
    };
    totalOrder = tmpTotal / 100;
    labelTotalOrder.text = Global.Functions.numToEuro(totalOrder);
};

//Las "rows" del pedido.
var dataRows = [Ti.UI.createTableViewSection()];
//Recorremos todas las líneas iniciales del pedido.
for (var i = 0, j = dataLines.length; i < j; i++) {
    //Si NO PERTENECE a una agrupación..
    if (dataLines[i].CodigoAgrupacion == 0) {
        dataRows[0].add(new Global.Control.OrderRow(client, dataLines[i]));
    } else {
        var section = Ti.UI.createTableViewSection({
            headerTitle : dataLines[i].DescripcionPromocion
        });
        var tmpCode = dataLines[i].CodigoAgrupacion;
        while (i < dataLines.length && dataLines[i].CodigoAgrupacion == tmpCode) {
            section.add(new Global.Control.OrderRow(client, dataLines[i]));
            i += 1;
        };
        dataRows.push(section);
        i -= 1;
    };

};
//La tabla con los artículos.
var table = Ti.UI.createTableView({
    backgroundColor : Global.Theme.BACKGROUND,
    data : dataRows
});
viewBody.add(table);

totalScore();

// function showDataLines() {
// for (var i = 0; i < dataLines.length; i++) {
// Ti.API.info("** Descripcion: " + dataLines[i].Descripcion + "\n** Venta:" + dataLines[i].Venta);
// };
// };

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//La selección de serie solo está disponible cuando es "Autoventa"
if (modoApp === "A" && rowHeader.Serie === null) {
    pickerSerie.addEventListener('change', function(e) {
        labelOrder.setText("Pedido: " + series[e.rowIndex].numFactura);
    });
};

//Ultimos Pedidos
butLastOrders.addEventListener('click', function() {
    Global.Controller.UltimosPedidos(win.client.CodigoCliente);
});

//Guardar
butSave.addEventListener('click', function() {
    //Si el total es mayor de 0 podemos guardar el pedido.
    //if (totalOrder > 0) {
        var serviceDate = new Date(labelDate.text.substring(10, 6), labelDate.text.substring(3, 5) - 1, labelDate.text.substring(0, 2));

        rowHeader.NumPedido = rowHeader.NumPedido || labelOrder.getText().replace("Pedido: ", "");
        //rowHeader.NumLineasPedido = dataLines.length;
        rowHeader.ImporteBrutoAlbaran = totalOrder;
        rowHeader.ImporteDtos = "0";
        rowHeader.FechaServicio = Global.Functions.dateTimeSQliteFormat(serviceDate);
        rowHeader.FechaPedido = Global.Functions.dateTimeSQliteFormat(new Date());
        //rowHeader.NotaPreventa = "";
        //rowHeader.NotaAlbaran = "";
        rowHeader.FormaPago = "0";
        rowHeader.Serie = rowHeader.Serie != null ? rowHeader.Serie : modoApp === "P" ? "0" : series[pickerSerie.getSelectedRow(0).index].id;
        rowHeader.ImporteResto = "0";
        rowHeader.GPSLongitud = "";
        rowHeader.GPSLatitud = "";

        //Quitamos de "dataLines" todos las líneas que no tengan ningún pedido.
        var newDataLines = new Array();

        for (var i = 0, j = dataLines.length; i < j; i++) {
            if (dataLines[i].Venta > 0 || dataLines[i].Regalo > 0) {
                dataLines[i].Serie = rowHeader.Serie;
                dataLines[i].NumPedido = rowHeader.NumPedido;
                newDataLines.push(dataLines[i]);
            };
        };
        
        rowHeader.NumLineasPedido = newDataLines.length;

        win.fireEvent('save', {
            rowHeader : rowHeader,
            detail : newDataLines
        });

        win.close();
    // } else {
        // var popAlert = new Global.Control.Windows.Alert({
            // title : "GUARDAR PEDIDO",
            // message : "No hay líneas válidas para guardar el pedido.",
            // icon : Global.Control.Windows.ICON.EXCLAMATION
        // });
        // popAlert.open();
    // };

});

//Añadir
butAdd.addEventListener('click', function() {
    win.fireEvent('butAdd');
});

//Editamos las notas
butNotes.addEventListener('click', function() {
    win.fireEvent('butNotes');
});

//Elimina una fila si hay alguna seleccionada o todas si no lo hay.
butDelete.addEventListener('click', function() {
    //La ventana emergente.
    var popAlert = new Global.Control.Windows.Alert({
        title : 'LIMPIAR PEDIDO',
        message : "¿Desea eliminar todas las filas?",
        icon : Global.Control.Windows.ICON.QUESTION,
        buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
    });
    //Si aceptamos la pregunta.
    popAlert.addEventClickButton('accept', function() {
        dataLines = new Array();
        table.setData(null);
        labelTotalOrder.text = '0,00€';
    });

    popAlert.open();
});

//Seleccionar elemento de la tabla
table.addEventListener('click', function(e) {
    //if (dataLines[e.index].Tarifa > 0) {
        var winOffer = dataLines[e.index].winOffer();
        //El evento "save" que retorna el artículo con sus cantidades.
        winOffer.addEventListener('save', function(o) {
            //Si no es un Array solo hay un artículo
            if (!Array.isArray(o.article)) {
                //Pasamos los valores a Float
                o.article.Venta = o.article.Venta != "" ? o.article.Venta : 0;
                o.article.Regalo = o.article.Regalo != "" ? o.article.Regalo : 0;
                o.article.Precio = o.article.Precio != "" ? o.article.Precio : 0;
                o.article.DtoFijo = o.article.DtoFijo != "" ? o.article.DtoFijo: 0;
                o.article.DtoEspecial = o.article.DtoEspecial != "" ? o.article.DtoEspecial : 0;
                //La fila del pedido.
                var row = new Global.Control.OrderRow(client, o.article);
                table.updateRow(e.index, row);
                dataLines[e.index] = o.article;
            } else {
                //El índice de la sección.
                var indexSec = Global.Functions.indexSection(table, e.index);
                //Los artículos que añadimos al pedido.
                var articles = new Array();
                //La sección nueva.
                var section = Ti.UI.createTableViewSection({
                    headerTitle : o.article[0].DescripcionPromocion
                });
                //Por cada artículo.
                for (var i = 0; i < o.article.length; i++) {
                    if (o.article[i].Venta > 0 || o.article[i].Regalo > 0) {
                        //Pasamos los valores a Float
                        o.article[i].Venta = o.article[i].Venta != "" && o.article[i].Venta != undefined ? parseFloat(o.article[i].Venta) : 0;
                        o.article[i].Regalo = o.article[i].Regalo != "" && o.article[i].Regalo != undefined ? parseFloat(o.article[i].Regalo) : 0;
                        o.article[i].Precio = o.article[i].Precio != "" && o.article[i].Precio != undefined ? parseFloat(o.article[i].Precio) : 0;
                        o.article[i].DtoFijo = o.article[i].DtoFijo != "" && o.article[i].DtoFijo != undefined ? parseFloat(o.article[i].DtoFijo) : 0;
                        o.article[i].DtoEspecial = o.article[i].DtoEspecial != "" && o.article[i].DtoEspecial != undefined ? parseFloat(o.article[i].DtoEspecial) : 0;
                        //La fila del pedido.
                        var row = new Global.Control.OrderRow(client, o.article[i]);
                        section.add(row);
                        articles.push(o.article[i]);
                    };
                };
                //Si la sección de la fila es la primera, es la fila de artículo individuales. Añadimos la sección al final.
                if (indexSec === 0) {
                    //Quitamos el artículo seleccionado.
                    dataLines.splice(e.index, 1);
                    //Añadimos los artículos de la nueva sección.
                    for (var i = 0; i < articles.length; i++) {
                        dataLines.push(articles[i]);
                    };
                    table.deleteRow(e.index);
                    table.appendSection(section);

                    //SI NO Actualizamos la sección por otra nueva.
                } else {
                    //El índice de inicio de dataLines.
                    var start = 0;
                    for (var i = 0; i < indexSec; i++) {
                        start += table.sections[i].rowCount;
                    };
                    //Quitamos los artículos de la sección antigua.
                    dataLines.splice(start, table.sections[indexSec].rowCount);
                    //Añadimos los artículos de la nueva sección.
                    for (var i = 0; i < articles.length; i++) {
                        dataLines.splice(start, 0, articles[i]);
                        start += 1;
                    };
                    table.updateSection(indexSec, section);
                };
            };
            totalScore();
            winOffer.close(); 
        });

        //El evento "but:delete" indica que se desea eliminar el atículo del pedido.
        winOffer.addEventListener('but:delete', function() {
            //La ventana antes de salir.
            var options = {
                title : 'ELIMINAR FILA',
                message : "¿Desea eliminar el artículo actual?",
                icon : Global.Control.Windows.ICON.QUESTION,
                buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
            };

            var indexSec = Global.Functions.indexSection(table, e.index);
            //Si pertenece a la sección "0", que es la de los artículos individuales.
            if (indexSec == 0) {
                var popAlert = new Global.Control.Windows.Alert(options);
                popAlert.addEventClickButton('accept', function() {
                    table.deleteRow(e.index);
                    dataLines.splice(e.index, 1);
                    totalScore();
                    winOffer.close();
                });
            } else {
                options.message = '¿Desea eliminar toda la promoción?';
                options.title = 'ELIMINAR PROMOCIÓN';
                var popAlert = new Global.Control.Windows.Alert(options);
                //Si aceptamos la pregunta.
                popAlert.addEventClickButton('accept', function() {
                    var start = 0;
                    for (var i = 0, j = indexSec ; i < j; i++) {
                        start += table.sections[i].rowCount;
                    };
                    //var resto = dataLines.splice(start, table.sections[indexSec].rowCount);
                    dataLines.splice(start, table.sections[indexSec].rowCount);
                    table.deleteSection(indexSec);
                    totalScore();
                    winOffer.close();
                });
            };
            
            popAlert.open();
        });

        winOffer.open();
    // } else {
        // var alert = new Global.Control.Windows.Alert({
            // message : "El artículo seleccionado no dispone de precio para la tarifa seleccionada.",
            // icon : Global.Control.Windows.ICON.INFORMATION,
            // title : 'ARTÍCULO SIN TARIFA'
        // });
// 
        // alert.open();
    // };
});

//La fecha
labelDate.addEventListener('click', function(e) {
    var winDate = new Global.Control.Windows.DateTime({
        type : Ti.UI.PICKER_TYPE_DATE,
        value : Global.Functions.strToDate(labelDate.text),
        title : "Fecha de servicio"
    });

    winDate.addEventListener('dateTime:value', function(e) {
        labelDate.text = Global.Functions.dateFormat(e.value);
    });

    winDate.open();
});

//
// ---------------------------------------------------------------- WIN EVENTS -------------------------------------------------
//

//Para añadir filas a la tabla
win.addEventListener('tableAdd', function(e) {
    //Si no es un Array solo hay un artículo
    if (!Array.isArray(e.article)) {
        //Pasamos los valores a Float
        e.article.Venta = e.article.Venta != "" ? e.article.Venta : 0;
        e.article.Regalo = e.article.Regalo != "" ? e.article.Regalo : 0;
        e.article.Precio = e.article.Precio != "" ? e.article.Precio : 0;
        e.article.DtoFijo = e.article.DtoFijo != "" ? e.article.DtoFijo: 0;
        e.article.DtoEspecial = e.article.DtoEspecial != "" ? e.article.DtoEspecial : 0;
        //La fila del pedido.
        var row = new Global.Control.OrderRow(client, e.article);
        //Si hay mas de una sección
        if (table.sections.length > 0) {
            var tmpSection = table.sections[0];
            tmpSection.add(row);
            dataLines.splice(table.sections[0].rowCount - 1, 0, e.article);
            //Actualizamos la sección
            table.updateSection(0, tmpSection);
        } else {
            var tmpSection = Ti.UI.createTableViewSection();
            tmpSection.add(row);
            table.appendSection(tmpSection);
            dataLines.push(e.article);
        };
    } else {
        var section = Ti.UI.createTableViewSection({
            headerTitle : e.article[0].DescripcionPromocion
        });
        //Por cada artículo
        for (var i = 0; i < e.article.length; i++) {
            if (e.article[i].Venta > 0 || e.article[i].Regalo > 0) {
                //Pasamos los valores a Float
                e.article[i].Venta = e.article[i].Venta != "" && e.article[i].Venta != undefined ? parseFloat(e.article[i].Venta) : 0;
                e.article[i].Regalo = e.article[i].Regalo != "" && e.article[i].Regalo != undefined ? parseFloat(e.article[i].Regalo) : 0;
                e.article[i].Precio = e.article[i].Precio != "" && e.article[i].Precio != undefined ? parseFloat(e.article[i].Precio) : 0;
                e.article[i].DtoFijo = e.article[i].DtoFijo != "" && e.article[i].DtoFijo != undefined ? parseFloat(e.article[i].DtoFijo) : 0;
                e.article[i].DtoEspecial = e.article[i].DtoEspecial != "" && e.article[i].DtoEspecial != undefined ? parseFloat(e.article[i].DtoEspecial) : 0;
                //La fila del pedido.
                var row = new Global.Control.OrderRow(client, e.article[i]);
                //Ti.API.info("Total Line: " + row.totalLine);
                section.add(row);
                dataLines.push(e.article[i]);
            };
        };
        //Si no hay ninguna sección añadimos una para los artículos individuales
        if (table.sections.length == 0) {
            table.appendSection(Ti.UI.createTableViewSection());
        };

        table.appendSection(section);
    };
    totalScore();
});

//La función antes de salir del pedido.
function backOrder() {
    //La ventana antes de salir.
    var popAlert = new Global.Control.Windows.Alert({
        title : 'SALIR DEL PEDIDO',
        message : "¿Seguro que desea salir sin guardar el pedido?",
        icon : Global.Control.Windows.ICON.QUESTION,
        buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
    });
    //Si aceptamos la pregunta.
    popAlert.addEventClickButton('accept', function() {
        win.close();
    });

    popAlert.open();
};

//El evento BACK de la ventana
win.addEventListener('android:back', backOrder);

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//

