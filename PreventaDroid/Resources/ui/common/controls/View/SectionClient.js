/**
 * @fileOverview En este archivo se crea la clase para la edición de datos de los clientes.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Constantes que identifican el tipo de control para la edición del dato.
 * @class
 * @memberof Global.Control.SectionClient
 */
var Type = {
    TEXT_FIELD : 0,
    PICKER : 1,
    BUTTON : 2,
    CHECK : 3,
    TEXT_AREA : 4
};

/**
 * Esta clase crea una vista para la edición de datos de los clientes. Se le han de indicar los valores de dicha vista.
 * @class
 * @param {String} title El título del apartado.
 * @param {Object[]} data Los datos a editar de este apartado.
 * <ol>
 * <li>data.title:  {String} El título del dato.</li>
 * <li>data.type:   {Global.Control.SectionClient.TYPE/Number} El type de edición del dato. TextField, Picker o Button.</li>
 * <li>data.options:     {Object} Las diferentes opciones que puede tener el control según el tipo</li>
 * <ol>
 * <li>[options.value]:     {Object}  Es el valor del control, si lo tiene.</li>
 * <li>[options.maxLength]: {Number} Indica la longitud máxima del "TextField" o del "TextArea".</li>
 * <li>[options.keyboardType]: {Number} Indica el tipo de teclado del "TextField" o del "TextArea".</li>
 * <li>[options.items]:     {Ti.UI.Picker/Object[]} Puede tener dos valores para el "Picker". Los valores que lo componen o un "Picker" formado.</li>
 * <li>[options.enabled]:   {Boolean} Indica si el "button" está activo.</li>
 * </ol>
 * </ol>
 * @memberof Global.Control.SectionClient
 */
