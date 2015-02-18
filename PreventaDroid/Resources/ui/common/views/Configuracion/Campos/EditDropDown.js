/**
 * @fileOverview En este archivo crea la ventana de edición para los deplegables configurables.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * @class Crea la ventana para editar los valores de los desplegables configurables.
 * @param {Object} options Las opciones para la ventana de edición.
 * <ol>
 * <li>options.maxLength : Longitud máxima del TextField.</li>
 * <li>[options.value] : El valor del elemento si no es nuevo.</li>
 * <li>[options.id] : El id del elemento si no es nuevo.</li>
 * </ol>
 * @return {Global.Control.Window.Popup} El objeto Popup para mostrar una ventana emergente.
 */
function EditDropDown(options) {
    /**
     * El cuerpo del popup.
     * @private
     * @type Ti.UI.View 
     */
    var body = Ti.UI.createView({
        width : Ti.UI.FILL,
        layout : 'vertical',
        height : 200
    });
    
    /**
     * El campo de edición del "id".
     * @private
     * @type Ti.UI.TextField 
     */
    var textId = Ti.UI.createTextField({
        left : 2,
        right : 2,
        top : 10,
        maxLength : 3,
        value : options.id,
        hintText : "Escribir clave"
    });
    
    /**
     * El campo de edición del "valor".
     * @private
     * @type Ti.UI.TextField 
     */
    var textValue = Ti.UI.createTextField({
        left : 2,
        right : 2,
        top : 10,
        maxLength : options.maxLength || -1,
        value : options.value,
        hintText : "Escribir valor"
    });
    
    /**
     * La etiqueta del id.
     * @private
     * @type Ti.UI.Label
     */
    var labelId = Ti.UI.createLabel({
        color : '#FFFFFF',
        font : {
            fontSize : 18
        },
        text : "Clave",
        textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
        top : 10,
        left : 2,
        right : 2
    });
    
    /**
     * La etiqueta de la descripción.
     * @private
     * @type Ti.UI.Label
     */
    var labelValue = Ti.UI.createLabel({
        color : '#FFFFFF',
        font : {
            fontSize : 18
        },
        text : "Descripción",
        textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
        top : 10,
        left : 2,
        right : 2
    });
    
    //Añadimos los elementos a la vista "body".
    body.add(labelId);
    body.add(textId);
    body.add(labelValue);
    body.add(textValue);
    
    /**
     * Las opciones para la ventana Popup.
     * @private
     * @type Global.Control.Window.Popup 
     */
    var options = {
        title : "Añadir nuevo registro",
        body : body,
        icon : Global.Control.Windows.ICON.INFORMATION,
        buttons : options.value != undefined ? [Global.Control.Windows.BUTTON.SAVE, {
            title : "Eliminar",
            image : '/images/delete_32.png'
        }, Global.Control.Windows.BUTTON.CANCEL] : Global.Control.Windows.BUTTON.SAVE_CANCEL
    };

    var popup = new Global.Control.Windows.Popup(options);
    
    /**
     * El evento que se dispara cuando se guardan los datos. Retorna el valor del TextField.
     * @param {Function} callback La función que realiza al dispararse el evento.
     * @event 'save' 
     */
    popup.addEventClickButton("save", function(){
        popup.fireEvent('save', {
            id : textId.value,
            value : textValue.value
        });
        
        popup.close();
    });
    
    /**
     * El evento que se dispara cuando se elimina la fila actual.
     * @param {Function} callback La función que realiza al dispararse el evento.
     * @event 'delete' 
     */
    // popup.addEventClickButtonIndex(1, function(){
        // popup.fireEvent('delete');
    // });
    
    return popup;
};

module.exports = EditDropDown;
