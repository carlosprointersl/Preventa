/**
 * @fileOverview En este archivo se declara las clase "GeoPosicionamiento".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * @class Se encarga de guardar las posiciones "GPS".
 */
function GeoPosicionamiento() {
    /**
     * Indica las veces que ha de capturar el evento "location" antes de pararlo.
     * @private
     * @type Integer
     */
    var countLocation = 0;

    /**
     * El objeto actual (this)
     * @private
     * @type Object
     */
    var self = this;

    /**
     * Indica si el Geoposicionamineto está activado.
     * @private
     * @type Boolean
     */
    var enabled = false;

    /**
     * La clase "Persistence" para mantener la persistencia de los datos.
     * @private
     * @type Class
     */
    var Persistence = require(Global.Path.DB + 'Persistence');

    /**
     * El modelo para la tabla "GeoPosicionamiento".
     * @private
     * @type Model
     */
    var model;

    /**
     * Datos del registro con el que se esta trabajando. Simula un Array asociativo.
     * @private
     * @type Object
     */
    var currentRow;

    /**
     * El último ID de la posición GPS insertada en la tabla.
     * @private
     * @type {Integer}
     */
    var lastIdGps = -1;

    /**
     * Indica si la función locationCallback está añadida al evento "location".
     * @private
     * @type Boolean
     */
    var locationAdded = false;

    /**
     * El nombre del evento para recuperar el ID de la posición GPS guardada en la base de datos.
     * @private
     * @type String
     */
    var eventName;

    /**
     * Es la configuración de la geolocalización con los parámetros para utilizar un proveedor de red.
     * @private
     * @type Ti.Geolocation.Android.LocationProvider
     */
    var providerNetwork;

    /**
     * Es la configuración de la geolocalización con los parámetros para utilizar un proveedor de GPS.
     * @private
     * @type Ti.Geolocation.Android.LocationProvider
     */
    var providerGps;

    /**
     * Los parámetros propios del GPS. Tiene los "getters" y "setters".
     * @private
     * @type Function
     */
    var param = Global.Parameters.Gps;

    /**
     * Función para pasar "Y"-"N" -> Boolean
     * @private
     * @type Function
     */
    var strToBool = Global.Functions.strToBoolSqlite;

    //Inicializamos el modelo
    initialize();

    /**
     * pendiente ....
     */
    var gpsRule = Ti.Geolocation.Android.createLocationRule({
        minAge : param.getTime()
    });

    /**
     * Crea un nuevo registro.
     * @private
     */
    function create() {
        model.setData(currentRow);
        return model.insert();
    };

    /**
     * La función que se realiza al capturar el evento "location" de Ti.Geolocation. Depúes de unos intentos
     * se quitará dicha función del evento.
     * @private
     * @param {Object} e El objeto que retorna el evento "location".
     * @type Function
     */
    var locationCallback = function(e) {
        countLocation += 1;
        Log.warn('locationCallback: ' + countLocation);
        if (!e.success || e.error) {
            Log.error("GPS code translation: " + e.error + "(" + e.code + ")");
            lastIdGps = -1;
            if (countLocation >= 2 && !strToBool(param.getFixed())) {
                //Paramos el evento "location"
                self.stop();
                Ti.App.fireEvent(eventName, {
                    id : lastIdGps
                });
            };
        } else {
            currentRow = model.getData();

            currentRow.GPSLongitud = e.coords.longitude;
            currentRow.GPSLatitud = e.coords.latitude;
            currentRow.GPSPrecision = e.coords.accuracy;
            currentRow.Fecha = Global.Functions.dateTimeSQliteFormat(new Date(e.coords.timestamp));
            currentRow.Tipo = param.getType();

            if (strToBool(param.getFixed())) {
                //Insertamos el registro en la BBDD
                lastIdGps = create();
                Log.info(lastIdGps + ': FIXED Geo(' + countLocation + '): long(' + currentRow.GPSLongitud + ') lat(' + currentRow.GPSLatitud + ') time(' + currentRow.Fecha + ')');
            } else {
                //Si ha contado "n" veces
                if (countLocation >= 2) {
                    //Insertamos el registro en la BBDD
                    lastIdGps = create();
                    //Llamamos al evento que recoge el valor;
                    Log.warn('Event Name: ' + eventName);
                    Ti.App.fireEvent(eventName, {
                        id : lastIdGps
                    });
                    //Inicializamos eventName para los próximos eventos.
                    eventName = undefined;
                    Log.info(lastIdGps + ': Geo(' + countLocation + '): long(' + currentRow.GPSLongitud + ') lat(' + currentRow.GPSLatitud + ') time(' + currentRow.Fecha + ')');

                    //Paramos el evento "location"
                    self.stop();
                    Log.info('Cancel location - countLocation(' + countLocation + ') = 0');
                    countLocation = 0;
                };
            };

        };

    };

    /**
     * Crea un LocationProvider según la configuración.
     * @private
     * @param {Integer} type Indica si será para "GPS = 0" o para "NETWORK = 1"
     * @return {Ti.Geolocation.Android.LocationProvider}
     */
    function createLocationProvider(type) {
        return Ti.Geolocation.Android.createLocationProvider({
            name : type === 0 ? Ti.Geolocation.PROVIDER_GPS : Ti.Geolocation.PROVIDER_NETWORK,
            minUpdateTime : param.getTime(),
            minUpdateDistance : param.getDistance()
        });
    };

    /**
     * Crea la configuración de la geolocalización con los parámetros para utilizar un proveedor de GPS y se la asigna
     * a la variable providerGps
     * @private
     */
    function createProviderGps() {
        providerGps = createLocationProvider(0);
    };

    /**
     * Crea la configuración de la geolocalización con los parámetros para utilizar un proveedor de GPS y se la asigna
     * a la variable providerGps
     * @private
     */
    function createProviderNetwork() {
        providerNetwork = createLocationProvider(1);
    };

    /**
     * Inicializa el/los "LocationProvider" para el GPS y los añade.
     * @private
     */
    function addProvider() {
        //Creamos los "LocationProvider"
        createProviderGps();
        createProviderNetwork();
        //Si está activo ...
        if (param.getActive()) {
            //Añadimos el PROVIDER que corresponda
            if (param.getType() === 0) {
                Ti.Geolocation.Android.addLocationProvider(providerGps);
            } else {
                if (param.getType() === 1) {
                    Ti.Geolocation.Android.addLocationProvider(providerNetwork);
                    Ti.Geolocation.Android.addLocationProvider(providerGps);
                } else {
                    Ti.Geolocation.Android.addLocationProvider(providerNetwork);
                };
            };
        };
    };

    /**
     * Quita los "locationProvider" del GPS.
     * @private
     */
    function removeProvider() {
        if ( typeof (providerGps) === 'object') {
            Ti.Geolocation.Android.removeLocationProvider(providerGps);
        };
        if ( typeof (providerNetwork) === 'object') {
            Ti.Geolocation.Android.removeLocationProvider(providerNetwork);
        };
    };

    /**
     * Añadimos la escucha al evento "location".
     * @param {Function} callback La función "callback" para el evento "location".
     * @private
     */
    function addEventLocation() {
        locationAdded = true;
        Ti.Geolocation.addEventListener('location', locationCallback);
        Log.info('Se está escuchando al evento \'location\'.');
    };

    /**
     * Quitamos la escucha al evento "location".
     * @param {Function} callback La función "callback" para el evento "location".
     * @private
     */
    function removeEventLocation() {
        locationAdded = false;
        Ti.Geolocation.removeEventListener('location', locationCallback);
        Log.info('Se deja de escuchar al evento \'location\'.');
    };

    /**
     * Inicializa los parámetros necesarios para que funcione correctamente
     */
    function initialize() {
        //Si existe el archivo para guardar los datos ...
        if (Global.App.DB_PIT_EXISTS) {
            //Si están disponibles los servicios de localización ...
            if (Ti.Geolocation.getLocationServicesEnabled()) {
                Ti.API.info("LocationSevicesEnabled: TRUE");
                //Si el parámetro de Geoposicionamiento está activo y NO está HABILITADO ...
                if (strToBool(param.getActive()) && !enabled) {
                    //model = new Persistence("GeoPosicionamiento", Global.ConfigDB.SEND_NAME);
                    Ti.Geolocation.Android.manualMode = true;
                    enabled = true;
                    Log.info('Geolocalización iniciada.');
                };
            } else {
                enabled = false;
                Ti.API.warn("LocationSevicesEnabled: FALSE");
            };
        } else {
            enabled = false;
            Log.info('No se puede inicializar la Geolocalización. El archivo \"pitxxx\" no existe.');
        };
    };

    /**
     * Inicia la escucha del evento "location" para recuperar una posición. Dicho resultado lo devuelve al evento que le
     * pasamos por parámetro. La devolución siempre será un objeto con la propiedad "id".
     * @param {String} name El nombre del evento que recuperará los datos.
     * @example
     * alert(e.id); //Mostrará el valor de "id".
     */
    this.getPosition = function(name) {

        Log.info('Function GetPosition.');
        eventName = name;
        //Si está fijo retorna la última id guardada.
        if (strToBool(param.getFixed())) {
            Ti.App.fireEvent(eventName, {
                id : lastIdGps
            });
        } else {
            addEventLocation();
            removeProvider();
            addProvider();
        };
    };

    /**
     * Inicializa los parámetros para empezar a escuchar el evento "location". Lo activa si está en modo "FIJO".
     */
    this.start = function() {
        Log.info('Start \'location\'.');
        //Si NO ESTÁ iniciado ...
        if (!enabled) {
            initialize();
        };
        //SI ESTÁ fijo iniciamos la escucha.
        if (!locationAdded && strToBool(param.getFixed())) {
            addEventLocation();
            removeProvider();
            addProvider();
        };
    };

    /**
     * Detiene el evento "location".
     */
    this.stop = function() {
        //Si está iniciado...
        if (locationAdded) {
            removeEventLocation();
            //Quitamos los "provider" que tenga.
            removeProvider();
            //Inicializamos el ID del GPS
            lastIdGps = -1;
            Log.info('Stop \'location\'.');
        };
    };
    
    /**
     * 
     */

    /**
     * Reinicia el evento "location" con los nuevos parámetros.
     */
    this.restart = function() {
        Log.info('Restart \'location\'.');
        model = undefined;
        initialize();
        this.stop();
        this.start();
    };

    // Ti.Android.currentActivity.addEventListener('destroy', function(e) {
    // Ti.API.info("destroy event received");
    // if (locationAdded) {
    // Ti.API.info("removing location callback on destroy");
    // Titanium.Geolocation.removeEventListener('location', locationCallback);
    // locationAdded = false;
    // }
    // });
};

module.exports = GeoPosicionamiento;
