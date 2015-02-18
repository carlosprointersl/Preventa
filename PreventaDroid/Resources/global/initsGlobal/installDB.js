/**
 * @fileOverview En este archivo instalan las bases de datos.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

(function() {

    // Instalamos la base de datos "pitParam".
    var rDB = require(Global.Path.CLASS + 'Database');
    var database = new rDB();
    database.installParam();

    // Incluimos la clase "Persistence" para recoger datos de la tabla "Parametros".
    var Persistence = require(Global.Path.DB + 'Persistence');

    var param = new Persistence("preventista", Global.ConfigDB.PARAM_NAME);
    var route = param.select()[0].terminal;

    // Actualizamos los valores de "pitxxx" y "sendxxx".
    Global.ConfigDB.PIT_NAME = String.format(Global.ConfigDB.PIT_NAME_TEMP, route);
    Global.ConfigDB.PIT_FILE_NAME = Global.Path.ABSOLUTE_STORAGE + String.format(Global.ConfigDB.PIT_FILE_NAME_TEMP, route);
    Global.ConfigDB.PIT_FILE_PATH = Global.Path.DB_STORAGE + String.format(Global.ConfigDB.PIT_FILE_NAME_TEMP, route);
    var k = Global.Path.ABSOLUTE_STORAGE + String.format(Global.ConfigDB.PIT_FILE_NAME_TEMP, route);
    Global.ConfigDB.SEND_NAME = String.format(Global.ConfigDB.SEND_NAME_TEMP, route);
    //Marcamos la variable _dbIndex = 0.
    Global._dbIndex = 0;
    database.installSend();

    //Comprobamos que haya un archivo para poder operar con la base de datos "pitxxx".
    if (!Global.Functions.fileExists(Global.ConfigDB.PIT_FILE_PATH)) {
        Global.App.DB_PIT_EXISTS = false;
        Ti.API.error("No se encuentra el archivo \"" + Global.ConfigDB.PIT_FILE_PATH + "\"");
    };

})();
