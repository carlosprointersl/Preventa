/**
 * Se define la funcionalidad para poder subir y descargar los archivos para la PreventaDroid. Los archivos a descargar se deviden en tres grupos:<br>
 * <ul>
 * <li>Imágenes: Se encuentran en la carpeta Imagenes del FTP y se descargan a la carpeta <strong>PreventaDroid/Imagenes/</strong></li>
 * <li>Programa: Es el archivo <strong>PreventaDroid.apk</strong>. Se encuentra en la carpeta Programa del FTP y se descarga en la raiz de la sdcard.</li>
 * <li>Carpeta de ruta: Esta carpeta se denomina "0" número de ruta o terminal. Aquí se guarda la base de datos a utilizar en el dispositivo.</li>
 * </ul>
 * El único dato a subir son los archivos *.5MX y estos se han de cargar en la carpeta de la ruta y dentro en la carpeta de pedido. Ejemplo para la ruta 41:
 * <ul>
 * <li>Ruta 41: <strong>/041/PEDIDO/archivo.5MX</strong></li>
 * </ul>
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla | Prointer S.L.</a>
 * @version 1.0
 */

//Variables de conexión con el servidor
var ftphost;
var portNum;
var user;
var password;
var newPort;

//El número de terminal o ruta actual
var terminal;

//Las direcciones de los archivos en el dispositivo
var localPath;
var localDirectory;
var localFile;
var localFolders;

//Las direcciones de los archivos en el servidor
var uploadPath;
var uploadFile;
var ftpFolders;

//Variables
var indexFtp;
var action;
var listFiles;
var isTxt;
var filesDownload;
var dataFilesDownload;
var indexDownload;
var outstream;
var socketPrincipal;
var newSocket;
var eventsSocket = [];

//Indicator
var indicator;
var message1 = 'Cotejando archivos';
var downloadIndicator;
var totalKbDown;

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
 * Inicializa las variables para operar con los datos actuales.
 */
function init() {
    var Global = (require('/global/class/ReturnGlobal'))();
    var paramFtp = Global.Parameters.Ftp;

    ftphost = paramFtp.getServidor();
    portNum = paramFtp.getPuerto();
    user = paramFtp.getUsuario();
    password = paramFtp.getPassword();

    terminal = Global.Parameters.Preventista.getTerminal();

    localPath = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).parent.nativePath + "/";
    localDirectory = Global.Path.DIRECTORY + "/";
    //localFile = localPath + localDirectory + Global.Path.DATA_DIRECTORY + "/" + terminal + String.format("/%sEPEDI.5MX", terminal);

    uploadPath = '/';

    localFolders = [];
    ftpFolders = [];

    if (paramFtp.getImagenes() === "Y") {
        localFolders.push(localPath + localDirectory + Global.Path.PHOTO_DIRECTORY + "/");
        ftpFolders.push(uploadPath + Global.Path.PHOTO_DIRECTORY);
    };

    if (paramFtp.getPrograma() === "Y") {
        localFolders.push(localPath + localDirectory + Global.Path.APP_DIRECTORY + "/");
        ftpFolders.push(uploadPath + Global.Path.APP_DIRECTORY);
    };

    if (paramFtp.getDb() === "Y") {
        localFolders.push(localPath + localDirectory + Global.Path.DATA_DIRECTORY + "/");
        ftpFolders.push(uploadPath + terminal);
    };

};

/**
 * Inicializa las variables para descargar los archivos del servidor.
 */
function initDownload(value) {
    init();

    indicator = value;
    indicator.setMessage(message1);
    indicator.show();

    action = 1;
    dataFilesDownload = {
        length : 0,
        size : 0
    };
    indexFtp = 0;
    filesDownload = [];
    indexDownload = 0;
}

/**
 * Inicializa las variables para carga del archivo de datos al servidor.
 * @param {Ti.Filesystem.File} file El archivo para cargar al servidor.
 */
function initUpload(file) {
    init();
    localFile = file;
    uploadFile = uploadPath + terminal + "/" + file.getName().replace(".txt", "");
    action = 0;
}

/**
 * Inicializa las variables para realizar el test de conexión.
 */
function initTest() {
    init();

    action = 3;
}

/**
 * Combrueba que la comunicación con el servidor es posible y facilita el error en caso contrario.
 * @param {WriteCallbackArgs} e
 */
