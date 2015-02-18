/**
 * @fileOverview En este archivo se crea la vista donde se imprimen las facturas para pedidos realizados en modo Autoventa.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una vista para listar e imprimir, si se desea, pedidos realizados en modo Autoventa.
 * @param {Object} global La varibale Global.
 * @return {Ti.UI.View} La vista montada.
 */
function ViewPrint(global) {
    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var view = Ti.UI.createView({
        backgroundColor : 'yellow',
        visible : false
    });

    /**
     * La etiqueta 
     * @private
     * @type Ti.UI.Label
     */
    var label = Ti.UI.createLabel({
        color : '#FFFFFF',
        font : {
            fontSize : 23
        },
        text : 'VISTA IMPRIMIR'
    });
    
    //Añadimos los controles a la vista principal
    view.add(label);

    return view;
    
};

module.exports = ViewPrint;
