/**
 * @fileOverview Es la vista MainWin del controlador Pedido.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

//La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//Los pedidos anteriores
var orders = win.orders;
//Un contador para contar las filas que se eliminan.
var countDel = 0;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Pedidos anteriores", "Cliente", function(){win.close();});
//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Win
var viewWin = Ti.UI.createView({
    height : Ti.UI.FILL,
    width : Ti.UI.FILL,
    layout : 'vertical'
});

//Header
var viewHeader = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    height : Ti.UI.SIZE,
    width : Ti.UI.FILL,
    layout : 'horizontal'
});

//
// ---------------------------------------------------------------- IMAGES -------------------------------------------------
//
var imageOrders = Ti.UI.createImageView({
    image : '/images/stock_task_48.png',
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
//El nombre comerical del cliente
var labelPreviousOrders = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 20
    },
    text : win.nameClient,
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : Ti.UI.SIZE,
    left : 4
});

//
// ---------------------------------------------------------------- TABLE VIEW -------------------------------------------------
//
var data = [];

//Creamos las filas con los datos que tenemos.
for (var i = 0; i < orders.length; i++) {
    data.push(createRow(orders[i]));
};

var table = Ti.UI.createTableView({
    data : data
});

//
// ---------------------------------------------------------------- TABLE VIEW ROW -------------------------------------------------
//
//Crea la fila para mostrar los datos del pedido anteior.
function createRow(options) {
    var date = options.FechaPedido.substr(8, 2) + "/" + options.FechaPedido.substr(5, 2) + "/" + options.FechaPedido.substr(0, 4) + " " + options.FechaPedido.substr(11);
    // var state = options.state || undefined;

    //La fila
    var row = Ti.UI.createTableViewRow({
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        backgroundSelectedColor : Global.Theme.ROW.PRESS,
        className : 'client',
        height : 70
    });

    //Las vista contenedor. Nos ayuda para el efecto "touch".
    var content = Ti.UI.createView({
        height : Ti.UI.FILL,
        width : Ti.UI.FILL,
        layout : 'horizontal'
    });

    //El contenedor para los textos
    var viewTexts = Ti.UI.createView({
        // backgroundColor : 'yellow',
        backgroundSelectedColor : Global.Theme.ROW.PRESS,
        height : Ti.UI.FILL,
        layout : 'vertical',
        touchEnabled : false
    });

    var viewNumDel = Ti.UI.createView({
        height : Ti.UI.SIZE,
        width : Ti.UI.FILL,
        touchEnabled : false
    });

    //Número de pedido
    var labelNum = Ti.UI.createLabel({
        //backgroundColor : 'gray',
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 22,
            fontWeight : 'bold'
        },
        text : "Número pedido: " + options.NumPedido,
        left : 2,
        top : 2,
        width : Ti.UI.FILL,
        height : 25,
        touchEnabled : false
    });
    
    //Número de la serie
    var labelSerie = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 18,
            fontWeight : 'bold'
        },
        text : "Número serie: " + options.Serie,
        left : 2,
        top : 29,
        width : Ti.UI.FILL,
        height : 20,
        touchEnabled : false
    });

    //Botón delete
    var butDel = Ti.UI.createButton({
        image : '/images/delete_32.png',
        right : 2,
        top : 2,
        bubbleParent : false
    });

    //Eliminamos el pedido
    butDel.addEventListener('click', function(e) {
        //La función al aceptar.
        function del() {
            win.fireEvent('delete', {
                order : options
            });
            popup.close();
            countDel += 1;

            //Si el contandor es igual o mayor que las filas cerramos la ventana.
            if (countDel >= orders.length) {
                win.close();
            } else {
                //Eliminamos la fila de la tabla.
                table.deleteRow(table.sections[0].rows.lastIndexOf(row));
            };
        };
        //Las opciones de la ventana
        var optionsPopup = {
            title : "ELIMINAR PEDIDO",
            icon : Global.Control.Windows.ICON.QUESTION,
            buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL,
            message : "¿Desea eliminar el pedido nº " + options.NumPedido + "?"
        };
        //El objeto Popup
        var popup = new Global.Control.Windows.Alert(optionsPopup);

        popup.addEventClickButton("accept", del);
        popup.open();
    });

    //Fecha Pedido
    var labelOrderDate = Ti.UI.createLabel({
        //backgroundColor : 'white',
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontFamily : 'Arial',
            fontSize : 16
        },
        text : "Fecha/Hora pedido: " + date,
        textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
        left : 2,
        bottom : 2,
        height : Ti.UI.SIZE,
        touchEnabled : false
    });

    //Los datos de la fila
    row.order = options;

    //Evento "touch start" de la fila, para cuando se pulse la fila que se marque.
    row.addEventListener('touchstart', function(e) {
        content.setBackgroundColor(Global.Theme.ROW.PRESS);
        // Ti.API.info("******************************************* TOUCH START ROW");
    });

    //Evento "touch end" de la fila, para cuando se deja de pulsar la fila que se muestre del color original.
    row.addEventListener('touchend', function(e) {
        content.setBackgroundColor('transparent');
        // Ti.API.info("*************************************** TOUCH END ROW");
    });

    //Evento "touch cancel" de la fila, para cuando se deja de pulsar la fila que se muestre del color original.
    row.addEventListener('touchcancel', function(e) {
        content.setBackgroundColor('transparent');
        // Ti.API.info("*********************************** TOUCH CANCEL ROW");
    });

    viewNumDel.add(labelNum);
    viewNumDel.add(labelSerie);
    viewNumDel.add(butDel);

    viewTexts.add(viewNumDel);
    viewTexts.add(labelOrderDate);

    content.add(viewTexts);

    row.add(content);

    return row;
};

//
// ---------------------------------------------------------------- LOADING -------------------------------------------------
//
var loading = require(Global.Path.CONTROL + 'Loading')();

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//

table.addEventListener('click', function(e) {
    //Si NO es el botón lanzamos el evento.
    if (!(e.source instanceof Ti.UI.Button)) {
        win.fireEvent('returnOrder', {
            order : e.row.order
        });
    };
});

table.addEventListener('postlayout', function(e) {
    loading.hide();
});

win.addEventListener('open', function() {
    loading.show();
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//

viewHeader.add(imageOrders);
viewHeader.add(labelPreviousOrders);

viewWin.add(headerMenu);
viewWin.add(viewHeader);
viewWin.add(table);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(viewWin);
