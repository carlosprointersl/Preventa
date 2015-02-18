/**
 * @fileOverview En este archivo se cre el Namespace Global.Functions.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

var _ = require("lib/underscore");

/**
 * @namespace Funciones útiles en la aplicación.
 */
Global.Functions = {
    /**
     * Comprueba que un archivo sea un javascript. Comprueba que la extensión sea *.js.
     * @param {String} file Nombre del archivo.
     * @return {Boolean} Retorna TRUE si es file.js, sino FALSE.
     */
    isJsFile : function(file) {
        return file.slice(-3) === '.js';
    },

    /**
     * Pasar un objeto Date a String con el formato de fecha dd/mm/yyyy
     * @param {Date} date El objeto Date a formatar.
     * @return {String} La fecha en formato dd/mm/yyyy
     */
    dateFormat : function(date) {
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
    },

    /**
     * Pasar un objeto Date a String con el formato de hora hh:MM
     * @param {Date} date El objeto Date a formatar.
     * @return {String} La fecha en formato dd/mm/yyyy
     */
    timeFormat : function(date) {
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return hours + ":" + minutes;
    },

    /**
     * Pasar un objeto Date a String con el formato de fecha dd/mm/yyyy HH:mm.
     * @param {Date} date El objeto Date a formatar.
     * @return {String} La fecha en formato dd/mm/yyyy HH:mm.
     */
    dateTimeFormat : function(date) {
        return Global.Functions.dateFormat(date) + " " + Global.Functions.timeFormat(date);
    },

    /**
     * Pasar un objeto String con el formato de fecha dd/mm/yyyy a Date.
     * @param {String} date El objeto String con la fecha en el formato dd/mm/yyyy.
     * @return {Date} El objeto Date con la fecha pasada.
     */
    strToDate : function(date) {
        return new Date(date.substring(10, 6), date.substring(3, 5) - 1, date.substring(0, 2));
    },

    /**
     * Retorna el siguiente día laborable a partir de la fecha que le pasamos.
     * @param {Date} date La fecha actual.
     * @return {Date} El siguiente día laborable a partir de la fecha pasada por parámetro.
     */
    nextWorkDay : function(date) {
        var week = date.getDay();
        var numDays = week == 5 ? 3 : week == 6 ? 2 : 1;
        //Ti.API.info("NextWorkDay (" + date + ")\nweek: " + week + "\nnumDays: " + numDays);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + numDays);
    },

    /**
     * Compara dos fechas. Evalua la primera fecha sobre la segunda y retorna un valor según el resultado
     * de la comparación.
     * @param {Date} date1 La fecha de la que queremos saber su comparación.
     * @param {Date} date2 La fecha con la que vamos a comparar.
     * @return {Integer} Retorna un entero según el resultado de la comparación.
     * date1 < date2 = 0
     * date1 = date2 = 1
     * date1 > date2 = 2
     */
    compareDate : function(date1, date2) {
        //Si es mayor o igual - AÑO
        if (date1.getFullYear() >= date2.getFullYear()) {
            //Si igual comparamos los meses - AÑO
            if (date1.getFullYear() == date2.getFullYear()) {
                //Si es mayor o igual - MES
                if (date1.getMonth() >= date2.getMonth()) {
                    //Si es igual comparamos los días - MES
                    if (date1.getMonth() == date2.getMonth()) {
                        //Si es mayor o igual - DIA
                        if (date1.getDate() >= date2.getDate()) {
                            //Si es igual comparamos los días - DIA
                            if (date1.getDate() == date2.getDate()) {
                                return 1;
                            } else {
                                return 2;
                            };
                        } else {
                            return 0;
                        };
                    } else {
                        return 2;
                    };
                } else {
                    return 0;
                };
            } else {
                return 2;
            };
        } else {
            return 0;
        };
    },

    /**
     * Crea una fecha en formato Date (yyyy-mm-ss) para insertar en SQLite.
     * @param {Date} date El objeto Date a formatar.
     * @return {String} La fecha en formato yyyy-mm-ss
     */
    dateSQliteFormat : function(date) {
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var year = date.getFullYear();

        return year + "-" + month + "-" + day;
    },

    /**
     * Crea una fecha en formato DateTime (yyyy-mm-ss hh:mm:ss) para insertar en SQLite.
     * @param {Date} date El objeto Date a formatar.
     * @return {String} La fecha en formato yyyy-mm-ss hh:mm:ss
     */
    dateTimeSQliteFormat : function(date) {
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var year = date.getFullYear();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    },

    /**
     * Crea una fecha en formato (yyyy/mm/ss) para consultar en las bases de datos pitxxx.s3db.
     * @param {Date} date El objeto Date a formatar.
     * @return {String} La fecha en formato yyyy/mm/ss.
     */
    dateSelectSQliteFormat : function(date) {
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var year = date.getFullYear();

        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    },

    /**
     * Crea un control desplegable donde se pueden indicar las opciones de este, pero no de las filas.
     * @param {String[]} data Los nombres a mostrar en el desplegable.
     * @param {Object} [options] Las opciones de edición del control.
     */
    createDropDown : function(data, options) {
        var pick = Ti.UI.createPicker(options);
        var pickRows = new Array();
        //Por cada nombre creamos una fila.
        for (var i = 0; i < data.length; i++) {
            pickRows.push(Ti.UI.createPickerRow({
                title : data[i]
            }));
        };

        pick.add(pickRows);

        return pick;
    },

    /**
     * Función recursiva para recorrer todas las "Views" hasta llegar a la que tiene
     * una propiedad de nombre "name" con valor "data".
     * En esta "View" están los datos del formulario. Para acceder a ellos, los campos deben de tener una propiedad
     * de nombre "name" con el mismo nombre de la base de datos.
     * @param {Object} data El objeto al que queremos comprobar sus hijos.
     * @param {Object} row La fila con todos los datos del cliente. Se corresponde a la tabla "Clientes".
     */
    retrieveFormData : function(data, row) {
        if (data.name != 'data') {
            var chil = data.children;
            //Por cada hijo
            for (var i = 0; i < chil.length; i++) {
                this.retrieveFormData(chil[i], row);
            };

        } else {
            //Los hijos de la vista de nombre "data".
            var children = data.children;
            //Pasamos el valor de los hijos para la fila
            for (var x = 0; x < children.length; x++) {
                row[children[x].name] = children[x].value;
            };
        };

        return row;
    },

    /**
     * Función recursiva para recorrer todos los hijos de un objeto hasta encontrar el que tenga la propiedad "x" con el valor "y".
     * @param {String} property El nombre de la propiedad del objeto.
     * @param {String} value El valor de la proiedad.
     * @param {Object} ob El objeto del que queremos obtener su "hijo".
     * @return {Object} El objeto que cumpla con los parámetros o "undefined" si no lo encuentra.
     */
    recursiveObject : function(property, value, ob) {
        var obj;
        // Ti.API.info("--------------------------------------------------------- " + ob);
        //Si no es el objeto que buscamos
        if (ob[property] != value) {
            //Si tiene mas hijos seguimos buscando
            if (ob.children.length > 0) {
                //Por cada hijo
                for (var i = 0; i < ob.children.length && obj == undefined; i++) {
                    obj = this.recursiveObject(property, value, ob.children[i]);
                    if (obj != undefined) {
                        return obj;
                    };
                };
            };
        } else {
            obj = ob;
        };

        return obj;
    },

    /**
     * Pasa un string en formato EURO a formato inglés para poder operar con el.
     * No se permiten puntos para indicar los millares.
     * @param {String} euro La cantidad expresada en euros.
     * @return {String} El número que corresponde a los euros indicados.
     * @example
     * var euro = "1234,56€";
     * var num = euroToNum(euro);
     * num == 1234.56;
     */
    euroToNum : function(euro) {
        return euro.replace("€", "").replace(',', '.');
    },

    /**
     * Pasa un número con decimales a formato EURO.
     * No se permiten comas para indicar los millares.
     * @param {Float} num El número decimal que queremos pasar a EURO.
     * @param {Integer} decimals El número de decimales que debe tener.
     * @return {String} La cantidad antes pasada ya a EUROS.
     * @example
     * var num = 1234.56;
     * var euro = numToEuro(num);
     * euro == "1234,56€";
     */
    numToEuro : function(num, numDecimals) {
        var numDecimals = numDecimals != undefined ? numDecimals : 2;
        //Los decimales que se van a mostrar
        var decimals = Math.pow(10, numDecimals);
        //Dejamos el número entero + N decimales.
        var euro = (Math.round(num * decimals) / decimals).toString();

        if (euro.indexOf('.') == -1)
            euro += '.';

        //Recorremos desde la posición del "." hasta los decimales que haya que añadir
        var ind = euro.indexOf('.');

        for (var i = ind + 1, j = ind + numDecimals; i <= j; i++) {
            if(euro[i] == undefined)
                euro += "0";
        };

        return euro.replace('.', ',') + '€';
    },

    /**
     * Quita cualquier carácter especial de la cadena para evitar errores
     * @param {String} name La palabra a la que queremos quitar los carácteres.
     * @return {String} La palabra que le hemos pasado por parámetro sin los carácteres.
     */
    removeAccents : function(name) {
        var __r = {
            'À' : 'A',
            'Á' : 'A',
            'Â' : 'A',
            'Ã' : 'A',
            'Ä' : 'A',
            'Å' : 'A',
            'Æ' : 'E',
            'È' : 'E',
            'É' : 'E',
            'Ê' : 'E',
            'Ë' : 'E',
            'Ì' : 'I',
            'Í' : 'I',
            'Î' : 'I',
            'Ï' : 'I',
            'Ò' : 'O',
            'Ó' : 'O',
            'Ô' : 'O',
            'Ö' : 'O',
            'Ù' : 'U',
            'Ú' : 'U',
            'Û' : 'U',
            'Ü' : 'U',
            'Ñ' : 'N'
        };

        return name.replace(/[ÀÁÂÃÄÅÆÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜÑ]/gi, function(m) {
            var ret = __r[m.toUpperCase()];

            if (m === m.toLowerCase())
                ret = ret.toLowerCase();

            return ret;
        });
    },

    /**
     * Pasa un "String" ("true", "false") a "Boolean" si es posible.
     * @param {String} value Una cadena para pasar a booleano. Las cadenas válidas son "TRUE" y "FALSE" tanto en mayúsculas como en minúsulas.
     * @param {Boolean} Retorna TRUE, FALSE o UNDEFINED según el contenido de la cadena.
     */
    strToBool : function(value) {
        return value.toLowerCase() == 'true' ? true : value.toLowerCase() == 'false' ? false : undefined;
    },

    /**
     * Comprueba si la base de datos está instalada en el dispositivo
     * @param {String} name El nombre de la base de datos.
     * @return {Boolean} TRUE si está instalada, FALSE en caso contrario.
     */
    isDatabaseInstalled : function(name) {
        var fileData = Ti.Filesystem.getFile("file://data/data/" + Ti.App.getId() + "/databases/" + name);
        var exists = fileData.exists();
        return fileData.exists();
    },

    /**
     * Retorna la versión de la base de datos actual. Si no tiene versión crea la tabla "version" y le añade el valor "1.0".
     * @param {String} dbname El nombre de la base de datos.
     * @return {String} La version de la base de datos actual.
     */
    getVersionDB : function(dbname) {
        var db = Ti.Database.open(dbname);
        //Creamos la tabla
        db.execute("CREATE TABLE IF NOT EXISTS versiondb (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, version varchar(10) not NULL)");
        var resultSet = db.execute('SELECT * FROM versiondb');
        var version;
        //Recogemos el resultado de la consulta
        while (resultSet.isValidRow()) {
            version = resultSet.fieldByName('version');
            resultSet.next();
        }

        //Si no tiene versión le insertamos el valor de "1.0"
        if (version === undefined) {
            db.execute('INSERT INTO versiondb ("version") VALUES("1.0")');
            version = "1.0";
        }
        db.close();

        return version;
    },

    /**
     * Comprueba si existe un archivo.
     * @param {String} path La dirección completa del archivo.
     * @return {Boolean} TRUE si existe, FALSE en caso contrario.
     */
    fileExists : function(path) {
        var file = Ti.Filesystem.getFile(path);

        return file.exists();
    },

    /**
     * Pasa un valor booleano de SQLite ("Y", "N") a "Boolean".
     * @param {String} value El valor booleano de la base de datos. En SQLite el valor se guarda como "Y" o "N".
     * @return {Boolean} Retorna TRUE, FALSE o UNDEFINED según el contenido de la cadena.
     */
    strToBoolSqlite : function(value) {
        return value.toUpperCase() === "Y" ? true : value.toUpperCase() === "N" ? false : undefined;
    },

    /**
     * Pasa un valor booleano al formato de SQLite ("Y", "N").
     * @param {Boolean} value El valor booleano a pasar al formato SQLite.
     * @return {String} Retorna "Y" o "N" según el valor pasado.
     */
    boolToStrSqlite : function(value) {
        return value ? "Y" : "N";
    },

    /**
     * Detiene la ejecución del código los milisengudos indicados.
     * @param {Integer} ms Milisegundos.
     * @author <a href="http://www.digimantra.com/tutorials/sleep-or-wait-function-in-javascript/#authorPanel">Sachin Khosla</a>
     */
    sleep : function(ms) {
        var dt = new Date();
        dt.setTime(dt.getTime() + ms);
        while (new Date().getTime() < dt.getTime());
    },

    /**
     * Retorna el índice de la sección a la que pertenece una fila. Para saberlo hemos de saber en que posición está la fila.
     * @param {Ti.UI.TableView} table La table donde buscar la fila.
     * @param {Integer} index El índice de la fila.
     * @return {Integer} El índice de la sección de la fila o "-1" si el índice es superior a la cantidad de líneas de la fila.
     */
    indexSection : function(table, index) {
        var rowIndex = index == 0 ? 0 : -1;
        var totalRows = 0;
        for (var i = 0; i < table.sections.length && index >= totalRows; i++) {
            totalRows += table.sections[i].getRowCount();
            rowIndex = i;
        };

        return rowIndex;
    },

    /**
     * Pasar un día(L, M ,X ,J ,V, S, D) de la semana a número.
     * @param {String} day La letra correspondiente al día de la semana.
     * @return {Number} El número del día de la semana.
     */
    dayToIndex : function(day) {
        var day = day || "z";
        var days = ["L", "M", "X", "J", "V", "S", "D"];

        return days.lastIndexOf(day);
    },

    /**
     * Pasar un número a un día(L, M ,X ,J ,V, S, D) de la semana.
     * @param {Integer} num El número que hacer referencia al día de la semana.
     * @return {String} El día de la semana.
     */
    indexToDay : function(num) {
        var days = ["L", "M", "X", "J", "V", "S", "D"];
        return num < 0 || num >= days.length ? -1 : days[num];
    },

    /**
     * Indica si la cadena es un color hexadecimal válido.
     * @param {String} color El color a comprobar.
     * @return {Boolean} Retorna TRUE si el color es válido.
     */
    isColor : function(color) {
        return /(^#(([0-9A-Fa-f]{6}$)|([0-9A-Fa-f]{3}$)))/.test(color);
    },

    /**
     * Crea la fecha actual en formato "yyyymmddHHMM" para el nombre el backup de la base de datos.
     * @return {String} La fecha en formato yyyymmddHHMM.
     */
    nameDateBackup : function() {
        var date = new Date();
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var year = date.getFullYear();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

        return year.toString() + month.toString() + day.toString() + hours.toString() + minutes.toString();
    },

    /**
     * Llena una sección de filas.
     * @param {TableViewSection} section La sección a llenar.
     * @param {TableViewRow[]} rows Las filas en una Array para llenar la sección.
     */
    fillSection : function(section, rows) {
        _.each(rows, function(element) {
            section.add(element);
        });
    },

    /**
     * Pasa un número entero a Booleano. El 0 siempres es FALSE y 1 TRUE. Si la operación no se puede realizar siempre retornará FALSE.
     * @param {Integer} num El número a transformar.
     * @return {Boolean}
     */
    numToBool : function(num) {
        return isNaN(parseInt(num)) || num <= 0 || num > 1 ? false : true;
    }
};

