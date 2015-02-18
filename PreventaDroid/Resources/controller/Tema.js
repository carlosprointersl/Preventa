/**
 * @fileOverview En este archivo se crea el controlador "Tema".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Tema".
 * @class Es la clase que define al controlador "Tema". Interactua con el modelo "Tema".
 * @memberOf Global.Controller
 * @param {String} [action = init] La acción que debe realizar el controlador.
 */
var Tema = function(action) {
    /**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    var model = new Global.Model.Tema();

    /**
     * Datos del registro con el que se esta trabajando. Simula un Array asociativo.
     * @private
     * @type Object
     */
    var currentRow;

    /**
     * La ventana principal.
     * @private
     * @type Ti.UI.View
     */
    var mainWin = createMainWin();

    action = action || "init";

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
        //La ventana de edición
        var winEdit = createEditWin({
            theme : model.getData(),
            action : create
        });

        //El evento 'finish' nos indica que se ha terminado la operación satisfactoriamente,
        winEdit.addEventListener('finish', function() {
            mainWin.fireEvent('appendTheme', {
                theme : currentRow
            });

            winEdit.close();
        });

        winEdit.open();
    };

    /**
     * Muestra un formulario con datos para modificar. (Vista Edit llena)
     * Si los datos son correctos se actualiza en el modelo. (Update())
     * @private
     */
    function edit() {
        //La ventana de edición
        var winEdit = createEditWin({
            theme : currentRow,
            action : update
        });

        //El evento 'finish' nos indica que se ha terminado la operación satisfactoriamente,
        winEdit.addEventListener('finish', function() {
            mainWin.fireEvent('updateTheme');
            winEdit.close();
        });

        winEdit.open();
    };

    /**
     * Crea un nuevo registro.
     * @private
     */
    function create() {
        currentRow.editable = 'Y';
        defaultColor();        
        model.setData(currentRow);
        currentRow.id = model.insert();
    };

    /**
     * Actualiza un registro.
     * @private
     */
    function update() {
        defaultColor();
        model.setData(currentRow);
        model.update();
    };

    /**
     * Elemina un registro.
     * @private
     */
    function destroy() {
        //Las opciones de la ventana.
        var options = {
            title : "ELIMINAR TEMA",
            message : "¿Seguro que quiere eliminar el tema \"" + currentRow.nombre + "\"?",
            icon : Global.Control.Windows.ICON.QUESTION,
            buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
        };
        //La ventana emergente con el mensaje.
        var popup = new Global.Control.Windows.Alert(options);
        //El evento 'accept' que genera al aceptar el mensaje.
        popup.addEventClickButton("accept", function() {
            model.setData(currentRow);
            model.del();
            popup.close();
            currentRow = null;
            mainWin.fireEvent('deleteTheme');
        });

        popup.open();
    };

    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @private
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createMainWin() {
        //La ventana principal
        var win = Ti.UI.createWindow({
            //title : 'Selección de tema',
            backgroundColor : Global.Theme.BACKGROUND,
            url : Global.Path.VIEW + 'Tema/MainWin.js',
            Global : Global,
            themes : model.select(),
            navBarHidden : true,
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        //Añadir un tema.
        win.addEventListener('butAdd', function() {
            _new();
        });

        //Modificar un tema.
        win.addEventListener('butModify', function(e) {
            currentRow = e.theme;
            //Ti.API.info("NOMBRE DEL TEMA A MODIFICAR: " + currentRow.nombre);
            edit();
        });

        //eliminar un tema.
        win.addEventListener('butDelete', function(e) {
            currentRow = e.theme;
            destroy();
        });

        //Duplicar un tema.
        win.addEventListener('butDuplicate', function(e) {
            currentRow = JSON.parse(JSON.stringify(e.theme));
            currentRow.id = null;
            currentRow.nombre = "Copia " + currentRow.nombre;
            create();
            mainWin.fireEvent('appendTheme', {
                theme : currentRow
            });
        });

        //Seleccionar un tema
        win.addEventListener('butSelect', function(e) {
            Global.Parameters.Configuracion.setTema_id(e.theme.id);
        });

        return win;
    };

    /**
     * Crea la ventana de edición de los colores.
     * @param {Object} options Las opciones de la ventana.
     * <ol>
     * <li>options.theme {Object}: El tema a editar o uno vacío para crear uno nuevo.</li>
     * <li>options.action {Function}: La función a realizar si todo es correcto.</li>
     * </ol>
     * @return {Ti.UI.Window} Retorna la ventana de edición de los colores.
     */
    function createEditWin(options) {
        //La ventana de edición
        var winEdit = Ti.UI.createWindow({
            //title : 'Edición del tema',
            backgroundColor : Global.Theme.BACKGROUND,
            url : Global.Path.VIEW + 'Tema/EditTheme.js',
            Global : Global,
            navBarHidden : true,
            theme : options.theme,
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        //Escuchamos el evento "save" para guardar los datos.
        winEdit.addEventListener('save', function(e) {
            currentRow = winEdit.theme;
            //Comprobamos que los datos de las "bases" están introducidos.
            if (baseThemeOk()) {
                options.action();
                winEdit.fireEvent('finish');
            } else {
                var alert = new Global.Control.Windows.Alert({
                    icon : Global.Control.Windows.ICON.EXCLAMATION,
                    title : 'COLORES BASE',
                    message : "Faltan uno o varios colores \"base\", estos son obligatorios."
                });
                alert.open();
            };
        });

        return winEdit;
    };

    /**
     * Comprueba que los datos de las "bases" están introducidos. Son los únicos obligatorios.
     * @return {Boolean} Retorna TRUE si los datos de las "bases" están introducidos.
     */
    function baseThemeOk() {
        //Todas las keys de
        var keys = Object.keys(currentRow).filter(function(element, index, array){
            return /^base_n/.test(element);
        });
        
        var index = 0;
        //Mientras el campo NO SEA NULL seguimos contando
        while (currentRow[keys[index]] != null && index < keys.length) {
            index++;
        };

        return index === keys.length;
    };
    
    /**
     * Hay colores que son obligatorios insertarlos en la base de datos. Si no se han especificado se insertan unos por defecto.
     */
    function defaultColor(){
        //Los valores de los campos
        currentRow.text_disabled = currentRow.text_disabled || "#BCBCBC";
        currentRow.object_disabled = currentRow.object_disabled || "#808080";
        currentRow.row_press = currentRow.row_press || "#FF7F00";
        currentRow.section_background = currentRow.section_background || "#444444";
        currentRow.section_text = currentRow.section_text || "#BCBCBC";
        currentRow.button_press =  currentRow.button_press || "#90BACE";
        currentRow.order_total_text =  currentRow.order_total_text || "#FF0000";
        currentRow.order_total_background = currentRow.order_total_background  || "#FFFFFF";
        currentRow.order_total_border = currentRow.order_total_border || "#808080";
    };

    /**
     * Pone los valores por defecto al tema actual.
     * @return {Object} Retorna un objeto con los datos por defecto del tema.
     */
    function defaultTheme() {
        var theme = model.select("WHERE id = " + Global.Parameters.Configuracion.getTema_id())[0];
        //Todas las bases.
        var bases = {
            base_n1 : ['background', 'lines', 'text_principal', 'row_title', 'button_title', 'popup_text', 'popup_lines'],
            base_n2 : ['text_secondary', 'row_subtitle'],
            base_n3 : ['header', 'button_background'],
            base_n4 : ['row_background', 'popup_background']
        };

        //Por cada base ponemos el valor por defecto.
        var keys = Object.keys(bases);
        for (var i = 0; i < keys.length; i++) {
            for (var x = 0; x < keys[i].length; x++) {
                theme[bases[keys[i]][x]] = theme[keys[i]];
            };

        };

        return theme;
    };

    /**
     * Pasa los datos del tema actual de la base de datos a la clase "Global.Theme" para su uso.
     */
    function fillTheme() {
        //Los valores por defecto.
        var theme = defaultTheme();
        //Los datos actuales del tema.
        var actualTheme = model.select("WHERE id = " + Global.Parameters.Configuracion.getTema_id())[0];
        //Por cada clave le ponemos el valor.
        var keys = Object.keys(Global.Theme);
        //Recorremos todas las claves.
        for (var i = 0; i < keys.length; i++) {
            var name = keys[i].toLowerCase();
            //SI NO ES un "String" es un "object".
            if ( typeof Global.Theme[keys[i]] === "object") {
                var subKeys = Object.keys(Global.Theme[keys[i]]);
                //Recorremos todas las subclaves.
                for (var x = 0; x < subKeys.length; x++) {
                    var param = name + "_" + subKeys[x].toLowerCase();
                    Global.Theme[keys[i]][subKeys[x]] = actualTheme[param] != null ? actualTheme[param] : theme[param];
                };
            } else {
                Global.Theme[keys[i]] = actualTheme[name] != null ? actualTheme[name] : theme[name];
            };
        };
    };

    //Se ejecuta cuando se instancia el objeto.
    (function() {
        switch(action) {
            case "index":
                index();
                break;
            case "init":
                fillTheme();
                break;
        }
    })();

};

module.exports = Tema;