function writeCallback(e) {
    if (e.success) {
        Ti.API.info('Successfully wrote to socket.');
    } else {
        Ti.API.error('Error writing to socket.\nError code: ' + e.code + "\nError description: " + e.error);
    };
}

/**
 * Escribe en el socket principal el comando que le pasamos por parámetro.
 * @param {String} command
 */
function writeSocket(socket, command) {
    Ti.Stream.write(socket, Ti.createBuffer({
        value : command + '\r\n'
    }), writeCallback);
};

/**
 * Crea el nuevo puerto despúes del PASSIVE MODE.
 * @param {String} value
 */
function setNewPort(value) {
    var len = value.length;
    var start = value.indexOf('(');
    var end = value.indexOf(')');
    var newlen = end - start;
    var port = value.substr(start + 1, newlen - 1);
    var arInfo = port.split(',');

    newPort = arInfo[4] * 256 + parseInt(arInfo[5]);
};

/**
 * Recive las respuestas del servidor FTP y realiza las acciones pertinentes.
 * @param {String} received La respuesta del servidor
 * @param {Ti.IOStream} socket La interfaz dek tipo stream.
 */
function handleReceived(received, socket) {
    Ti.API.info('Received: ' + received);
    switch (received.substring(0, 3)) {
    case '220':
        //Service ready for new user
        writeSocket(socket, 'USER ' + user);
        break;
    case '331':
        //User name okay, need password.
        writeSocket(socket, 'PASS ' + password);
        break;
    case '230':
        //User logged in
        writeSocket(socket, 'PASV');
        break;
    case '227':
        //Entering Passive Mode
        setNewPort(received);

        switch(action) {
        case 0:
            //Hemos de mirar de que tipo es el archivo (Texto o Datos) a cargar en el servidor.
            var extension = uploadFile.slice(-3).toUpperCase();
            isTxt = extension == '5MX' || extension == 'TXT';
            if (isTxt) {
                // Type A - ASCII
                writeSocket(socket, 'TYPE A');
            } else {
                // Type I - Binary
                writeSocket(socket, 'TYPE I');
            }
            break;
        case 1:
            // List directorys
            writeSocket(socket, 'MLSD ' + ftpFolders[indexFtp++]);
            listFiles = '';
            newSocketList();
            break;
        case 2:
            //Hemos de mirar de que tipo es el archivo (Texto o Datos)
            isTxt = filesDownload[indexDownload].name.slice(-3).toLowerCase() == 'txt';
            if (isTxt) {
                // Type A - ASCII
                writeSocket(socket, 'TYPE A');
            } else {
                // Type I - Binary
                writeSocket(socket, 'TYPE I');
            }
            break;
        case 3:
            var dialog = new Global.Control.Windows.Alert({
                title : 'Conexión correcta',
                message : "La conexión con el servidor es correcta.",
                icon : Global.Control.Windows.ICON.INFORMATION
            });

            dialog.open();
            closeSocket(socket);
            break;
        }

        break;
    case '200':
        switch(action) {
        case 0:
            writeSocket(socket, 'STOR ' + uploadFile);
            newSocketUp();
            break;
        case 2:
            writeSocket(socket, "RETR " + filesDownload[indexDownload++].ftp);
            newSocketDown();
            break;
        }
        break;
    case '150':
        //File status okay
        break;
    case '226':
    case '550':
        //Transfer complete
        switch(action) {
        case 0:
            Ti.API.info("Upload File OK!!");
            break;
        case 1:
            if (indexFtp < ftpFolders.length) {
                writeSocket(socket, 'PASV');
            } else if (dataFilesDownload.length > 0) {
                indicator.hide();

                var options = {
                    title : "Descarga de archivos",
                    preventBack : true,
                    message : "Se ha de descargar " + dataFilesDownload.length + " archivo/s (" + parseInt(dataFilesDownload.size / 1024) + " KB)\n¿Desa empezar la descarga?",
                    icon : Global.Control.Windows.ICON.INFORMATION,
                    bodyHeight : 90,
                    buttons : [{
                        title : "Empezar",
                        image : '/images/check_32.png'
                    }, Global.Control.Windows.BUTTON.CANCEL]
                };

                var popup = new Global.Control.Windows.Alert(options);

                popup.addEventClickButtonIndex(0, function() {
                    action = 2;
                    //writeSocket(socket, 'PASV');
                    //indicator.setMessage(message2);
                    popup.close();
                    //indicator.show();
                    downloadIndicator = new Global.Control.Windows.DownloadFile({
                        title : 'Descarga de archivos',
                        preventBack : true,
                        icon : Global.Control.Windows.ICON.INFORMATION,
                        min : 0,
                        max : parseInt(dataFilesDownload.size / 1024)
                    });

                    downloadIndicator.addEventClickButton('cancel', function() {
                        downloadIndicator.close();
                        closeSocket(socket);
                        closeSocket(newSocket);
                    });

                    downloadIndicator.open();
                    totalKbDown = 0;
                    writeSocket(socket, 'PASV');
                });

                popup.addEventClickButton('cancel', function() {
                    closeSocket(socket);
                });

                popup.open();

            } else {

                var dialog = new Global.Control.Windows.Alert({
                    title : 'Archivos actualizados',
                    message : "Los archivos están actualizados. No es necesaría la descarga.",
                    icon : Global.Control.Windows.ICON.INFORMATION
                });

                indicator.hide();

                dialog.open();
                closeSocket(socket);
            }
            break;
        case 2:
            if (indexDownload < filesDownload.length) {
                writeSocket(socket, 'PASV');
            } else {
                downloadIndicator.close();

                var dialog = new Global.Control.Windows.Alert({
                    title : 'Descarga finalizada',
                    message : "La desacarga de los arhivos a finalizado correctamente.",
                    icon : Global.Control.Windows.ICON.INFORMATION
                });

                dialog.open();
                closeSocket(socket);
            }
            break;
        default:
            closeSocket(socket);
        }
        break;
    case '530':
        var dialog = new Global.Control.Windows.Alert({
            title : 'Error en el login',
            message : "El usuario o contraseña no son correctos.",
            icon : Global.Control.Windows.ICON.ERROR
        });

        if (indicator != undefined) {
            indicator.hide();
        };

        dialog.open();
        closeSocket(socket);
        break;
    case '421':
        // No transfer timeout (600 seconds)
        closeSocket(socket);
        break;
    }
};

