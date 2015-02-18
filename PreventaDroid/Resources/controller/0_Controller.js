/**
 * @fileOverview En este archivo se crea el controlador "nameController".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "nameController".
 * @class Es la clase que define al controlador "nameController". Interactua con el modelo "nameController".
 * @memberOf Global.Controller
 * @param {String} [action = index]) La acción que debe realizar el controlador.
 */
var nameController = function(action) {
	/**
	 * El modelo/s que se aplica a este controlador.
	 * @private
	 * @type Model
	 */
	var model = new Global.Model.nameController();
	

	/**
	 * Datos del registro con el que se esta trabajando. Simula un Array asociativo.
	 * @private
	 * @type Object
	 */
	var currentRow = model.getData();

	action = action || "index";

	/**
	 * Muestra una tabla/listado de registros.
	 * @private
	 */
	function index() {
		createMainWin().open();
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
		//Las opciones de la ventana.
        var options = {
            title : "TÍTULO DE LA VENTANA",
            message : "MENSAJE DE LA VENTAN",
            icon : Global.Control.Windows.ICON.QUESTION,
            buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
        };
        //La ventana emergente con el mensaje.
        var popup = new Global.Control.Windows.Alert(options);
        //El evento 'accept' que genera al aceptar el mensaje.
        popup.addEventClickButton("accept", function() {
        	// Acciones a realizar
            // model.setData(currentRow);
            // model.del();
            // popup.close();
            // currentRow = null;
        });

        popup.open();
	};

	/**
	 * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
	 * @private
	 * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
	 */
	function createMainWin() {
		var win = Ti.UI.createWindow({
			title : 'Table',
			backgroundColor : '#000000',
			url : Global.Path.VIEW + 'nameController/MainWin.js',
			global : Global,
			layout : 'vertical'
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

module.exports = nameController;
