/**
 * @fileOverview En este archivo se crea la fila para mostrar los "Clientes" en el aparatado de pedidos..
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una fila para el listado de "Clientes" en los "Pedidos".
 * @class
 * @memberOf Global.Control
 * @param {Object} client Los datos del cliente.
 */
function ClientRow(client) {

    /**
     * La fila.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var row = Ti.UI.createTableViewRow({
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        backgroundSelectedColor : Global.Theme.ROW.PRESS,
        layout : 'horizontal',
        filter : client.NombreComercial
    });
    
    /**
     * El contenedor para los textos
     * @private
     * @type Ti.UI.View
     */
    var viewTexts = Ti.UI.createView({
        height : Ti.UI.FILL,
        layout : 'vertical',
        touchEnabled : false
    });

    /**
     * El contenedor para los datos del cliente.
     * @private
     * @type Ti.UI.View
     */
    var viewData = Ti.UI.createView({
        height : Global.Parameters.Configuracion.getViewClients() == "C" ? Ti.UI.SIZE : 0,
        touchEnabled : false
    });
    
    /**
     * La imagen que muestra el estado del cliente. INCIDENCIA O PEDIDO.
     * @private
     * @type Ti.UI.ImageView
     */
    var action = Ti.UI.createImageView({
        height : 30,
        top : 5,
        touchEnabled : false
    });
    
    /**
     * Nombre comercial.
     * @private
     * @type Ti.UI.Label
     */
    var labelName = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 22,
            fontWeight : 'bold'
        },
        text : client.NombreComercial,
        left : 2,
        width : Ti.UI.FILL,
        height : 33,
        touchEnabled : false
    });

    /**
     * La dirección + número + ciudad.
     * @private
     * @type Ti.UI.Label
     */
    var labelAddres = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 16
        },
        text : client.Direccion + " " + client.Numero + " - " + client.Poblacion,
        left : 2,
        touchEnabled : false
    });

    //Modifica la fila según el "Tratado" que esta tenga, si tiene alguno.
    if (client.state != "") {
        //Modificamos las anchuras
        viewTexts.setWidth('90%');
        switch(client.state) {
            case 'pedido':
                row.className = 'clientOrder';
                action.image = '/images/purchase_order_48.png';
                break;
            case 'incidencia':
                row.className = 'clientIncidence';
                action.image = '/images/warning_48.png';
                break;
        };

    };
    
    /**
     * Retorna el cliente.
     * @return {Object} EL cliente. 
     */
    row.getClient = function(){
        return client;
    };
    
    /**
     * Pasa de tipo "Detallada" a "Simple".
     */
    row.setType = function(){
        viewData.setHeight(viewData.getHeight() == 0 ? Ti.UI.SIZE : 0);
    };
    
    row.addEventListener('click', function(e){
        e.cancelBubble = true;
        e.row.parent.parent.fireEvent('click', {
            index : e.index,
            row : e.row
        });
    });
    
    viewData.add(labelAddres);

    viewTexts.add(labelName);
    viewTexts.add(viewData);

    row.add(action);
    row.add(viewTexts);
    
    return row;
};

module.exports = ClientRow;
