/**
 * @fileOverview En este archivo es donde se crean las variables básicas para que la aplicación
 * pueda inicializar todos los elementos.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */
(function() {
    // Datos iniciales que son necesarios para inicializar el resto.
    Global.Functions = {
        isJsFile : function(file) {
            return file.slice(-3) === '.js';
        }
    };

    Global.Path = {
        CONSTANT            : '/global/constant/',
        INITS_GLOBAL        : '/global/initsGlobal/',
        DIRECTORY           : 'PreventaDroid',
        DATA_DIRECTORY      : 'Datos',
        PHOTO_DIRECTORY     : 'Imagenes',
        LOG_DIRECTORY       : 'Log',
        BACKUP_DIRECTORY    : 'Backup',
        APP_DIRECTORY       : 'Programa'
    };

    //Creamos los directorios, si no existen, en la tarjeta de memoria.
    var sdcardPath = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).parent.nativePath;
    var folderData = Ti.Filesystem.getFile(sdcardPath, Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.DATA_DIRECTORY);
    var folderPhoto = Ti.Filesystem.getFile(sdcardPath, Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.PHOTO_DIRECTORY);
    var folderLog = Ti.Filesystem.getFile(sdcardPath, Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.LOG_DIRECTORY);
    var folderBackup = Ti.Filesystem.getFile(sdcardPath, Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.BACKUP_DIRECTORY);
    var folderApp = Ti.Filesystem.getFile(sdcardPath, Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.APP_DIRECTORY);
    
    if (!folderData.exists()) {
        folderData.createDirectory();
    };
    if (!folderPhoto.exists()) {
        folderPhoto.createDirectory();
    };
    if (!folderLog.exists()) {
        folderLog.createDirectory();
    };
    if (!folderBackup.exists()) {
        folderBackup.createDirectory();
    };
    if (!folderApp.exists()) {
        folderBackup.createDirectory();
    };
})();
