/**
 * @fileOverview En este archivo se crea el controlador "TipoEstablecimientos".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "TipoEstablecimientos".
 * @class Es la clase que define al controlador "TipoEstablecimientos". Interactua con el modelo "TipoEstablecimientos".
 * @memberOf Global.Controller
 * @param {String} [action = index]) La acción que debe realizar el controlador.
 */
var TipoEstablecimientos = function(action) {
    /**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    var model = new Global.Model.TipoEstablecimientos();

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
        var desple = Ti.UI.createPicker();
        //El desplegable
        var dataDesple = [];
        //Se guardan las dilas para el desplegable
        var store = model.select();
        //Los resultados de la tabla.

        //Recorremos todos los registros y por cada uno añadimos una fila
        for (var i = 0; i < store.length; i++) {
            dataDesple.push(Ti.UI.createPickerRow({
                title : store[i].descripcion,
                value : store[i].id
            }));
        };

        if (dataDesple.length > 0) {
            desple.add(dataDesple);
            desple.value = desple.columns[0].rows[0].value;
            desple.selectionIndicator = false;

            desple.addEventListener('change', function(e) {
                desple.value = e.row.value;
            });
        } else {
            dataDesple.push(Ti.UI.createPickerRow({
                title : "Ninguno"
            }));
            desple.add(dataDesple);
        };

        return desple;
    };

    //Se ejecuta cuando se instancia el objeto.
    return index();

};

module.exports = TipoEstablecimientos;
