/**
 * @fileOverview En este archivo se crea el controlador "Serie".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Serie".
 * @class Es la clase que define al controlador "Serie". Interactua con el modelo "Serie".
 * @memberOf Global.Controller
 */
var Serie = function() {
    /**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    var model = new Global.Model.Serie();

    /**
     * Datos del registro con el que se esta trabajando. Simula un Array asociativo.
     * @private
     * @type Object
     */
    var currentRow;

    /**
     * Crear un registro.
     * @private
     */
    function create() {
        model.setData(currentRow);
        model.insert();
    };
    
    /**
     * Actualiza un registro.
     * @private
     */
    function update() {
        model.setData(currentRow);
        model.update();
    };
    
    /**
     * Elemina un registro.
     * @private
     */
    function destroy() {
        model.setData(currentRow);
        model.del();
    };

    /**
     * Retorna todas las series que hay actualmente en la base de datos.
     * @return {Object[]} Retorna un array de "object" donde cada uno representa un registro de la tabla "Serie".
     */
    this.getSeries = function() {
        return model.select();
    };
    
    /**
     * Retorna la serie con el "id" indicado.
     * @return {Object} Retorna los datos de la serie indicada.
     */
    this.getSerieId = function(id) {
        return model.select("WHERE id = " + id)[0];
    };

    /**
     * Actualizamos los datos de un registro en la base de datos.
     * @param {Object}  row Una fila válida para la tabla "Serie".
     */
    this.saveSerie = function(row) {
        currentRow = row;
        update();
    };

    /**
     * Retorna los valores del desplegable para la edición de "CLAVE=>VALOR".
     * @return Object[] Los valores.
     */
    this.getItems = function() {
        var series = model.select();
        //Hemos de añadir la propiedad "descripcion" que tendrá el mismo valor que "nombre".
        for (var i = 0, j = series.length; i < j; i++) {
            series[i].descripcion = series[i].nombre;
        };
        return series;
    };
    
    /**
     * Añade un elemento a los valores para la edición de "CLAVE=>VALOR".
     * @param {String} value El valor a añadir.
     */
    this.add = function(value) {
        currentRow = model.getData();
        currentRow.nombre = value.value;
        currentRow.id = value.id;
        currentRow.numFactura = 0;
        currentRow.iva = 'Y';
        
        create();
    };
    
    /**
     * Actualiza un valor para la edición de "CLAVE=>VALOR".
     * @param {Object} item El objeto par actualizar.
     */
    this.update = function(value) {
        value.nombre = value.descripcion;
        this.saveSerie(value);
    };
    
    /**
     * Eliminar un valor para la edición "CLAVE=>VALOR".
     * @param {Object} item El objeto para eliminar.
     */
    this.del = function(value) {
        currentRow = value;
        destroy();
    };
};

module.exports = Serie;
