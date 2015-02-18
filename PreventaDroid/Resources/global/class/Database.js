/**
 * @fileOverview En este archivo se declara la clase "Database".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * @class Esta clase se encarga de las operativas con las bases de datos. Instala, reinstala y elimina las bases de datos
 * del dispositivo.</br>
 * Utiliza las constantes del namespace Global.ConfigDB para obtener los nombres de las bases de datos y de los archivos de instalación.
 * @memberOf Global.Class
 */
function Database() {
    /**
     * La clase para operar con la base de datos "Pitparam"
     * @private
     * @type Class
     */
    var rParam = require(Global.Path.DB + 'installDatabase/InstallParam');
    var dbParam = new rParam(Global);
    
    /**
     * La clase para operar con la base de datos "sendxxx"
     * @private
     * @type Class
     */
    var rSend = require(Global.Path.DB + 'installDatabase/InstallSend');
    var dbSend = new rSend(Global);

    /**
     * Instala la base de datos "Pitparam".
     */
    this.installParam = function() {
        dbParam.install();
    };

    /**
     * Elimina la base de datos "Pitparam" del dispositivo.
     */
    this.removeParam = function() {
        dbParam.remove();
    };

    /**
     * Elimina la BBDD "Pitparam" del dispositivo y la instala de nuevo des de los recursos.
     */
    this.reInstallParam = function() {
        this.removeParam();
        this.dbParam();
    };
    
    /**
     * Instala la base de datos "sendxxx" si es posible.
     */
    this.installSend = function() {
        dbSend.install();
    };

    /**
     * Elimina la base de datos "sendxxx".
     */
    this.removeSend = function() {
        dbSend.remove();
    };

    /**
     * Elimina la BBDD "sendxx" del dispositivo y las instala de nuevo des de los recursos.
     */
    this.reInstallSend = function() {
        this.removeSend();
        this.installSend();
    };
    
};

module.exports = Database; 