/**
 * Cierra el socket si no lo está ya.
 */
function closeSocket(socket) {
    try {
        Ti.API.info("Close Socket: " + socket);
        socketPrincipal.fireEvent('close');
        _.each(eventsSocket, function(event) {
            socketPrincipal.removeEventListener(event.name, event.callback);
        });

        if (socket.getState() == Ti.Network.Socket.CONNECTED || socket.getState() == Ti.Network.Socket.LISTENING)
            socket.close();
    } catch(ex) {
        Ti.API.error("Error Close Socket: " + ex.message);
    }
}

/**
 * Lee las respuestas del servidor FTP y comprueba que sean correctas. Cierra la conexión si es necesario.
 * @param {PumpCallbackArgs} e
 */
function readCallback(e) {
    if (e.bytesProcessed == -1) {// Error / EOF on socket. Do any cleanup here.
        try {
            e.source.close();
            closeSocket(e.source);
        } catch(ex) {
            Ti.API.error("Callback Error: " + ex.message);
        }
    }
    try {
        if (e.buffer) {
            handleReceived(e.buffer.toString(), e.source);
        } else {
            Ti.API.error('Error: read callback called with no buffer!');
            try {
                e.source.close();
            } catch(ex) {
                Ti.API.error("Callback Error: " + ex.message);
            }
        }
    } catch(ex) {
        Ti.API.error(['readCallback']);
        Ti.API.error(ex);
    }
}

/**
 * Conecta con el socket principal. Es la primera conexión con el servidor FTP.
 */
function connectSocket() {
    socketPrincipal = Ti.Network.Socket.createTCP({
        host : ftphost,
        port : portNum,
        connected : function(e) {
            Ti.API.info('Socket opened!');
            Ti.Stream.pump(e.socket, readCallback, 1024, true);

            _.each(eventsSocket, function(event) {
                socketPrincipal.addEventListener(event.name, event.callback);
            });

        },
        error : function(e) {
            message = 'Error (' + e.errorCode + '): ' + e.error;
            expUnknown = /unknown host/;
            expUnable = /IO error/;

            _.each(eventsSocket, function(event) {
                socketPrincipal.addEventListener(event.name, event.callback);
            });

            var dialog = new Global.Control.Windows.Alert({
                title : 'Error de conexión',
                message : message,
                icon : Global.Control.Windows.ICON.ERROR
            });

            if (expUnknown.test(e.error)) {
                var name_host = e.error.slice(e.error.indexOf("<"), e.error.indexOf(">") + 1);
                dialog.setMessage("El nombre del servidor " + name_host + " no es correcto");
                dialog.open();
            } else if (expUnable.test(e.error) && Ti.Network.networkType === Ti.Network.NETWORK_NONE) {
                dialog.setMessage("No hay ninguna conexión de datos");
                dialog.open();
            }
            socketPrincipal.fireEvent('end:error');

            _.each(eventsSocket, function(event) {
                socketPrincipal.removeEventListener(event.name, event.callback);
            });
        },
    });
    socketPrincipal.connect();
}

