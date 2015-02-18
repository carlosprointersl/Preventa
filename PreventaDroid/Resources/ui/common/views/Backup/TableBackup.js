/**
 * @fileOverview En este archivo se crea la tabla de Backup's.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La librearía underscore.
 */
var _ = require('/lib/underscore');

/**
 * @class Esta clase define la tabla con los Backup's de la aplicación.
 * @param {Object} options Las opciones correspondientes a una tabla. 
 */
function TableBackup(options) {
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
     * Cambiamos la base de datos "sendxxx" para ver, modificar o generar el archivo de envio de datos antiguos.
     * @event 'click'
     */
    table.addEventListener('click', function(e) {
        //Si la base de datos es diferente la cambiamos.
        if (Global._dbIndex != e.index) {
            var body = Ti.UI.createView({
                height : Ti.UI.SIZE
            });

            //La etiqueta que muestra el mensaje
            var message = Ti.UI.createLabel({
                color : Global.Theme.POPUP.TEXT,
                font : {
                    fontSize : 20
                },
                text : "¿Desea cambiar a la base de datos:\n" + e.row.getTitle() + " ?",
                left : 5,
                width : Ti.UI.FILL
            });
            body.add(message);

            //Las opciones de la ventana.
            var options = {
                title : "CAMBIO BASE DE DATOS",
                body : body,
                icon : Global.Control.Windows.ICON.QUESTION,
                buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
            };
            //La ventana emergente con el mensaje.
            var popup = new Global.Control.Windows.Popup(options);
            //El evento 'accept' que genera al aceptar el mensaje.
            popup.addEventClickButton("accept", function() {
                //Cambiamos la base de datos.
                Global.ConfigDB.SEND_NAME = e.row._path != undefined ? e.row._path : String.format(Global.ConfigDB.SEND_NAME_TEMP, Global.Parameters.Preventista.getTerminal());
                //Desmarcamos la última fila.
                table.sections[0].rows[Global._dbIndex].setLeftImage("/images/database_remove_56.png");
                //Actualizamos la fila.
                e.row.setLeftImage("/images/database_check_56.png");
                //table.updateRow(e.index, e.row);
                Global._dbIndex = e.index;
                popup.close();
            });

            popup.open();

        };
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
        }).reverse(), function(nameFile){
            return nameFile.match(/.s3db$/);
        });

        //Las filas.
        var rows = new Array();

        //Si no hay archivos
        if (files.length == 0) {
            rows.push(Ti.UI.createTableViewRow({
                backgroundColor : Global.Theme.OBJECT_DISABLED,
                backgroundSelectedColor : Global.Theme.OBJECT_DISABLED,
                color : Global.Theme.ROW.TITLE,
                title : "No hay backup's guardados."
            }));
        } else {
            //Añadimos la fila de la base de datos del dispositivo
            rows.push(Ti.UI.createTableViewRow({
                backgroundColor : Global.Theme.ROW.BACKGROUND,
                backgroundSelectedColor : Global.Theme.ROW.PRESS,
                backgroundFocusedColor : Global.Theme.ROW.PRESS,
                backgroundDisabledColor : Global.Theme.ROW.PRESS,
                font : {
                    fontSize : 18
                },
                color : Global.Theme.ROW.TITLE,
                title : "Datos dispositivo",
                leftImage : Global._dbIndex === 0 ? "/images/database_check_56.png" : "/images/database_remove_56.png"
            }));
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
            leftImage : Global._dbIndex === (index + 1) ? "/images/database_check_56.png" : "/images/database_remove_56.png",
            _path : Global.Path.DB_BACKUP + Global.Parameters.Preventista.getTerminal() + Ti.Filesystem.separator + element
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
        return "Fecha: " + name.slice(13, 15) + "/" + name.slice(11, 13) + "/" + name.slice(7, 10) + "\nHora: " + name.slice(15, 17) + ":" + name.slice(17, 19);
    };
    
    /**
     * Retorna la vista con los botones y las líneas.
     * @return {Ti.UI.View} La vista que forma el menú inferior.
     */
    this.getTable = function() {
        return table;
    };

};

module.exports = TableBackup;
