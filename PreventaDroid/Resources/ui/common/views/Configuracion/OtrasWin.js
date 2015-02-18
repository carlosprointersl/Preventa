/**
 * @fileOverview En este archivo se crea el punto de menú "Otras".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//El control para crear diferentes filas
var typesRows = Global.Control.TypesRows;
//Los parámetros
var param = Global.Parameters.Configuracion;
//Función pasar "Y"-"N" -> Boolean
var strToBool = Global.Functions.strToBoolSqlite;
//Función pasar Boolean -> "Y"-"N"
var boolToStrSqlite = Global.Functions.boolToStrSqlite;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Otras", "Configuración", function(){win.close();});
//
// ---------------------------------------------------------------- ROWS -------------------------------------------------
//Control kilometraje
var checkMessage = ["Activar el control de kilometraje.", "Desactivar el control de kilometraje."];
var check = new typesRows.CheckRow("Control de kilometraje", strToBool(param.getControlKilometraje()) ? checkMessage[1] : checkMessage[0], strToBool(param.getControlKilometraje()));

//Modo funcionamiento
var pickerOptions = ["Preventa", "Autoventa", "Repartidor"];
var picker = new typesRows.PickerRow("Modo de funcionamiento", param.getModoApp() == "A" ? pickerOptions[1] : param.getModoApp() == "R" ? pickerOptions[2] : pickerOptions[0], pickerOptions, "Modo");

//MaxBackup
var textMaxBackup = new typesRows.TextRow("Nº máximo de Backup's", param.getMaxBackup().toString(), Ti.UI.KEYBOARD_DECIMAL_PAD);
//Max5mx
var textMax5mx = new typesRows.TextRow("Nº máximo de archivos 5MX", param.getMax5mx().toString(), Ti.UI.KEYBOARD_DECIMAL_PAD);

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//
var data = [check.getRow(), picker.getRow(), textMaxBackup.getRow(), textMax5mx.getRow()];
//Tabla;
var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Kilometraje - Modificamos el valor del CHECKBOX
check.addEventListener('change', function(e) {
    check.setSubTitle(e.value ? checkMessage[1] : checkMessage[0]);
    param.setControlKilometraje(boolToStrSqlite(e.value));
});

//Preventa, Autoventa y Repartidor
picker.addEventListener('click', function(e) {
    picker.setSubTitle(pickerOptions[e.index]);
    if (e.index > 0) {
        if (e.index > 1) {
            param.setModoApp("R");
        } else {
            param.setModoApp("A");
        };
    } else {
        param.setModoApp("P");
    };
});

//MaxBackup
textMaxBackup.addEventListener('save', function(e) {
    e.value = parseInt(e.value);
    textMaxBackup.setSubTitle(e.value);
    param.setMaxBackup(e.value);
});

//Max5mx
textMax5mx.addEventListener('save', function(e) {
    e.value = parseInt(e.value);
    textMax5mx.setSubTitle(e.value);
    param.setMax5mx(e.value);
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
win.add(table);
