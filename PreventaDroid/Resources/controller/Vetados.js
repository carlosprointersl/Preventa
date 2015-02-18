/**
 * @fileOverview En este archivo se crea el controlador "Vetados".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Vetados".
 * @class Es la clase que define al controlador "Vetados". Interactua con el modelo "Vetados".
 * @memberOf Global.Controller
 * @param {String} [action = index]) La acción que debe realizar el controlador.
 */
var Vetados = function(action) {
	/**
	 * El modelo/s que se aplica a este controlador.
	 * @private
	 * @type Model
	 */
	var model = new Global.Model.Vetados();
	

	/**
	 * Datos del registro con el que se esta trabajando. Simula un Array asociativo.
	 * @private
	 * @type Object
	 */
	var currentRow; // = model.getData();

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
			url : Global.Path.VIEW + 'Vetados/MainWin.js',
			global : Global,
			layout : 'vertical'
		});

		return win;
	};
	
	/**
	 * Nos dice si un artículo está vetado para un cliente.
	 * @param {Number} article El código del artículo.
	 * @param {Number} client El código del cliente. 
	 */
	this.isVetoed = function(article, client){
	    var result = model.select("WHERE CodigoArticulo = " + article + " AND CodigoCliente = " + client);
	    
	    return result.length > 0;
	};

};

module.exports = Vetados;
