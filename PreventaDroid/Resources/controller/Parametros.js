/**
 * @fileOverview En este archivo se crea el controlador para el modelo "Parameteros". 
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Parametros".
 * @class Es la clase que define al controlador "Parametros". Interactua con el modelo "Parametros".</br>
 * Este controlador se ocupa de la operativa de la tabla "Parametros" de la base de datos "pitParam". No
 * se crean nuevos registros, solo se obtiene/modifica el campo "Valor" de cada parámetro.
 * @memberOf Global.Controller
 */
var Parametros = function() {
	/**
	 * El modelo/s que se aplica a este controlador.
	 * @private
	 * @type Parametros
	 */
	var model = new Global.Model.Parametros();
	
	/**
	 * Datos del registro con el que se esta trabajando. Simula un Array asociativo.
	 * @private
	 * @type Object
	 */
	var currentRow = model.getData();
	
	/**
	 * Todos los registros de la tabla "Parametros". Es un Array que contiene Objects con la estructura:
	 * parameter.Nombre
	 * parameter.Valor
	 * @private
	 * @type Array
	 */
	var parameters = fillParameters();
	
	/**
	 * Busca por el nombre el parámetro correspondiente en la tabla "Parametros".
	 * @private
	 * @param {String} name El nombre del parámetro.
	 * @returns {Object} Retorna un parámetro con rowid, Nombre y Valor. 
	 */
	function getParameterData(name) {
		return model.select("WHERE Nombre = '" + name + "'")[0];
	};
	
	/**
	 * Recupera todos los registros de la tabla "Parametros" y los guarda en el Objeto "parameters". Para acceder a ellos
	 * se utiliza la variable "parameters" mas el nombre y obtenenmos su valor.
	 * @example
	 * parameters.Nombre_campo = valor_asignar;
	 * var valor_recuperar = parameters.Nombre_campo;
	 * @private
	 */
	function fillParameters(){
	    var rs_param = model.select();
	    var params = new Object();
	    //Recorremos todos los registros de la tabla "Parametros".
	    for (var i=0; i < rs_param.length; i++) {
		      params[rs_param[i].Nombre] = rs_param[i].Valor; 
		};
		
		return params;
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
	 * Obtiene el valor del parámetro.
	 * @param {String} name Nombre del parámetro del que queremos obtener el "Valor".
	 * @return {String} El valor del campo. 
	 */
	this.get = function(name) {
		return parameters[name];
	};
	
	/**
	 * Cambia el "Valor" al campo.
	 * @param {String} name Nombre del parámetro que queremos modificar.
	 * @param {String} value Valor que adquiere el parámetro. 
	 */
	this.set = function(name, value) {
		currentRow = getParameterData(name);
		currentRow.Valor = value;
		update();
		parameters[name] = value;
	};

};

module.exports = Parametros;
