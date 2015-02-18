/**
 * @fileOverview En este archivo se declara la clase "Report". Esta crea un archivo con los datos y
 * estructura que le indiquemos.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La librearía underscore.
 */
var _ = require('/lib/underscore');

/**
 * Las posiciones de los datos para el registro tipo 01-CabeceraPedido.
 * @constant
 */
var HEADER = {
    Registro : {
        start : 1,
        end : 2
    },
    Serie : {
        start : 3,
        end : 3
    },
    NumPedido : {
        start : 4,
        end : 10
    },
    CodigoCliente : {
        start : 11,
        end : 16
    },
    TipoPedido : {
        start : 17,
        end : 18
    },
    NumLineasPedido : {
        start : 19,
        end : 21
    },
    ImporteBrutoAlbaran : {
        start : 22,
        end : 31
    },
    ImporteDtos : {
        start : 32,
        end : 41
    },
    FechaServicio : {
        start : 42,
        end : 47
    },
    HoraPedido : {
        start : 48,
        end : 52
    },
    FechaPedido : {
        start : 53,
        end : 58
    },
    NotaPreventa : {
        start : 59,
        end : 98
    },
    NotaPreventa2 : {
        start : 99,
        end : 138
    },
    NotaAlbaran : {
        start : 139,
        end : 178
    },
    NotaAlbaran2 : {
        start : 179,
        end : 218
    },
    FormaPago : {
        start : 219,
        end : 219
    },
    ImporteResto : {
        start : 220,
        end : 229
    },
    Nulo : {
        start : 230,
        end : 250
    }
};

/**
 * Las posiciones de los datos para el registro tipo 02-DetallePedido.
 * @constant
 */
var DETAIL = {
    Registro : {
        start : 1,
        end : 2
    },
    Serie : {
        start : 3,
        end : 3
    },
    NumPedido : {
        start : 4,
        end : 10
    },
    TipoProducto : {
        start : 11,
        end : 11
    },
    Concepto : {
        start : 12,
        end : 12
    },
    CodigoArticulo : {
        start : 13,
        end : 18
    },
    Precio : {
        start : 19,
        end : 28
    },
    DtoFijo : {
        start : 29,
        end : 38
    },
    DtoEspecial : {
        start : 39,
        end : 48
    },
    Venta : {
        start : 49,
        end : 54
    },
    Regalo : {
        start : 55,
        end : 60
    },
    TipoPromocion : {
        start : 61,
        end : 62
    }, /*
     CodigoPromocion : {
     start : 63,
     end : 65
     },*/
    CodigoAgrupacion : {
        start : 66,
        end : 68
    },
    CaracterEspecial : {
        start : 69,
        end : 69
    },
    Nulo : {
        start : 70,
        end : 80
    }
};

/**
 * Las posiciones de los datos para el registro tipo 07-Incidencias.
 * @constant
 */
var INCIDENT = {
    Registro : {
        start : 1,
        end : 2
    },
    CodigoCliente : {
        start : 3,
        end : 8
    },
    NumIncidencia : {
        start : 9,
        end : 11
    },
    Nulo : {
        start : 12,
        end : 12
    },
    Descripcion : {
        start : 13,
        end : 42
    },
    Fecha : {
        start : 43,
        end : 48
    },
    Hora : {
        start : 49,
        end : 53
    },
    DiaServicio : {
        start : 54,
        end : 55
    }
};

/**
 * Las posiciones de los datos para el registro tipo 05/06/08-Clientes.
 * @constant
 */