/**
 * Crea una nueva conexión con el nuevo puerto proporcionado por el PASSIVE MODE.
 * @param {Object} args Los argúmentos que le hemos de pasar al nuevo socket. Los argumentos son:
 * <ul>
 * <li>connected: La función que se realizará si la conexión es correcta.</li>
 * </ul>
 */
function connectNewSocket(args) {
    newSocket = Ti.Network.Socket.createTCP({
        host : ftphost,
        port : newPort,
        connected : args.connected,
        error : function(e) {
            Ti.API.error("Socket < " + e.socket + "> encountered error when connectin");
            Ti.API.error("error code: " + e.errorCode);
            Ti.API.error("error description: " + e.error);
        }
    });

    newSocket.connect();
}

/**
 * Crea una nueva conexión para el listado de ficheros del servidor.
 */
function newSocketList() {
    connectNewSocket({
        connected : function(e) {
            Ti.API.info("Socket <" + e.socket + "> connected to host <" + e.socket.host + "> - LIST");
            Ti.Stream.pump(e.socket, readCallbackList, 1024, true);
        }
    });

};

/**
 * Crea una nueva conexión para la descarga de ficheros del servidor.
 */
function newSocketDown() {
    connectNewSocket({
        connected : function(e) {
            Ti.API.info("Socket <" + e.socket + "> connected to host <" + e.socket.host + "> - DOWNLOAD");
            Ti.Stream.pump(e.socket, readCallbackDown, 1024, true);
        }
    });

};

/**
 * Crea una nueva conexión para la subida de ficheros al servidor.
 */
function newSocketUp() {
    connectNewSocket({
        connected : function(e) {
            Ti.API.info("Socket <" + e.socket + "> connected to host <" + e.socket.host + ">");

            Ti.Stream.write(e.socket, getBuffer(), writeCallback);

            socketPrincipal.fireEvent('end:upload');

        }
    });
};

/**
 * Lee el listado de los arhivos y los guarda en un array para poder compararlos despúes.
 * @param {PumpCallbackArgs} e
 */
function readCallbackList(e) {
    if (e.bytesProcessed == -1) {// Error / EOF on socket. Do any cleanup here.
        try {
            e.source.close();
            var result = listFiles.split("\n");

            //Ti.API.info("********************************* LISTANDO LOS " + result.length + " FICHEROS *****************************");

            //Quitamos los que no sean archivos (type=file)
            for (var i = 0, j = result.length; i < j; i++) {
                if (result[i].indexOf("type=file") == -1) {
                    result.splice(i, 1);
                    i -= 1;
                    j -= 1;
                }
            };

            //Pasamos el array de archivos del servidor a un Objeto donde sus Keys son el nombre del archivo.
            var tmp = resultToObject(result);
            var keys = Object.keys(tmp);

            var folder = localFolders[indexFtp - 1];
            var dir = Ti.Filesystem.getFile(folder);
            var dir_files = dir.getDirectoryListing();
            var dir_obj = dirToObject(dir_files);

            //Por cada archivo del FTP lo hemos de buscar en el listado. Si está hemos de comparar las fechas de modificación y si la del servidor
            //es mas reciente se ha de guardar el archivo para su descarga.
            for (var i = 0, j = keys.length; i < j; i++) {
                //Ti.API.info("********************************* BUSCANDO EL ARCHIVO " + tmp[keys[i]].name + " *****************************");
                var download = dir_obj[keys[i]] == undefined;

                if (dir_obj[keys[i]] != undefined) {
                    var tmp_file = Ti.Filesystem.getFile(folder, dir_obj[keys[i]].name);
                    // if (tmp_file.name == tmp[i].name) {
                    download = new Date(tmp_file.modificationTimestamp()) < tmp[keys[i]].modify;
                };

                if (download) {
                    //Añadimos la carpeta donde se tiene que descargar
                    tmp[keys[i]].local = folder + "/" + tmp[keys[i]].name;
                    tmp[keys[i]].ftp = ftpFolders[indexFtp - 1] + "/" + tmp[keys[i]].name;
                    filesDownload.push(tmp[keys[i]]);
                    dataFilesDownload.length += 1;
                    dataFilesDownload.size += parseInt(tmp[keys[i]].size);
                }

            };

        } catch(ex) {
            Ti.API.error("Excepción: " + ex.message);
            // suppess exception
        }
    }
    try {
        if (e.buffer) {
            listFiles += e.buffer.toString();
        } else {
            Ti.API.error('Error: read callback LIST called with no buffer!');
        }
    } catch(ex) {
        Ti.API.error(['readCallback']);
        Ti.API.error(ex);
    }
}

