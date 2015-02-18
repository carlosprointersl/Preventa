/**
 * @fileOverview En este archivo se declara las clase "GeoPosicionamiento".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

var _ = require('lib/underscore');
var log = new (require('global/class/Log'))();

/**
 * @class Se encarga de guardar de recuperar las posiciones de localización según los parámetros configurados.
 * Cuando está en modo fijo debe guardar las posiciones en la tabla "log".
 */
function GeoPosicionamiento() {
    /**
     * Es el proveedor de localizaciones del GPS.
     * @private
     * @type Ti.Geolocation.Android.LocationProvider
     */
    var providerGps;

    /**
     * Es el proveedor de localizaciones de la RED.
     * @private
     * @type Ti.Geolocation.Android.LocationProvider
     */
    var providerNet;

    /**
     * Los filtros que se le aplican al proveedor GPS.
     * @private
     * @type Ti.Geolocation.Android.LocationRule
     */
    var rulesGps;

    /**
     * Los filtros que se le aplican al proveedor de RED.
     * @private
     * @type Ti.Geolocation.Android.LocationRule
     */
    var rulesNet;

    /**
     * Indica si la recuperación de localizaciones a través del evento 'location' está parada.
     * @private
     * @type Boolean
     * @default TRUE
     */
    var isStop = true;

    /**
     * Los parámetros propios del GPS. Tiene los "getters" y "setters".
     * @private
     * @type Object
     */
    var param = Global.Parameters.Gps;

    /**
     * El controlador de los datos de localización.
     * @private
     * @type Controller
     */
    var controller = new (require('controller/Geoposicionamiento'))();

    /**
     * Crea un filtro para el proveedor que le indiquemos por parámetro.
     * @param {String} name El nombre del proveedor.
     * @return {Ti.Geolocation.Android.LocationRule}
     */
    function createLocationRule(name) {
        var tmpRule = Ti.Geolocation.Android.createLocationRule();
        tmpRule.provider = name;
        tmpRule.accuracy = param.getAccuracy();
        tmpRule.maxAge = param.getMaxAge();
        tmpRule.minAge = param.getMinAge();

        return tmpRule;
    };

    /**
     * Crea un proveedor de localización del tipo que le indiquemos por parámetro.
     * @param {String} name El nombre del proveedor.
     * @return {Ti.Geolocation.Android.LocationProvider}
     */
    function createLocationProvider(name) {
        return Ti.Geolocation.Android.createLocationProvider({
            name : name,
            minUpdateTime : param.getMinTime(),
            minUpdateDistance : param.getMinDistance()
        });
    };

    /**
     * Añade los filtros de los proveedores activos.
     */
    function addRules() {
        var _type = param.getType();
        if (_type == 2 || _type == 0) {
            rulesGps = createLocationRule(Ti.Geolocation.PROVIDER_GPS);
            Ti.Geolocation.Android.addLocationRule(rulesGps);
        };
        if (_type == 2 || _type == 1) {
            rulesNet = createLocationRule(Ti.Geolocation.PROVIDER_NETWORK);
            Ti.Geolocation.Android.addLocationRule(rulesNet);
        };

    };

    /**
     * Añade los proveedores para la localización.
     */
    function addProviders() {
        var _type = param.getType();
        if (_type == 2 || _type == 0) {
            providerGps = createLocationProvider(Ti.Geolocation.PROVIDER_GPS);
            Ti.Geolocation.Android.addLocationProvider(providerGps);
        };

        if (_type == 2 || _type == 1) {
            providerNet = createLocationProvider(Ti.Geolocation.PROVIDER_NETWORK);
            Ti.Geolocation.Android.addLocationProvider(providerNet);
        };

    };

    /**
     * Quita los proveedores.
     */
    function removeProviders() {
        var _type = param.getType();
        if (_type == 2 || _type == 0) {
            Ti.Geolocation.Android.removeLocationProvider(providerGps);
        };
        var _type = param.getType();
        if (_type == 2 || _type == 1) {
            Ti.Geolocation.Android.removeLocationProvider(providerNet);
        };
    };

    /**
     * Quita los filtros para los proveedores.
     */
    function removeRules() {
        var _type = param.getType();
        if (_type == 2 || _type == 0) {
            Ti.Geolocation.Android.removeLocationRule(rulesGps);
        };
        var _type = param.getType();
        if (_type == 2 || _type == 1) {
            Ti.Geolocation.Android.removeLocationRule(rulesNet);
        };
    };

    /**
     * Compara las coordenadas que se le pasan con las de la caché para saber si son iguales.
     * @param {LocationCoordinates} coords Las coordenadas para comparar.
     * @param {String} provider El nombre del proveedor.
     * @return {Boolean}
     */
    function isCache(coords) {
        var coordsCurrent;

        Ti.Geolocation.getCurrentPosition(function(e) {
            coordsCurrent = e.coords;
        });

        return _.isEqual(coords, coordsCurrent);
    };

    /**
     * La función callback para el evento 'location' de Geolocation. Esta función se encarga de guardar las posiciones GPS en la tabla correspondiente.
     * @param {Object} e Las propiedades que retorna el evento.
     */
    function location(e) {
        if (!e.success || e.error) {
            log.error("Error en la localización: " + e.error + "(" + e.code + ")");
        } else {
            if (!isCache(e.coords)) {
                log.info("Nueva actualización de la localización.");
                var _location = {
                    Fecha : Global.Functions.dateTimeSQliteFormat(new Date(e.coords.timestamp)),
                    GPSLongitud : e.coords.longitude,
                    GPSLatitud : e.coords.latitude,
                    GPSPrecision : e.coords.accuracy,
                    Tipo : e.provider.name,
                };
                controller.insert(_location);
            } // else {
                // log.warn("CACHE LOCATION");
            // };
            // var message = "Coords: altitude: " + e.coords.altitude + " - Latitud: " + e.coords.latitude + " - Longitude: " + e.coords.longitude + "\nAccuracy: " + e.coords.accuracy + "\nProvider: " + e.provider.name + "\nTime: " + new Date(e.coords.timestamp);
            // message += "\nAccuracy: " + e.provider.accuracy + " - Power: " + e.provider.power;
            // log.info(message);
        };
    };

    /**
     * Inicia la Geolocalización si la configuración lo permite.
     */
    this.start = function() {
        if (param.getActive() == 1 && param.getFixed() && isStop) {
            log.info("Puesta en marcha de la localización.");
            isStop = false;
            Ti.Geolocation.Android.manualMode = true;
            addProviders();
            addRules();
            Ti.Geolocation.addEventListener('location', location);
        };
    };

    /**
     * Detiene la Geolocalización si está activa.
     */
    this.stop = function() {
        if (!isStop) {
            log.info("Parar la localización.");
            Ti.Geolocation.removeEventListener('location', location);
            removeProviders();
            removeRules();
            isStop = true;
        };
    };

    /**
     * Reinicia la Geolocalización si está activa.
     */
    this.restart = function() {
        log.info("Reiniciar la localización.");
        this.stop();
        this.start();
    };

    /**
     * Recupera una posición en un momento en concreto. 
     * PENDIENTE DE IMPLEMENTAR
     */
    // this.getPosition = function() {
        // var message;
        // Ti.Geolocation.getCurrentPosition(function(e) {
            // if (!e.success || e.error) {
                // message = "GPS code translation: " + e.error + "(" + e.code + ")";
                // Ti.API.error(message);
            // } else {
                // message = "Coords: altitude: " + e.coords.altitude + " - Latitud: " + e.coords.latitude + " - Longitude: " + e.coords.longitude + "\nAccuracy: " + e.coords.accuracy + "\nProvider: " + e.provider.name + "\nTime: " + new Date(e.coords.timestamp);
                // message += "\nAccuracy: " + e.provider.accuracy + " - Power: " + e.provider.power;
                // Ti.API.info(message);
            // };
// 
        // });
// 
        // return message;
    // };

    // this.addEventListener = function(name, callback) {
    // Ti.Geolocation.addEventListener(name, callback);
    // };
};

module.exports = GeoPosicionamiento;
