/**
 * @fileOverview En este archivo se crea el control "WinLoading", que no es mas que una ventana oscurecida con el mensaje
 * de "Cargando..." en el centro.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una ventana con el mensaje "Cargando..." en el centro.
 * @class La utilizaremos para ventanas que tardan mucho en cargar debido a la cantidad de controles y/o información
 * que en ella se encuentra.
 * @return {Ti.UI.Window} La ventana creada con el mensaje.
 */
function WinLoading() {
    /**
     * La ventana.
     * @private
     * @type 
     */
    var win = Ti.UI.createWindow({
        navBarHidden : true,
        backgroundColor : '#000000',
        opacity : 0.5
    });
    
    /**
     * El mensaje de cargando.
     * @private
     * @type Ti.UI.View 
     */
    var loading = require(Global.Path.CONTROL + 'Loading')();
    loading.show();
    
    /**
     * Evitamos el funcionamiento del botón "back" en Android.
     * @event "android:back" 
     */
    win.addEventListener('android:back', function(){
        //Se utiliza para evitar el funcionamiento del botón "back" en android.
    });
    
    win.add(loading);
    
    return win;
};

module.exports = WinLoading;
