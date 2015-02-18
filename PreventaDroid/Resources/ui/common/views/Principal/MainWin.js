/**
 * @fileOverview Es la vista MainWin del controlador Principal.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
// La variable Global
var Global = win.Global;
//EL log
var Log = win.log;
//
var data = win.data;
// Los índices de los puntos de menú bloqueables
var indexBlock = [0, 1, 2, 5, 7];
//La función para bloquear los botones
var blockButtons = win.blockButtons;

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Header
var viewHeader = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    top : 0,
    height : 70,
    width : Ti.UI.FILL,
    layout : 'vertical'
});

//Body
var viewBody = Ti.UI.createView({
    width : Ti.UI.FILL,
    top : viewHeader.height,
    bottom : 0
});

//BodyLeft
var viewBodyLeft = Ti.UI.createView({
    left : 0,
    width : '50%',
    layout : 'vertical'
});

//BodyRight
var viewBodyRight = Ti.UI.createView({
    right : 0,
    width : '50%',
    layout : 'vertical'
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
//Título
var labelTitle = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 16
    },
    text : 'Projectes Informàtics de Terrassa S.L.',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
});

//Preventista
var labelPreventista = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 14
    },
    text : 'Preventista: ' + data.preventista,
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
});

//Terminal
var labelTerminal = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 14
    },
    text : 'Terminal: ' + data.terminal,
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
var namesButtons = ["Clientes", "Pedidos", "Informes", "Preventista", "Configuración", "Artículos", "Actualizar", "Backup"];
var buttons = new Array();

for (var i = 0; i < namesButtons.length; i++) {
    buttons.push(Ti.UI.createButton({
        backgroundColor : Global.Theme.BUTTON.BACKGROUND,
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        color : Global.Theme.BUTTON.TITLE,
        font : {
            fontSize : 23,
            fontStyle : 'bold'
        },
        title : namesButtons[i],
        height : '25%',
        width : Ti.UI.FILL
    }));
};

//
// ---------------------------------------------------------------- LINES -------------------------------------------------
//
//Header
var line_header = Ti.UI.createView({
    backgroundColor : Global.Theme.LINES,
    height : 0.5,
    width : Ti.UI.FILL,
    center : {
        y : 70
    }
});
//But1
var line_but1 = Ti.UI.createView({
    backgroundColor : Global.Theme.LINES,
    height : 0.5,
    width : Ti.UI.FILL,
    center : {
        y : '25%'
    }
});
//But2
var line_but2 = Ti.UI.createView({
    backgroundColor : Global.Theme.LINES,
    height : 0.5,
    width : Ti.UI.FILL,
    center : {
        y : '50%'
    }
});
//But3
var line_but3 = Ti.UI.createView({
    backgroundColor : Global.Theme.LINES,
    height : 0.5,
    width : Ti.UI.FILL,
    center : {
        y : '75%'
    }
});
//ButH
var line_butH = Ti.UI.createView({
    backgroundColor : Global.Theme.LINES,
    height : Ti.UI.FILL,
    width : 0.5,
    center : {
        x : '50%'
    }
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Clientes
buttons[0].addEventListener('click', function() {
    Log.info("Menú CLIENTES");
    Global.Controller.Clientes();
});
//Pedidos
buttons[1].addEventListener('click', function() {
    Log.info("Menú PEDIDOS");
    Global.Controller.Pedidos();
});
//Informes
buttons[2].addEventListener('click', function() {
    Log.info("Menú INFORME");
    Global.Controller.Informes();
});
//Preventista
buttons[3].addEventListener('click', function() {
    Log.info("Menú PREVENTISTA");
    win.fireEvent('butPreventista', {
        preventista : labelPreventista,
        terminal : labelTerminal,
        indexBlock : indexBlock,
        buttons : buttons
    });
});
//Configuración
buttons[4].addEventListener('click', function() {
    Log.info("Menú CONFIGURACION");
    win.fireEvent('butConfig', {
        terminal : labelTerminal,
        indexBlock : indexBlock,
        buttons : buttons
    });
});
//Artículos
buttons[5].addEventListener('click', function() {
    Log.info("Menú ARTICULOS");
    var article = new Global.Controller.Articulos();
    var winArticle = article.getMainWin();
    
    // winArticle.addEventListener('article:return', function(e) {
        // Ti.API.info("Codigo articulo: " + e.article.CodigoArticulo + "\nDescripcion: " + e.article.Descripcion);
    // });

    winArticle.open();
});
//Actualizar
buttons[6].addEventListener('click', function() {
    Log.info("Actualizar");
    var winUpdate = require(Global.Path.VIEW + 'Actualizar/MainWin');
    
    winUpdate.open();
});
//Backup
buttons[7].addEventListener('click', function() {
    Log.info("Menú BACKUP DE DATOS");
    var winBackup = require(Global.Path.VIEW + 'Backup/MainWin')();
    
    winBackup.open();
}); 

//
// ---------------------------------------------------------------- ERROR BASE DE DATOS PITxxx -------------------------------------------------
//
if (!Global.App.DB_PIT_EXISTS) {
    blockButtons(indexBlock, buttons);
};

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
viewHeader.add(labelTitle);
viewHeader.add(labelPreventista);
viewHeader.add(labelTerminal);

viewBodyLeft.add(buttons[0]);
viewBodyLeft.add(buttons[2]);
viewBodyLeft.add(buttons[4]);
viewBodyLeft.add(buttons[6]);

viewBodyRight.add(buttons[1]);
viewBodyRight.add(buttons[3]);
viewBodyRight.add(buttons[5]);
viewBodyRight.add(buttons[7]);

viewBody.add(viewBodyLeft);
viewBody.add(viewBodyRight);
viewBody.add(line_but1);
viewBody.add(line_but2);
viewBody.add(line_but3);
viewBody.add(line_butH);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(viewHeader);
win.add(viewBody);
win.add(line_header);