var CLIENT = {
    Registro : {
        start : 1,
        end : 2
    },
    Codigo : {
        start : 3,
        end : 4
    },
    NIF : {
        start : 5,
        end : 16
    },
    NombreFiscal : {
        start : 17,
        end : 46
    },
    NombreComercial : {
        start : 47,
        end : 76
    },
    Contacto : {
        start : 77,
        end : 106
    },
    TipoVia : {
        start : 107,
        end : 108
    },
    Direccion : {
        start : 109,
        end : 138
    },
    Numero : {
        start : 139,
        end : 143
    },
    CodigoPostal : {
        start : 144,
        end : 148
    },
    Poblacion : {
        start : 149,
        end : 178
    },
    Provincia : {
        start : 179,
        end : 208
    },
    Telefono1 : {
        start : 209,
        end : 217
    },
    Telefono2 : {
        start : 218,
        end : 226
    },
    Tarifa : {
        start : 227,
        end : 227
    },
    Nulo1 : {
        start : 228,
        end : 266
    },
    Nulo2 : {
        start : 267,
        end : 286
    },
    Equivalencia : {
        start : 287,
        end : 287
    },
    DiaPreventa : {
        start : 288,
        end : 288
    },
    Ruta : {
        start : 289,
        end : 292
    },
    DiaCierre : {
        start : 293,
        end : 293
    },
    Activacion : {
        start : 294,
        end : 294
    },
    CambioDatos : {
        start : 295,
        end : 295
    },
    Frecuencia : {
        start : 296,
        end : 296
    },
    Nocturno : {
        start : 297,
        end : 297
    },
    "1Q" : {
        start : 298,
        end : 303
    },
    "2Q" : {
        start : 304,
        end : 309
    },
    FormaPago : {
        start : 310,
        end : 311
    },
    NumCuenta : {
        start : 312,
        end : 331
    },
    Observaciones : {
        start : 332,
        end : 361
    },
    CodigoCliente : {
        start : 362,
        end : 367
    },
    DiaAlta : {
        start : 368,
        end : 369
    },
    TipoEstablecimiento : {
        start : 370,
        end : 372
    },
    Censo : {
        start : 373,
        end : 373
    },
    Nulo3 : {
        start : 374,
        end : 735
    }
};

/**
 * Las posiciones de los datos para el registro tipo 03-Cobros.
 * @constant
 */
var CHARGE = {
    Registro : {
        start : 1,
        end : 2
    },
    CodigoCliente : {
        start : 3,
        end : 8
    },
    NumFactura : {
        start : 9,
        end : 16
    },
    ImporteCobro : {
        start : 17,
        end : 26
    },
    TipoCobro : {
        start : 27,
        end : 27
    },
    Vencimiento : {
        start : 28,
        end : 33
    },
    NumRecibo : {
        start : 34,
        end : 35
    },
    /*DiaServicio: {
     start : 38,
     end : 39
     },*/
    NumTalon : {
        start : 40,
        end : 60
    },
    Nulo : {
        start : 61,
        end : 61
    }
};

/**
 * Las posiciones de los datos para el registro tipo 30-Nueva Plantilla.
 * @constant
 */
var TEMPLATE = {
    Registro : {
        start : 1,
        end : 2
    },
    CodigoCliente : {
        start : 3,
        end : 8
    },
    CodigoArticulo : {
        start : 9,
        end : 14
    },
    Venta : {
        start : 15,
        end : 17
    },
    Regalo : {
        start : 18,
        end : 20
    },
    DtoPorcenUnit : {
        start : 21,
        end : 26
    },
    DtoUnitario : {
        start : 27,
        end : 34
    },
    Rappel : {
        start : 35,
        end : 42
    },
    PorcenRappel : {
        start : 43,
        end : 50
    }
};

/**
 * @class Esta clase proviene de los métodos para crear el archivo "xxxPEDI.5MX". Dicho archivo se compone de datos de la base de datos "sendxxx.s3db".
 * @param {Date} [start] La fecha de inicio.
 * @param {Date} [end] La fecha de fin.
 * @param {Integer} [type] El tipo de informe que se ha de crear.
 */
