/**
 * @fileOverview En este archivo se crea el controlador "Principal".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La librearía underscore.
 */
var _ = require('/lib/underscore');

/**
 * Crea un controlador de nombre "Kilometraje".
 * @class Es la clase que define al controlador "Principal".</br>
 * Este controlador es el primero en iniciarse y es la raíz de la aplición. Desde aquí se crea la vista principal y el
 * login para acceder a la aplicación. Cuando salimos de esta vista salimos a la vez de la aplicación.
 * @memberOf Global.Controller
 * @param {String} [action = login] La acción que debe realizar el controlador.
 */
var Principal = function(action) {
    /**
     * Gestión de parámetros
     * @private
     */
    var param = Global.Parameters;

    /**
     * La ventana principal.
     * @private
     * @type Window
     */
    var mainWin = createMainWin();

    action = action || "login";

    /**
     * Muestra la ventana del Login.
     * @private
     */
    function login() {
        var loginWin = createLoginWin();
        loginWin.open();
    };

    /**
     * Muestra una tabla/listado de registros.
     * @private
     */
    function index() {
        mainWin.open();
    };

    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @private
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createMainWin() {
        //El contador de pulsaciones del botón BACK.
        var back = 0;
        //Datos que necesita la vista para mostrar.
        var data = {
            preventista : param.Preventista.getNombre(),
            terminal : param.Preventista.getTerminal(),
            numPed : param.Configuracion.getNumPedido(),
            preventa : Global.Functions.dateFormat(new Date())
        };

        //Ejecuta el inicio de día al abrir la ventana principal.
        function startDayWin() {
            if (Global.App.DB_PIT_EXISTS) {
                startDay();
                mainWin.removeEventListener('open', startDayWin);
            };
        };

        //La ventana principal
        var mainWin = Ti.UI.createWindow({
            backgroundColor : Global.Theme.BUTTON.BACKGROUND,
            Global : Global,
            log : Log,
            data : data,
            blockButtons : blockButtons,
            exitOnClose : true,
            navBarHidden : true,
            url : Global.Path.VIEW + 'Principal/MainWin.js',
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        //Menu de configuración de la aplicación
        mainWin.addEventListener('butConfig', function(c) {
            configMenuWin(c);
        });

        //Menú de configuración del preventista
        mainWin.addEventListener('butPreventista', function(p) {
            configMenuPreventistaWin(p);
        });

        //Al pulsar el botón BACK - Android
        mainWin.addEventListener('android:back', function() {
            mainWin.fireEvent('exitApp');
        });

        //La primera vez que mostramos el menú principal. Comprobamos si es inicio de día y el kilometraje si fuera necesario.
        mainWin.addEventListener('open', startDayWin);

        mainWin.addEventListener('exitApp', function() {
            //Pregunta si queremos salir de la aplicación.
            var exitApp = new Global.Control.Windows.Alert({
                title : 'SALIR DE PREVENTADROID',
                icon : Global.Control.Windows.ICON.QUESTION,
                message : '¿Desea salir de la aplicación?',
                buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
            });

            exitApp.addEventClickButton('accept', function() {
                if (Global.App.DB_PIT_EXISTS) {
                    //Mensaje de fin de día
                    var endDay = new Global.Control.Windows.Alert({
                        title : 'FIN DE DÍA',
                        icon : Global.Control.Windows.ICON.QUESTION,
                        message : '¿Es fin de día?',
                        buttons : [{
                            title : "SI",
                            image : '/images/check_32.png'
                        }, {
                            title : "NO",
                            image : '/images/cancel_32.png'
                        }]
                    });

                    //Cuando pulsamos en "SI"
                    endDay.addEventClickButtonIndex(0, function() {
                        //Si el kilometraje está activo hemos de introducir los datos primero.
                        if (Global.Parameters.Configuracion.getControlKilometraje() === 'Y')
                            //El Kilometraje y la función callback cuando termine.
                            Global.Controller.Kilometraje(1, Global.Controller.Informes);
                        else
                            Global.Controller.Informes("exit");
                        //endDay.close();
                    });

                    //Cuando pulsamos en "NO"
                    endDay.addEventClickButtonIndex(1, function() {
                        //endDay.close();
                        mainWin.close();
                    });

                    endDay.open();
                } else {
                    mainWin.close();
                };
            });

            exitApp.open();
        });

        return mainWin;
    };

    /**
     * Ejecuta el INICIO DE DÍA.
     */
    function startDay() {
        //Mensaje de inicio de día
        var startDay = new Global.Control.Windows.Alert({
            title : 'INICIO DE DÍA',
            icon : Global.Control.Windows.ICON.QUESTION,
            message : '¿Es inicio de día?',
            buttons : [{
                title : "SI",
                image : '/images/check_32.png'
            }, {
                title : "NO",
                image : '/images/delete_32.png'
            }]
        });

        //Cuando pulsamos en "SI"
        startDay.addEventClickButtonIndex(0, function() {
            //Eliminamos los datos anteriores.
            EliminacionDatos();
            startDay.close();
        });

        //Cuando pulsamos en "NO"
        startDay.addEventClickButtonIndex(1, function() {
            startDay.close();
            var win = new (require(Global.Path.VIEW + 'NotasPreventista/MainWin'))();
            win.open();
        });

        mainWin._one = false;
        startDay.open();
    };

    /**
     * Elimina los datos de la base de datos "sendxxx.s3db", pero antes crea una copia.</br>
     * Esta copia se ha de guardar en la carpeta "Backups" y dentro de esta en la carpeta con el número del teminal actual "999".</br>
     * Las copias se guardarán con el nombre "backup" mas la fecha con la hora sin signos de puntuación. Si se guarda mas de una vez para la misma fecha/hora se guardará sólo la última.
     * @example
     * 24/10/2013 10:59 -> "backup_201310241059.s3db".
     */
    function EliminacionDatos() {
        //La ventana para mostrar las notas.
        var win = new (require(Global.Path.VIEW + 'NotasPreventista/MainWin'))();

        //Las opciones de la ventana.
        var options = {
            title : "ELIMINAR DATOS",
            message : "¿Desea eliminar los datos actuales?",
            icon : Global.Control.Windows.ICON.QUESTION,
            buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
        };
        //La ventana emergente con el mensaje.
        var delData = new Global.Control.Windows.Alert(options);
        
        //El evento 'cancel' que genera al cancelar el mensaje.
        delData.addEventClickButton("cancel", function() {
            win.open();
        });

        //El evento 'accept' que genera al aceptar el mensaje.
        delData.addEventClickButton("accept", function() {
            //Eliminamos las Backups que sobren.
            delBakcups();
            //Si el máximo es mayor que 0
            if (Global.Parameters.Configuracion.getMaxBackup() > 0) {
                //Realizamos una copia de la base de datos actual y la guardamos en la carpeta correspondiente.
                //Nombre de la base de datos a copiar y eliminar.
                var nameDB = "send" + Global.Parameters.Preventista.getTerminal();
                //Dirección de esta
                var dbFile = Ti.Filesystem.getFile('file://data/data/' + Ti.App.getId() + "/databases/" + nameDB);
                //SDcard
                var sdcardPath = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).parent.nativePath;
                //Creamos el directorio de los backup si no existe.
                var folder = Ti.Filesystem.getFile(sdcardPath, Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.BACKUP_DIRECTORY + Ti.Filesystem.separator + Global.Parameters.Preventista.getTerminal());
                if (!folder.exists()) {
                    folder.createDirectory();
                };

                //Nombre del bakcup de la base de datos.
                var newNameDB = "backup_" + Global.Functions.nameDateBackup() + ".s3db";

                var newFile = Titanium.Filesystem.getFile(folder.getNativePath() + Ti.Filesystem.separator + newNameDB);

                newFile.write(dbFile.read());

            };

            //Reinstalamos la base de datos SENDxxx.
            var rDB = require(Global.Path.CLASS + 'Database');
            var database = new rDB();
            database.reInstallSend();
            //Abrimos las ventana para mostrar las notas
            win.open();
        });

        //Si el kilometraje está activo hemos de introducir los datos primero.
        if (Global.Parameters.Configuracion.getControlKilometraje() === 'Y') {
            //El Kilometraje y la función callback cuando termine.
            Global.Controller.Kilometraje(0, delData.open);
        } else {
            delData.open();
        };

    };

    /**
     * En la carpeta de Backup's se permiten como máximo "n" copias. Esta función deja esta cantidad como máximo.
     */
    function delBakcups() {
        //El máximo de arhivos permitidos.
        var limit = Global.Parameters.Configuracion.getMaxBackup() - 1;
        var sdcardPath = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).parent.nativePath;
        var terminal = Global.Parameters.Preventista.getTerminal();
        var dir = Ti.Filesystem.getFile(sdcardPath, Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.BACKUP_DIRECTORY + Ti.Filesystem.separator + terminal);
        //Los Backups
        var files = _.filter(_.sortBy(dir.getDirectoryListing(), function(name) {
            return name;
        }).reverse(), function(nameFile) {
            return nameFile.match(/.s3db$/);
        });

        //Si hay mas de la cuenta.
        if (files.length > limit) {
            //Quitamos los restantes.
            for (var i = limit, j = files.length; i < j; i++) {
                var delFile = Ti.Filesystem.getFile(dir.getNativePath() + Ti.Filesystem.separator + files[i]);
                delFile.deleteFile();
            };
        };
    };

    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @private
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createLoginWin() {
        var winLogin = Ti.UI.createWindow({
            url : Global.Path.VIEW + 'LoginPrincipal.js',
            title : 'Login',
            backgroundColor : Global.Theme.HEADER,
            layout : 'vertical',
            Global : Global,
            orientationModes : [Ti.UI.PORTRAIT]
        });

        //Añadimos el evento para cuando pulse el botón de aceptar.
        winLogin.addEventListener('login', function(e) {
            var password = Ti.Utils.sha256(e.textPassword.value);
            //Comprobamos que no sea un PASSWORD de restauración de contraseña.
            if (!isRestorePass(e.textPassword.value)) {
                //Hemos de diferenciar cuando se logea un "Preventista" o un "Administrador" - "Prointer"
                if (password === Global.App.PASSWORD || param.Preventista.getPassword() === password || param.Configuracion.getPasswordAdmin() === password) {
                    Log.info("El usuario se ha logueado correctamente.");
                    //Si es un preventista lo marcamos en Global.App.TYPE_USER.
                    if (param.Preventista.getPassword() === password) {
                        Global.App.TYPE_USER = 1;
                    };
                    //Quitamos el foco del textfield para que desaparezca el teclado.
                    e.textPassword.blur();

                    index();
                    winLogin.close();
                } else {
                    alert("El password no es correcto.");
                };
            } else {
                //Mensaje como que se ha actualizado el PASSWORD
                var a = Titanium.UI.createAlertDialog({
                    title : 'Restauración de contraseña',
                    message : 'La contraseña se ha restaurado correctamente.'
                });
                a.show();
                e.textPassword.value = "";
                //Se cierra la alerta
                setTimeout(function() {
                    a.hide();
                }, 2000);
            };
        });

        return winLogin;
    };

    /**
     * Crea la vista para la configuración de la aplicación. Donde se editan los parámetros.
     * @private
     */
    function configMenuWin(c) {
        var winConfig = Ti.UI.createWindow({
            url : Global.Path.VIEW + 'Principal/ConfigMenuWin.js',
            //title : 'Configuración de la aplicación',
            backgroundColor : Global.Theme.BACKGROUND,
            layout : 'vertical',
            Global : Global,
            log : Log,
            // geo : Geo,
            navBarHidden : true,
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        //Al eleminar las bases de datos bloqueamos las demás opciones.
        winConfig.addEventListener('deleteDB', function() {
            c.terminal.setText("Terminal: ");
            //Cambiamos los nombres de las bases de datos (pitxxx y pedxxx) para dejarlos sin ruta.
            Global.ConfigDB.PIT_NAME = String.format(Global.ConfigDB.PIT_NAME_TEMP, "");
            Global.ConfigDB.PIT_FILE_NAME = String.format(Global.ConfigDB.PIT_FILE_NAME_TEMP, "");
            Global.ConfigDB.PED_NAME = String.format(Global.ConfigDB.PED_NAME_TEMP, "");
            // Bloqueamos los botones.
            blockButtons(c.indexBlock, c.buttons);
            //Eliminamos el número del terminal
            param.set("Ruta", "");
        });

        winConfig.open();
    };

    /**
     * Crea la vista para la configuración del peventista.
     * @param {Object} p El objeto de la función callback de la vista principal. Está compuesto por dos
     * objetos "Label".</br>
     * p.terminal = labelTerminal;</br>
     * p.preventista = labelPreventista;
     * @private
     */
    function configMenuPreventistaWin(p) {
        var configWin = Ti.UI.createWindow({
            url : Global.Path.VIEW + 'Principal/PreventistaWin.js',
            //title : 'Configuración del preventista',
            backgroundColor : Global.Theme.BACKGROUND,
            layout : 'vertical',
            Global : Global,
            log : Log,
            navBarHidden : true,
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        //Cambiamos el número del terminal e instalamos las BBDD si es necesario.
        configWin.addEventListener('changeRoute', function(c) {
            p.terminal.setText("Terminal: " + c.newRoute);
            //Cambiamos los nombres de las bases de datos (pitxxx y senxxx) según la RUTA.
            Global.ConfigDB.PIT_NAME = String.format(Global.ConfigDB.PIT_NAME_TEMP, c.newRoute);
            Global.ConfigDB.PIT_FILE_NAME = Global.Path.ABSOLUTE_STORAGE + String.format(Global.ConfigDB.PIT_FILE_NAME_TEMP, c.newRoute);
            Global.ConfigDB.PIT_FILE_PATH = Global.Path.DB_STORAGE + String.format(Global.ConfigDB.PIT_FILE_NAME_TEMP, c.newRoute);
            Global.ConfigDB.SEND_NAME = String.format(Global.ConfigDB.SEND_NAME_TEMP, c.newRoute);
            //Marcamos la variable _dbIndex = 0.
            Global._dbIndex = 0;

            //Comprobamos que haya un archivo para poder operar con la base de datos "pitxxx".
            if (Global.Functions.fileExists(Global.ConfigDB.PIT_FILE_PATH)) {
                Global.App.DB_PIT_EXISTS = true;
                //La clase con las operativas de las BBDD.
                var database = new Global.Class.Database(Global);
                // Instalamos la base de datos "sendxxx".
                database.installSend();
                unblockButtons(p.indexBlock, p.buttons);
            } else {
                Global.App.DB_PIT_EXISTS = false;
                blockButtons(p.indexBlock, p.buttons);
                Log.error("No se encuentra el archivo \"" + Global.ConfigDB.PIT_FILE_NAME + "\"");
            };
        });

        //Cambiamos el preventista del terminal.
        configWin.addEventListener('changePreven', function(c) {
            p.preventista.setText("Preventista: " + c.preventista);
        });

        configWin.open();
    };

    /**
     * Restaura la contraseña por la de defecto, tanto la del administrador como la del preventista. Según la cadena
     * que le pasemos por parámetro restaura una o otra.</br>
     * Las únicas cadenas válidas estan en las constantes Global.App.RESTORE_PASSWORD y Global.App.RESTORE_ADMIN_PASSWORD.
     * @private
     * @param {String} restore El password introducido en el LOGIN.
     * @return {Boolean} Retorna TRUE si la cadena es válida para restauración y FALSE si no lo es.
     */
    function isRestorePass(restore) {
        switch(restore) {
            case Global.App.RESTORE_PASSWORD:
                param.Preventista.setPassword(Ti.Utils.sha256(Global.App.DEFAULT_PASSWORD));
                Log.info("Restauración de la contraseña del \"PREVENTISTA\"");
                return true;
                break;
            case Global.App.RESTORE_ADMIN_PASSWORD:
                param.Configuracion.setPasswordAdmin(Ti.Utils.sha256(Global.App.DEFAULT_ADMIN_PASSWORD));
                Log.info("Restauración de la contraseña del \"ADMINISTRADOR\"");
                return true;
                break;
        };
        return false;
    };

    /**
     * Bloquea los botones que se encuantran en el índice indicado.
     * @param {Integer[]} indexBlock Los índices del array de botones que se deben bloquear.
     * @param {Button[]} buttons Los botones que hemos de bloquear.
     */
    function blockButtons(indexBlock, buttons) {
        for (var i = 0; i < indexBlock.length; i++) {
            buttons[indexBlock[i]].setEnabled(false);
            buttons[indexBlock[i]].setBackgroundColor(Global.Theme.OBJECT_DISABLED);
            buttons[indexBlock[i]].setColor(Global.Theme.TEXT_DISABLED);
        };

        //Mensaje de aviso de falta de base de datos
        var dialog = new Global.Control.Windows.Alert({
            title : 'BASE DE DATOS',
            icon : Global.Control.Windows.ICON.ERROR,
            message : 'No hay base de datos para el teminal ' + Global.Parameters.Preventista.getTerminal() + '.',
            buttons : Global.Control.Windows.BUTTON.ACCEPT
        });

        dialog.open();
    };

    /**
     * Desbloquea los botones que se encuantran en el índice indicado.
     * @param {Integer[]} indexBlock Los índices del array de botones que se deben desbloquear.
     * @param {Button[]} buttons Los botones que hemos de desbloquear.
     */
    function unblockButtons(indexBlock, buttons) {
        for (var i = 0; i < indexBlock.length; i++) {
            buttons[indexBlock[i]].setEnabled(true);
            buttons[indexBlock[i]].setBackgroundColor(Global.Theme.BUTTON.BACKGROUND);
            buttons[indexBlock[i]].setColor(Global.Theme.BUTTON.TITLE);
        };
    };

    //Se ejecuta cuando se instancia el objeto.
    (function() {
        switch(action) {
            case "login":
                login();
                break;
            case "index":
                index();
                break;
        }
    })();

};

module.exports = Principal;
