/**
 * @fileOverview En este archivo se crea la ventana para poder descargar los datos del servidor.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
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
 * La clase FTP para realizar la descarga.
 * @private
 * @type Object
 */
var Ftp = require(Global.Path.CLASSES + 'Ftp');

// Ftp.addEventListener('close', function() {
    // win.removeEventListener('android:back', eventBack);
// });

/**
 * La ventana principal.
 * @private
 * @type Ti.UI.Window
 */
var win = Ti.UI.createWindow({
    backgroundColor : Global.Theme.BACKGROUND,
    navBarHidden : true,
    orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
});

/**
 * El menú de cabecera.
 * @type Object
 */
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Actualizar", "Principal", function() {
    win.close();
});
headerMenu.setTop(0);
win.add(headerMenu);

/**
 * El mensaje de espera cuando se realiza una acción.
 */
var loading = require(Global.Path.CONTROL + 'Loading')({
    width : 270,
    backgroundColor : Global.Theme.BUTTON.BACKGROUND
});

/**
 * El menú del pie con los botones.
 * @private
 * @type Object
 */
var buttonView = require(Global.Path.VIEW + 'Actualizar/ButtonView');

var footView = buttonView.content;
footView.setBottom(0);

/**
 * El evento click del botón. Se han de descargar los archivos que estén seleccionados.
 * @event 'click'
 */
footView.children[0].addEventListener('click', function() {
    var paramFtp = Global.Parameters.Ftp;

    if (paramFtp.getDb() === "Y" || paramFtp.getImagenes() === "Y" || paramFtp.getPrograma() === "Y") {
        Ftp.download(loading);
        //win.addEventListener('android:back', eventBack);
    } else {
        //La ventana antes de salir.
        var popAlert = new Global.Control.Windows.Alert({
            title : 'Ningún tipo seleccionado',
            message : "Se ha de seleccionar al menos un tipo para empezar la descarga.",
            icon : Global.Control.Windows.ICON.INFORMATION,
            buttons : Global.Control.Windows.BUTTON.ACCEPT,
            bodyHeight : 90
        });
        
        popAlert.open();
    }
});

win.add(footView);

/**
 * La tabla con las opciones
 * @type Ti.UI.TableView
 */
var table = require(Global.Path.VIEW + '/Actualizar/Options');
table.setTop(headerMenu.getHeight());
table.setBottom(footView.getHeight());
win.add(table);

//Añadimos el mensaje al final para que aparezca en primer plano.
win.add(loading);

/**
 * La función que controla el evento back de Android.
 */
function eventBack() {

    if (Ftp.getState() != Ti.Network.Socket.CLOSED) {
        var dialog = Ti.UI.createAlertDialog({
            cancel : 1,
            buttonNames : ["SI", "NO"],
            message : "¿Desea cancelar la descarga de archivos?",
            title : 'Descarga de archivos'
        });

        dialog.addEventListener('click', function(e) {
            if (e.index === 0) {
                Ftp.close();
            };
        });

        dialog.show();
    };

};

module.exports = win;
