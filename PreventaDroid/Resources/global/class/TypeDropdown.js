/**
 * @fileOverview En este archivo se el namesapace TypeDropdown. Dispone de constantes y clases para la edición de los parámetros de algunos desplegables.
 * Guarda la información de forma persistente en la base de datos de parámetros.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Los tipos de desplegables que se pueden editar.
 * @namespace
 */
var Type = {
    /**
     * El tipo "Via"
     * @constant
     * @type Integer
     */
    VIA : 0,
    /**
     * El tipo "Establecimiento"
     * @constant
     * @type Integer
     */
    STORE : 1,
    /**
     * El tipo "Artículo"
     * @constant
     * @type Integer
     */
    ITEM : 2,
    /**
     * El tipo "Forma pago"
     * @constant
     * @type Integer
     */
    PAY : 3,
    /**
     * El tipo "Movimiento"
     * @constant
     * @type Integer
     */
    MOVEMENT : 4,
    /**
     * El tipo "Incidencia"
     * @constant
     * @type Integer
     */
    INCIDENCE : 5,
    /**
     * El tipo "Serie"
     * @constant
     * @type Integer
     */
    INCIDENCE : 6,
};

/**
 * @class Esta clase crea la estructura(vistas, models, etc.) para la edición de los parámetros de algunos desplegables.
 * @param {TypeDropdown.TYPE} type El tipo de desplegable a editar.
 * <ol>
 * <li>options.type {TypeDropdown.TYPE} El tipo de desplegable a editar.</li>
 * <li>options.title {String} El título de la ventana.</li>
 * </ol>
 */
function Dropdown(options) {
    /**
     * La ventana con el listado de valores.
     * @private
     * @type Ti.UI.Window
     */
    var win = Ti.UI.createWindow({
        backgroundColor : Global.Theme.BACKGROUND,
        layout : 'vertical',
        navBarHidden : true,
        // title : options.title
        orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
    });
    
    /**
     * La cabecera.
     * @private
     * @type Ti.UI.View 
     */
    var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')(options.title, "Desplegables", function(){win.close();});

    /**
     * La fila para añadir elementos a la lista.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var addRow = require(Global.Path.CONTROL + "AddRow")({
        message : "Añadir nuevo valor"
    });

    /**
     * La fila para la tabla.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var row = require(Global.Path.CONTROL + "DeleteRow");

    /**
     * Los valores del listado.
     * @private
     * @type Object[]
     */
    var items = getItems();

    /**
     * El controlador de tipo actual.
     * @private
     * @type Global.Controller
     */
    var controller;

    /**
     * La tabla que contiene el listado de valores.
     * @private
     * @type Ti.UI.TableView
     */
    var table = Ti.UI.createTableView({
        data : createData()
    });

    /**
     * El evento 'click' de la tabla.
     * @event 'click'
     */
    table.addEventListener('click', function(e) {
        //Si es el botón eliminar
        if (e.source instanceof Ti.UI.Button) {
            e.row.addEventListener('row:delete', function() {
                controller.del(e.row.data);
                //Pasamos los nuevos valores a la tabla.
                items = getItems();
                table.setData(createData());
            });
        } else {
            var requireDown = require(Global.Path.VIEW + 'Configuracion/Campos/EditDropDown');
            //Si es la primera fila, es para añadir un elemento nuevo.
            if (e.row.data == undefined) {
                var editDropDown = requireDown({
                    maxLength : -1
                });

                editDropDown.addEventListener('save', function(v) {
                    controller.add(v);
                    //Pasamos los nuevos valores a la tabla.
                    items = getItems();
                    table.setData(createData());
                });

                editDropDown.open();
                //SI NO, es para editar un elemento existente.
            } else {
                var editDropDown = requireDown({
                    maxLength : -1,
                    value : e.row.data.descripcion,
                    id : e.row.data.id
                });

                editDropDown.addEventListener('save', function(v) {
                    e.row.data.descripcion = v.value;
                    e.row.data.id = v.id;

                    controller.update(e.row.data);
                    //Pasamos los nuevos valores a la tabla.
                    items = getItems();
                    table.setData(createData());
                });
                
                editDropDown.addEventClickButtonIndex(1, function(){
                    var options = {
                        title : "ELIMINAR FILA",
                        message : "¿Desea eliminar \"" + e.row.data.descripcion + "\"?",
                        icon : Global.Control.Windows.ICON.QUESTION,
                        buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
                    };

                    var popup = new Global.Control.Windows.Alert(options);

                    popup.addEventClickButton("accept", function() {
                        controller.del(e.row.data);
                        //Pasamos los nuevos valores a la tabla.
                        items = getItems();
                        table.setData(createData());
                        popup.close();
                        editDropDown.close();
                    });
                    popup.open();
                    

                });

                editDropDown.open();
            };

        };
    });

    /**
     * Retorna los valores del parámetro según el tipo.
     * @private
     * @return {Object[]} Los valores.
     */
    function getItems() {
        switch(options.type) {
            case Type.VIA:
                controller = new Global.Controller.TipoVia();
                break;
            case Type.STORE:
                controller = new Global.Controller.TipoEstablecimiento();
                break;
            case Type.ITEM:
                controller = new Global.Controller.TipoArticulo();
                break;
            case Type.PAY:
                controller = new Global.Controller.FormaPago();
                break;
            case Type.MOVEMENT:
                controller = new Global.Controller.TipoMovimiento();
                break;
            case Type.INCIDENCE:
                controller = new Global.Controller.TipoIncidencia();
                break;
            case Type.SERIE:
                controller = new Global.Controller.Serie();
                break;
        };

        return controller.getItems();
    };

    /**
     * Crea los datos de la tabla. Las filas a través de los "items".
     * @private
     * @return {Ti.UI.TableViewRow[]} Un array con las filas para la tabla.
     */
    function createData() {
        /**
         * Los datos de la tabla.
         * @private
         * @type Ti.UI.TableViewRow[]
         */
        var data = [addRow];
        //Recorremos todos los "items" y los añadimos.
        for (var i = 0; i < items.length; i++) {
            var newRow = row({
                title : items[i].descripcion,
                id : items[i].id
            });
            //Guardamos el objeto dentro de la fila
            newRow.data = items[i];

            data.push(newRow);
        };

        return data;
    };

    //Añadimos la tabla.
    win.add(headerMenu);
    win.add(table);

    win.open();
};

/**
 * El namespace TypeDropdown donde guardamos constantes y objetos.
 * @memberof Global.Class
 */
var TypeDropdown = {
    TYPE : Type,
    Dropdown : Dropdown
};

module.exports = TypeDropdown;
