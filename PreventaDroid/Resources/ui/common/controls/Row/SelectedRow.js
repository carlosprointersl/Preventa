/**
 * @fileOverview En este archivo se crea la estructura genérica de una fila con el efecto "touch".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * El control "ParentRow".
 * @class Crea la estructura base de una fila.
 */
var ParentRow = Global.Control.Row.ParentRow;

/**
 * Crea la estructura genérica de una fila con el efecto "touch".
 * @class Esta clase crea la estructura genérica de una filacon el efecto "touch".</br>
 * La fila esta compuesta de una "view" que nos ayuda para crear el efecto "touch". Para modificar la composición de la fila lo haremos a travé de esta "view".</br>
 * @extends ParentRow
 * @example
 * row.content.setLayout('horizontal');</br>
 * row.content.setWidth('horizontal');
 */
function SelectedRow() {
    ParentRow.call(this);
    /**
     * EL objeto mismo.
     * @private
     * @type Object 
     */
    var self = this;
    
    /**
     * Las vista contenedor. Nos ayuda para el efecto "touch".
     * @private
     * @type Ti.UI.View 
     */
    var content = Ti.UI.createView({
        height : Ti.UI.FILL,
        width : Ti.UI.FILL
    });
    
    /**
     * Le añadimos la propiedad "content" a la fila.
     */
    this.row.content = content;
    
    /**
     * Evento "touch start" de la fila, para cuando se pulse la fila que se marque.
     * @event touch
     */
    this.row.addEventListener('touchstart', function(e){
        content.setBackgroundColor(Global.Theme.ROW.PRESS);
    });    
    
    /**
     * Evento "touch end" de la fila, para cuando se deja de pulsar la fila que se muestre del color original.
     * @event touch
     */
    this.row.addEventListener('touchend', function(e){
        content.setBackgroundColor(Global.Theme.ROW.BACKGROUND);
    });
    
    /**
     * Evento "touch cancel" de la fila, para cuando se deja de pulsar la fila que se muestre del color original.
     * @event touch
     */
   this.row.addEventListener('touchcancel', function(e){
        content.setBackgroundColor(Global.Theme.ROW.BACKGROUND);
    });
    
    this.row.add(content);
    
    return this.row;
};
module.prototype = ParentRow;

module.exports = SelectedRow;
