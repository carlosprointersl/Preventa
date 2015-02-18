/**
 * @fileOverview En este archivo se cre el Namespace Global.ConfigDB.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */
/**
 * @namespace Las constantes de las bases de datos.
 */
Global.ConfigDB = {
	/** <b>pitParam</b> */
	PARAM_NAME 		: 'pitParam',
	/** <b>pitParam.s3db</b> */
	PARAM_FILE_NAME	: 'pitParam.s3db', 
	/** El nombre de la base de datos pitxxx.*/
	PIT_NAME 		: '',
	/** <b>pit%s<b> - Obtenemos el nombre de la base de datos pitxxx.*/
    PIT_NAME_TEMP   : 'pit%s',
	/** <b>Pendiente de configurar en la inicialización.</b> */
	PIT_FILE_PATH	: '',
	/** El nombre del archivo para la base de datos pitxxx.*/
	PIT_FILE_NAME	: '',
	/** <b>pit%s.s3db</b> - Obtenemos el nombre del archivo de la base de datos pitxxx.*/
    PIT_FILE_NAME_TEMP   : 'pit%s.s3db',
	/** El nombre de la base de datos pedxxx.*/
	SEND_NAME 		: '',
	/** <b>ped%s</b> - Obtenemos el nombre de la base de datos pitxxx.*/
    SEND_NAME_TEMP   : 'send%s',
	/** <b>ped%s.s3db</b> - Pendiente de la ruta actual para configurar.*/
	SEND_FILE_NAME	: 'sendData.s3db',
};