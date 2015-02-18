/**
 * @fileOverview En este archivo se crea el objeto que muestra el listado de Backups según el teminal.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La librearía underscore.
 */
var _ = require('/lib/underscore');

/**
 * @class Esta clase define el objeto para mostrar los Bakcup's de la ventana de Backup.</br>
 */
function BackupMain() {
    /**
     * La variable Global.
     * @private
     * @type Object
     */
    var Global = require('/global/class/ReturnGlobal')();

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
     * @private
     * @type Object
     */
    var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Backup", "Principal", function() {
        win.close();
    });
    headerMenu.setTop(0);
    win.add(headerMenu);

    /**
     * La tabla de los backup's
     * @private
     * @type Ti.UI.TableView
     */
    var tableDb = new (require(Global.Path.VIEW + 'Backup/TableBackup'))({
        backgroundColor : win.getBackgroundColor(),
        top : headerMenu.getHeight(),
        bottom : 60,
        zIndex : 1
    });
    win.add(tableDb.getTable());
    
    /**
     * La tabla de los archivos ".5MX"
     * @private
     * @type Ti.UI.TableView
     */
    var table5mx = new (require(Global.Path.VIEW + 'Backup/Table5mx'))({
        backgroundColor : win.getBackgroundColor(),
        top : headerMenu.getHeight(),
        bottom : 60,
        zIndex : 0
    });
    win.add(table5mx.getTable());
    
    /**
     * El menú del pie con los botones.
     * @private
     * @type Object
     */
    var footButton = new (require(Global.Path.VIEW + 'Backup/ButtonView'))();
    var footView = footButton.getView();
    footView.setBottom(0);
    win.add(footView);
    
    //El evento para mostrar la tabla de base de datos.
    footButton.addEventListener('click', function(){
        win.children[1].setZIndex(1);  
        win.children[2].setZIndex(0);
    }, 1);
    
    //El evento para mostrar la tabla de base de datos.
    footButton.addEventListener('click', function(){
        win.children[1].setZIndex(0);  
        win.children[2].setZIndex(1);
    }, 2);
   
    return win;
};

module.exports = BackupMain;
