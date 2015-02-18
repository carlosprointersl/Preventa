/**
 * @fileOverview En este archivo se crea la clase para la edición de datos de los clientes.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Esta clase crea una vista para la edición de datos de los clientes. Se le han de indicar los valores de dicha vista.
 * @class
 * @param {Object/Object[]} template Cuando es un array contiene los datos de las plantillas actuales. Y cuando es un objeto contiene la estructura de los datos de una plantilla.
 */
function CreateView(template) {
    /**
     * La variable Global.
     * @private
     * @type Object
     */
    var Global = require('/global/class/ReturnGlobal')();

    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var viewContent = Ti.UI.createView({
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        height : Ti.UI.SIZE,
        width : Ti.UI.FILL,
        layout : 'vertical',
        top : 1
    });

    /**
     * La fila.
     * @private
     * @type Ti.UI.View
     */
    var viewHeader = Ti.UI.createView({
        backgroundColor : Global.Theme.HEADER,
        height : Ti.UI.SIZE,
        width : Ti.UI.FILL
    });

    /**
     * El cuerpo del apartado.
     * @private
     * @type Object
     */
    var list = new (require(Global.Path.VIEW + 'Plantilla/ListTemplates'))(template);

    /**
     * El cuerpo del apartado.
     * @private
     * @type Ti.UI.View
     */
    var viewBody = list.getView();

    /**
     * El título del apartado.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitle = Ti.UI.createLabel({
        color : Global.Theme.HEADER_TEXT,
        font : {
            fontSize : 19
        },
        text : "Plantillas",
        textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
        left : 5,
        right : 50
    });

    /**
     * El botón para mostrar los datos.
     * @private
     * @type Ti.UI.Button
     */
    var button = Ti.UI.createButton({
        image : '/images/arrow_sans_down_32.png',
        right : 0,
        // height : 40,
        // width : 40,
    });

    /**
     * El evento 'click' del botón. Hace que se muestre o esconda la vista "body", para la edición de los datos.
     * @private
     * @event 'click.
     */
    button.addEventListener('click', function() {
        var animation = Ti.UI.createAnimation({
            duration : 100
        });
        //Si no tiene altura
        if (!viewBody.down) {
            animation.height = Ti.UI.SIZE;
            viewBody.down = true;
            button.setImage('/images/arrow_sans_up_32.png');
        } else {
            animation.height = 0;
            viewBody.down = false;
            button.setImage('/images/arrow_sans_down_32.png');
        };

        viewBody.animate(animation);
    });

    /**
     * Cuando el listado quiere añadir una plantilla.
     * @event 'row:delete'
     */
    list.addEventListener('row:add', function(e) {
        viewContent.fireEvent('row:add');
    });

    /**
     * Cuando el listado quiere eliminar una plantilla.
     * @event 'row:delete'
     */
    list.addEventListener('row:delete', function(e) {
        viewContent.fireEvent('row:delete', {
            template : e.template
        });
    });

    /**
     * Cuando el listado quiere modificar una plantilla.
     * @event 'row:delete'
     */
    list.addEventListener('row:modify', function(e) {
        viewContent.fireEvent('row:modify', {
            template : e.template
        });
    });

    /**
     * Monta y retorna la vista contenedor.
     * @return {Ti.UI.View} La vista contenedor.
     */
    this.getView = function() {
        viewHeader.add(labelTitle);
        viewHeader.add(button);

        viewContent.add(viewHeader);
        viewContent.add(viewBody);

        return viewContent;
    };

    /**
     * Retorna las plantillas actulaes dentro de un array. El array puede estar vacio si no hay ninguna plantilla.
     * @return {Array} Las plantillas.
     */
    this.getTemplates = function() {
        return list.getTemplates();
    };
    
    /**
     * Añade eventos a la vista contenedor (viewContent).
     * @param {String} name Nombre del evento.
     * @param {Function} [callback] Función que dispara el evento.
     */
    this.addEventListener = function(name, callback) {
        viewContent.addEventListener(name, callback);
    };

};

module.exports = CreateView;
