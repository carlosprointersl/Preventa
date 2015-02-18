/**
 * @fileOverview En este archivo se crea la ventan de edición de una plantilla.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Adminsitra la edición de una plantilla.
 * @class En esta clase se crea la ventana de edición de una plantilla. También abastece de las funciones necesarias para recuperar los datos de esta.
 * @param {Object} [template] La plantilla a editar.
 */
function EditWin(template) {
    /**
     * La variable Global.
     * @private
     * @type Object
     */
    var Global = require('/global/class/ReturnGlobal')();

    /**
     * La ventana principal.
     * @private
     * @type Ti.UI.View
     */
    var win = Ti.UI.createWindow({
        // title : 'Datos de la plantilla',
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        navBarHidden : true,
        modal : true,
        orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
    });
    
    /**
     * HeaderMenu
     * @private
     * @type Ti.UI.View 
     */
    var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Datos de la plantilla", "Cliente", function(){win.close();});
    headerMenu.setTop(0);

    /**
     * El cuerpo.
     * @private
     * @type Object
     */
    var body = new (require(Global.Path.VIEW + 'Plantilla/bodyTemplate'))(template);

    /**
     * El pie.
     * @private
     * @type Ti.UI.View
     */
    var viewFoot = Ti.UI.createView({
        height : 70,
        bottom : 0,
        layout : 'horizontal'
    });

    /**
     * El botón "Guardar".
     * @private
     * @type Ti.UI.Button
     */
    var butSave = Ti.UI.createButton({
        image : '/images/save_32.png',
        backgroundColor : Global.Theme.BUTTON.BACKGROUND,
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        color : Global.Theme.BUTTON.TITLE,
        font : {
            fontSize : 23,
            fontStyle : 'bold'
        },
        title : "Guardar",
        height : Ti.UI.FILL,
        width : Ti.UI.FILL,
        left : 0
    });

    /**
     * Acción que se realiza al disparar el evento 'click' del botón "Guardar".
     * @event 'click'
     */
    butSave.addEventListener('click', function() {
        var temp = body.getTemplate();
        //Si está el código del artículo
        if (temp.CodigoArticulo != "" && temp.Descripcion != "") {
            win.fireEvent('win:save', {
                template : temp
            });

            win.close();
        } else {
            //Las opciones de la ventana.
            var options = {
                title : "CAMPOS VACÍOS",
                message : "Los campos \"Artículo\" y \"Descripción\" son obligatorios.",
                icon : Global.Control.Windows.ICON.EXCLAMATION
            };
            //La ventana emergente con el mensaje.
            var popup = new Global.Control.Windows.Alert(options);
            popup.open();
        };

    });

    //La línea horizontal encima de los botones
    win.add(Ti.UI.createView({
        backgroundColor : Global.Theme.BACKGROUND,
        height : 0.5,
        width : Ti.UI.FILL,
        bottom : viewFoot.getHeight() - 0.5,
        zIndex : 1
    }));
    
    /**
     * En el evento 'postlayout' de la ventana activamos el primer TextField.
     * @event 'postlayout' 
     */
    win.addEventListener('postlayout', showText);
    
    /**
     * Pasa a "editable" el primer campo del formulario y quita dicha función del evento 'postlayout' de "win". 
     */
    function showText(){
        var text = win.children[2].children[2].children[0];
        text.blur();
        setTimeout(function() {
            text.setEditable(true);
        }, 500);
        win.removeEventListener('postlayout', showText);  
    };

    /**
     * Monta y retorna la ventana.
     * @return {Ti.UI.View} La vista contenedor.
     */
    this.getWin = function() {

        viewFoot.add(butSave);
        
        win.add(headerMenu);
        win.add(body.getView());
        win.add(viewFoot);

        return win;
    };

};

module.exports = EditWin;
