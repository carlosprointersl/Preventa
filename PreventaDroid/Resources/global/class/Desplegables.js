/**
 * @fileOverview En este archivo se crea el controlador padre "Desplegables".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea el controlador padre "Desplegables".
 * @class Es la clase que define al controlador "Desplegables". Este controlador es el "padre" de los que actuan sobre las tablas para los desplegables.
 * @memberOf Global.Class
 * @param {String} [action = index]) La acción que debe realizar el controlador.
 */
var Desplegables = function(action) {

    /**
     * El ámbito del objeto actual.
     * @private
     * @type Object
     */
    var self = this;

    /**
     * El modelo/s que se aplica a este controlador.
     * @type Model
     */
    self.model;

    /**
     * Datos del registro con el que se esta trabajando.
     * @type Object
     */
    self.currentRow;
    
    action = action || "index";

    /**
     * Retorna el desplegable con los datos.
     * @private
     * @return {Ti.UI.Picker} El desplegable con los datos de tipo de vias.
     */
    function index() {
        return createMainWin();
    };

    /**
     * Crea un nuevo registro.
     * @private
     */
    function create() {
        self.model.setData(self.currentRow);
        self.model.insert();
    };

    /**
     * Actualiza un registro.
     * @private
     */
    function update() {
        self.model.setData(self.currentRow);
        self.model.update();
    };

    /**
     * Elemina un registro.
     * @private
     */
    function destroy() {
        self.model.setData(self.currentRow);
        self.model.del();
    };

    /**
     * Crea el desplegable con todos los datos.
     * @private
     * @return {Ti.UI.Picker} El desplegable con los datos.
     */
    function createMainWin() {
        var picker = Ti.UI.createPicker();
        //El desplegable
        var dataDesple = new Array();
        //Se guardan las filas para el desplegable
        var types = self.model.select();
        //Si hay elementos en la tabla, añadimos la opción de no seleccionar ninguno.
        if (types.length > 0) {
            dataDesple.push(Ti.UI.createPickerRow({
                title : "Ninguna opción seleccionada",
                id : 0
            }));
        };
        //Recorremos todos los registros y por cada uno añadimos una fila
        for (var i = 0; i < types.length; i++) {
            dataDesple.push(Ti.UI.createPickerRow({
                title : types[i].descripcion,
                id : types[i].id
            }));
        };

        picker.add(dataDesple.length > 0 ? dataDesple : Ti.UI.createPickerRow({
            title : "No existen registros",
            id : 0
        }));
        picker.selectionIndicator = true;

        return picker;
    };

    /**
     * Retorna los valores del desplegable.
     * @return Object[] Los valores.
     */
    this.getItems = function() {
        return self.model.select();
    };

    /**
     * Retorna el desplegable con los datos.
     * @return {Ti.UI.Picker} El desplegable con los datos del tipo actual.
     */
    this.getPicker = function() {
        return createMainWin();
    };

    /**
     * Añade un elemento a los valores.
     * @param {String} value El valor a añadir.
     */
    this.add = function(value) {
        self.currentRow = self.model.getData();
        self.currentRow.descripcion = value.value;
        self.currentRow.id = value.id;
        create();
    };

    /**
     * Actualiza un valor.
     * @param {Object} item El objeto par actualizar.
     */
    this.update = function(value) {
        self.currentRow = value;
        update();
    };

    /**
     * Eliminar un valor.
     * @param {Object} item El objeto para eliminar.
     */
    this.del = function(value) {
        self.currentRow = value;
        destroy();
    };

};

module.exports = Desplegables;
