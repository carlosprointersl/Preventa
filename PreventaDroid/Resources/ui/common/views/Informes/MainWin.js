/**
 * @fileOverview En este archivo se crea la vista para la impresión o envío de los informes.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//El Log
var Log = win.log;
//Las constantes de los tipos de informes. El orden debe coincidir con la variable "types" que contiene los datos para el picker.
var typesValues = ["NOTHING", Global.Report.COMPLET, Global.Report.ORDERS, Global.Report.INCIDENTS, Global.Report.CLIENTS, Global.Report.CHARGE, Global.Report.CASH_MOVEMENTS];
//Los datos temporales del filtro. Son para comparar a la hora de modificarlos.
var tmpFilter;
// El índice del tipo actualmente seleccionado.
var typeIndex = 0;
// La función para saber si la tabla tiene datos
var dataSection = win.dataSection;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Informes", win.exitOnClose ? "Salir" : "Principal", function() {
    win.close();
});
headerMenu.setTop(0);
//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Header
var viewHeader = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    top : 50,
    height : 60,
    width : Ti.UI.FILL,
    // layout : 'horizontal'
});

//Buttons
var viewButtons = Ti.UI.createView({
    bottom : 0,
    height : 60,
    width : Ti.UI.FILL,
    layout : 'horizontal'
});

//Content Dates
var viewDates = require(Global.Path.VIEW + 'Informes/ReportDate')(Global);

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
//Tipo de informe
var labelType = Ti.UI.createLabel({
    color : '#FFFFFF',
    font : {
        fontSize : 20
    },
    left : 0,
    text : 'Tipo',
    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
    width : Ti.UI.SIZE
});

//
// ---------------------------------------------------------------- PICKERS -------------------------------------------------
//
//TYPE PICKER
var typePicker = Ti.UI.createPicker({
    left : 50,
    right : 50,
    selectionIndicator : true,
    first : true
});
var types = ["Seleccionar", "Completo", "Pedidos", /*"Movimientos Caja",*/"Incidencias", /*"Autoventa",*/"Clientes", "Cobros"/*, "Generación pedido bebidas", "Generación pedido snacks"*/];

for (var i = 0; i < types.length; i++) {
    typePicker.add(Ti.UI.createPickerRow({
        title : types[i]
    }));
};

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
var table = Ti.UI.createTableView({
    top : 110,
    bottom : 60
});

//
// ---------------------------------------------------------------- LOADING... -------------------------------------------------
//
var loading = require(Global.Path.CONTROL + 'Loading')();

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
var butSchedule = Ti.UI.createButton({
    image : '/images/schedule_32.png',
    right : 0
});

var butSend = Ti.UI.createButton({
    image : '/images/forward_32.png',
    enabled : false,
    backgroundColor : Global.Theme.OBJECT_DISABLED, //Global.Theme.BUTTON.BACKGROUND,
    backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
    color : Global.Theme.TEXT_DISABLED, //Global.Theme.BUTTON.TEXT,
    font : {
        fontSize : 23,
        fontStyle : 'bold'
    },
    title : "Enviar",
    height : Ti.UI.FILL,
    width : '50%',
    right : 0
});

var butPrint = Ti.UI.createButton({
    image : '/images/printer_32.png',
    enabled : false,
    backgroundColor : Global.Theme.OBJECT_DISABLED, //Global.Theme.BUTTON.BACKGROUND,
    backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
    color : Global.Theme.TEXT_DISABLED, //Global.Theme.BUTTON.TEXT,
    font : {
        fontSize : 23,
        fontStyle : 'bold'
    },
    title : "Imprimir",
    height : Ti.UI.FILL,
    width : '50%',
    left : 0
});

//
// ---------------------------------------------------------------- LINES -------------------------------------------------
//

win.add(Ti.UI.createView({
    backgroundColor : Global.Theme.BACKGROUND,
    bottom : 0,
    height : 60,
    width : 0.5,
    center : {
        x : '50%'
    },
    zIndex : 1
}));

