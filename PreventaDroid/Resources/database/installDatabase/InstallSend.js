/**
 * @fileOverview En este archivo es donde se configura e instala la base de datos "sendxxx". La instalación solo
 * se realiza cuando la base de datos no existe.
 * El archivo se estructura de tal forma que pueda ser recuperado a través de la función require();.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * @class Instala la base de datos "sendxxx".
 * @param {Global} global El namespace Global para tener acceso a las constantes de las bases de datos.
 */
var InstallSend = function(global) {
    /** El nombre del archivo de la base de datos. Se obtiene de Global.ConfigDB.send_FILE_NAME.
     * @private */
    const FILE_NAME = global.ConfigDB.SEND_FILE_NAME;
    /** El path de la base de datos.
     * @private */
    var path_db = 'database/file/' + FILE_NAME;
    /** El archivo de base de datos a instalar.
     * @private */
    var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + path_db);
    
    /**
     * Realiza la actualización necesaria según la versión instalada. 
     */
    function updateDB(){
        var version = global.Functions.getVersionDB(global.ConfigDB.SEND_NAME);
        
        switch(version){
            case "1.0":
            break;
        }
    }
    
    /**
     * Instala la base de datos "sendxxx" si es posible.
     */
    this.install = function() {
        //Si no está instalada
        if (!global.Functions.isDatabaseInstalled(global.ConfigDB.SEND_NAME)) {
            if (file.exists()) {
                try {
                    var db = Ti.Database.install('/' + path_db, global.ConfigDB.SEND_NAME);
                    var rs = db.execute("SELECT * FROM 'DetallePedido'");
                } catch(e) {
                    db.remove();
                    Ti.API.error("No se puede crear la base de datos " + global.ConfigDB.SEND_NAME + ": {ERROR}" + e);
                } finally {
                    db.close();
                };
            } else {
                Ti.API.error("El archivo de la base de datos \"" + global.ConfigDB.SEND_NAME + "\" no existe.");
            };
        }  else { //Comprobamos si se tiene que actualizar.
            updateDB();
        };
    };

    /**
     * Elimina la base de datos "sendxxx" del dispositivo, si existe.
     */
    this.remove = function() {
        var db = Ti.Database.open(global.ConfigDB.SEND_NAME);
        db.remove();
        db.close();
        Ti.API.info("Se ha eliminado la base de datos \"" + global.ConfigDB.SEND_NAME + "\" del dispositivo.");
    };
};

module.exports = InstallSend;
