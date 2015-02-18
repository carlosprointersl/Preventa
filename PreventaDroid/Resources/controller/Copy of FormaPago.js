/**
 * @fileOverview En este archivo se crea el controlador "FormaPago".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "FormaPago".
 * @class Es la clase que define al controlador "FormaPago". Interactua con el modelo "FormaPago".
 * @memberOf Global.Controller
 * @param {String} [action = index]) La acción que debe realizar el controlador.
 */
var FormaPago = function(action) {
	/**
	 * El modelo/s que se aplica a este controlador.
	 * @private
	 * @type Model
	 */
	var model = new Global.Model.FormaPago();

	/**
	 * Es la ventana principal, la vista "index".
	 * @private
	 * @type Ti.UI.Window
	 */
	var mainWin = createMainWin();

	action = action || "index";

	/**
	 * Retorna el desplegable con los datos
	 * @private
	 * @return {Ti.UI.Picker} El desplegable con los datos de tipo de vias.
	 */
	function index() { 
		return mainWin;
	};

	/**
	 * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
	 * @private
	 * @return {Ti.UI.Picker} El objeto "Picker" que formará el desplegable con datos de la base de datos.
	 */
	function createMainWin() {
		//El desplegable
		var desple = Ti.UI.createPicker();
		//Se guardan las datos del desplegable
		var dataDesple = [];
		//Los resultados de la tabla.
		var pay = model.select();

		//Recorremos todos los registros y por cada uno añadimos una fila
		for (var i = 0; i < pay.length; i++) {
			dataDesple.push(Ti.UI.createPickerRow({
				title : pay[i].Descripcion,
				value : pay[i].FormaPago
			}));
		};

		desple.add(dataDesple);
		desple.selectionIndicator = false;
		desple.value = desple.columns[0].rows[0].value;

		desple.addEventListener('change', function(e) {
			desple.value = e.row.value;
		});

		return desple;
	};

	//Se ejecuta cuando se instancia el objeto.
	return index();

};

module.exports = FormaPago; 