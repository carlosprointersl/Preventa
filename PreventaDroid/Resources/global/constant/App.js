/**
 * @fileOverview En este archivo se crea el Namespace Global.App.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * @namespace Las constantes útiles para la aplicación.
 */
Global.App = {
    /** <b>Value : @</b> */
    PASSWORD : 'superuser11',
    /** <b>Value : @@@</b> */
    PASS_CONFIG : '@@@',
    /** <b>Value : @</b> */
    DEFAULT_PASSWORD : '1234',
    /** <b>Value : @@@</b> */
    DEFAULT_ADMIN_PASSWORD : 'admin1234',
    /** <b>restorepassword</b> */
    RESTORE_PASSWORD : "restorepassword",
    /** <b>restoreadminpassword</b> */
    RESTORE_ADMIN_PASSWORD : "restoreadminpassword",
    /** <b>restoreadminpassword</b> */
    VERSION : "1.0",
    /**
     * Nos indica si existe una base de datos "pitxxx" para la ruta actual.
     * @type Boolean
     */
    DB_PIT_EXISTS : true,
    /**
     * Indica el tipo de usuario que está utilizando la aplicación. Hay 2 tipos:
     * <ol>
     * <li>Value : 0 -> Administrador</li>
     * <li>Value : 1 -> Preventista</li>
     * </ol>
     */
    TYPE_USER : 0    
}; 