function Report(type, start, end) {
    /**
     * La variable que indica si se han de mostrar todos los registros.
     * @private
     * @type Boolean
     */
    var all = Global.Parameters.Configuracion.getMostrarEnviados() == "N" ? false : true;

    //Valor por defecto de "type"
    var type = type || Global.Report.COMPLET;

    /**
     * El archivo de salida.
     * @private
     * @type String
     */
    // var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, Global.Parameters.Preventista.getTerminal() + "EPEDI.5MX");
    var sdcardPath = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).parent.nativePath;
    //Creamos el directorio de los backup si no existe.
    var folder = Ti.Filesystem.getFile(sdcardPath, Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.BACKUP_DIRECTORY + Ti.Filesystem.separator + Global.Parameters.Preventista.getTerminal());
    if (!folder.exists()) {
        folder.createDirectory();
    };
    //El nuevo archivo.
    var file = Titanium.Filesystem.getFile(folder.getNativePath(), Ti.Filesystem.separator + Global.Functions.nameDateBackup() + "_EPEDI.5MX");

    /**
     * Elimina tantos archivos ".5MX" como hagan falta para tener el máximo indicado en el parámetro de configuración "max5mx".
     */
    function del5mx() {
        //El máximo de arhivos permitidos.
        var limit = Global.Parameters.Configuracion.getMax5mx();
        //Los archivos del directorio.
        var files = _.filter(Ti.Filesystem.getFile(folder.getNativePath()).getDirectoryListing(), function(nameFile) {
            return nameFile.match(/.5MX/);
        });
        
        //Si el límite es cero hemos de copiar el archivo a uno temporal para poder enviarlo.
        // if(limit == 0){
            var tmpFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, Global.Parameters.Preventista.getTerminal() + "EPEDI.5MX.txt");
            tmpFile.write(file.read());
            file = tmpFile;  
        // };
        
        //Si hay mas de la cuenta.
        if (files.length > limit) {
            //Los ordenamos de mayor a menor
            files = _.sortBy(files, function(name) {
                return name;
            }).reverse();

            //Quitamos los restantes.
            for (var i = limit, j = files.length; i < j; i++) {
                var delFile = Ti.Filesystem.getFile(folder.getNativePath(), Ti.Filesystem.separator + files[i]);
                delFile.deleteFile();
            };
        };
    };

    /**
     * Pasa el Objeto a String y lo inserta en el archivo.
     * @param {Object} data El Objeto con los datos.
     */
    function writeFile(data) {
        /**
         * El Array vacio(" ") de una longitud determinada.
         * @private
         * @type String[]
         */
        var lineArray = new Array(data._length);

        /**
         * Las "keys" del objeto.
         * @private
         * @type String[]
         */
        var keys = Object.keys(data);

        //Llenamos lineArray con " ".
        for (var a = 0; a < lineArray.length; a++) {
            lineArray[a] = " ";
        };

        //Por cada "key" introducimos el valor en la posicion adecuada.
        for (var k = 0; k < keys.length; k++) {
            //Si es un objeto es del tipo válido
            if ( typeof data[keys[k]] == "object") {
                var value = data[keys[k]]._value.toString();
                var index = data[keys[k]]._end - value.length;
                for (var v = 0; v < value.length; v++) {
                    lineArray.splice(index++, 1, value[v] != "\n" ? value[v] : " ");
                };

            };
        };

        //Escribimos la cadena en el archivo.
        file.write(lineArray.join("") + "\n", file.exists(file));
    };

    /**
     * Pasa un objeto Date al formato(dd/MM/yy) válido del archivo.
     * @param {Date} date Fecha a formatar.
     * @param {Boolean} separator Indica si se muestra el separador(/) en las fechas(ddMMyy - dd/MM/yy).
     * @return {String} Fecha formatada.
     */
    function formatDate(date, separator) {
        var separator = separator ? true : false;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var year = date.getFullYear().toString().slice(-2);
        return separator ? day + "/" + month + "/" + year : day + month + year;
    };

    /**
     * Pasa un objeto Date al formato hora(mm:ss) válido del archivo.
     * @param {Date} date Fecha a formatar.
     * @return {String} Fecha formatada.
     */
    function formatTime(date) {
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return hour + ":" + minutes;
    };

    /**
     * Crea el Report del tipo Global.Report.COMPLET.
     * @private
     */
    function reportComplet() {
        reportCahsMovements();
        reportOrders();
        reportIncidents();
        reportAutoSale();
        reportClients();
        reportCharge();
        reportBerevageOrder();
        reportTemplate();
    };

    /**
     * Crea el Report del tipo Global.Report.CASH_MOVEMENTS.
     * @private
     */
    function reportCahsMovements() {

    };

    /**
     * Crea el Report del tipo Global.Report.ORDERS.
     * @private
     */
    function reportOrders() {
        /**
         * La query para el WHERE.
         * @private
         * @type String
         */
        var where = (function() {
            var dateStart = start != undefined ? "FechaPedido >= '" + Global.Functions.dateTimeSQliteFormat(start) + "'" : "";
            var dateEnd = end != undefined ? "FechaPedido <= '" + Global.Functions.dateTimeSQliteFormat(end) + "'" : "";
            var qAll = all ? "send != -1" : "send = 0";
            //Ti.API.info("WHERE " + dateStart + (dateStart != "" ? " AND " : "") + dateEnd + (dateStart != "" || dateEnd != "" ? " AND " : "") + qAll);
            return "WHERE " + dateStart + (dateStart != "" ? " AND " : "") + dateEnd + (dateEnd != "" ? " AND " : "") + qAll;
        })();

        /**
         * El modelo de la tabla "CabeceraPedido".
         * @private
         * @type Model
         */
        var modelHeader = new Global.Model.CabeceraPedido();

        /**
         * El modelo de la tabla "CabeceraPedido".
         * @private
         * @type Model
         */
        var modelDetail = new Global.Model.DetallePedido();

        /**
         * Recuperamos todos los pedidos actuales.
         * @private
         * @type Object[]
         */
        var orders = modelHeader.select(where);

        /**
         * Las medidas para cada registro(CabeceraPedido).
         * @private
         * @type Integer[]
         */
        var header = [];

        //Por cada "Pedido" recuperamos sus líneas.
        for (var x = 0; x < orders.length; x++) {
            //Cabecera temporal.
            var tmpOrder = new Object();
            //Ponemos las medidas a cada parámetro.
            var keys = Object.keys(HEADER);
            for (var h = 0; h < keys.length; h++) {
                tmpOrder[keys[h]] = {
                    _value : orders[x][keys[h]] != undefined ? orders[x][keys[h]] : "",
                    _start : HEADER[keys[h]].start,
                    _end : HEADER[keys[h]].end,
                };
            };
            //Formatamos algunos valores
            tmpOrder.Registro._value = "01";
            tmpOrder.TipoPedido._value = "00";
            tmpOrder.Serie._value = orders[x].Serie;
            tmpOrder.NumPedido._value = tmpOrder.NumPedido._value;
            tmpOrder.FechaServicio._value = formatDate(new Date(tmpOrder.FechaServicio._value), false);
            tmpOrder.HoraPedido._value = formatTime(new Date(tmpOrder.FechaPedido._value));
            tmpOrder.FechaPedido._value = formatDate(new Date(tmpOrder.FechaPedido._value));
            tmpOrder.ImporteBrutoAlbaran._value = Global.Functions.euroToNum(Global.Functions.numToEuro(tmpOrder.ImporteBrutoAlbaran._value)); 

            //La longitud total de la fila
            tmpOrder._length = HEADER.Nulo.end;
            //Insertamos la cabecera del pedido.
            writeFile(tmpOrder);
            //Marcamos el registro como introducido
            orders[x].send = 1;
            modelHeader.setData(orders[x]);
            modelHeader.update();

            //Recuperamos las líneas del pedido.
            var details = modelDetail.select("WHERE NumPedido = " + orders[x].NumPedido);
            //Por cada línea la insertamos en el archivo.
            for (var y = 0; y < details.length; y++) {
                //Cabecera temporal.
                var tmpDetail = new Object();
                //Ponemos las medidas a cada parámetro.
                var keys = Object.keys(DETAIL);
                for (var h = 0; h < keys.length; h++) {
                    tmpDetail[keys[h]] = {
                        _value : details[y][keys[h]] != undefined ? details[y][keys[h]] : "",
                        _start : DETAIL[keys[h]].start,
                        _end : DETAIL[keys[h]].end,
                    };
                };
                //Formatamos algunos valores
                tmpDetail.Registro._value = "02";
                //EL número de pedido a de ser igual que el de cabecera.
                tmpDetail.Serie._value = tmpOrder.Serie._value;
                tmpDetail.NumPedido._value = tmpOrder.NumPedido._value;
                //La longitud total de la fila
                tmpDetail._length = DETAIL.Nulo.end;
                //Ponemos las unidades con 2 decimales
                tmpDetail.Precio._value = Global.Functions.euroToNum(Global.Functions.numToEuro(tmpDetail.Precio._value));
                tmpDetail.DtoFijo._value = Global.Functions.euroToNum(Global.Functions.numToEuro(tmpDetail.DtoFijo._value));
                tmpDetail.DtoEspecial._value = Global.Functions.euroToNum(Global.Functions.numToEuro(tmpDetail.DtoEspecial._value));
                //Insertamos la linea del pedido.
                writeFile(tmpDetail);
            };
        };
    };

    /**
     * Crea el Report del tipo Global.Report.INCIDENTS.
     * @private
     */
    function reportIncidents() {
        /**
         * La query para el WHERE.
         * @private
         * @type String
         */
        var where = (function() {
            var dateStart = start != undefined ? "Fecha >= '" + Global.Functions.dateTimeSQliteFormat(start) + "'" : "";
            var dateEnd = end != undefined ? "Fecha <= '" + Global.Functions.dateTimeSQliteFormat(end) + "'" : "";
            var qAll = all ? "send != -1" : "send = 0";
            //Ti.API.info("WHERE " + dateStart + (dateStart != "" ? " AND " : "") + dateEnd + (dateStart != "" || dateEnd != "" ? " AND " : "") + qAll);
            return "WHERE " + dateStart + (dateStart != "" ? " AND " : "") + dateEnd + (dateEnd != "" ? " AND " : "") + qAll;
        })();

        /**
         * El modelo de la tabla "CabeceraPedido".
         * @private
         * @type Model
         */
        var model = new Global.Model.Incidencias();

        /**
         * Recuperamos todas las incidencias.
         * @private
         * @type Object[]
         */
        var incidents = model.select(where);

        /**
         * Las medidas para cada registro(CabeceraPedido).
         * @private
         * @type Integer[]
         */
        var header = [];

        //Por cada "Pedido" recuperamos sus líneas.
        for (var x = 0; x < incidents.length; x++) {
            //Cabecera temporal.
            var tmpIncident = new Object();
            //Ponemos las medidas a cada parámetro.
            var keys = Object.keys(INCIDENT);
            for (var h = 0; h < keys.length; h++) {
                tmpIncident[keys[h]] = {
                    _value : incidents[x][keys[h]] != undefined ? incidents[x][keys[h]] : "",
                    _start : INCIDENT[keys[h]].start,
                    _end : INCIDENT[keys[h]].end,
                };
            };
            //Formatamos algunos valores
            tmpIncident.Registro._value = "07";
            tmpIncident.Hora._value = formatTime(new Date(tmpIncident.Fecha._value));
            tmpIncident.Fecha._value = formatDate(new Date(tmpIncident.Fecha._value), false);
            tmpIncident.DiaServicio._value = new Date(incidents[x].FechaServicio).getDate();

            //La longitud total de la fila
            tmpIncident._length = INCIDENT.DiaServicio.end;
            //Insertamos la cabecera de la incidencia.
            writeFile(tmpIncident);

            //Marcamos el registro como introducido
            incidents[x].send = 1;
            model.setData(incidents[x]);
            model.update();
        };
    };

    /**
     * Crea el Report del tipo Global.Report.AUTOSALE.
     * @private
     */
    function reportAutoSale() {

    };

    /**
     * Crea el Report del tipo Global.Report.CLIENTS.
     * @private
     */
    function reportClients() {
        /**
         * El modelo de la tabla "Clientes".
         * @private
         * @type Model
         */
        var model = new Global.Model.ClientesSend();

        /**
         * Recuperamos todos los clientes.
         * @private
         * @type Object[]
         */
        var clients = model.select();

        //Por cada "cliente" creamos una fila.
        for (var x = 0; x < clients.length; x++) {
            //Cliente temporal.
            var tmpClient = new Object();
            //Ponemos las medidas a cada parámetro.
            var keys = Object.keys(CLIENT);
            for (var h = 0; h < keys.length; h++) {
                tmpClient[keys[h]] = {
                    _value : clients[x][keys[h]] != undefined ? clients[x][keys[h]] : "",
                    _start : CLIENT[keys[h]].start,
                    _end : CLIENT[keys[h]].end,
                };
            };
            //Formatamos algunos valores
            tmpClient.Registro._value = clients[x].Tratado === "ALTA" ? "05" : clients[x].Tratado === "MODI" ? "06" : "08";
            tmpClient.Equivalencia._value = tmpClient.Equivalencia._value == "False" ? "N" : "S";
            tmpClient.Activacion._value = tmpClient.Activacion._value == "False" ? "N" : "S";
            tmpClient.Nocturno._value = tmpClient.Nocturno._value == "False" ? "N" : "S";
            tmpClient.CambioDatos._value = clients[x].Tratado == "MODI" ? "S" : "N";
            tmpClient.Frecuencia._value = tmpClient.Frecuencia._value == "0" ? "S" : tmpClient.Frecuencia._value;
            tmpClient.DiaAlta._value = new Date(clients[x].FechaCambio).getDay();
            tmpClient.Nulo3._value = "@";

            //La longitud total de la fila
            tmpClient._length = CLIENT.Nulo3.end;
            //Insertamos el cliente.
            writeFile(tmpClient);

            //Marcamos el registro como introducido
            clients[x].send = 1;
            model.setData(clients[x]);
            model.update();
        };
    };

    /**
     * Crea el Report del tipo Global.Report.CHARGE.
     * @private
     */
    function reportCharge() {
        /**
         * El modelo de la tabla "Cobros".
         * @private
         * @type Model
         */
        var model = new Global.Model.CobrosSend();

        /**
         * Recuperamos todos los cobros.
         * @private
         * @type Object[]
         */
        var charges = model.select();

        //Por cada "cobro" creamos una fila.
        for (var x = 0; x < charges.length; x++) {
            //Cobro temporal.
            var tmpCharge = new Object();
            //Ponemos las medidas a cada parámetro.
            var keys = Object.keys(CHARGE);
            for (var h = 0; h < keys.length; h++) {
                tmpCharge[keys[h]] = {
                    _value : charges[x][keys[h]] != undefined ? charges[x][keys[h]] : "",
                    _start : CHARGE[keys[h]].start,
                    _end : CHARGE[keys[h]].end,
                };
            };
            //Formatamos algunos valores
            tmpCharge.Registro._value = "03";
            tmpCharge.NumFactura._value = charges[x].Serie + tmpCharge.NumFactura._value;
            tmpCharge.Vencimiento._value = tmpCharge.Vencimiento._value != "" ? formatDate(new Date(tmpCharge.Vencimiento._value), false) : "";

            //La longitud total de la fila
            tmpCharge._length = CHARGE.Nulo.end;
            //Insertamos el cliente.
            writeFile(tmpCharge);

            //Marcamos el registro como introducido
            charges[x].send = 1;
            model.setData(charges[x]);
            model.update();
        };
    };

    /**
     * Crea el Report del tipo Global.Report.TEMPLATE.
     * @private
     */
    function reportTemplate() {
        /**
         * El modelo de la tabla "Plantilla".
         * @private
         * @type Model
         */
        var model = new Global.Model.Plantilla();

        /**
         * Recuperamos todos las plantillas.
         * @private
         * @type Object[]
         */
        var templates = model.select();

        //Por cada "plantilla" creamos una fila.
        for (var x = 0; x < templates.length; x++) {
            //Plantilla temporal.
            var tmpTemplate = new Object();
            //Ponemos las medidas a cada parámetro.
            var keys = Object.keys(TEMPLATE);
            for (var h = 0; h < keys.length; h++) {
                tmpTemplate[keys[h]] = {
                    _value : templates[x][keys[h]] != undefined ? templates[x][keys[h]] : "",
                    _start : TEMPLATE[keys[h]].start,
                    _end : TEMPLATE[keys[h]].end,
                };
            };
            //Formatamos algunos valores
            tmpTemplate.Registro._value = "30";

            //La longitud total de la fila
            tmpTemplate._length = TEMPLATE.PorcenRappel.end;
            //Insertamos el cliente.
            writeFile(tmpTemplate);

            //Marcamos el registro como introducido
            templates[x].send = 1;
            model.setData(templates[x]);
            model.update();
        };
    };

    /**
     * Crea el Report del tipo Global.Report.BEVERAGE_ORDER.
     * @private
     */
    function reportBerevageOrder() {

    };

    /**
     * Crea el Report del tipo Global.Report.SNACKS_ORDER.
     * @private
     */
    function reportSnacksOorder() {

    };

    /**
     * Elimina el archivo creado.
     * @return {Boolean} Retorna "TRUE" si la operación se ha realizado con éxito.
     */
    this.delReport = function() {
        return file.deleteFile();
    };

    /**
     * Escribre en el archivo según la configuración actual.
     */
    this.writeFile = function() {
        //Borramos el archivo si ya existe.
        if (file.exists())
            file.deleteFile();
        reportComplet();
        //Borramos los archivos restantes.
        del5mx();
    };

    /**
     * Método accesor de la propiedad "start" que modifica el valor de esta.
     * @param {Date} value La nueva fecha para la propiedad "start".
     */
    this.setStart = function(value) {
        start = value;
    };

    /**
     * Método accesor de la propiedad "end" que modifica el valor de esta.
     * @param {Date} value La nueva fecha para la propiedad "start".
     */
    this.setEnd = function(value) {
        end = value;
    };

    /**
     * Método accesor de la propiedad "all" que modifica el valor de esta.
     * @param {Boolean} value El valor para la propiedad "all".
     */
    this.setAll = function(value) {
        all = value;
    };

    /**
     * Retorna el archivo.
     * @return {Ti.Filesystem.File} El archivo a enviar.
     */
    this.getFile = function() {
        return file;
    };

};

module.exports = Report;
