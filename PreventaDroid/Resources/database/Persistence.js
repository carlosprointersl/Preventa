/**
 * @fileOverview En este archivo se declara la clase "Persistence".
 * Para utilizar esta clase hemos de indicarle el nombre de la tabla (tableName), la base de datos (dbName) y si la clave primaria
 * es AUTO_INCREMENT (Por defecto TRUE).
 * Con la variable "data", que es un Array asociativo (Object), hacemos cualquier operación (INSERT, UPDATE o DELETE).
 * Antes hemos de pasarle el valor con el que estamos trabajando.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Se encarga de la persistencia con la base de datos (SQLite3).
 * @class
 * @param {String} tableName Nombre de la tabla de la base de datos con la que queremos operar.
 * @param {String} dbName Nombre de la base de datos con la que queremos operar.
 * @param {Boolean} [auto_increment=TRUE] Indica si la clave primaria utiliza auto_increment. Por defecto en TRUE.
 */
var Persistence = function(tableName, dbName, auto_increment) {
    /**
     * Array bidimensional donde guardamos todos los campos y si es clave primaria.
     * @private
     * @type Array
     */
    var fields = fillFields();

    /**
     * Es un objeto con los datos del registro actual. Se inicializa vacío.
     * También puede ser un Array de registros.
     * @private
     * @type Object/Array
     */
    var data = fillIndexData();
    var auto_increment = auto_increment === undefined ? true : auto_increment;

    /**
     * Llena un Array bidimensional con todos los campos de la tabla.
     * Por cada campo guardamos el nombre y si es PRIMARY KEY.
     * @private
     * @return {Array} Los campos de la tabla.
     * @example
     * nameField = fields[0][0];
     * pkField 	 = fields[0][1];
     */
    function fillFields() {
        var results = new Array();
        var countPK = 0;
        var db = Ti.Database.open(dbName);
        var rFields = db.execute('PRAGMA table_info(' + tableName + ')');

        //Recorremos los resultados y los guardamos en un Array.
        while (rFields.isValidRow() && rFields !== null) {
            var row = new Array();
            //El Array contiene el nombre del campo y el valor de PK(0,1).
            row[0] = rFields.fieldByName("name");
            row[1] = rFields.fieldByName("pk");
            //Si es PK lo contamos.
            countPK = row[1] == 1 ? countPK + 1 : countPK;

            results.push(row);

            rFields.next();
        };
        //Ti.API.info("FillFields(" + tableName + ") PK: " + countPK);
        //SI NO hay PK añadimos el campo "rowid", "oid" o "_rowid_" para guardarlo como PK.
        if (countPK == 0) {
            var row = new Array();
            row[0] = "rowid";
            row[1] = 1;
            //Ti.API.info("Add rowid PK: " + countPK);
            results.push(row);
        }

        rFields.close();
        db.close();
        return results;
    }

    /**
     * Crea un Objecto vacío cuyos índices asociativos son los campos de la tabla.
     * @private
     * @return (Object) Objecto con índices asociativos vacío.
     */
    function fillIndexData() {
        var indexs = new Object();
        for (var i = 0; i < fields.length; i++) {
            indexs[fields[i][0]] = null;
        };
        return indexs;
    }

    /**
     * Crea la query para el INSERT de los datos. Si es AUTO_INCREMENT no hemos de añadir la "PK".
     * @private
     * @return {String} La query para relizar el INSERT en la tabla.
     */
    function createQueryInsert() {
        var queryFields;
        var queryValues;

        for (var i = 0; i < fields.length; i++) {
            if (queryFields != undefined) {
                //Si NO ES "autoincrement" insertamos el campo. O si es "autoincrement" pero NO ES PRIMARY KEY.
                if(!auto_increment || (auto_increment && !fields[i][1])){
                    queryFields += ", \"" + fields[i][0] + "\"";
                    queryValues += ', ?';
                };
            } else {
                //Si NO ES "autoincrement" insertamos el campo. O si es "autoincrement" pero NO ES PRIMARY KEY.
                if(!auto_increment || (auto_increment && !fields[i][1])){
                    queryFields = "\"" + fields[i][0] + "\"";
                    queryValues = '?';
                };
            };

            // if (queryFields == undefined) {
                // queryFields = auto_increment ? !fields[i][1] ? "\"" + fields[i][0] + "\"" : undefined : "\"" + fields[i][0] + "\"";
                // queryValues = '?';
            // } else {
                // queryFields += auto_increment ? !fields[i][1] ? ", \"" + fields[i][0] + "\"" : undefined : ", \"" + fields[i][0] + "\"";
                // queryValues += ', ?';
            // };
        };
        // Ti.API.info('INSERT INTO ' + tableName + ' (' + queryFields + ') VALUES (' + queryValues + ')');
        return 'INSERT INTO ' + tableName + ' (' + queryFields + ') VALUES (' + queryValues + ')';
    }

    /**
     * Crea la query para el UPDATE de los datos.
     * @private
     * @return {String} La query para relizar el UPDATE en la tabla.
     */
    function createQueryUpdate() {
        var queryUpdate;
        var pk = returnPK();
        var wherePK;

        for (var i = 0; i < pk.length; i++) {
            if (wherePK === undefined) {
                wherePK = ' WHERE \"' + pk[i] + '\"="' + data[pk[i]] + '"';
            } else {
                wherePK += ' AND \"' + pk[i] + '\"="' + data[pk[i]] + '"';
            }

        };

        for (var i = 0; i < fields.length; i++) {
            if (queryUpdate == undefined) {
                if (!fields[i][1]) {
                    queryUpdate = '\"' + fields[i][0] + '\" = ?';
                }
            } else {
                if (!fields[i][1]) {
                    queryUpdate += ', \"' + fields[i][0] + '\" = ?';
                }
            }
        };
        //Ti.API.info('UPDATE ' + tableName + ' SET ' + queryUpdate + wherePK);
        return 'UPDATE ' + tableName + ' SET ' + queryUpdate + wherePK;
    };

    /**
     * Crea la query para el DELETE de datos en la tabla.
     * @private
     * @return {String} La query para realizar el DELETE en la tabla.
     */
    function createQueryDelete() {
        var pk = returnPK();
        var wherePK;

        for (var i = 0; i < pk.length; i++) {
            if (wherePK == undefined) {
                wherePK = ' WHERE ' + pk[i] + '=' + data[pk[i]];
            } else {
                wherePK += ' AND ' + pk[i] + '=' + data[pk[i]];
            }

        };

        //Ti.API.info('DELETE FROM ' + tableName + wherePK);
        return 'DELETE FROM ' + tableName + wherePK;
    }

    /**
     * Crea la query del select con todos los campos de la tabla. Se realiza así para las
     * tablas que no tienen PK declarada y así utilizar el campo "rowid", "oid" o "_rowid_".
     * @private
     * @return {String} La query para el select.
     */
    function createQuerySelect() {
        var query;
        for (var i = fields.length - 1; i >= 0; i--) {
            if (query === undefined) {
                query = '"' + fields[i][0] + '"';
            } else {
                query += ', "' + fields[i][0] + '"';
            }
        };
        return query;
    }
    
    /**
     * Recorre los campos de la tabla y recupera los que sean PRIMARY KEY.
     * Si la tabla no tiene PRIMARY KEY retorna el campo "rowid", "oid" o "_rowid", que se le
     * ha añadido anteriormente al crear los campos.
     * Este campo es una clave única para cada registro que crea la base de datos SQLite.
     * @private
     * @return {Array} pk Array con los nombres de los campos de la tabla que son PRIMARY KEY.
     */
    function returnPK() {
        var pk = new Array();
        for (var i = 0; i < fields.length; i++) {
            if (fields[i][1]) {
                pk.push(fields[i][0]);
            }
        };

        return pk;
    }

    /**
     * Transforma el objeto "data", que es el que contiene la información de la fila, a un Array para
     * utilizarlo en las funciones db.execute(query, "data");
     * Cuando se utiliza en un update NUNCA se incluye la PK.
     * @private
     * @param {Boolean} [isUpdate = FALSE] Indica si la acción ha realizar con el array será para un UPDATE.
     * @return {Array} result Un Array con los datos de la fila.
     */
    function objectToArray(isUpdate) {
        var isUpdate = isUpdate || false;
        var result = new Array();
        for (var i = 0; i < fields.length; i++) {
            //SI NO es un UPDATE
            if (!isUpdate) {
                //SI NO es AUTO_INCREMENT
                if (!auto_increment) {
                    result.push(data[fields[i][0]]);
                } else {
                    //SI no es PK
                    if (!fields[i][1]) {
                        result.push(data[fields[i][0]]);
                    };
                };
            } else {
                //SI no es PK
                if (!fields[i][1]) {
                    result.push(data[fields[i][0]]);
                };
            };
        };

        return result;
    }

    /**
     * Inserta una fila nueva en la tabla. Para ello utiliza los datos del objeto "data".
     * @return {String} La última PRIMARY KEY insertada en la tabla.
     */
    this.insert = function() {
        var db = Ti.Database.open(dbName);
        db.execute(createQueryInsert(), objectToArray());
        var lastId = db.getLastInsertRowId();
        db.close();

        return lastId;
    };

    /**
     * Actualiza los campos de la fila actual (variable "data").
     */
    this.update = function() {
        var db = Ti.Database.open(dbName);
        db.execute(createQueryUpdate(), objectToArray(true));
        db.close();
    };

    /**
     * Elimina la fila actual (data) de la base de datos.
     */
    this.del = function() {
        var db = Ti.Database.open(dbName);
        db.execute(createQueryDelete());
        db.close();
    };

    /**
     * Elimina datos de la tabla actual con una condición.
     * @param {String} where La condición para eleiminar los registros.
     */
    this.delWhere = function(where) {
        var query = "DELETE FROM " + tableName + " " + where;
        var db = Ti.Database.open(dbName);
        db.execute(query);
        db.close();
    };

    /**
     * Realiza una consulta de todos los campos a la tabla y retorna el resultado en un array bidimensional.</br>
     * El primer índice es númerico y se refiere a la fila insertada y el segundo es asociativo y se refiere
     * al nombre de la columna de la tabla.
     * @param {String} [where = NULL] La condición en el SELECT.;
     * @return {Array} Array bidimensional, el primer índice es numérico y el segundo asociativo.
     * @example
     * var idRow = allResults[2]['id']
     */
    this.select = function(where) {
        where = where || {};
        var db = Ti.Database.open(dbName);
        //Ti.API.warn('SELECT ' + createQuerySelect() + ' FROM ' + tableName + ' ' + where);
        var results = db.execute('SELECT ' + createQuerySelect() + ' FROM ' + tableName + ' ' + where);
        var allResults = new Array();

        while (results.isValidRow()) {
            var row = new Object();
            for (var i = 0; i < fields.length; i++) {
                var name = fields[i][0];
                var fbn = results.fieldByName(fields[i][0]);
                
                row[fields[i][0]] = results.fieldByName(fields[i][0]);
            };
            allResults.push(row);
            results.next();
        };

        results.close();
        db.close();
        //Ti.API.warn('LENGHT RESULTS: ' + allResults.length);
        return allResults;
    };

    //	 * Realiza una consulta de todos los campos a la tabla y retorna el resultado a la variable "data".
    //	 * Se le ha de indicar el "ID" de la fila de la que queremos recuperar los datos
    //	 * @param {String|String[]} id La/s PRIMARY KEY de la tabla.
    //	 * @return {Array} data Un Array con índices asociativos.
    //	 * @example
    //	 * var idRow = allResults[2]['id']
    //	 *

    // this.selectId = function(id) {
    // db = Ti.Database.open(dbName);
    // var where;
    // var pk = returnPK();
    //
    // if ( id instanceof Array) {
    //
    // for (var i = 0; i < pk.length; i++) {
    // if (where == undefined) {
    // where = ' WHERE ';
    // } else {
    // where += pk[i] + " = '" + id[i] + "'";
    // }
    //
    // };
    // } else {
    // where = " WHERE " + pk[0] + " = '" + id + "'";
    // }
    //
    // var results = db.execute('SELECT * FROM ' + tableName + where);
    //
    // while (results.isValidRow()) {
    // for (var i = 0; i < fields.length; i++) {
    // data[fields[i]] = results.field(i);
    // };
    // results.next();
    // };
    //
    // results.close();
    // db.close();
    //
    // return data;
    // };

    /**
     * Ejecuta la "query" que le pasemos por parámetro.
     * @param {String} query Cadena con la query que queremos ejecutar.
     * @return {Titanium.Database.ResultSet} El resultado de la query si fue una SELECT.
     */
    this.executeQuery = function(query) {
        var db = Ti.Database.open(dbName);
        var results = db.execute(query);
        db.close();

        return results;
    };

    /**
     * Hace una consulta de la tabla actual con los campos que queramos.
     * @param {String} fields Los campos de los que queremos obtener datos.
     * @param {String}. [where] La condición de la consulta.
     * @return {Titanium.Database.ResultSet} El resultado de la SELECT.
     */
    this.selectFields = function(fields, where) {
        var db = Ti.Database.open(dbName);
        var query = "SELECT " + fields + " FROM " + tableName + " " + where;
        var allResults = new Array();
        var results = db.execute(query);
        while (results.isValidRow()) {
            var row = new Object();
            for (var i = 0; i < results.fieldCount; i++) {
                row[results.fieldName(i)] = results.field(i);
            };
            allResults.push(row);
            results.next();
        };

        results.close();
        db.close();

        return allResults;
    };

    /**
     * Retorna la variable "data" de la clase. Contiene los datos de la fila con
     * la que estamos trabajando.
     * @return {Object} data Contiene los datos de la fila actual.
     */
    this.getData = function() {
        return fillIndexData();
    };

    /**
     * Cambiamos el valor de la variable "data". El objeto que le pasamos debe ser igual a "data".
     * @param {Object} value Es el objeto igual a la "data" pero con datos diferentes de los actuales.
     */
    this.setData = function(value) {
        data = value;
    };
    
    this.customSelectFamilias = function(where){
        where = where || {};
        var db = Ti.Database.open(dbName);
        //Ti.API.warn('SELECT ' + createQuerySelect() + ' FROM ' + tableName + ' ' + where);
        var results = db.execute('SELECT CodigoFamilia, Familia FROM Articulos GROUP BY CodigoFamilia, Familia' + where);
        var allResults = new Array();

        while (results.isValidRow()) {
            var row = new Object();
            for (var i = 0; i < fields.length; i++) {
                var name = fields[i][0];
                var fbn = results.fieldByName(fields[i][0]);
                
                row[fields[i][0]] = results.fieldByName(fields[i][0]);
            };
            allResults.push(row);
            results.next();
        };

        results.close();
        db.close();
        //Ti.API.warn('LENGHT RESULTS: ' + allResults.length);
        return allResults;
        
    };
    
    this.selectCantidadCaja = function(codigoArticulo){
        
        codigoArticulo = codigoArticulo || 0;
        var db = Ti.Database.open(dbName);
        //Ti.API.warn('SELECT ' + createQuerySelect() + ' FROM ' + tableName + ' ' + where);
        var results = db.execute('SELECT UnidadesCaja FROM Articulos WHERE CodigoArticulo = ' + codigoArticulo);
        var allResults = new Array();

        while (results.isValidRow()) {
            var row = new Object();
            for (var i = 0; i < fields.length; i++) {
                var name = fields[i][0];
                var fbn = results.fieldByName(fields[i][0]);
                
                row[fields[i][0]] = results.fieldByName(fields[i][0]);
            };
            allResults.push(row);
            results.next();
        };

        results.close();
        db.close();
        //Ti.API.warn('LENGHT RESULTS: ' + allResults.length);
        return allResults;
   };
};

module.exports = Persistence;
