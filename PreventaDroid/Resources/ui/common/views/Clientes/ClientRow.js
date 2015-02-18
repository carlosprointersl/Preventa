/**
 * @fileOverview En este archivo se crea la fila para mostrar los "Clientes".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una fila para el menú de "Clientes".
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
    var row = Global.Control.Row.SimpleRow();
    
    //Modificamos las opciones del "row".
    row.setClassName('clientRow');
    row.setLayout('horizontal');

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
     * La imagen que muestra el estado de la fila. ALTA, MODI o BAJA.
     */
    var action = Ti.UI.createImageView({
        height : 30,
        top : 5,
        width : 0
    });
    
    /**
     * Nombre comercial.
     * @private
     * @type Ti.UI.Label
     */
    var labelName = Ti.UI.createLabel({
        //backgroundColor : 'gray',
        color : '#FFFFFF',
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
     * La dirección + la ciudad.
     * @private
     * @type Ti.UI.Label
     */
    var labelAddres = Ti.UI.createLabel({
        color : '#000000',
        font : {
            fontFamily : 'Arial',
            fontSize : 16
        },
        text : client.Direccion + " " + client.Numero + " - " + client.Poblacion,
        left : 2
    });

    //Modifica la fila según el "Tratado" que esta tenga, si tiene alguno.
    if (client.Tratado != "") {
        //Modificamos las anchuras
        viewTexts.setWidth('89%');
        switch(client.Tratado) {
            case 'ALTA':
                row.className = 'clientNew';
                action.image = '/images/add-user_48.png';
                action.setWidth('10%');
                break;
            case 'MODI':
                row.className = 'clientModi';
                action.image = '/images/edit-user_48.png';
                action.setWidth('10%');
                break;
            case 'BAJA':
                row.className = 'clientRemove';
                action.image = '/images/remove-user_48.png';
                action.setWidth('10%');
                break;
        };

    };
    

    /**
     * Marca o desmarca la fila, según convenga, cambiando el color de fondo de la fila.
     */
    row.click = function() {
        if (row.getBackgroundColor() === Global.Theme.ROW.BACKGROUND) {
            row.setBackgroundColor(Global.Theme.ROW.PRESS);
        } else {
            row.setBackgroundColor(Global.Theme.ROW.BACKGROUND);
        };
        //Miramos si tiene notas.
        var win = new (require(Global.Path.VIEW + 'NotasPreventista/MainWin'))(client.CodigoCliente);
        win.open();
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

    row.add(action);
    row.add(viewTexts);

    return row;
};

module.exports = ClientRow;