/**
 * Escribe el archivo en el dispositivo
 * @param {PumpCallbackArgs} e
 */
function readCallbackDown(e) {
    if (e.bytesProcessed == -1) {// Error / EOF on socket. Do any cleanup here.
        try {
            e.source.close();
            Ti.API.info('bytesProcesser == - 1');
        } catch(ex) {
            // suppess exception
            Ti.API.info('bytesProcesser == - 1  EXCEPTION: ' + ex.message);
        }
    }
    try {
        if (e.buffer && e.buffer.length > 0) {
            totalKbDown += (e.bytesProcessed / 1024);
            downloadIndicator.setValue(totalKbDown);
            if (e.totalBytesProcessed === 1024) {
                downloadIndicator.setName(filesDownload[indexDownload - 1].name);
            };
            //Si es un archivo de texto
            if (isTxt) {
                var received = e.buffer.toString();
                var target = Ti.Filesystem.getFile(filesDownload[indexDownload - 1].local);
                var append = received.substring(0, 1) != '[';
                target.write(received, append);
                //Ti.API.info('Received 2: ' + received);
                // }
            } else {
                outstream = outstream || Ti.Filesystem.openStream(Ti.Filesystem.MODE_WRITE, filesDownload[indexDownload - 1].local);
                var buffer = e.buffer;
                outstream.write(e.buffer);
                //Ti.API.info("Leng Buffer:" + e.buffer.length + " Count: " + (count += 1));
            }

        } else {
            //Ti.API.error('Error: read callback called with no buffer!');
            try {
                outstream.close();
                outstream = null;
                //Si lo desacargado es inferior al tamaño del archivo hemos de eliminar el archivo en local ya que está incompleto.
                var localFile = Ti.Filesystem.getFile(filesDownload[indexDownload - 1].local);
                if (localFile.exists() && filesDownload[indexDownload - 1].size > localFile.getSize()) {
                    localFile.deleteFile();
                };

                //e.source.close();
                Ti.API.info('buffer.length == 0');
            } catch(ex) {
                Ti.API.info('buffer.length == 0 EXCEPTION: ' + ex.message);
            }
        }
    } catch (ex) {
        Ti.API.error(['readCallback2']);
        Ti.API.error(ex.message);
    }
}

/**
 * Extrae los datos que envian el servidor de los archivos y los guarda en un Object. Los datos que guarda de cada archivo son:
 * <ul>
 * <li>name: El nombre del archivo</li>
 * <li>modify: La última fecha de modificación</li>
 * <li>size: El tamaño en bytes</li>
 * </ul>
 * @param {String[]} result Los datos de los archivos del servidor ftp
 * @return {Object[]} Los datos de los archivos en un objeto.
 */
// function __resultToObject(result) {
// var dataFiles = [];
//
// for (var i = 0, j = result.length; i < j; i++) {
// var tmp = result[i].split(";");
// dataFiles.push({
// name : tmp[8].trim(),
// modify : modifyToDate(tmp[0].slice(tmp[0].indexOf("=") + 1)),
// size : tmp[2].slice(tmp[2].indexOf("=") + 1)
// });
// };
//
// return dataFiles;
// }
function resultToObject(result) {
    var dataFiles = {};

    for (var i = 0, j = result.length; i < j; i++) {
        var tmp = result[i].split(";");
        dataFiles[tmp[8].trim()] = {
            name : tmp[8].trim(),
            modify : modifyToDate(tmp[0].slice(tmp[0].indexOf("=") + 1)),
            size : tmp[2].slice(tmp[2].indexOf("=") + 1)
        };
    };

    return dataFiles;
}

