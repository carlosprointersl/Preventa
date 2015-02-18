/**
 * @fileOverview En este archivo se crea la ventana de las acciones de clientes.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La librería underscore.js
 */
var _ = require('/lib/underscore');

/**
 * La variable Global
 */
var Global = new (require('/global/class/ReturnGlobal'))();

/**
 * @class Crea la ventanan donde tenemos las acciones que podemos realizar sobre un cliente.
 * @param {Object} Los datos del cliente.
 */
module.exports = function(client) {
    /**
     * La ventana principal.
     * @private
     * @type Ti.UI.Window
     */
    var win = Ti.UI.createWindow({
        backgroundColor : Global.Theme.BACKGROUND,
        navBarHidden : true,
        orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
    });

    /**
     * Indica si se permiten modificar los pedidos anteriores.
     * @private
     * @type Boolean
     */
    var modifPreviousOrders = Global.Functions.strToBoolSqlite(Global.Parameters.Configuracion.getModifPedido());

    /**
     * HeaderMenu
     * @private
     * @type Ti.UI.View
     */
    var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Acciones del cliente", "Clientes", function() {
        win.close();
    });
    headerMenu.setTop(0);
    win.add(headerMenu);

    /**
     * El nombre comercial del cliente.
     * @private
     * @type Ti.UI.Label
     */
    var nameClient = Ti.UI.createLabel({
        top : 50,
        height : 25,
        width : Ti.UI.FILL,
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 18,
            fontWeight : 'bold'
        },
        text : client.NombreComercial
    });
    win.add(nameClient);

    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var body = Ti.UI.createView({
        backgroundColor : Global.Theme.BACKGROUND,
        top : 75,
        bottom : 70
    });
    win.add(body);

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
        bottom : 0
    });
    body.add(scroll);

    /**
     * La vista contenedor de los botones.
     * @private
     * @type Ti.UI.View
     */
    var viewButtons = Ti.UI.createView({
        height : 70,
        bottom : 0,
        width : Ti.UI.FILL,
        layout : 'horizontal'
    });
    win.add(viewButtons);

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
        zIndex : 1,
        visible : false
    });
    body.add(arrowUp);

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
        bottom : 0,
        zIndex : 1,
        visible : false
    });
    body.add(arrowDown);

    /**
     * La función para crear los botones del pie de la ventana.
     * @private
     * @type Function
     */
    var menuButton = require(Global.Path.CONTROL + 'Button/MenuButton');

    /**
     * Botón de "Pedidos anteriores"
     * @private
     * @type MenuButton
     */
    var butLastOrders = menuButton("Anteriores", "stock_task_48.png", "25%");
    buttonStateLastOrders(modifPreviousOrders && client.hasOrders);
    viewButtons.add(butLastOrders);

    /**
     * Botón de "Pedido"
     * @private
     * @type MenuButton
     */
    var butOrders = menuButton("Pedido", "purchase_order_48.png", "25%");
    buttonStateOrder(!client.hasIncidence);
    viewButtons.add(butOrders);

    /**
     * Botón de "Facturas"
     * @private
     * @type MenuButton
     */
    var butInvoices = menuButton("Facturas", "invoice_48.png", "25%");
    stateButton(butInvoices, client.hasInvoice);
    viewButtons.add(butInvoices);

    /**
     * Botón de "Incidencias"
     * @private
     * @type MenuButton
     */
    var butIncidence = menuButton("Incidencia", "warning_48.png", "25%");
    buttonStateIncidence(!client.hasOrders);
    viewButtons.add(butIncidence);

    /**
     * Los datos que se muestran del cliente.
     * @type String[]
     */
    var dataClient = [client.NIF, client.CodigoCliente, client.NombreFiscal, client.Direccion, client.Poblacion, client.Telefono1, client.Contacto];

    //Añadimos todos los datos.
    _.each(dataClient, function(item) {
        scroll.add(Ti.UI.createLabel({
            color : Global.Theme.TEXT_SECONDARY,
            font : {
                fontSize : 16
            },
            text : item,
            width : Ti.UI.FILL,
            height : Ti.UI.SIZE
        }));
    });
    
    /**
     * Línea divisoria entre los datos del cliente y las notas.
     * @type Ti.UI.View 
     */
    var lineNote = Ti.UI.createView({
        backgroundColor : "#000000",
        height : 1,
        width : Ti.UI.FILL,
        top : 2,
        bottom : 2
    });
    scroll.add(lineNote);
    
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
    scroll.add(labelNotes);

    //Recorremos las notas del cliente y las añadimos
    for (var i = 0; i < client.Notes.length; i++) {
        labelNotes.text += "\n" + client.Notes[i].DescripcionNota;
    };

    //Ponemos las líneas divisorias de los botones
    for (var i = 1; i < 4; i++) {
        win.add(Ti.UI.createView({
            backgroundColor : Global.Theme.LINES,
            width : 0.5,
            height : viewButtons.getHeight(),
            bottom : 0,
            zIndex : 1,
            center : {
                x : (25 * i) + "%"
            }
        }));
    };

    /**
     * Este evento se dispara para indicar que se a pulsado el botón "Anteriores".
     * @event 'click'
     */
    butLastOrders.addEventListener('click', function() {
        // win.fireEvent('but:lastOrders');
        Global.Controller.Pedido(client, "previous", {
            anteriores : buttonStateLastOrders,
            incidencia : buttonStateIncidence
        });
    });

    /**
     * Este evento se dispara para indicar que se a pulsado el botón "Pedido".
     * @event but:order
     */
    butOrders.addEventListener('click', function() {
        // win.fireEvent('but:order');
        Global.Controller.Pedido(client, "new", {
            anteriores : buttonStateLastOrders,
            incidencia : buttonStateIncidence
        });
    });

    /**
     * Este evento se dispara para indicar que se a pulsado el botón "Facturas".
     * @event but:invoices
     */
    butInvoices.addEventListener('click', function() {
        // win.fireEvent('but:invoices');
        Global.Controller.Facturas(client);
    });

    /**
     * Este evento se dispara para indicar que se a pulsado el botón "Incidencia".
     * @event but:incidence
     */
    butIncidence.addEventListener('click', function() {
        // win.fireEvent('but:incidence');
        Global.Controller.Incidencias(client, buttonStateOrder);
    });

    /**
     * Suma los elementos que tiene la vista "scroll" para saber que altura tienen. Y muestra la flecha
     * inferior si la altura es superior a la de la vista.
     */
    function sizeChildrens() {
        scroll.childrenHeight = 0;
        //Recorremos todos sus elementos (children) y sumamos sus alturas.
        for (var i = 0; i < scroll.children.length; i++) {
            scroll.childrenHeight += scroll.children[i].size.height;
        };
        //Si supera la altura del scroll mostramos la flecha "down".
        arrowDown.setVisible(scroll.childrenHeight > scroll.size.height);

        scroll.removeEventListener('postlayout', sizeChildrens);
    };

    /**
     * Activa o bloquea el botón indicado según el valor de la comparación.
     * @param {Ti.UI.Button} button El botón que hay que activar o bloquear.
     * @param {Boolean} state El stado del botón.
     */
    function stateButton(button, state) {
        button.setEnabled(state);
        button.setBackgroundColor( state ? Global.Theme.BUTTON.BACKGROUND : Global.Theme.OBJECT_DISABLED);
    };

    /**
     * Activa o bloquea el botón de para realizar un pedido.
     * @pram {Boolean} state El estado del botón.
     */
    function buttonStateOrder(state) {
        stateButton(butOrders, state);
    };

    /**
     * Activa o bloquea el botón de para marcar una incidencia.
     * @pram {Boolean} state El estado del botón.
     */
    function buttonStateIncidence(state) {
        stateButton(butIncidence, state);
    };

    /**
     * Activa o bloquea el botón de para listar los últimos pedidos.
     * @pram {Boolean} state El estado del botón.
     */
    function buttonStateLastOrders(state) {
        stateButton(butLastOrders, state);
    };

    /**
     * Cuando se ha formado el "scroll" le añadimos la función "sizeChildrens".
     * @private
     * @event postlayout
     */
    scroll.addEventListener('postlayout', sizeChildrens);

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

    return win;
};
