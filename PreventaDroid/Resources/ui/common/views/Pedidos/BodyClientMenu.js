/**
 * @fileOverview En este archivo se crea la vista del cuerpo para el menú de acciones de clientes.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea una vista para formar el cuerpo del menú de acciones del cliente seleccionado.
 * @class
 * @param {Object} client Los datos del cliente.
 */
function BodyClientMenu(client) {
    /**
     * La variable Global.
     * @private
     */
    var Global = require('/global/class/ReturnGlobal')();
    
    /**
     * Indica si se permiten modificar los pedidos anteriores.
     * @private
     * @type Boolean 
     */
    var modifPreviousOrders = Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getModifPedido());

    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var body = Ti.UI.createView({
        backgroundColor : Global.Theme.BACKGROUND,
        height : 350
    });

    /**
     * La vista "scroll" para los datos y notas del cliente.
     * @private
     * @type Ti.UI.ScrollView
     */
    var scroll = Ti.UI.createScrollView({
        contentHeight : 'auto',
        contentWidth : 'auto',
        scrollType : 'vertical',
        layout : 'vertical',
        top : 0,
        bottom : 130
    });

    /**
     * La vista lateral de las flechas.
     * @private
     * @type Ti.UI.View
     */
    var arrows = Ti.UI.createView({
        //backgroundColor : 'red',
        width : Ti.UI.SIZE,
        top : 0,
        bottom : 130,
        //right : 0,
    });

    /**
     * La vista contenedor del pie, donde están los botones.
     * @private
     * @type Ti.UI.View
     */
    var foot = Ti.UI.createView({
        //backgroundColor : 'gray',
        width : Ti.UI.FILL,
        height : 130,
        layout : 'vertical',
        bottom : 0
    });

    /**
     * La parte superior del pie.
     * @private
     * @type Ti.UI.View
     */
    var footUp = Ti.UI.createView({
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        layout : 'horizontal'
    });

    /**
     * La parte inferior del pie.
     * @private
     * @type Ti.UI.View
     */
    var footDown = Ti.UI.createView({
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        layout : 'horizontal'
    });

    /**
     * El nombre fiscal.
     * @private
     * @type Ti.UI.Label
     */
    var labelFiscalName = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 16
        },
        text : client.NombreFiscal,
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE
    });

    /**
     * Dirección.
     * @private
     * @type Ti.UI.Label
     */
    var labelDirection = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 16
        },
        text : client.Direccion,
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE
    });

    /**
     * Población.
     * @private
     * @type Ti.UI.Label
     */
    var labelPopulation = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 16
        },
        text : client.Poblacion,
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE
    });

    /**
     * Teléfono 1.
     * @private
     * @type Ti.UI.Label
     */
    var labelPhone = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 16
        },
        text : client.Telefono1,
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE
    });

    /**
     * Las notas.
     * @private
     * @type Ti.UI.Label
     */
    var labelNotes = Ti.UI.createLabel({
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 16
        },
        text : '\nNotas del cliente\n',
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE
    });

    //Recorremos las notas del cliente y las añadimos
    for (var i = 0; i < client.Notes.length; i++) {
        labelNotes.text += "\n" + client.Notes[i].DescripcionNota;
    };

    /**
     * La flecha "arriba".
     * @private
     * @type Ti.UI.ImageView
     */
    var arrowUp = Ti.UI.createImageView({
        image : '/images/up_48.png',
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,
        top : 0,
        right : 0,
        visible : false
    });

    /**
     * La flecha "abajo".
     * @private
     * @type Ti.UI.ImageView
     */
    var arrowDown = Ti.UI.createImageView({
        image : '/images/down_48.png',
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,
        right : 0,
        bottom : 130,
        visible : false
    });

    /**
     * La linea "vertical" de arriba.
     * @private
     * @type Ti.UI.ImageView
     */
    var line_v = Ti.UI.createView({
        backgroundColor : Global.Theme.LINES,
        width : 0.5,
        bottom : 0,
        height : 130,
        center : {
            x : "50%"
        }
    });

    /**
     * La linea "horizontal".
     * @private
     * @type Ti.UI.ImageView
     */
    var line_h = Ti.UI.createView({
        backgroundColor : Global.Theme.LINES,
        width : Ti.UI.FILL,
        bottom : 64.75,
        height : 0.5
    });

    /**
     * El botón para consultar los "pedidos anteriores".
     * @private
     * @type Ti.UI.Button
     */
    var butLastOrders = Ti.UI.createButton({
        title : 'Pedidos anteriores',
        width : "50%",
        height : 65,
        image : '/images/stock_task_48.png',
        enabled : modifPreviousOrders && client.hasOrders,
        backgroundColor : (modifPreviousOrders && client.hasOrders ? Global.Theme.BUTTON.BACKGROUND : Global.Theme.OBJECT_DISABLED),
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        color : Global.Theme.BUTTON.TITLE,
        font : {
            fontSize : 12.10
        }
    });

    /**
     * El botón para realizar un "pedido".
     * @private
     * @type Ti.UI.Button
     */
    var butOrders = Ti.UI.createButton({
        title : 'Pedido',
        width : "50%",
        height : 65,
        image : '/images/purchase_order_48.png',
        enabled : !client.hasIncidence,
        backgroundColor : (client.hasIncidence ? Global.Theme.OBJECT_DISABLED : Global.Theme.BUTTON.BACKGROUND),
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        color : Global.Theme.BUTTON.TITLE,
        font : {
            fontSize : 12.10
        }
    });

    /**
     * El botón para ver las "facturas".
     * @private
     * @type Ti.UI.Button
     */
    var butInvoices = Ti.UI.createButton({
        title : 'Facturas',
        width : "50%",
        height : 65,
        image : '/images/invoice_48.png',
        enabled : client.hasInvoice,
        backgroundColor : (client.hasInvoice ? Global.Theme.BUTTON.BACKGROUND : Global.Theme.OBJECT_DISABLED),
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        color : Global.Theme.BUTTON.TITLE,
        font : {
            fontSize : 12.10
        }
    });

    /**
     * El botón para gestionar las "incidencias".
     * @private
     * @type Ti.UI.Button
     */
    var butIncidents = Ti.UI.createButton({
        title : 'Incidencia',
        width : "50%",
        height : 65,
        image : '/images/warning_48.png',
        enabled : !client.hasOrders,
        backgroundColor : (client.hasOrders ? Global.Theme.OBJECT_DISABLED : Global.Theme.BUTTON.BACKGROUND),
        backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
        color : Global.Theme.BUTTON.TITLE,
        font : {
            fontSize : 12.10
        }
    });
    
    /**
     * Este evento se dispara para indicar que se a pulsado el botón "Últimos pedidos".
     * @event but:lastOrders 
     */   
    butLastOrders.addEventListener('click', function() {
        body.fireEvent('but:lastOrders');
    });
    
    /**
     * Este evento se dispara para indicar que se a pulsado el botón "Pedido".
     * @event but:order 
     */
    butOrders.addEventListener('click', function() {
        body.fireEvent('but:order');
    });
    
    /**
     * Este evento se dispara para indicar que se a pulsado el botón "Facturas".
     * @event but:invoices 
     */
    butInvoices.addEventListener('click', function() {
        body.fireEvent('but:invoices');
    });
    
    /**
     * Este evento se dispara para indicar que se a pulsado el botón "Incidencia".
     * @event but:incidence
     */
    butIncidents.addEventListener('click', function() {
        body.fireEvent('but:incidence');
    }); 
    
    /**
     * Cuando se ha formado el "scroll" sumamos las alturas de sus elementos (children).
     * @private
     * @event postlayout 
     */
    scroll.addEventListener('postlayout', function(){
       //Si es la primera vez
       if(!scroll.first){
            scroll.first = true;
            scroll.childrenHeight = 0;
            //Recorremos todos sus elementos (children) y sumamos sus alturas.
            for (var i=0; i < scroll.children.length; i++) {
                scroll.childrenHeight += scroll.children[i].size.height;
            };
            //Si supera la altura del scroll mostramos la flecha "down".
            arrowDown.setVisible(scroll.childrenHeight > scroll.size.height);
       }; 
    });
    
    /**
     * Controlando el evento "scroll" de la vista podemos mostrar/ocultar las flechas laterales según convenga.
     * @private
     * @event scroll 
     */
    scroll.addEventListener('scroll', function(e) {
        var dife = Math.round((scroll.childrenHeight - scroll.size.height) * Ti.Platform.displayCaps.logicalDensityFactor);
        //Cuando supera 10 de movimiento esconde la flecha "up".
        if (e.y > 10) {
            arrowUp.show();
        } else {
            arrowUp.hide();
        };
        //Cuando llega al final esconde la flecha "down".
        if (e.y < dife) {
            arrowDown.show();
        } else {
            arrowDown.hide();
        };
    });

    //Añadimos los controles a las vistas y estas al cuerpo.
    scroll.add(labelFiscalName);
    scroll.add(labelDirection);
    scroll.add(labelPopulation);
    scroll.add(labelPhone);
    scroll.add(labelNotes);

    footUp.add(butLastOrders);
    footUp.add(butOrders);

    footDown.add(butInvoices);
    footDown.add(butIncidents);

    foot.add(footUp);
    foot.add(footDown);

    body.add(scroll);
    body.add(arrowUp);
    body.add(arrowDown);
    body.add(foot);
    body.add(line_v);
    body.add(line_h);

    return body;

};

module.exports = BodyClientMenu;
