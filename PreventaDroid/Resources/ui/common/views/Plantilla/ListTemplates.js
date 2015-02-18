/**
 * @fileOverview En este archivo se crea la ventana para editar las plantillas.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Esta clase crea una ventana para la edición de las plantillas de clientes.
 * @class
 * @param {Object/Object[]} template Cuando es un array contiene los datos de las plantillas actuales. Y cuando es un objeto contiene la estructura de los datos de una plantilla.
 */
function ListTemplates(template) {
    /**
     * La variable Global.
     * @private
     * @type Object
     */
    var Global = require('/global/class/ReturnGlobal')();

    /**
     * La fila seleccionada.
     * @private
     * @type Object
     */
    var selectedRow;

    /**
     * La vista contenedor.
     * @private
     * @type Ti.UI.Window
     */
    var viewContent = Ti.UI.createView({
        layout : 'vertical',
        height : 0,
        width : Ti.UI.FILL,
        top : 0.5
    });

    /**
     * La cabecera.
     * @private
     * @type Ti.UI.View
     */
    var viewHeader = Ti.UI.createView({
        backgroundColor : Global.Theme.HEADER,
        height : 40,
        width : Ti.UI.FILL
    });

    /**
     * El pie.
     * @private
     * @type Ti.UI.View
     */
    var viewFoot = Ti.UI.createView({
        height : 70,
        width : Ti.UI.FILL,
        //layout : 'horizontal'
    });

    /**
     * El contenedor para los botones.
     * @private
     * @type Ti.UI.View
     */
    var viewButtons = Ti.UI.createView({
        layout : 'horizontal',
        backgroundColor : Global.Theme.BUTTON.BACKGROUND,
        height : viewFoot.getHeight()//Ti.UI.FILL
    });

    /**
     * El listado de las plantillas.
     * @private
     * @type Ti.UI.TableView
     */
    var tableTemplates = Ti.UI.createTableView({
        data : createData()
    });

    /**
     * La etiqueta del título.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitle = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 17
        },
        text : 'Seleccionar plantilla',
        width : Ti.UI.SIZE
    });

    /**
     * La ventana de edición.
     * @private
     * @type Object
     */
    var editWin;

    /**
     * Función para crear los botones que van en el pie de la pantalla.
     * @private
     * @function
     */
    var menuButton = require(Global.Path.CONTROL + 'Button/MenuButton');

    /**
     * Muestra un mensaje emergente.
     * @param {String} action La acción por la que se ha disparado el mensaje.
     */
    function openAlert(action) {
        //Las opciones de la ventana.
        var options = {
            title : action + " PLANTILLA",
            message : "No hay ninguna plantilla seleccionada.",
            icon : Global.Control.Windows.ICON.EXCLAMATION,
            buttons : Global.Control.Windows.BUTTON.ACCEPT
        };
        //La ventana emergente con el mensaje.
        var popup = new Global.Control.Windows.Alert(options);

        popup.open();
    };

    /**
     * Crea el array "data" con las filas de las plantillas creadas.
     * @return {TableViewRow[]}
     */
    function createData() {
        //Las filas de la tabla.
        var data = new Array();
        //El estilo de las filas
        var row = require(Global.Path.VIEW + 'Plantilla/TemplateRow');
        //Recorremos las filas que hay actualmente.
        for (var i = 0, j = template.length; i < j; i++) {
            data.push(row(template[i]));
        };

        return data;
    };

    /**
     * El botón "alta".
     * @private
     * @type Ti.UI.Button
     */
    var butNew = menuButton("Alta", "edit_add_48.png", "33.333%");
    butNew.setHeight(viewButtons.getHeight());

    /**
     * Acción que se realiza al disparar el evento 'click' del botón "Alta".
     * @event 'click'
     */
    butNew.addEventListener('click', function() {
        var editWin = new (require(Global.Path.VIEW + 'Plantilla/EditWin'))();
        var win = editWin.getWin();

        //Evento que se dispara al guardar los datos
        win.addEventListener('win:save', function(e) {
            //El estilo de las filas
            var row = require(Global.Path.VIEW + 'Plantilla/TemplateRow');
            tableTemplates.appendRow(row(e.template));
        });

        win.open();
    });

    /**
     * El botón "baja".
     * @private
     * @type Ti.UI.Button
     */
    var butDelete = menuButton("Baja", "edit_remove_48.png", "33.333%");
    butDelete.setHeight(viewButtons.getHeight());

    /**
     * Acción que se realiza al disparar el evento 'click' del botón "Baja".
     * @event 'click'
     */
    butDelete.addEventListener('click', function() {
        if (selectedRow != undefined) {
            var options = {
                title : "ELIMINAR PLANTILLA",
                message : "¿Desea eliminar la plantilla \"" + selectedRow.row.children[0].text + "\"?",
                icon : Global.Control.Windows.ICON.QUESTION,
                buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
            };
            //La ventana emergente con el mensaje.
            var popup = new Global.Control.Windows.Alert(options);
            //El evento 'accept' que genera al aceptar el mensaje.
            popup.addEventClickButton("accept", function() {
                // Acciones a realizar
                tableTemplates.deleteRow(selectedRow.row);
                selectedRow = undefined;
                popup.close();
            });

            popup.open();
        } else {
            openAlert("ELIMINAR");
        };
    });

    /**
     * El botón "modificar".
     * @private
     * @type Ti.UI.Button
     */
    var butModify = menuButton("Modificar", "document-edit_48.png", "33.1%");
    butModify.setHeight(viewButtons.getHeight());

    /**
     * Acción que se realiza al disparar el evento 'click' del botón "Modificar".
     * @event 'click'
     */
    butModify.addEventListener('click', function() {
        if (selectedRow) {
            var editWin = new (require(Global.Path.VIEW + 'Plantilla/EditWin'))(selectedRow.row.data);
            var win = editWin.getWin();

            //Evento que se dispara al guardar los datos
            win.addEventListener('win:save', function(e) {
                //El estilo de las filas
                var row = require(Global.Path.VIEW + 'Plantilla/TemplateRow');
                //Actualizamos la fila con el nuevo valor.
                tableTemplates.updateRow(selectedRow.index, row(e.template));
                selectedRow = undefined;
            });

            win.open();
        } else {
            openAlert("MODIFICAR");
        };
    });

    /**
     * Capturamos el evento 'click' de la tabla para marcar o desmarcar la fila seleccionada.
     * @event 'click'
     */
    tableTemplates.addEventListener('click', function(e) {
        // Si no hay ninguna seleccionada.
        if (selectedRow == undefined) {
            selectedRow = {
                row : e.row,
                index : e.index
            };
            //selectedRow.fireEvent('click');
        } else {
            //Desmarcamos la fila anterior si no es la misma.
            if (selectedRow.row != e.row) {
                selectedRow.fireEvent('click', {
                    row : selectedRow.row
                });
                selectedRow = {
                    row : e.row,
                    index : e.index
                };
            } else {
                selectedRow = undefined;
            };
        };
    });

    //Las líneas divisorias de los botones
    for (var i = 0; i < 3; i++) {
        viewFoot.add(Ti.UI.createView({
            backgroundColor : Global.Theme.BACKGROUND,
            bottom : 0,
            height : viewFoot.getHeight(),
            width : 0.5,
            center : {
                x : (33.333 + (33.333 * i)) + '%'
            },
            zIndex : 1
        }));
    };
    //La línea horizontal encima de los botones
    viewFoot.add(Ti.UI.createView({
        backgroundColor : Global.Theme.BACKGROUND,
        height : 0.5,
        width : Ti.UI.FILL,
        top : 0,
        //bottom : viewFoot.getHeight() - 5,
        zIndex : 1
    }));
    
    //Si la edición de plantillas está desactivada bloqueamos los botones.
    (function(state){
        if(!state){
            var buttons = [butNew, butModify, butDelete];
            for(var i=0,j=buttons.length; i<j; i++){
                buttons[i].setEnabled(false);
                buttons[i].setBackgroundColor(Global.Theme.OBJECT_DISABLED);
                buttons[i].setColor(Global.Theme.TEXT_DISABLED);
            };            
        };
    })(Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getControlPlantillas()));

    /**
     * Retorna las plantillas actulaes dentro de un array. El array puede estar vacio si no hay ninguna plantilla.
     * @return {Array} Las plantillas.
     */
    this.getTemplates = function() {
        //El array con las plantillas.
        var data = new Array();
        //Por cada fila.
        if (tableTemplates.sections.length > 0)
            tableTemplates.sections[0].getRows().forEach(function(element, index) {
                data.push(element.data);
            });

        return data;
    };

    /**
     * Monta y retorna la vista contenedor.
     * @return {Ti.UI.View} La vista contenedor.
     */
    this.getView = function() {
        //Añadimos los controles a las vistas y estas a la ventana.
        viewHeader.add(labelTitle);

        viewButtons.add(butNew);
        viewButtons.add(butDelete);
        viewButtons.add(butModify);

        viewFoot.add(viewButtons);

        viewContent.add(viewHeader);
        viewContent.add(tableTemplates);
        viewContent.add(viewFoot);

        return viewContent;
    };

    /**
     * Añade eventos a la vista contenedor (viewContent).
     * @param {String} name Nombre del evento.
     * @param {Function} [callback] Función que dispara el evento.
     */
    this.addEventListener = function(name, callback) {
        viewContent.addEventListener(name, callback);
    };
};

module.exports = ListTemplates;
