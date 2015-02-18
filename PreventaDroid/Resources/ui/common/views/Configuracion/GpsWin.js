/**
 * @fileOverview En este archivo se crea la vista que permite la edición de los parámetros de la aplicación.
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
//Geoposicionamiento
var Geo = new (require(Global.Path.CLASS + 'GeoPosicionamiento'));
//Parámetros del GPs
var param = Global.Parameters.Gps;
//El control para crear diferentes filas
var typesRows = Global.Control.TypesRows;
//Función pasar "Y"-"N" -> Boolean
var strToBool = Global.Functions.strToBoolSqlite;
//Función pasar Boolean -> "Y"-"N"
var boolToStrSqlite = Global.Functions.boolToStrSqlite;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("GPS", "Configuración", function() {
    win.close();
});

//
// ---------------------------------------------------------------- FUNCIONES -------------------------------------------------
//
//Si se cumple la condición reinicia el servicio de localización.
function restart() {
     if (chActive.getValueCheck() && chFixed.getValueCheck())
        Geo.restart();
};

//
// ---------------------------------------------------------------- SECCIONES -------------------------------------------------
//
//General
var sectionGeneral = Ti.UI.createTableViewSection({
    headerTitle : 'Configuración general'
});
//Frecuencia
var sectionFrecuency = Ti.UI.createTableViewSection({
    headerTitle : 'Frecuencia de datos'
});
//Filtro
var sectionFilters = Ti.UI.createTableViewSection({
    headerTitle : 'Filtros de datos [opcional]'
});

//
// ---------------------------------------------------------------- ROWS -------------------------------------------------
//
//Activar
var checkMessage = ["Activado", "Desactivado"];
var boolActive = new Boolean(param.getActive()).valueOf();
var chActive = new typesRows.CheckRow("Geoposicionamiento", boolActive ? checkMessage[0] : checkMessage[1], boolActive);

//Fijo
var fixedMessage = ["El GPS recoge todas las posiciones", "El GPS recoge las posiciones importantes"];
var boolFixed = new Boolean(param.getFixed()).valueOf();
var chFixed = new typesRows.CheckRow("GPS fijo", boolFixed ? fixedMessage[0] : fixedMessage[1], boolFixed);

//Tipo GPS - NETWORK
var pickOptions = ["GPS", "Network", "GPS - Network"];
var pickGPS = new typesRows.PickerRow("Precisión", pickOptions[param.getType()], pickOptions, "Tipo de conexión");

//Distancia mínima
var textMinDistance = new typesRows.TextRow("Distancia mínima (metros)", param.getMinDistance(), Ti.UI.KEYBOARD_DECIMAL_PAD);
//Intervalo de tiempo
var textMinTime = new typesRows.TextRow("Intervalo tiempo (segundos)", param.getMinTime(), Ti.UI.KEYBOARD_DECIMAL_PAD);

//Filtro
var filterMessage = ["Activados", "Desactivados"];
var boolFilter = new Boolean(param.getFilter()).valueOf();
var chFilter = new typesRows.CheckRow("Filtros", boolFilter ? filterMessage[0] : filterMessage[1], boolFilter);
//Precisión
var textAccuracy = new typesRows.TextRow("Precisión mínima (metros)", param.getAccuracy(), Ti.UI.KEYBOARD_DECIMAL_PAD);
//Tiempo máximo de la última actualización
var textMaxAge = new typesRows.TextRow("Tiempo máximo (segundos)", param.getMaxAge() / 1000, Ti.UI.KEYBOARD_DECIMAL_PAD);
//Tiempo mínimo de la última actualización
var textMinAge = new typesRows.TextRow("Tiempo mínimo (segundos)", param.getMinAge() / 1000, Ti.UI.KEYBOARD_DECIMAL_PAD);

//
// ---------------------------------------------------------------- TABLE -------------------------------------------------
//

Global.Functions.fillSection(sectionGeneral, [chActive.getRow(), chFixed.getRow(), pickGPS.getRow()]);
Global.Functions.fillSection(sectionFrecuency, [textMinDistance.getRow(), textMinTime.getRow()]);
Global.Functions.fillSection(sectionFilters, [chFilter.getRow(), textAccuracy.getRow(), textMaxAge.getRow(), textMinAge.getRow()]);

var data = [sectionGeneral, sectionFrecuency, sectionFilters];
var table = Ti.UI.createTableView({
    data : data,
    width : Ti.UI.FILL,
    height : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Activar - Modificamos el valor del CHECKBOX
chActive.addEventListener('change', function(e) {
    chActive.setSubTitle(e.value ? checkMessage[0] : checkMessage[1]);
    param.setActive(e.value ? 1 : 0);
    Geo.restart();
});

//Fijo
chFixed.addEventListener('change', function(e) {
    chFixed.setSubTitle(e.value ? fixedMessage[0] : fixedMessage[1]);
    param.setFixed(e.value ? 1 : 0);
    Geo.restart();
});

//Filtros
chFilter.addEventListener('change', function(e) {
    chFilter.setSubTitle(e.value ? filterMessage[0] : filterMessage[1]);
    param.setFilter(e.value ? 1 : 0);
    restart();
});

//Precisión GPS - NETWORK
pickGPS.addEventListener('click', function(e) {
    Geo.stop();
    pickGPS.setSubTitle(pickOptions[e.index]);
    param.setType(e.index);
    Geo.start();
});

//Distancía mínima
textMinDistance.addEventListener('save', function(e) {
    textMinDistance.setSubTitle(e.value);
    param.setMinDistance(parseInt(e.value));
    restart();
});

//Intervalo de tiempo
textMinTime.addEventListener('save', function(e) {
    textMinTime.setSubTitle(e.value);
    param.setMinTime(parseInt(e.value));
    restart();
});

//Precisión
textAccuracy.addEventListener('save', function(e) {
    if (param.getFilter() == 1) {
        textAccuracy.setSubTitle(e.value);
        param.setAccuracy(parseInt(e.value));
        restart();
    };
});

//Tiempo máximo
textMaxAge.addEventListener('save', function(e) {
    if (param.getFilter() == 1) {
        textMaxAge.setSubTitle(e.value);
        param.setMaxAge(parseInt(e.value) * 1000);
        restart();
    };
});

//Tiempo mínimo
textMinAge.addEventListener('save', function(e) {
    if (param.getFilter() == 1) {
        textMinAge.setSubTitle(e.value);
        param.setMinAge(parseInt(e.value) * 1000);
        restart();
    };
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//

win.add(headerMenu);
win.add(table);