win.add(Ti.UI.createView({
    backgroundColor : Global.Theme.BACKGROUND,
    bottom : 60,
    height : 0.5,
    width : Ti.UI.FILL,
    zIndex : 1
}));

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//ButSchedule 'click'
butSchedule.addEventListener('click', function() {
    var fireEvent;
    var animation = Ti.UI.createAnimation({
        duration : 100
    });
    //Si no tiene altura
    if (!viewDates.down) {
        animation.height = 150;
        viewDates.down = true;
        //Guardamos los datos actuales
        var values = viewDates.getValues();
        tmpFilter = {
            start : values.start != null ? values.start.toString() : values.start,
            end : values.end != null ? values.end.toString() : values.end,
        };
    } else {
        animation.height = 0;
        viewDates.down = false;
        //Si los datos han cambiado cargamos el informe.
        var tmpDates = viewDates.getValues();
        if (tmpFilter.start == tmpDates.start && tmpFilter.end == tmpDates.end) {
            fireEvent = false;
        } else {
            fireEvent = true;
        };
    };

    viewDates.animate(animation);

    if (fireEvent) {
        loading.show();
        var index = types.lastIndexOf(typePicker.getSelectedRow(0).title);
        win.fireEvent('newReport', {
            start : tmpDates.start,
            end : tmpDates.end,
            type : typesValues[index]
        });
        typeIndex = index;
    };
});

//Butsend 'click
butSend.addEventListener('click', function() {
    //Si no hay resultados muestra un mensaje de aviso y no hace nada.
    if (dataSection(table.sections)) {
        var sendReport = require(Global.Path.CLASSES + 'SendReport');
        loading.setMessage("Escribiendo ...");
        loading.show();
        var dates = viewDates.getValues();
        var report = new Global.Class.Report(false, dates.start, dates.end);
        //var report = new Global.Class.Report(dates.start, dates.end);
        report.writeFile();
        
        sendReport.addCloseListener(function() {
            loading.hide();
            //loading.setMessage("Cargando ...");
            typePicker.setSelectedRow(0, 0);
        });
        
        sendReport.send(report.getFile());

        // var emailDialog = Ti.UI.createEmailDialog();
        // emailDialog.subject = Global.Parameters.Email.getAsunto();
        // emailDialog.toRecipients = [Global.Parameters.Email.getPara()];
        // emailDialog.bccRecipients = [Global.Parameters.Email.getCc()];
        // emailDialog.ccRecipients = [Global.Parameters.Email.getCco()];
        // emailDialog.messageBody = Global.Parameters.Email.getCuerpo();
        // emailDialog.addAttachment(report.getFile());
        // emailDialog.open();

        // emailDialog.addEventListener('complete', function(e) {
        // Ti.API.info("BORRAR CORREO ENVIADO");
        // report.delReport();
        // });

    } else {
        var alert = new Global.Control.Windows.Alert({
            icon : Global.Control.Windows.ICON.INFORMATION,
            title : 'NO EXISTEN DATOS',
            message : "No hay datos para enviar."
        });
        alert.open();
    };
});

//Butprint "click"
butPrint.addEventListener('click', function() {

});

//TypePicker "change"
typePicker.addEventListener('change', function(e) {
    loading.show();
    var dates = viewDates.getValues();
    win.fireEvent('newReport', {
        start : dates.start,
        end : dates.end,
        type : typesValues[e.rowIndex]
    });
    //Activamos el botón enviar si el informe es del tipo "completo"
    (function(type) {
        butSend.setEnabled(type);
        butSend.setBackgroundColor( type ? Global.Theme.BUTTON.BACKGROUND : Global.Theme.OBJECT_DISABLED);
        butSend.setColor( type ? Global.Theme.BUTTON.TITLE : Global.Theme.TEXT_DISABLED);
    })(e.rowIndex === 1);

    typeIndex = e.rowIndex;
});

//
// ---------------------------------------------------------------- WIN EVENTS -------------------------------------------------
//
//WIN "returnData".
win.addEventListener("returnData", function(e) {
    table.setData(null);
    table.setData(e.data);
    loading.hide();
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//

viewHeader.add(labelType);
viewHeader.add(typePicker);
viewHeader.add(butSchedule);

viewButtons.add(butSend);
viewButtons.add(butPrint);
//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(headerMenu);
win.add(viewHeader);
win.add(table);
win.add(viewDates);
win.add(loading);
win.add(viewButtons);
