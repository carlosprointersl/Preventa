/**
 * @fileOverview En este archivo se crea el Namespace Global.Parameters. También tenemos las clases
 * del controlador y del modelo de la tabla "Parametros".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

(function() {
    // La clase Persistence
    var Persistence = require(Global.Path.DB + 'Persistence');
    //Los nombres de las tablas que interviene.
    var nameTables = ['configuracion', 'email', 'gps', 'ivaRecargo', 'preventista', 'ftp'];

    /**
     * Inicializa los modelos de las tablas de configuración de la aplicación.
     * @return {Model[]} Un array con los modelos inicializados.
     */
    function initializeModels() {

        var models = new Array();

        function model(table) {
            Persistence.call(this, table, Global.ConfigDB.PARAM_NAME);
        };

        for (var i = 0; i < nameTables.length; i++) {
            models.push(new model(nameTables[i]));
        };

        return models;
    };

    /**
     * @class Este objeto guarda los datos de los parámetros y facilita las funciones "get" y "set" con la base de datos.
     * @extends Persistence
     * @param {String} name El nombre del campo.
     * @param {Object} value El valor que tendrá este "parámetro".
     * @param {String} table El nombre de la tabla con la que se trabaja.
     * @param {Integer} [id] La clave primaria para parámetros que tienen mas de un registro. Solo aplicacble a la tabla de (IVA - Recargo).
     */
    var GetSet = function(name, value, table, id) {
        //Heredamos los métodos de la clase "Persistence"
        var model = new Persistence(table, Global.ConfigDB.PARAM_NAME);

        /**
         * El valor
         * @private
         * @type Object
         */
        var value = value;

        /**
         * Retorna el valor actual.
         * @return {Object} El valor actual.
         */
        this.get = function() {
            return value;
        };

        /**
         * Modifica el valor actual por uno nuevo. Se queda registrado en la base de datos.
         * @param {Object} newValue El nuevo valor.
         */
        this.set = function(newValue) {
            value = newValue;
            var whereId = id != undefined ? " WHERE id = " + id : "";
            var query = "UPDATE " + table + " SET " + name + " = '" + value + "'" + whereId;
            //Ejecutamos el UPDATE
            model.executeQuery(query);
        };

    };

    GetSet.prototype = Persistence;

    /**
     * Crea un namespace con todos los "get" y "set" para editar los parámetros de la aplicación.
     * Por cada apartado de configuración existe un namespace.</br>
     * @example
     * Parameters.Configuracion.getNumPedido();
     * Parameters.Email.getAsunto();
     * @return {Object} EL objeto con getters y setters.
     */
    function parameters() {
        //Los modelos
        var models = initializeModels();
        //El objeto "parameters" a retornar.
        var parameters = new Object();

        //Por cada modelo recuperamos los datos.
        //Si tiene una línea es mas sencillo. Recuperamos esta línea con sus llaves y valores.
        for (var index = 0; index < models.length; index++) {

            var data = models[index].select();
            var namespace = nameTables[index].replace(nameTables[index].substring(0, 1), nameTables[index].substring(0, 1).toUpperCase());
            if (nameTables[index] != 'ivaRecargo') {
                var row = data[0];
                var keys = Object.keys(row);
                //El objeto con el "get" y "set" para cada parámetro.
                var ob = new Object();

                for (var i = 1; i < keys.length; i++) {
                    var name = keys[i].replace(keys[i].substring(0, 1), keys[i].substring(0, 1).toUpperCase());
                    var getset = new GetSet(keys[i], row[keys[i]], nameTables[index]);

                    ob['get' + name] = getset.get;
                    ob['set' + name] = getset.set;
                };
                parameters[namespace] = ob;
            } else {
                var ob = new Object();
                //Recorremos todos los registros (IVA - Recargo)
                for (var i = 0; i < data.length; i++) {
                    
                    //El objeto con el "get" y "set" para el IVA.
                    var getsetIva = new GetSet("iva", data[i].iva, nameTables[index], data[i].id);
                    //Añadimos los métodos "get" & "set" al objeto.
                    ob['getIva' + data[i].nombre] = getsetIva.get;
                    ob['setIva' + data[i].nombre] = getsetIva.set;
                    
                    //El objeto con el "get" y "set" para el Recargo.
                    var getsetReca = new GetSet("recargo", data[i].recargo, nameTables[index], data[i].id);
                    //Añadimos los métodos "get" & "set" al objeto.
                    ob['getRecargo' + data[i].nombre] = getsetReca.get;
                    ob['setRecargo' + data[i].nombre] = getsetReca.set;
                    
                };
                parameters[namespace] = ob;                    
            };
        };

        return parameters;
    };

    /**
     * @namespace Con este objeto podemos recuperar y editar los parámetros de la aplicación.
     */
    Global.Parameters = parameters();
})();
