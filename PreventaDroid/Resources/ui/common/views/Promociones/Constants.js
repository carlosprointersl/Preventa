/**
 * @fileOverview En este archivo están las constantes que tienen relación con las promociones
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Las constantes útiles para las promociones
 * @namespace Constants
 */
var Constants = {};

Object.defineProperties(Constants, {
    "INTEGER" : {
        value : 0,
        writable : false
    },
    "FLOAT" : {
        value : 1,
        writable : false
    },
    "STRING" : {
        value : 2,
        writable : false
    },
    "TEXT" : {
        value : 3,
        writable : false
    },
    "ADD" : {
        value : 4,
        writable : false
    },
    "REMOVE" : {
        value : 5,
        writable : false
    },
    "INFO" : {
        value : 6,
        writable : false
    },
    "PERCENT" : {
        value : 7,
        writable : false
    },
    "EURO" : {
        value : 8,
        writable : false
    }
});

module.exports = Constants;