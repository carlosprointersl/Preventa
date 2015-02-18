/**
 * @fileOverview En este archivo se crea el controlador "Plantilla".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Plantilla".
 * @class Es la clase que define al controlador "Plantilla". Interactua con el modelo "Plantilla".
 * @param {Number} codeClient El código del cliente al que se le van a editar las plantillas.
 * @memberOf Global.Controller
 */
var Plantilla = function(codeClient) {
    /**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    var model = new Global.Model.Plantilla();

    /**
     * Datos del registro con el que se esta trabajando. Simula un Array asociativo.
     * @private
     * @type Object
     */
    var currentRow;
    // = model.getData();

    /**
     * El listado de plantillas.
     * @private
     * @type Object
     */
    var section;
    // = new (require(Global.Path.VIEW + 'Plantilla/SectionTemplates')());

    /**
     * Muestra una tabla/listado de registros.
     * @private
     */
    function index() {
        var templates = model.select("WHERE CodigoCliente = " + codeClient);
        section = new (require(Global.Path.VIEW + 'Plantilla/SectionTemplates'))(templates.length > 0 ? templates : model.getData());

        return section.getView();
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
        
    };

    /**
     * Muestra un formulario con datos para modificar. (Vista Edit llena)
     * Si los datos son correctos se actualiza en el modelo. (Update())
     * @private
     */
    function edit() {

    };

    /**
     * Crea un nuevo registro.
     * @private
     */
    function create() {
        currentRow.send = 0;
        model.setData(currentRow);
        model.insert();
        currentRow = undefined;
    };

    /**
     * Actualiza un registro.
     * @private
     */
    function update() {
        
    };

    /**
     * Elemina un registro.
     * @private
     */
    function destroy() {
        model.delWhere("WHERE CodigoCliente = " + codeClient);
    };

    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @private
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createMainView() {
        var win = Ti.UI.createWindow({
            title : 'Table',
            backgroundColor : '#000000',
            url : Global.Path.VIEW + 'Plantilla/MainWin.js',
            global : Global,
            layout : 'vertical'
        });

        return win;
    };

    /**
     * Crea la vista de edición de plantillas.
     * @return {Ti.UI.View} La vista para la edición de plantillas.
     */
    this.index = function() {
        return index();
    };

    /**
     * Actualiza las plantillas del cliente indicado. Elimina las antiguas, si las tuviera, e inserta las nuevas.
     */
    this.saveTemplates = function() {
        destroy();
        //Las plantillas.
        var templates = section.getTemplates();
        //Por cada plantilla creamos una nueva.
        for (var i = 0, j = templates.length; i < j; i++) {
            currentRow = templates[i];
            currentRow.CodigoCliente = codeClient;
            create();
        };
    };

};

module.exports = Plantilla;
