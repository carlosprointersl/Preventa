/**
 * @fileOverview En este archivo se crea un formulario para modificar los "Passwords". Tanto del administrador como del preventista.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea un formulario para editar el password tanto del administrador como del preventista.
 * @class Crea una "Window" para editar el password.
 * @param {Integer} type Indica el tipo de usuario al que hay que cambiar el "Password". Donde 0 = Preventista y 1 = Administrador.
 */
var ChangePassword = function(type) {
    /**
     * Nombre del usuario.
     * @private
     * @type String
     */
    var name;

    /**
     * Nombre del parámetro a editar
     * @private
     * @type String
     */
    var parameter;

    /**
     * Nombre del grupo al que pertenece el parámetro.
     * @private
     * @type String
     */
    var group;

    //Los datos para las variables anteriores
    if (type === 0) {
        name = "Preventista";
        parameter = "Password";
        group = "Preventista";
    } else {
        name = "Administrador";
        parameter = "PasswordAdmin";
        group = "Configuracion";
    };

    /**
     * Las etiquetas que formarán parte del formulario
     * @private
     * @type String[]
     */
    var labels = ["Password actual", "Nuevo Password", "Repetir Password"];
    //
    // ------------------------------------------------ TEXTFIELDS ------------------------------------------
    //
    /**
     * El campo de texto donde introducir la contraseña actual.
     * @private
     * @type TextField
     */
    var textOld = Ti.UI.createTextField({
        height : 40,
        width : Ti.UI.FILL,
        passwordMask : true
    });
    /**
     * El campo de texto donde introducir la contraseña nueva.
     * @private
     * @type TextField
     */
    var textNew = Ti.UI.createTextField({
        height : 40,
        width : Ti.UI.FILL,
        passwordMask : true
    });
    /**
     * El campo de texto donde introducir la repetición de la contraseña nueva.
     * @private
     * @type TextField
     */
    var textRepeat = Ti.UI.createTextField({
        height : 40,
        width : Ti.UI.FILL,
        passwordMask : true
    });

    /**
     * Los controles para introducir en el formulario
     * @private
     * @type TextField[]
     */
    var controls = [textOld, textNew, textRepeat];

    /**
     * La vista que forma el cuerpo de la ventana.
     * @private
     * @type Ti.UI.View
     */
    var body = Ti.UI.createView({
        height : Ti.UI.SIZE,
        layout : 'horizontal'
    });

    //Llenamos la vista "body" con los controles correspondientes
    for (var i = 0; i < labels.length; i++) {
        body.add(Ti.UI.createLabel({
            color : '#FFFFFF',
            font : {
                fontSize : 20
            },
            text : labels[i],
            width : Ti.UI.FILL
        }));
        
        body.add(controls[i]);
    };

    /**
     * Las opciones para la ventana.
     * @private
     * @type Object
     */
    var options = {
        title : "Password del " + name,
        body : body,
        icon : Global.Control.Windows.ICON.INFORMATION,
        buttons : Global.Control.Windows.BUTTON.SAVE_CANCEL,
        // top : 20
    };

    /**
     * El formulario.
     * @private
     * @type FormNewEdit
     */
    var formPass = new Global.Control.Windows.Popup(options);

    /**
     * Cambia la contraseña, si es posible.
     * @private
     */
    function eventSave() {
        if (isPassOk(textOld.value)) {
            if (textNew.value === textRepeat.value) {
                var g = Global.Parameters[group];
                g['set' + parameter](Ti.Utils.sha256(textRepeat.value));
                formPass.close();
                Log.info("La contraseña del \"" + name + "\" se ha modificado.");
            } else {
                alert("Las contraseñas nuevas no son iguales.");
            };
        } else {
            alert("La contaseña actual no es la correcta.");
        };
    };

    /**
     * Comprobar que la contraseña antigua es la correcta.
     * @param {String} pass El password a comrobar.
     * @return {Boolean} Evalua si la contraseña es la correxcta.
     */
    function isPassOk(pass) {
        var g = Global.Parameters[group];
        var password = g['get' + parameter]();
        return password === Ti.Utils.sha256(pass);
    };

    //Añadimos la función al evento "save" de la ventana.
    formPass.addEventClickButton('save', eventSave);

    //Abrimos el formulario
    formPass.open();
};

//var functionControl = ChangePassword;
module.exports = ChangePassword;
