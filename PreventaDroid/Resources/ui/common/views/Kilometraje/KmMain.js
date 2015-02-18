/**
 * @fileOverview En este archivo se crea el objeto que define la edición del "Kilometraje".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * @class Esta clase define la vista del cuerpo de la ventana de kilometraje.</br>
 * También proviene de funcionalidades para que la inserción de datos sea correcta.
 * @param {Object/Object[]} dataKm Cuando es un array contiene los vehículos. Cuando es un Object contiene los datos de un Kilometraje.
 */
function KmMain(dataKm) {
    /**
     * La vista principal
     * @private
     * @type Ti.UI.View
     */
    var body = Ti.UI.createView({
        height : Ti.UI.SIZE,
        layout : 'vertical'
    });
    
    /**
     * Indica si es INICIO día.
     * @private
     * @type Boolean 
     */
    var isStartDay = Array.isArray(dataKm);
    
    /**
     * El vehículo seleccionado.
     * @private
     * @type Object 
     */
    var selectVehicle;

    /**
     * Las filas que componen la vista.
     * @private
     * @type Ti.UI.View
     */
    var viewRegistration = isStartDay ? createViewRow(createLabel("Matrícula"), createPicker()) : createViewRow(createLabel("Matrícula: " + dataKm.matricula));
    var viewNew = isStartDay ? createViewRow(createLabel("Nueva matrícula"), createTextField(), createLabel({
        color : 'red',
        fontSize : 16,
        text : "La matrícula ya existe.",
        height : 0
    }), 0) : undefined;
    var viewKm = createViewRow(createLabel("Kilómetros"), createTextField({
        keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
        value : isStartDay ? undefined : dataKm.kmInicio
    }));
    var viewRefuel = createViewRow(createLabel("Respostaje"), createTextField({
        keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
        value : "0"
    }));

    /**
     * Indica si se utiliza una matrícula nueva.
     * @private
     * @type Boolean
     */
    var newRegistration;

    /**
     * Crea un desplegable con las matrículas actuales. Se controla el evento "change" del mismo.
     * @return {Ti.UI.Picker} Un desplegable con las matrículas actuales.
     */
    function createPicker() {
        //Picker
        var pick = Ti.UI.createPicker();
        //La fila "Ninguna"
        pick.add(Ti.UI.createPickerRow({
            title : "Seleccione"
        }));
        //Añadimos las matrículas
        for (var i = 0, j = dataKm.length; i < j; i++) {
            pick.add(Ti.UI.createPickerRow({
                title : dataKm[i].matricula
            }));
        };
        //La fila "Otra"
        pick.add(Ti.UI.createPickerRow({
            title : "Otra"
        }));

        //El evento "change"
        pick.addEventListener('change', function(e) {
            //SI la opción es "Otra"
            if (e.row.getTitle() === "Otra") {
                viewNew.animate(Ti.UI.createAnimation({
                    duration : 100,
                    height : Ti.UI.SIZE
                }));
                newRegistration = true;
            } else {
                viewNew.animate(Ti.UI.createAnimation({
                    duration : 100,
                    height : 0
                }));
                newRegistration = false;
                //Si es "Seleccione".
                if (e.rowIndex === 0) {
                    viewKm.children[1].setValue("");
                    viewRefuel.children[1].setValue("");
                } else {
                    //Ponemos los datos de la matrícula en el formulario.
                    viewKm.children[1].setValue(dataKm[e.rowIndex - 1].kmFin);
                    viewRefuel.children[1].setValue("0");
                    selectVehicle = dataKm[e.rowIndex - 1];
                };

            };
        });

        return pick;
    };

    /**
     * Crea una etiqueta con el formato predefinido.
     * @param {String/Object} options Las opciones diferenciales de la etiqueta.</br>
     * <ul>
     * <li>options.color {String} El color de la etiqueta.</li>
     * <li>options.fontSize {String} El tamaño de la etiqueta.</li>
     * <li>options.text {String} El texto de la etiqueta.</li>
     * </ul>
     * @return {Ti.UI.Label} La etiqueta formada.
     */
    function createLabel(options) {
        return Ti.UI.createLabel({
            color : typeof options === "string" ? Global.Theme.TEXT_PRINCIPAL : options.color || Global.Theme.TEXT_PRINCIPAL,
            font : {
                fontSize : typeof options === "string" ? 20 : options.fontSize || 20
            },
            text : typeof options === "string" ? options : options.text,
            visible : typeof options === "string" ? true : options.visible,
            left : 2,
            width : Ti.UI.SIZE,
            height : typeof options === "string" ? Ti.UI.SIZE : options.height != undefined ? options.height : Ti.UI.SIZE
        });
    };

    /**
     * Crea un campo de texto.
     * @param {Object} options Las opciones diferenciales del campo.</br>
     * <ul>
     * <li>options.value {String} El contenido del campo, si lo tiene.</li>
     * <li>options.keyboardTyp {Number} El tipo de teclado que se muestra para el campo.</li>
     * </ul>
     * @return {Ti.UI.TextField} El campo de texto con su formato.
     */
    function createTextField(options) {
        return Ti.UI.createTextField({
            value : options != undefined ? options.value : "",
            keyboardType : options != undefined ? options.keyboardType : Ti.UI.KEYBOARD_DEFAULT,
            width : Ti.UI.FILL
        });
    };

    /**
     * Crea una fila con una etiqueta y el control de los datos, que es un TextField o un Picker.
     * @return {Ti.UI.View} La vista con sus componentes.
     */
    function createViewRow() {
        //La vista contenedora
        var view = Ti.UI.createView({
            layout : 'vertical',
            height : arguments[3] != undefined ? arguments[3] : Ti.UI.SIZE
        });
        //El primer argumento es Label.
        view.add(arguments[0]);
        //El segundo argumento es Picker/TextField.
        if(arguments[1] != undefined)
            view.add(arguments[1]);
        //Si hay un tercer argumento es Label "existe matrícula".
        if (arguments[2] != undefined) {
            var text = arguments[2];
            text._visible = false;
            //Añadimos el evento en el TextField
            arguments[1].addEventListener('change', function() {
                if (text._visible) {
                    text.animate(Ti.UI.createAnimation({
                        height : 0
                    }));
                    text._visible = false;
                };
            });
            view.add(arguments[2]);
        };

        return view;
    };

    /**
     * Indica si la nueva matrícula ya existe en las actuales.
     * @param {String} registration La matrícula a buscar.
     * @return {Boolean} Retorna "TRUE" si la matrícula ya existe, "FALSE" en caso contrario.
     */
    function registrationExists(registration) {
        var index = 0;
        var end = dataKm.length;
        //Mientras no la encuentre y no llege al final.
        while (index < end && registration != dataKm[index].matricula) {
            index += 1;
        };

        return index < end;
    };

    /**
     * Comprueba que los datos del formulario en "INICIO DE DÍA" son correctos.
     * @return {Boolean} Retorna TRUE si los datos son correctos, FALSE en caso contrario.
     */
    function isOkStart() {
        //Deber haber una matrícula seleccionada.
        //El picker debe seleccionar un índice diferente al primero.
        if (viewRegistration.children[1].getSelectedRow(0).getTitle() == "Seleccione")
            return false;
        //Si el índice es el último, debe haber una matrícula en el TextField.
        if (newRegistration && viewNew.children[1].getValue() == "") {
            return false;
        } else {
            //Si la matrícula ya existe
            if (registrationExists(viewNew.children[1].getValue())) {
                viewNew.children[2].animate(Ti.UI.createAnimation({
                    height : Ti.UI.SIZE
                }));
                viewNew.children[2]._visible = true;
                return false;
            };
        };
        //Los campos kilómetros y repostaje no pueden estar vacíos.
        if (viewKm.children[1].getValue() == "" || viewRefuel.children[1].getValue() == "")
            return false;

        return true;
    };
    
    /**
     * Comprueba que los datos del formulario en "FIN DE DÍA" son correctos.
     * @return {Boolean} Retorna TRUE si los datos son correctos, FALSE en caso contrario.
     */
    function isOkEnd() {
        //Los campos kilómetros y repostaje no pueden estar vacíos.
        if (viewKm.children[1].getValue() == "" || viewRefuel.children[1].getValue() == "")
            return false;

        return true;
    };

    /**
     * Retorna la vista que forma el cuerpo.
     * @return {Ti.UI.View} La vista formada.
     */
    this.getBody = function() {
        body.add(viewRegistration);
        if (Array.isArray(dataKm))
            body.add(viewNew);
        body.add(viewKm);
        body.add(viewRefuel);

        return body;
    };

    /**
     * Comprueba que los datos del formulario son correctos. En caso contrario comunica los erróneos.
     * @return {Boolean} Retorna "True" si los datos del formulario son correctos, en caso contrario retorna "False".
     */
    this.isOk = function() {
        //Hace una comprobación diferente según es INICIO o FIN de día.
        if(isStartDay)
            return isOkStart();  
         else 
            return isOkEnd();
    };

    /**
     * Recupera los datos del formulario para realizar las operaciones pertinentes.
     * @return {Object} Un objeto donde sus atributos son los datos del formulario.
     */
    this.getValues = function() {
        return {
            newRegistration : newRegistration,
            registration : isStartDay ? newRegistration ? viewNew.children[1].getValue() : selectVehicle.id : dataKm,
            km : viewKm.children[1].getValue(),
            refuel : viewRefuel.children[1].getValue()
        };
    };
};

module.exports = KmMain;
