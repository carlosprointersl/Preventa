/**
 * @fileOverview En este archivo se crea el controlador "Preventista".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Preventista".
 * @class Es la clase que define al controlador "Preventista". Interactua con el modelo "Preventista".
 * @memberOf Global.Controller
 * @param {String} [action = index]) La acción que debe realizar el controlador.
 */
var Preventista = function(action) {
	/**
	 * El modelo/s que se aplica a este controlador.
	 * @private
	 * @type Model
	 */
	//var model = new Global.Model.Preventista();

	/**
	 * Es la ventana principal, la vista "index".
	 * @private
	 * @type Ti.UI.Window
	 */
	var mainWin = createMainWin();

	/**
	 * Datos del registro con el que se esta trabajando. Simula un Array asociativo.
	 * @private
	 * @type Object
	 */
	//var currentRow = model.getData();

	action = action || "index";

	/**
	 * Muestra una tabla/listado de registros.
	 * @private
	 */
	function index() {
		mainWin.open();
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
		// Code here ...
	};

	/**
	 * Actualiza un registro.
	 * @private
	 */
	function update() {
		// Code here ...
	};

	/**
	 * Elemina un registro.
	 * @private
	 */
	function destroy() {
		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['Si', 'No'],
			message : '¿Desea eliminar esta fila?',
			title : 'ELIMINAR FILA'
		});

		dialog.addEventListener('click', function(r) {
			if (r.index != r.source.cancel) {
				// Code here ...
			}
		});
		dialog.show();
	};

	/**
	 * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
	 * @private
	 * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
	 */
	function createMainWin() {
		var win = Ti.UI.createWindow({
			title : 'Configuración del preventista',
			backgroundColor : '#000000',
			url : Global.Path.VIEW + 'Preventista/MainWin.js',
			global : Global,
			layout : 'vertical',
			modal : false
		});
		
		win.addEventListener('editField', function(e){
			var winForm = new Global.Control.FormNewEdit(e.keys, e.controls);
			var label = e.labelValue;
			
			winForm.addEventListener('save', function(e){
					label.text = e.controls[0].value;
			});
			
			winForm.open();
		});
		
		return win;
	};

	//Se ejecuta cuando se instancia el objeto.
	(function() {
		switch(action) {
			case "index":
				index();
				break;
			case "show":
				show();
				break;
			case "new":
				_new();
				break;
			case "edit":
				edit();
				break;
			case "create":
				create();
				break;
			case "update":
				update();
				break;
			case "destroy":
				destroy();
				break;
		}
	})();

};

module.exports = Preventista;