/**
 * Pasa el array de los archivos a un objeto donde sus propiedades son el nombre de cada archivo y el valor es un objeto con la propiedad name.
 * @param {String[]} dir_files El array con los nombres de los archivos.
 * @return {Object} El objeto con los nombres de los archivos.
 */
function dirToObject(dir_files) {
    var dataDir = {};

    for (var i = 0, j = dir_files.length; i < j; i++) {
        dataDir[dir_files[i]] = {
            name : dir_files[i]
        };
    };

    return dataDir;
};

/**
 * Pasa la cadena que contiene la fecha del archivo del servidor ftp a un objeto Date.
 * @param {String} modify La fecha del archivo del servidor.
 * @return {Date}
 */
function modifyToDate(modify) {
    var dateFtp = new Date(modify.slice(0, 4) + "/" + modify.slice(4, 6) + "/" + modify.slice(6, 8) + " " + modify.slice(8, 10) + ":" + modify.slice(10, 12) + ":" + modify.slice(12));
    var offset = dateFtp.getTimezoneOffset();
    dateFtp.setHours(dateFtp.getHours() + (offset / 60) * -1);

    return dateFtp;
}

/**
 * Crea un buffer donde están los datos del archivo a cargar en el servidor.
 * @return {Ti.Buffer} El buffer con los datos del archivo a cargar.
 */
function getBuffer() {
    //var infile = Ti.Filesystem.getFile(localFile);

    //if (!infile.exists()) {
    if (!localFile.exists()) {
        Ti.API.error("File not exists()");
        return Ti.createBuffer({
            value : "File not exists: " + localFile
        });
    } else {
        //var instream = infile.open(Ti.Filesystem.MODE_READ);
        var instream = localFile.open(Ti.Filesystem.MODE_READ);
        var buffer = Ti.createBuffer({
            //length : infile.getSize(),
            length : localFile.getSize(),
            type : isTxt ? Ti.Codec.CHARSET_UTF8 : Ti.Codec.TYPE_BYTE
        });
        instream.read(buffer);

        instream.close();

        return buffer;
    };
};

/**
 * Inicia la operativa para descargar la última versión de los archivos que están en el servidor FTP a el dispositivo local.
 * Inicializa las variables y realiza la conexión con el servidor.
 * @param {Object} value Es el indicador de estado de las operaciones (Cotejamiento y descarga de archivos) que se realizan.
 */
exports.download = function(value) {
    initDownload(value);
    connectSocket();
};

/**
 * Inicia la operativa para cargar el archivo que le pasemos por parámetro al servidor.
 * @param {Ti.Filesystem.File} file El archivo a cargar al servidor.
 */
exports.upload = function(file) {
    initUpload(file);
    connectSocket();
};

/**
 * Cierra el socket actual y detiene todas las acciones.
 */
exports.close = function() {
    if (socketPrincipal != undefined && socketPrincipal.state != Ti.Network.Socket.CLOSED) {
        closeSocket(newSocket);
        closeSocket(socketPrincipal);
        indicator.hide();
    }
};

/**
 * Añade eventos al socket Principal
 * @param {String} name El nombre del evento.
 * @param {Function} callback La función ha realizar en el evento.
 */
exports.addEventListener = function(name, callback) {
    eventsSocket.push({
        name : name,
        callback : callback
    });

};

/**
 * Me indica el estado del socket principal.
 * @return {Number} Ti.Network.Socket - CLOSE, CONNECTED, ERROR, INITIALIZED O LISTENING
 */
exports.getState = function() {
    return socketPrincipal != undefined ? socketPrincipal.state : Ti.Network.Socket.CLOSED;
};

/**
 * Realiza un test de conexión y reporta los error que se han producido.
 */
exports.test = function() {
    initTest();
    connectSocket();
    //Ti.API.info("************   " + socketPrincipal.getState() + " - " + Ti.Network.Socket.CONNECTED + " - " + (socketPrincipal.timeout / 1000));
    setTimeout(function() {
        var dialog = new Global.Control.Windows.Alert({
            title : 'Error de conexión',
            message : 'No se recibe respuesta. Cambie el número del puerto.',
            icon : Global.Control.Windows.ICON.ERROR
        });
        //Ti.API.info("************   " + socketPrincipal.getState() + " - " + Ti.Network.Socket.CONNECTED + " - " + (socketPrincipal.timeout / 1000));
    }, 2000);

};
