/**
 * @fileOverview En este archivo se declara las clase "Log".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Se encarga de guardar los "logs" en su base de datos correspondiente.
 * Hereda de la clase "Persistence" para operar con la base de datos.
 */
function Log() {
    /**
     * Copiar la BBDD del resources al directorio Log, si no existe.
     */
    // (function () {
        // var dbFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'database/file/log.s3db');
        // var sdcardPath = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).parent.nativePath;
        // var newFile = Titanium.Filesystem.getFile(sdcardPath, Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.LOG_DIRECTORY + '/log.s3db');
        // //Si el archivo no existe lo creamos
        // if (newFile.exists() === false) {
            // newFile.write(dbFile.read());
        // };
    // })();
//     
    //Constructor de la clase padre.
    Persistence.call(this, "log", Global.ConfigDB.PARAM_NAME);
    
    /**
     * Crea un "LOG" y lo inserta en la base de datos.
     * @param {String} level EL nombre del nivel del "log".
     * @param {String} message El mensaje que se guardará en el "log".
     */
    this.log = function(level, message) {
        var row = new Object();
        row.user = Global.Parameters.Preventista.getNombre();
        row.route = Global.Parameters.Preventista.getTerminal();
        row.date = Global.Functions.dateTimeSQliteFormat(new Date());
        row.level = level;
        row.message = message;
        this.setData(row);
        this.insert();
        Ti.API.log(level, message);
    };

    /**
     * Crea un "log" del tipo "info".
     * @param {String} message El mensaje que se guardará en el "log".
     */
    this.info = function(message) {
        this.log('info', message);
    };

    /**
     * Crea un "log" del tipo "error".
     * @param {String} message El mensaje que se guardará en el "log".
     */
    this.error = function(message) {
        this.log('error', message);
    };

    /**
     * Crea un "log" del tipo "warn".
     * @param {String} message El mensaje que se guardará en el "log".
     */
    this.warn = function(message) {
        this.log('warn', message);
    };
    
    this.returnLogs = function(){
        return this.select();  
    };
};
//Log.prototype = Persistence;

module.exports = Log;
