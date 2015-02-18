/**
 * @fileOverview En este archivo se crea el controlador "Vehiculo".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Vehiculo".
 * @class Es la clase que define al controlador "Vehiculo". Interactua con el modelo "Vehiculo".
 * @memberOf Global.Controller
 */
var Vehiculo = function() {
    /**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    var model = new Global.Model.Vehiculo();

    /**
     * Datos del registro con el que se esta trabajando. Simula un Array asociativo.
     * @private
     * @type Object
     */
    var currentRow;
    // = model.getData();

    /**
     * Muestra una tabla/listado de registros.
     * @private
     */
    function index() {
        return model.select();
    };

    /**
     * Muestra una registro.
     * @private
     */
    function show() {
        // Code here ...
    };

    /**
     * Muestra un formulario vacío para crear un registro. (Vista Edit vacía)
     * Si los datos son correctos se guarda en el modelo. (Create())
     * @private
     */
    function _new() {
        // Code here ...
        // View Edit
        // if(OK){create() };
    };

    /**
     * Muestra un formulario con datos para modificar. (Vista Edit llena)
     * Si los datos son correctos se actualiza en el modelo. (Update())
     * @private
     */
    function edit() {
        // Code here ...
        // View Edit
        // if(OK){update() };
    };

    /**
     * Crea un nuevo registro.
     * @private
     */
    function create() {
        model.setData(currentRow);
        return model.insert();
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
     * Recupera los vehiculos guardados.
     * @return Object[]
     */
    this.index = function() {
        return model.select();
    };

    /**
     * Añade un nuevo vehículo.
     * @param {Object} vehicle El vehículo ha añadir.
     * @return {Number} El número de la clave primaria del nuevo registro.
     */
    this.add = function(vehicle) {
        currentRow = vehicle;
        var id = create();
        currentRow = null;
        
        return id;
    };

    /**
     * Actualiza los datos del vehículo.
     * @param {Object} vehicle El vehículo para actualizar.
     */
    this.update = function(vehicle) {
        currentRow = vehicle;
        update();
        currentRow = null;
    };

    /**
     * Elimina el vehículo.
     * @param {Object} vehicle El vehículo a eliminar.
     */
    this.del = function(vehicle) {
        currentRow = vehicle;
        destroy();
        currentRow = null;
    };
    
    /**
     * Recupera un vehículo a través de su "id".
     * @param {Number} id La clave primaria del vehículo.
     * @return {Object[]} Un array con el vehiculo si existe. En caso contrario estará vacío. 
     */
    this.getVehicleId = function(id){
        return model.select("WHERE id = '" + id +"'");
    };
    
    /**
     * Retorna todos los vehículos actuales.
     * @return {Object[]} Un array con los vehículos existentes. 
     */
    this.getVehicles = function(){
        return model.select();
    };
    
};

module.exports = Vehiculo;
