/**
 * @fileOverview En este archivo se crea el controlador "Kilometraje".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * La librearía underscore.
 */
var _ = require('/lib/underscore');

/**
 * Crea un controlador de nombre "Kilometraje".
 * @class Es la clase que define al controlador "Kilometraje". Interactua con el modelo "Kilometraje".</br>
 * Se encarga de introducir los kilómetros al inicio y al final del día. También tiene la posibilidad de crear nuevas matrículas.
 * @memberOf Global.Controller
 * @param {Number} time Indica si es inicio de día o final.
 * @param {Function} callback La función a realizar cuando finalice el Kilometraje.
 * @example
 * time = 0 -> Inicio de día.
 * time = 1 -> Fin de día.
 */
var Kilometraje = function(time, callback) {
    /**
     * El modelo que se aplica a este controlador.
     * @private
     * @type Global.Model
     */
    var model = new Global.Model.Kilometraje();

    /**
     * El modelo de la tabla "vehiculo". Es donde se guardan los datos del vehículo (matrícula).
     * @private
     * @type Global.Model
     */
    // var modelVehicle = new Global.Model.Vehiculo();

    /**
     * El controlador de la tabla "vehiculo". Es donde se guardan los datos del vehículo (matrícula).
     * @private
     * @type Global.Controller
     */
    var vehicle = new Global.Controller.Vehiculo();

    /**
     * Datos del registro con el que se esta trabajando. Simula un Array asociativo.
     * @private
     * @type Object
     */
    var currentRow = model.select("WHERE activo = 'true'");

    /**
     * Es la ventana principal, la vista "index".
     * @private
     * @type Ti.UI.Window
     */
    // var mainWin = createMainWin();

    /**
     * Muestra una tabla/listado de registros.
     * @private
     */
    function index() {
        createMainWin().open();
    };

    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createMainWin() {
        if (time === 0) {
            if (currentRow.length > 0) {
                //Si hay alguna matrícula primero hemos de finalizarla.
                var endWin = createEnd();

                endWin.addEventListener('before_close', function() {
                    createStart().open();
                });

                return endWin;
            };
            return createStart();
        } else if (currentRow.length > 0) {
            var endWin = createEnd();
            endWin.addEventListener('before_close', function() {
                callback("exit");
            });

            return endWin;
        } else {
            return {
                open : function() {
                    callback("exit");
                }
            };
        }
        ;
    };

    /**
     * Añade los Km finales a los vehículos para mostrarlos en el formulario y retorna estos.
     * @return {Object[]} Los vehículos con los Km finales de estos, si los tienen.
     */
    function createVehicles() {
        var vehicles = vehicle.getVehicles();
        var km = model.select();

        //Por cada vehículo le añadimo los Km finales, si los tuviera.
        _.each(vehicles, function(element) {
            _km = _.findWhere(km, {
                vehiculo_id : element.id
            });
            element.kmFin = _km != undefined ? _km.kmFin : "0";
        });
        
        return vehicles;

    };

    /**
     * Crea la ventana de INICIO de día.
     * @return {Ti.UI.Window} La ventana con el formulario de INICIO de día.
     */
    function createStart() {
        //El cuerpo de la ventana
        var body = new (require(Global.Path.VIEW  + 'Kilometraje/KmMain'))(createVehicles());
        //La ventana emergente
        var km = new Global.Control.Windows.Popup({
            title : 'KILOMETRAJE INICIO DE DÍA',
            body : body.getBody(),
            buttons : Global.Control.Windows.BUTTON.ACCEPT
        });

        //Acción al aceptar.
        km.addEventClickButton('accept', function() {
            if (body.isOk()) {
                //Recuperamos los datos del formulario.
                var values = body.getValues();
                //Si hay nueva matrícula la guardamos.
                if (values.newRegistration) {
                    //Insertamos la matrícula
                    var idVehicle = vehicle.add({
                        matricula : values.registration
                    });

                    //Insertamos el kilometraje
                    model.setData({
                        vehiculo_id : idVehicle,
                        repostaje : values.refuel,
                        kmInicio : values.km,
                        kmFin : "",
                        fecha : Global.Functions.dateTimeSQliteFormat(new Date()),
                        activo : 'true'
                    });

                    model.insert();

                } else {
                    var registration = {
                        vehiculo_id : values.registration
                    };
                    //Actualizamos el kilometraje
                    registration.repostaje = values.refuel;
                    registration.kmInicio = values.km;
                    registration.kmFin = "";
                    registration.fecha = Global.Functions.dateTimeSQliteFormat(new Date());
                    registration.activo = "true";

                    
                    //Si ya tenemos la matrícula actualizamos los datos. En caso contrario introducimos el nuevo registro.
                    var oldRegis = model.select("WHERE vehiculo_id = '" + registration.vehiculo_id + "'");
                    if(oldRegis.length > 0){
                        registration.id = oldRegis[0].id;
                        model.setData(registration);
                        model.update();
                    } else {
                        model.setData(registration);
                        model.insert();
                    };
                };

                km.close();
                //Al finalizar realizamos la acción "callback"
                callback();
            };

        });

        //Evitamos el funcionamiento del botón "back"
        km.addEventListener('android:back', function() {
            //No realizamos ninguna acción. Es la forma de anular el evento "back" en Android.
        });

        return km;
    };

    /**
     * Crea la ventana de FIN de día.
     */
    function createEnd() {
        //El Kilometraje actual
        var km = currentRow[0];
        km.matricula = (_.findWhere(vehicle.getVehicles(), { id : km.vehiculo_id})).matricula;
        //El cuerpo de la ventana
        var body = new (require(Global.Path.VIEW  + 'Kilometraje/KmMain'))(km);
        //La ventana emergente
        var km = new Global.Control.Windows.Popup({
            title : 'KILOMETRAJE FIN DE DÍA',
            body : body.getBody(),
            buttons : Global.Control.Windows.BUTTON.ACCEPT
        });

        //Acción al aceptar.
        km.addEventClickButton('accept', function() {
            if (body.isOk()) {
                //Recuperamos los datos del formulario.
                var values = body.getValues();

                var registration = values.registration;
                //Actualizamos el kilometraje
                registration.repostaje += parseFloat(values.refuel);
                registration.kmFin = values.km;
                registration.activo = "false";

                model.setData(registration);
                model.update();

                km.fireEvent('before_close');
                km.close();
            };

        });

        //Evitamos el funcionamiento del botón "back"
        km.addEventListener('android:back', function() {
            //No realizamos ninguna acción. Es la forma de anular el evento "back" en Android.
        });

        return km;
    };

    index();
};

module.exports = Kilometraje;
