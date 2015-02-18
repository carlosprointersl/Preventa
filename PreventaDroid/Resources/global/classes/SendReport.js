/**
 * Se define la funcionalidad para poder enviar los reports, tanto en email como con FTP.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla | Prointer S.L.</a>
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
 * La clase FTP.
 * @type Object
 */
var Ftp = require(Global.Path.CLASSES + 'Ftp');

//Variables
var closeCallback = [];

/**
 * Envia el report según el método que seleccionemos.
 * @param {Object} report
 */
exports.send = function(report) {

    var popup = new Global.Control.Windows.Alert({
        title : "Selección de envío",
        message : "Seleccione la forma en la que desa enviar el informe.",
        icon : Global.Control.Windows.ICON.INFORMATION,
        //bodyHeight : 90,
        buttons : [{
            title : "Email",
            image : '/images/forward_32.png'
        }, {
            title : "FTP",
            image : '/images/ftp_32.png'
        }]
    });

    popup.addEventClickButtonIndex(0, function() {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = Global.Parameters.Email.getAsunto();
        emailDialog.toRecipients = [Global.Parameters.Email.getPara()];
        emailDialog.bccRecipients = [Global.Parameters.Email.getCc()];
        emailDialog.ccRecipients = [Global.Parameters.Email.getCco()];
        emailDialog.messageBody = Global.Parameters.Email.getCuerpo();
        emailDialog.addAttachment(report);
        emailDialog.open();

        popup.close();
    });

    popup.addEventClickButtonIndex(1, function() {
        // var loading = getLoadingMessage(report.getName());
        var loading = new Global.Control.WinLoading();
        loading.children[0].setMessage("Archivo " + report.getName());
        
        Ftp.addEventListener('end:upload', function(){
            loading.close();    
        });
        Ftp.addEventListener('end:error', function(){
            loading.close();    
        });
        loading.open();
        popup.close();
        Ftp.upload(report);
    });

    _.each(closeCallback, function(call){
        popup.addEventListener('close', call);
    });

    popup.open();
};

/**
 * Indicamos la acción que re ha de realizar despúes de que se cierre la ventana de selección.
 * @param {Function} callback La funcíon ha realizar al cerrar la ventana.
 */
exports.addCloseListener = function(callback) {
    closeCallback.push(callback);
};

/**
 * Abre el mensaje de "Archivo " + nombre del archivo.
 * @param {String} name El nombre del archivo a subir.
 */
function getLoadingMessage(name) {
    /**
     * La vista necesaria para llamar al Popup.
     * @type Ti.UI.View
     */
    var body = Ti.UI.createView({
        height : 70
    });

    /**
     * La etiqueta que muestra el mensaje
     * @type Ti.UI.Label
     */
    var loading = require(Global.Path.CONTROL + 'Loading')({
        width : Ti.UI.FILL
    });
    loading.setMessage('Archivo ' + name);
    body.add(loading);

    var popup = new Global.Control.Windows.Popup({
        heightFoot : 0,
        title : 'Subiendo archivo',
        body : body,
        buttons : []
    });
    
    popup.addEventListener('open', function(){
        loading.show();        
    });
    
    return popup;
};
