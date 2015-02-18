/**
 * @fileOverview Es la vista MainWin de las facturas.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//Las facturas pendientes
var invoices = win.invoices;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Facturas", "Cliente", function(){win.close();});
headerMenu.setTop(0);
//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Content
var content = Ti.UI.createView({
    top : 50,
    bottom : 60
});

//Foot Buttons
var foot = Ti.UI.createView({
    bottom : 0,
    height : 60,
    width : Ti.UI.FILL
});

//La linea divisoria de los botones.
var line_v = Ti.UI.createView({
    backgroundColor : Global.Theme.LINES,
    bottom : 0,
    top : 0,
    width : 0.5,
    center : {
        x : '50%'
    }
});

//Print
var viewPrint = require(Global.Path.VIEW + 'Facturas/ViewPrint')(Global);

//Pending
var viewPending = require(Global.Path.VIEW + 'Facturas/ViewPending')({Global : Global, invoices : invoices, nameClient : win.nameClient});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
//Button Pending
var butPending = Ti.UI.createButton({
    image : '/images/invoice_32.png',
    backgroundColor : Global.Theme.BUTTON.BACKGROUND,
    backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
    color : Global.Theme.BUTTON.TITLE,
    font : {
        fontSize : 21,
        fontStyle : 'bold'
    },
    title : "Pendientes",
    height : Ti.UI.FILL,
    width : '50%',
    right : 0
});

var butPrint = Ti.UI.createButton({
    image : '/images/printer_32.png',
    backgroundColor : Global.Theme.BUTTON.BACKGROUND,
    backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
    color : Global.Theme.BUTTON.TITLE,
    font : {
        fontSize : 21,
        fontStyle : 'bold'
    },
    title : "Imprimir",
    height : Ti.UI.FILL,
    width : '50%',
    left : 0
});

//
// ---------------------------------------------------------------- COMPROBACIONES PREVIAS -------------------------------------------------
//
//Si NO está en modo Autoventa hemos de desactivar la impresión de facturas.
if (Global.Parameters.Configuracion.getModoApp() != "A") {
    butPrint.setEnabled(false);
    butPrint.setBackgroundColor('gray');
    viewPending.setVisible(true);
    win.setTitle("Facturas pendietes");
} else {
    viewPrint.setVisible(true);
    win.setTitle("Imprimir facturas");
};

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//butPending 'click'
butPending.addEventListener('click', function() {
    viewPrint.setVisible(false);
    viewPending.setVisible(true);
    win.setTitle("Facturas pendietes");
});

//butPrint 'click'
butPrint.addEventListener('click', function() {
    viewPrint.setVisible(true);
    viewPending.setVisible(false);
    win.setTitle("Imprimir facturas");
});

//Table 'click'
viewPending.addClickTableListener(function(e){
    win.fireEvent('table:click', e);
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//

content.add(viewPending);
content.add(viewPrint);

foot.add(butPrint);
foot.add(butPending);
foot.add(line_v);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(headerMenu);
win.add(content);
win.add(foot);
