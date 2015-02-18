/**
 * @fileOverview En este archivo se crea el formulario para editar los datos de una plantilla.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Esta clase crea una vista para la edición de datos de una plantilla.
 * @class
 * @param {Object} [template] La plantilla a editar. Si está vacio es que es para una plantilla nueva.
 */
function BodyTemplate(template) {
    /**
     * La variable Global.
     * @private
     * @type Object
     */
    var Global = require('/global/class/ReturnGlobal')();

    //Si está vacío lo inicializamos.
    var template = template || new Object();

    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var viewContent = Ti.UI.createScrollView({
        contentHeight : 'auto',
        layout : 'vertical',
        showVerticalScrollIndicator : true,
        showHorizontalScrollIndicator : false,
        top : 50,
        bottom : 70,
        scrollType : 'vertical'
    });

    /**
     * La vista cabecera-datos.
     * @private
     * @type Ti.UI.View
     */
    var viewDataHeader = Ti.UI.createView({
        backgroundColor : Global.Theme.HEADER,
        height : 50,
        width : Ti.UI.FILL
    });

    /**
     * La vista cabecera-regalos.
     * @private
     * @type Ti.UI.View
     */
    var viewGiftsHeader = Ti.UI.createView({
        backgroundColor : Global.Theme.HEADER,
        height : 50,
        width : Ti.UI.FILL
    });

    /**
     * El título de la cabecera de datos.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitleDataHeader = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 19
        },
        text : "Formulario",
        textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
        left : 5
    });
    //Añadimos el título a la cabecera.
    viewDataHeader.add(labelTitleDataHeader);

    /**
     * El título de la cabecera de regalos.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitleGiftsHeader = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 19
        },
        text : "Obsequios",
        textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
        left : 5
    });
    //Añadimos el título a la cabecera.
    viewGiftsHeader.add(labelTitleGiftsHeader);

    /**
     * Crea el control para la búsqueda de artículos.
     * @private
     * @function
     */
    var itemSearch = require(Global.Path.VIEW + 'Plantilla/itemSearch');

    /**
     * Array con los campos del formulario.
     * @private
     * @type Object[]
     */
    var fields = [{
        title : 'Artículo',
        type : Ti.UI.KEYBOARD_DEFAULT,
        lenght : 13
    }, {
        title : 'Descripción',
        type : Ti.UI.KEYBOARD_DEFAULT,
        lenght : 20
    }, {
        title : 'Venta',
        type : Ti.UI.KEYBOARD_DECIMAL_PAD,
        lenght : undefined
    }, {
        title : 'Regalo',
        type : Ti.UI.KEYBOARD_DECIMAL_PAD,
        lenght : undefined
    }, {
        title : 'Descuento unitario',
        type : Ti.UI.KEYBOARD_DECIMAL_PAD,
        lenght : undefined
    }, {
        title : 'Descuento %',
        type : Ti.UI.KEYBOARD_DECIMAL_PAD,
        lenght : undefined
    }, {
        title : 'Rappel',
        type : Ti.UI.KEYBOARD_DECIMAL_PAD,
        lenght : undefined
    }, {
        title : 'Rappel %',
        type : Ti.UI.KEYBOARD_DECIMAL_PAD,
        lenght : undefined
    }, {
        title : 'Precio especial',
        type : Ti.UI.KEYBOARD_DECIMAL_PAD,
        lenght : undefined
    }, {
        title : 'Promoción desde',
        type : Ti.UI.KEYBOARD_DECIMAL_PAD,
        lenght : undefined
    }];

    /**
     * Artículos de obsequio.
     * @private
     * @type Ti.UI.Label
     */
    var labelGifts = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 15
        },
        text : "Artículos de obsequio",
        textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
        left : 5
    });

    /**
     * Añade los controles de edición para el formulario.
     * @private
     */
    function addControls() {
        //Añade los campos de la variable "fields" al formulario.
        for (var i = 0, j = fields.length; i < j; i++) {
            //Añadimos la etiqueta
            viewContent.add(Ti.UI.createLabel({
                color : Global.Theme.TEXT_PRINCIPAL,
                font : {
                    fontSize : 15
                },
                text : fields[i].title,
                textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
                left : 5
            }));
            //Añadimos el TextField
            viewContent.add(fields[i].title === 'Artículo' ? itemSearch(fields[i].type, fields[i].length) : Ti.UI.createTextField({
                width : Ti.UI.FILL,
                keyboardType : fields[i].type,
                maxLength : fields[i].length
            }));
        };
        //Lo marcamos como no editable para que no aparezca el teclado.
        viewContent.children[2].children[0].setEditable(false);
    };

    /**
     * Añade los controles para insertar obsequios en la plantilla.
     * @private
     */
    function addGifts() {
        for (var i = 0; i < 5; i++) {
            viewContent.add(itemSearch(Ti.UI.KEYBOARD_DEFAULT, 13));
        };
    };

    /**
     * Añade los valores a los campos para editar la plantilla.
     */
    function fillForm() {
        //Si no es nueva
        //if (template.CodigoPlantilla != undefined) {
            viewContent.children[2].children[0].setValue(template.CodigoArticulo);
            viewContent.children[4].setValue(template.Descripcion);
            viewContent.children[6].setValue(template.Venta);
            viewContent.children[8].setValue(template.Regalo);
            viewContent.children[10].setValue(template.DtoUnitario);
            viewContent.children[12].setValue(template.DtoPorcenUnit);
            viewContent.children[14].setValue(template.Rappel);
            viewContent.children[16].setValue(template.PorcenRappel);
            viewContent.children[18].setValue(template.PrecioEspecial);
            viewContent.children[20].setValue(template.PromocionDesde);
            viewContent.children[23].children[0].setValue(template.ArticuloObsequio1);
            viewContent.children[24].children[0].setValue(template.ArticuloObsequio2);
            viewContent.children[25].children[0].setValue(template.ArticuloObsequio3);
            viewContent.children[26].children[0].setValue(template.ArticuloObsequio4);
            viewContent.children[27].children[0].setValue(template.ArticuloObsequio5);
        //};
    };

    /**
     * Monta y retorna la vista contenedor.
     * @return {Ti.UI.View} La vista contenedor.
     */
    this.getView = function() {
        viewContent.add(viewDataHeader);
        addControls();
        viewContent.add(viewGiftsHeader);
        viewContent.add(labelGifts);
        addGifts();
        fillForm();

        return viewContent;
    };

    /**
     * Retorna la plantilla con sus datos.
     * @return {Object} Las valores de la plantilla.
     */
    this.getTemplate = function() {
        //Índice de los nombres.
        var index = 0;
        //Pasamos los datos del formulario al objeto "template".
        template.CodigoArticulo = viewContent.children[2].children[0].getValue();
        template.Descripcion = viewContent.children[4].getValue();
        template.Venta = viewContent.children[6].getValue();
        template.Regalo = viewContent.children[8].getValue();
        template.DtoUnitario = viewContent.children[10].getValue();
        template.DtoPorcenUnit = viewContent.children[12].getValue();
        template.Rappel = viewContent.children[14].getValue();
        template.PorcenRappel = viewContent.children[16].getValue();
        template.PrecioEspecial = viewContent.children[18].getValue();
        template.PromocionDesde = viewContent.children[20].getValue();
        template.ArticuloObsequio1 = viewContent.children[23].children[0].getValue();
        template.ArticuloObsequio2 = viewContent.children[24].children[0].getValue();
        template.ArticuloObsequio3 = viewContent.children[25].children[0].getValue();
        template.ArticuloObsequio4 = viewContent.children[26].children[0].getValue();
        template.ArticuloObsequio5 = viewContent.children[27].children[0].getValue();

        return template;
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

module.exports = BodyTemplate;
