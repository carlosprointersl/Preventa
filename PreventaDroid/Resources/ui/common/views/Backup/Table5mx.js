/**
 * @fileOverview En este archivo se crea la tabla de los archivos ".5MX".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La librearía underscore.
 */
var _ = require('/lib/underscore');

/**
 * @class Esta clase define la tabla con los archivos ".5MX".
 * @param {Object} options Las opciones correspondientes a una tabla.
 */
function Table5mx(options) {
    /**
     * La variable Global.
     * @private
     * @type Object
     */
    var Global = require('/global/class/ReturnGlobal')();

    /**
     * La tabla con los "backups".
     * @private
     * @type Ti.UI.TableView
     */
    var table = Ti.UI.createTableView(options);
    table.setData(createData());

    /**
     * Seleccionamos un archivo para enviar.
     * @event 'click'
     */
    table.addEventListener('click', function(e) {
        //El cuerpo del mensaje emergente.
        var body = Ti.UI.createView({
            height : Ti.UI.SIZE
        });

        //La etiqueta que muestra el mensaje
        var message = Ti.UI.createLabel({
            color : Global.Theme.POPUP.TEXT,
            font : {
                fontSize : 20
            },
            text : "¿Desea enviar el arhivo \n" + e.row.getTitle() + "?",
            left : 5,
            width : Ti.UI.FILL
        });
        body.add(message);

        //Las opciones de la ventana.
        var options = {
            title : "ENVÍO ARCHIVO .5MX",
            body : body,
            icon : Global.Control.Windows.ICON.QUESTION,
            buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
        };
        //La ventana emergente con el mensaje.
        var popup = new Global.Control.Windows.Popup(options);
        //El evento 'accept' que genera al aceptar el mensaje.
        popup.addEventClickButton("accept", function() {
            //Email Dialog
            var emailDialog = Ti.UI.createEmailDialog();
            //File .5MX
            var sdcardPath = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).parent.nativePath;
            var file5mx = Ti.Filesystem.getFile(sdcardPath, e.row._path);
            var tmpFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, Global.Parameters.Preventista.getTerminal() + "EPEDI.5MX.txt");
            tmpFile.write(file5mx.read());
            
            var sendReport = require(Global.Path.CLASSES + 'SendReport');
            
            sendReport.addCloseListener(function() {
                popup.close();
            });

            sendReport.send(tmpFile);
            // emailDialog.subject = Global.Parameters.Email.getAsunto();
            // emailDialog.toRecipients = [Global.Parameters.Email.getPara()];
            // emailDialog.bccRecipients = [Global.Parameters.Email.getCc()];
            // emailDialog.ccRecipients = [Global.Parameters.Email.getCco()];
            // emailDialog.messageBody = Global.Parameters.Email.getCuerpo();
            // emailDialog.addAttachment(tmpFile);
            // emailDialog.open();

            // popup.close();
        });

        popup.open();

    });

    /**
     * Crea los datos para la tabla.
     * @return Ti.UI.TableViewRow[]
     */
    function createData() {
        var sdcardPath = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).parent.nativePath;
        var terminal = Global.Parameters.Preventista.getTerminal();
        var dir = Ti.Filesystem.getFile(sdcardPath, Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.BACKUP_DIRECTORY + Ti.Filesystem.separator + terminal);
        // Ti.API.info(dir.nativePath);
        var files = _.filter(_.sortBy(dir.getDirectoryListing(), function(name) {
            return name;
        }).reverse(), function(nameFile) {
            return nameFile.match(/.5MX$/);
        });

        //Las filas.
        var rows = new Array();

        //Si no hay archivos
        if (files.length == 0) {
            rows.push(Ti.UI.createTableViewRow({
                backgroundColor : Global.Theme.OBJECT_DISABLED,
                backgroundSelectedColor : Global.Theme.OBJECT_DISABLED,
                color : Global.Theme.ROW.TITLE,
                title : "No hay archivos \".5MX\" guardados."
            }));
        } else {
            //Por cada archivo del directorio.
            _.each(files, function(element, index) {
                rows.push(createRow(element, index));
            });
        };

        return rows;
    };

    /**
     * Crea la fila para mostrar las bases de datos actuales.
     * @param {Object} element El nombre del archivo de base de datos del array.
     * @param {Number} index El índice del elemento dentro del array.
     * @return {Ti.UI.TableViewRow} La fila.
     */
    function createRow(element, index) {
        var row = Ti.UI.createTableViewRow({
            backgroundColor : Global.Theme.ROW.BACKGROUND,
            backgroundSelectedColor : Global.Theme.ROW.PRESS,
            backgroundFocusedColor : Global.Theme.ROW.PRESS,
            backgroundDisabledColor : Global.Theme.ROW.PRESS,
            font : {
                fontSize : 18
            },
            color : Global.Theme.ROW.TITLE,
            title : createNameRow(element),
            leftImage : "/images/file_5mx_56.png",
            _path : Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.BACKUP_DIRECTORY + Ti.Filesystem.separator + Global.Parameters.Preventista.getTerminal() + Ti.Filesystem.separator + element
        });

        return row;
    };

    /**
     * A partir del nombre de los "backups" se genera el nombre a mostrar en la tabla.
     * Dicho nombre será la fecha de creación.
     * @param {String} name El nombre completo de la base de datos.
     * @return {String} El nombre en formato de fehca dd/mm/yyyy HH:MM.
     */
    function createNameRow(name) {
        return "Fecha: " + name.slice(6, 8) + "/" + name.slice(4, 6) + "/" + name.slice(0, 5) + "\nHora: " + name.slice(8, 10) + ":" + name.slice(10, 12);
    };

    /**
     * Retorna la vista con los botones y las líneas.
     * @return {Ti.UI.View} La vista que forma el menú inferior.
     */
    this.getTable = function() {
        return table;
    };

};

module.exports = Table5mx;
