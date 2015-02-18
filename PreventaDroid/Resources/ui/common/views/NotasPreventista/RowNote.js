/**
 * @fileOverview En este archivo se crea la fila para mostrar en el listado de notas del preventista.
 *
 * @author Juan Carlos Matilla
 * @version 1.0
 */

/**
 * La variable Global.
 */
var Global = require('/global/class/ReturnGlobal')();

/**
 * @class La fila de las notas del preventista.
 * @param {Object} note La nota ha mostrar.
 * @param {Function} callback La acción al cambiar el "Check" de valor.
 * @param {String} [nameClient] El nombre del cliente.
 */
module.exports = function(note, callback, nameClient) {
    /**
     * La fila.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var row = Ti.UI.createTableViewRow({
        backgroundColor : Global.Theme.ROW.BACKGROUND, //'#6BAECE',
        height : Ti.UI.SIZE
    });

    /**
     * Nota.
     * @private
     * @type Ti.UI.Label
     */
    var labelNote = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY, //'#000000',
        font : {
            fontSize : 16
        },
        text : note.Texto,
        left : 2,
        width : Ti.UI.SIZE
    });

    /**
     * El contenedor para el check y la etiqueta.
     * @private
     * @type Ti.UI.View
     */
    var contentCheck = Ti.UI.createView({
        height : Ti.UI.FILL,
        right : 15,
        width : Ti.UI.SIZE,
        layout : 'vertical'
    });
    
    /**
     * Leída.
     * @private
     * @type Ti.UI.Label
     */
    var read = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL, //'#FFFFFF',
        font : {
            fontSize : 18,
            fontWeight : 'bold'
        },
        text : "Leída"
    });

    /**
     * El objeto CHECKBOX
     * @private
     * @type Ti.UI.createSwitch
     */
    var check = Ti.UI.createSwitch({
        style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
        value : note.Estado == 1,
        enabled : note.send != 1,
        center : {
            x : '50%'
        }
    });
    
    /**
     * Cuando cambia de valor ejecutamos la función "callback" para guardar el cambio en la base de datos.
     * @event 'change' 
     */
    check.addEventListener('change', function(e){
        note.Estado = e.value ? 1 : 0;
        callback(note);
    });

    /**
     * Añadimos los controles a la fila y la retorna montada.
     * @return {Ti.UI.TableViewRow} La fila montada.
     */
    this.getRow = function() {
        //Si hay un nombre de cliente hemos de añadirlo.
        if (nameClient) {
            /**
             * Nombre comercial.
             * @private
             * @type Ti.UI.Label
             */
            var name = Ti.UI.createLabel({
                color : Global.Theme.TEXT_PRINCIPAL, //'#FFFFFF',
                font : {
                    fontSize : 22,
                    fontWeight : 'bold'
                },
                text : nameClient,
                left : 2,
                height : Ti.UI.SIZE
            });

            /**
             * El contenedor para la nota y el nombre.
             * @private
             * @type Ti.UI.View
             */
            var contentNotes = Ti.UI.createView({
                left : 0,
                width : Ti.UI.SIZE,
                layout : 'vertical'
            });
            
            contentNotes.add(name);
            contentNotes.add(labelNote);
            
            row.add(contentNotes);
        } else {
            row.add(labelNote);
        };

        //Añadir controles.
        contentCheck.add(read);
        contentCheck.add(check);

        row.add(contentCheck);

        return row;
    };
};
