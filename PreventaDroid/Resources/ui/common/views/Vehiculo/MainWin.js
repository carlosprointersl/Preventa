/**
 * @fileOverview Es la vista MainWin del controlador Vehiculo. Aquí se muestra un listado de los datos de los vehículos actuales.
 * Se incluye la librería underscore.js.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La librearía underscore.
 */
var _ = require('/lib/underscore');

function MainWin() {
    /**
     * La ventana con el listado de valores.
     * @private
     * @type Ti.UI.Window
     */
    var win = Ti.UI.createWindow({
        backgroundColor : Global.Theme.BACKGROUND,
        layout : 'vertical',
        navBarHidden : true,
        orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
    });

    /**
     * La cabecera.
     * @private
     * @type Ti.UI.View
     */
    var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Vehiculos", "Configuración", function() {
        win.close();
    });

    /**
     * La fila para añadir elementos a la lista.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var addRow = require(Global.Path.CONTROL + "AddRow")({
        message : "Añadir nuevo vehículo"
    });

    /**
     * El controlador "Vehiculo".
     * @private
     * @type Object
     */
    var controller = new (require('/controller/Vehiculo'))();

    /**
     * Los valores del listado.
     * @private
     * @type Object[]
     */
    var items;
    // = controller.index();

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
        var requireEditVehicle = require(Global.Path.VIEW + 'Configuracion/Campos/EditVehicle');
        //Si es la primera fila, es para añadir un elemento nuevo.
        if (e.row._data == undefined) {
            var editVehicle = requireEditVehicle({
                maxLength : -1
            });

            //Al guardar añadimos el vehículo.
            editVehicle.addEventListener('save', function(v) {
                controller.add({
                    matricula : v.value
                });

                table.setData(createData());
            });

            editVehicle.open();
            //SI NO, es para editar un elemento existente.
        } else {
            //Comprobamo que la matrícula no está en uso.
            var modelKm = new (require('/model/Kilometraje'))();
            var matricula = modelKm.select("WHERE vehiculo_id = '" + e.row._data.id + "' AND activo = 'true'");

            //Si está en uso no podemo modificarla
            if (matricula.length > 0) {
                var options = {
                    title : "VEHÍCULO EN USO",
                    message : "El vehículo \"" + e.row._data.matricula + "\" está en uso.",
                    icon : Global.Control.Windows.ICON.EXCLAMATION,
                    buttons : Global.Control.Windows.BUTTON.ACCEPT
                };

                var popup = new Global.Control.Windows.Alert(options);
                popup.open();
            } else {

                var editVehicle = requireEditVehicle({
                    maxLength : -1,
                    value : e.row._data.matricula,
                });

                //Al guardar actualizamos el vehículo.
                editVehicle.addEventListener('save', function(v) {
                    e.row._data.matricula = v.value;

                    controller.update(e.row._data);
                    //Pasamos los nuevos valores a la tabla.
                    table.setData(createData());
                });

                //Al eliminar el vehículo
                editVehicle.addEventClickButtonIndex(1, function() {
                    var options = {
                        title : "ELIMINAR VEHÍCULO",
                        message : "¿Desea eliminar el vehículo\"" + e.row._data.matricula + "\"?",
                        icon : Global.Control.Windows.ICON.QUESTION,
                        buttons : Global.Control.Windows.BUTTON.ACCEPT_CANCEL
                    };

                    var popup = new Global.Control.Windows.Alert(options);

                    popup.addEventClickButton("accept", function() {
                        controller.del(e.row._data);
                        //Pasamos los nuevos valores a la tabla.
                        table.setData(createData());
                        popup.close();
                        editVehicle.close();
                    });
                    popup.open();
                });

                editVehicle.open();
            };
        };

    });

    /**
     * Crea las filas para añadirlas en la tabla a partir de los datos recuperados.
     * @return Object[]
     */
    function createData() {
        //Añadimos los vehículos actuales.
        items = controller.index();
        //Los vehículos.
        var vehicles = [addRow];
        //Por cada elemento lo añadimos a la tabla.
        _.each(items, function(element) {
            vehicles.push(Ti.UI.createTableViewRow({
                height : 50,
                className : "vehicleRow",
                backgroundColor : Global.Theme.ROW.BACKGROUND,
                backgroundSelectedColor : Global.Theme.ROW.PRESS,
                title : element.matricula,
                color : Global.Theme.ROW.TITLE,
                font : {
                    fontSize : 16
                },
                _data : element
            }));
        });

        return vehicles;
    };

    //Añadimos la tabla.
    win.add(headerMenu);
    win.add(table);

    return win;
};

module.exports = MainWin();
