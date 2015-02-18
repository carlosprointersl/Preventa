/**
 * @fileOverview En este archivo se crean las opciones para la descarga.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La librearía underscore.
 */
var _ = require('/lib/underscore');

/**
 * La variable Global.
 * @type Object
 */
var Global = require('/global/class/ReturnGlobal')();

/**
 * Función pasar "Y"-"N" -> Boolean
 */
var strToBool = Global.Functions.strToBoolSqlite;
/**
 * Función pasar Boolean -> "Y"-"N"
 */
var boolToStrSqlite = Global.Functions.boolToStrSqlite;

/**
 * Los parámetros de condifugacion 
 */
var param = Global.Parameters.Ftp;

/**
 * El control para crear las diferentes filas
 * @type {Object} 
 */
var typesRows = Global.Control.TypesRows;

/**
 * La sección de las opciones
 * @private
 * @type Ti.UI.TableViewSection
 */
var section = Ti.UI.createTableViewSection({
    headerTitle : 'Datos a descargar'
});

/**
 * La opción de Base de datos
 * @type {Object} 
 */
var chDb = new typesRows.CheckRow("Base de datos SQLite", "Indica si se debe actualizar la base de datos.", strToBool(param.getDb()));
section.add(chDb.getRow());

/**
 * El evento al cambiar el valor del check DB 
 */
chDb.addEventListener('change', function(e) {
    param.setDb(boolToStrSqlite(e.value));
});

/**
 * La opción de Imágenes
 * @type {Object} 
 */
var chImage = new typesRows.CheckRow("Imágenes de los artículos", "Indica si se deben actualizar las imágenes de los artículos.", strToBool(param.getImagenes()));
section.add(chImage.getRow());

/**
 * El evento al cambiar el valor del check DB 
 */
chImage.addEventListener('change', function(e) {
    param.setImagenes(boolToStrSqlite(e.value));
});

/**
 * La opción de Programa
 * @type {Object} 
 */
var chProgram = new typesRows.CheckRow("Programa PreventaDroid.apk", "Indica si se debe descargar el archivo para actualizar la aplicación.", strToBool(param.getPrograma()));
section.add(chProgram.getRow());

/**
 * El evento al cambiar el valor del check DB 
 */
chProgram.addEventListener('change', function(e) {
    param.setPrograma(boolToStrSqlite(e.value));
});

/**
 * La tabla con las opciones. 
 */
var table = Ti.UI.createTableView({
    data : [section]
});

module.exports = table;
