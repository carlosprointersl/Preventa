/**
 * @fileOverview En este archivo se cre el modelo "Articulos" y se hereda de la clase "Persistence".
 *
 * @author nombre autor
 * @version 1.0
 */

// La clase Persistence. Todos los modelos heredan de ella.
var Persistence = require(Global.Path.DB + 'Persistence');
/**
 * @class Es el modelo que interactua con la tabla "Articulos".
 * @memberOf Global.Model
 * @extends Persistence
 */
function Articulos() {
    Persistence.call(this, "Articulos", Global.ConfigDB.PIT_FILE_NAME);
    /**
     * Código propio de este modelo
     */
};

Articulos.prototype = Persistence;

module.exports = Articulos;
