/**
 * @fileOverview En este archivo se crea el controlador "TipoVias".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "TipoVias".
 * @class Es la clase que define al controlador "TipoVias". Interactua con el modelo "TipoVias".
 * @memberOf Global.Controller
 * @param {String} [action = index]) La acción que debe realizar el controlador.
 */
var TipoVias = function(action) {
	/**
	 * El modelo/s que se aplica a este controlador.
	 * @private
	 * @type Model
	 */
	var model = new Global.Model.TipoVias();

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
	 * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
	 * @private
	 * @return {Ti.UI.Picker} El objeto "Picker" que formará el desplegable con datos de la base de datos.
	 */
	function createMainWin() {
		var desple = Ti.UI.createPicker();
		//El desplegable
		var dataDesple = [];
		//Se guardan las filas para el desplegable
		var types = model.select();
		//Los resultados de la tabla.

		//Recorremos todos los registros y por cada uno añadimos una fila
		for (var i = 0; i < types.length; i++) {
			dataDesple.push(Ti.UI.createPickerRow({
				title : types[i].descripcion,
				id : types[i].id
			}));
		};

		desple.add(dataDesple);
		desple.selectionIndicator = false;
		desple.id = desple.columns[0].rows[0].id;

		desple.addEventListener('change', function(e) {
			desple.id = e.row.id;
		});

		return desple;
	};

	//Se ejecuta cuando se instancia el objeto.
	(function(){
	    switch(action){
	       case 'index':
	           return index();       
	       break;  
	       case 'return':
               return items();       
           break;
	    };
	})();
};

module.exports = TipoVias;
