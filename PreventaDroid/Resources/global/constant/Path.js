/**
 * @fileOverview En este archivo se cre el Namespace Global.Path.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * @namespace Path Las constantes de las direcciones.
 */
Global.Path = {
	/** <b>PitPreventaDroid</b> */
	DIRECTORY          : Global.Path.DIRECTORY,
	/** <b>Datos</b> */
    DATA_DIRECTORY     : Global.Path.DATA_DIRECTORY,
    /** <b>Imagenes</b> */
    PHOTO_DIRECTORY    : Global.Path.PHOTO_DIRECTORY,
    /** <b>Log</b> */
    LOG_DIRECTORY      : Global.Path.LOG_DIRECTORY,
    /** <b>Backup</b> */
    BACKUP_DIRECTORY   : Global.Path.BACKUP_DIRECTORY,
    /** <b>Progama</b>*/
    APP_DIRECTORY      : Global.Path.APP_DIRECTORY,
    /** <b>/database/</b> */
    DB                 : '/database/',
	/** <b>/PitPreventaDroid/Datos/</b> */
    DB_STORAGE         : Ti.Filesystem.getFile(Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).parent.nativePath, Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.DATA_DIRECTORY).nativePath + Ti.Filesystem.separator,
    /** <b>/PitPreventaDroid/Log/</b> */
    DB_LOG             : '/mnt/sdcard/' + Global.Path.DIRECTORY + '/' + Global.Path.LOG_DIRECTORY + '/',
	/** <b>/PitPreventaDroid/Datos//</b> */
	ABSOLUTE_STORAGE   : '/mnt/sdcard/' + Global.Path.DIRECTORY + '/' + Global.Path.DATA_DIRECTORY + '/',
	/** <b>/PitPreventaDroid/Datos//</b> */
    DB_BACKUP          : '/mnt/sdcard/' + Global.Path.DIRECTORY + '/' + Global.Path.BACKUP_DIRECTORY + '/',
	/** <b>/global/</b> */
    GLOBAL             : '/global/',
	/** <b>/global/constant/</b> */
	CONSTANT	       : '/global/constant/',
	/** <b>/global/function/</b> */
	FUNCTION           : '/global/function/',
	/** <b>/global/variable/</b> */
	VARIABLE           : '/global/variable/',
	/** <b>/global/class/</b> */
	CLASS              : '/global/class/',
	/** <b>/global/classes/</b> */
    CLASSES              : '/global/classes/',
	/** <b>/global/initsGlobal/</b> */
	INITS_GLOBAL       : '/global/initsGlobal/',
	/** <b>/ui/</b> */
	UI	 		       : '/ui/',
	/** <b>/ui/common/controls/</b> */
	CONTROL            : '/ui/common/controls/',
	/** <b>/ui/common/images/</b> */
	IMAGES             : '/ui/common/images/',
	/** <b>/ui/common/views/</b> */
	VIEW               : '/ui/common/views/',
	/** <b>/controller/</b> */
	CONTROLLER         : '/controller/',
	/** <b>/model/</b> */
	MODEL              : '/model/',
    /** <b>/lib/underscore</b> */
    UNDERSCORE         : '/lib/underscore'
};