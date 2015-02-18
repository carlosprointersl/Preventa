/**
 * @fileOverview En este archivo es donde se configura e instala la base de datos "pitParam". La instalación solo
 * se realiza cuando la base de datos no existe.
 * El archivo se estructura de tal forma que pueda ser recuperado a través de la función require();.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * @class Instala la base de datos "pitParam".
 * @param {Global} global El namespace Global para tener acceso a las constantes de las bases de datos.
 */
var InstallParam = function(global) {
    /** El nombre de la base de datos. Se obtiene de Global.ConfigDB.PARAM_NAME.
     * @private */
    const NAME = global.ConfigDB.PARAM_NAME;
    /** El nombre del archivo de la base de datos. Se obtiene de Global.ConfigDB.PARAM_FILE_NAME.
     * @private */
    const FILE_NAME = global.ConfigDB.PARAM_FILE_NAME;
    /** El path de la base de datos.
     * @private */
    var path_db = 'database/file/' + FILE_NAME;
    /** El archivo de base de datos a instalar.
     * @private */
    var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + path_db);
    
    var path = Global.Path.DB_STORAGE + FILE_NAME;
    var file2 = Ti.Filesystem.getFile(path);

    /**
     * Realiza la actualización necesaria según la versión instalada. 
     */
    function updateDB(){
        var version = global.Functions.getVersionDB(NAME);
        
        switch(version){
            case "1.0":
            break;
        }
    }

    /**
     * Instala la base de datos "Pitparam" si es posible.
     */
    this.install = function() {
        //Si no está instalada la instalamos. Si lo está comprobamos si se tiene que actualizar.
        if (!global.Functions.isDatabaseInstalled(NAME)) {
            if (file2.exists()) {
                try {
                    var a = '/' + path_db;
                    var b = '/' + path;
                    var db = Ti.Database.install(path, NAME);
                    var rs = db.execute("SELECT * FROM configuracion");
                } catch(e) {
                    db.remove();
                    Ti.API.error("No se puede crear la base de datos " + NAME + ": {ERROR}" + e);
                } finally {
                    db.close();
                }
            } else {
                Ti.API.error("El archivo de la base de datos \"PitParam\" no existe.");
            };
        } else { //Comprobamos si se tiene que actualizar.
            updateDB();
        };
    };

    /**
     * Elimina la base de datos "Pitparam" del dispositivo, si existe.
     */
    this.remove = function() {
        var db = Ti.Database.open(NAME);
        db.remove();
        db.close();
        Ti.API.info("Se ha eliminado la base de datos \"PitParam\" del dispositivo.");
    };
};

module.exports = InstallParam;
