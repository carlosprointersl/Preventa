/**
 * @fileOverview En este archivo se crea el controlador "Geoposicionamiento".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Geoposicionamiento".
 * @class Es la clase que define al controlador "Geoposicionamiento". Interactua con el modelo "Geoposicionamiento".
 * @memberOf Global.Controller
 * @param {String} [action = index]) La acción que debe realizar el controlador.
 */
var Geoposicionamiento = function() {
	/**
	 * El modelo/s que se aplica a este controlador.
	 * @private
	 * @type Model
	 */
	var model = new (require("model/Geoposicionamiento"))();
	
	/**
	 * Datos del registro con el que se esta trabajando. Simula un Array asociativo.
	 * @private
	 * @type Object
	 */
	var currentRow;

	/**
	 * Retorna un listado con los geoposicionamientos actuales que cumplan con la condición indicada.
	 * @param {String} [where] La condición para la consulta en la tabla.
	 * @return {Objet[]} El resultado de la consulta o un array vacío si no obtiene ningún resultado.  
	 */
	function list(where) {
		return model.select(where);
	};

	/**
	 * Retorna un registro de la tabla GeoPosicionamiento que tenga el "id" indicado.
	 * @param {Integer} id El "id" del registro.
	 * @return {}
	 */
	function show(id) {
		return model.select("WHERE id = " + id);
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
	 * @param {Object} location El objeto con propiedades para guardar en la tabla GeoPosicionamiento.    
	 */
	function create(location) {
	    model.setData(_.extend(model.getData(), location));
		model.insert(location);
		model.setData(null);
	};

	/**
	 * Actualiza un registro.
	 * @param {Object} location Actualiza el objeto.
	 */
	function update(location) {
		model.setData(location);
        model.update(location);
        model.setData(null);
	};

	/**
	 * Elemina un registro.
	 * @param {Integer} id El "id" del registro.
	 */
	function destroy(id) {
        model.setData(show(id));
        model.del();
        model.setData(null);
	};
	
	/**
	 * Inserta un nuevo dato de localización.
	 * @param {Object} location El objeto con propiedades para guardar en la tabla GeoPosicionamiento. 
	 */
	this.insert = function(location){
	    create(location);
	};
	
	/**
	 * Actualiza un dato de localización.
	 * @param {Object} location La localización a actualizar. 
	 */
	this.update = function(location){
	    update(location);
	};
	
	/**
	 * Elimina un dato de localización.
	 * @param {Integer} id El "id" de la localización. 
	 */
	this.delete = function(id){
	     destroy(id);
	};

};

module.exports = Geoposicionamiento;