function CreateView(title, data) {
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
     * La cabecera del apartado.
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
     * @type Ti.UI.View
     */
    var viewBody = Ti.UI.createView({
        height : 0,
        width : Ti.UI.FILL,
        layout : 'horizontal'
    });

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
        text : title,
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
     * Crea la vista con el título y el control para la edición.
     * @private
     * @param {String} title El título del campo a editar.
     * @param {SectionClient.TYPE/Number} type El tipo de campo a editar.
     * @param {Object} options Las opciones del campo.
     * @return Ti.UI.View La vista creada para el campo.
     */
    function createEditView(title, type, options) {
        /**
         * El título del campo a editar.
         * @private
         * @type Ti.UI.Label
         */
        var title = Ti.UI.createLabel({
            color : Global.Theme.ROW.TITLE,
            font : {
                fontSize : 18
            },
            text : title,
            height : Ti.UI.SIZE,
            width : Ti.UI.FILL,
            left : 8
        });

        /**
         * El editor del valor del campo. Puede ser uno de los tipos definidos en SectionClient.TYPE.
         * @private
         * @type Object
         */
        var control = createEditControl(type, options);

        /**
         * La vista que contiene los elementos.
         * @private
         * @type Ti.UI.View
         */
        var content = Ti.UI.createView({
            layout : 'vertical',
            height : Ti.UI.SIZE
        });

        //Si el control es un "Check" hemos de modificar la vista para que aparezca a la derecha.
        if (type === Type.CHECK) {
            title.setWidth(Ti.UI.SIZE);
            content.setLayout("composite");
        };

        content.add(title);
        content.add(control);

        return content;
    };

    /**
     * Crea y retorna el control según el tipo.
     * @private
     * @param {SectionClient.TYPE/Number} type El tipo de campo a editar.
     * @param {Object} options Las opciones según el tipo de control.
     * @return {Object} Dependiendo del tipo retorna un control u otro.
     */
    function createEditControl(type, options) {
        /**
         * El control a retornar. No tiene definido el tipo que será.
         * @private
         */
        var control;
        //Creamos el control según el tipo.
        switch(type) {
            case Type.TEXT_FIELD:
                control = Ti.UI.createTextField({
                    height : Ti.UI.SIZE,
                    width : Ti.UI.FILL,
                    value : options.value,
                    maxLength : options.maxLength,
                    keyboardType : options.keyboardType != undefined ? options.keyboardType : Ti.UI.KEYBOARD_ASCII
                });
                break;
            case Type.PICKER:
                //Si el "picker" ya está hecho, SINO lo hacemos.
                if (options.items instanceof Ti.UI.Picker) {
                    control = options.items;
                    //Si hay mas de un item es que tiene registros. Selecionamos el del "id" de "options.value".
                    if (control.columns[0].rowCount > 1) {
                        for (var i = 0; i < control.columns[0].rows.length; i++) {
                            if (options.value === control.columns[0].rows[i].id) {
                                control.setSelectedRow(0, i);
                                // i = control.columns[0].rowCount;
                                break;
                            };
                        };
                    };
                } else {
                    control = Ti.UI.createPicker();
                    //Añadimos los "items"
                    for (var i = 0; i < options.items.length; i++) {
                        control.add(Ti.UI.createPickerRow({
                            title : options.items[i]
                        }));
                    };
                    //Seleccionamos el valor actual.
                    control.setSelectedRow(0, parseInt(options.value != undefined ? options.value : 0));
                };
                control.setWidth(Ti.UI.FILL);
                break;
            case Type.BUTTON:
                control = Ti.UI.createButton({
                    width : Ti.UI.FILL,
                    title : options.value,
                    enabled : options.enabled != undefined ? options.enabled : true
                });
                break;
            case Type.CHECK:
                control = Ti.UI.createSwitch({
                    style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
                    value : options.value != undefined ? options.value : false,
                    right : 5
                });
                break;
            case Type.TEXT_AREA:
                control = Ti.UI.createTextArea({
                    value : options.value,
                    width : Ti.UI.FILL,
                    height : Ti.UI.SIZE,
                    maxLength : options.maxLength,
                    keyboardType : options.keyboardType != undefined ? options.keyboardType : Ti.UI.KEYBOARD_DEFAULT
                });
                break;
        };
        /*
        //El evento 'focus' para expandir la sección en caso de que sea necesario.
        control.addEventListener('focus', function(e){
            //Si la sección NO ESTÁ desplegada la desplegamos.
            if(!viewBody.down){
                button.fireEvent('click');  
            };
        });*/
        return control;
    };

    /**
     * Extrae el valor del control según el tipo.
     * @private
     * @param {Object} control El control del que queremos obtener los datos.
     * @param {Object} oneData Todos los datos iniciales de dicho control.
     * @return {Object} Según el tipo de control tendrá un valor u otro.
     */
    function getValueControl(control, oneData) {
        switch(oneData.type) {
            case Type.TEXT_FIELD:

            case Type.TEXT_AREA:
  
            case Type.CHECK:
                return control.getValue();
                break;
            case Type.PICKER:
                var row = control.getSelectedRow(0);
                //Si tiene "id" retornamos este valor. Si no, hemos de retornar el índice.
                if (row.id != undefined) {
                    return row.id;
                } else {
                    return oneData.options.items.indexOf(control.getSelectedRow(0).getTitle());
                };
                break;
        };
    };

    // Añadimos los campos a la vista "body" para mostrarlos.
    for (var i = 0; i < data.length; i++) {
        viewBody.add(createEditView(data[i].title, data[i].type, data[i].options));
    };

    /**
     * Retorna todos los valores de la vista.
     * @return {Array} Los valores de la vista en un Array. El tipo de valor puede variar según el dato.
     */
    viewContent.getValues = function() {
        for (var i = 0; i < data.length; i++) {
            data[i].options.value = getValueControl(viewBody.children[i].children[1], data[i]);
        };

        return data;
    };

    viewHeader.add(labelTitle);
    viewHeader.add(button);

    viewContent.add(viewHeader);
    viewContent.add(viewBody);

    return viewContent;
};

/**
 * El namespace SectionClient donde guardamos constantes y objetos relacionados con las vistas de edición de clientes.
 * @memberof Global.Control
 */
var SectionClient = {
    TYPE : Type,
    CreateView : CreateView
};

module.exports = SectionClient;
