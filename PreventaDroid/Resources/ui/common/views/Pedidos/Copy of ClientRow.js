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
    var row = Global.Control.Row.SelectedRow();
    
    //Modificamos las opciones de la vista "content" del "row".
    row.content.setLayout("horizontal");
    row.filter = client.NombreComercial;
    
    /**
     * El contenedor para los textos
     * @private
     * @type Ti.UI.View
     */
    var viewTexts = Ti.UI.createView({
        height : Ti.UI.FILL,
        layout : 'vertical'
    });

    /**
     * El contenedor para los datos del cliente.
     * @private
     * @type Ti.UI.View
     */
    var viewData = Ti.UI.createView({
        height : Ti.UI.SIZE
    });
    
    /**
     * La imagen que muestra el estado del cliente. INCIDENCIA O PEDIDO.
     * @private
     * @type Ti.UI.ImageView
     */
    var action = Ti.UI.createImageView({
        height : 30,
        top : 5
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
        height : 33
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
        left : 2
    });

    //Modifica la fila según el "Tratado" que esta tenga, si tiene alguno.
    if (client.state != "") {
        //Modificamos las anchuras
        viewTexts.setWidth('90%');
        switch(client.state) {
            case 'pedido':
                row.className = 'clientOrder';
                action.image = Global.Path.IMAGES + '48/purchase_order.png';
                break;
            case 'incidencia':
                row.className = 'clientIncidence';
                action.image = Global.Path.IMAGES + '48/Warning.png';
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
    
    viewData.add(labelAddres);

    viewTexts.add(labelName);
    viewTexts.add(viewData);

    row.content.add(action);
    row.content.add(viewTexts);
    
    return row;
};

module.exports = ClientRow;
