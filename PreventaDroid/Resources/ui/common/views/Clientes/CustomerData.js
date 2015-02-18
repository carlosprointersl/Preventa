/**
 * @fileOverview Es la vista "CustomerData" para la edición de "Clientes".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
var Global = win.Global;
var row = win.row;
// Los campos que son día de la semana representados con una letra.
var week = ["DiaPreventa", "DiaCierre", "DiaServicio"];
// Función para editar/recuperar los datos del campo "Frecuencia".
var pickerFrecuency = win.pickerFrecuency;
//La vista plantilla.
var template = win.template;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Datos del cliente", "Clientes", function() {
    win.close();
});
headerMenu.setTop(0);
//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Body
var viewBody = Ti.UI.createScrollView({
    contentHeight : 'auto',
    height : Ti.UI.FILL,
    layout : 'vertical',
    showVerticalScrollIndicator : true,
    showHorizontalScrollIndicator : false,
    top : 50,
    bottom : 70,
    scrollType : 'vertical'
});

//Foot
var viewFoot = Ti.UI.createView({
    bottom : 0,
    height : 70,
    width : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- BUTTONS -------------------------------------------------
//
var butSave = Ti.UI.createButton({
    image : '/images/save_32.png',
    backgroundColor : Global.Theme.BUTTON.BACKGROUND,
    backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
    color : Global.Theme.BUTTON.TITLE,
    font : {
        fontSize : 23,
        fontStyle : 'bold'
    },
    title : "Guardar",
    height : Ti.UI.FILL,
    width : Ti.UI.FILL,
    // left : 0
});

//
// ---------------------------------------------------------------- LINES -------------------------------------------------
//
//Horizontal
var line_h = Ti.UI.createView({
    backgroundColor : Global.Theme.LINES,
    width : Ti.UI.FILL,
    height : 0.5,
    top : 0.25,
    zIndex : 1
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//

//Button Save
butSave.addEventListener('click', function() {
    //Recorremos todas las secciones del formulario de cliente
    for (var c = 0, j = viewBody.children.length - 1; c < j; c++) {

        var values = viewBody.children[c].getValues();
        for (var i = 0; i < values.length; i++) {
            row[values[i].name] = values[i].options.value;
        };
    };

    //Pasamos los datos de día de la semana.
    for (var i = 0, j = week.length; i < j; i++) {
        var day = Global.Functions.indexToDay(row[week[i]] - 1);
        row[week[i]] = day != -1 ? day : null;
    };
    //La frecuencia
    row.Frecuencia = pickerFrecuency(row.Frecuencia);

    //Pasa las plantillas al objeto "row" que contiene los datos del cliente.
    template.saveTemplates();

    win.fireEvent('saveForm', {
        client : row
    });

    win.close();
});

//
// ---------------------------------------------------------------- DATA CONTROLS -------------------------------------------------
//

// Los campos y valores para el aparatado de "Datos empresa".
var company = [{
    title : "CIF/NIF",
    name : "NIF",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.NIF,
        maxLength : 12
    }
}, {
    title : "Nombre fiscal",
    name : "NombreFiscal",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.NombreFiscal,
        maxLength : 30
    }
}, {
    title : "Nombre comercial",
    name : "NombreComercial",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.NombreComercial,
        maxLength : 30
    }
}, {
    title : "Persona de contacto",
    name : "Contacto",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.Contacto,
        maxLength : 30
    }
}, {
    title : "Teléfono 1",
    name : "Telefono1",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.Telefono1,
        maxLength : 9,
        keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD
    }
}, {
    title : "Teléfono 2",
    name : "Telefono2",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.Telefono2,
        maxLength : 9,
        keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD
    }
}];

// Los campos y valores para el aparatado de "Datos consumo".
var consume = [{
    title : "Detrás del código cb 1Q",
    name : "1Q",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row["1Q"],
        maxLength : -1
    }
}, {
    title : "Detrás del código cb 2Q",
    name : "2Q",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row["2Q"],
        maxLength : -1
    }
}, {
    title : "Descuento pronto pago",
    name : "DtoPP",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.DtoPP,
        maxLength : -1
    }
}, {
    title : "Tipo de establecimiento",
    name : "TipoEstablecimiento",
    type : Global.Control.View.SectionClient.TYPE.PICKER,
    options : {
        value : row.TipoEstablecimiento,
        items : new Global.Controller.TipoEstablecimiento().getPicker()
    }
}, {
    title : "Acumulación del importe de venta",
    name : "AcumulacionImporteVenta",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.AcumulacionImporteVenta,
        maxLength : -1
    }
}];

// Los campos y valores para el aparatado de "Datos consumo".
var typeVia = [{
    title : "Província",
    name : "Provincia",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.Provincia,
        maxLength : 30
    }
}, {
    title : "Población",
    name : "Poblacion",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.Poblacion,
        maxLength : 30
    }
}, {
    title : "Código postal",
    name : "CodigoPostal",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.CodigoPostal,
        maxLength : 5,
        keyaboardType : Ti.UI.KEYBOARD_NUMBER_PAD
    }
}, {
    title : "Tipo de vía",
    name : "TipoVia",
    type : Global.Control.View.SectionClient.TYPE.PICKER,
    options : {
        value : row.TipoVia,
        items : new Global.Controller.TipoVia().getPicker()
    }
}, {
    title : "Número",
    name : "Numero",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.Numero,
        maxLength : 30,
        keyaboardType : Ti.UI.KEYBOARD_NUMBER_PAD
    }
}, {
    title : "Dirección",
    name : "Direccion",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.Direccion,
        maxLength : 30
    }
}, {
    title : "Posición GPS",
    type : Global.Control.View.SectionClient.TYPE.BUTTON,
    options : {
        value : "Recuperar la posición GPS actual"
    }
}, {
    title : "Longitud",
    name : "GPSLongitud",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.GPSLongitud,
        maxLength : 30,
        keyaboardType : Ti.UI.KEYBOARD_NUMBER_PAD
    }
}, {
    title : "Latitud",
    name : "GPSLatitud",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.GPSLatitud,
        maxLength : 30,
        keyaboardType : Ti.UI.KEYBOARD_NUMBER_PAD
    }
}];

// Los campos y valores para el aparatado de "Datos bancarios".
var bank = [{
    title : "Número de cuenta",
    name : "NumCuenta",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.NumCuenta,
        maxLength : 20,
        keyaboardType : Ti.UI.KEYBOARD_NUMBER_PAD
    }
}, {
    title : "Secuéncia",
    name : "Secuencia",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.Secuencia,
        maxLength : -1,
        keyaboardType : Ti.UI.KEYBOARD_NUMBER_PAD
    }
}, {
    title : "Crédito",
    name : "Credito",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.Credito,
        maxLength : -1
    }
}, {
    title : "Forma de pago",
    name : "FormaPago",
    type : Global.Control.View.SectionClient.TYPE.PICKER,
    options : {
        value : row.FormaPago,
        items : new Global.Controller.FormaPago().getPicker()
    }
}];

// Los campos y valores para el aparatado de "Datos de consumo extras".
var consume2 = [{
    title : "Activa",
    name : "Activacion",
    type : Global.Control.View.SectionClient.TYPE.CHECK,
    options : {
        value : row.Activacion
    }
}, {
    title : "Cambio de datos",
    name : "CambioDatos",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.CambioDatos,
        maxLength : 12
    }
}, {
    title : "Frecuencia",
    name : "Frecuencia",
    type : Global.Control.View.SectionClient.TYPE.PICKER,
    options : {
        value : pickerFrecuency(row.Frecuencia),
        items : ["Ninguna opción seleccionada", "SEMANAL", "1º QUINZENA", "2º QUINZENA"]
    }
}, {
    title : "Día de servicio",
    name : "DiaServicio",
    type : Global.Control.View.SectionClient.TYPE.PICKER,
    options : {
        value : Global.Functions.dayToIndex(row.DiaServicio) + 1,
        items : ["Ninguna opción seleccionada", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"]
    }
}, {
    title : "Tarifa",
    name : "Tarifa",
    type : Global.Control.View.SectionClient.TYPE.PICKER,
    options : {
        value : row.Tarifa,
        items : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    }
}/*,    {
 title : "Código IVA",
 type : Global.Control.View.SectionClient.TYPE.PICKER,
 options : {
 value : undefined,
 items : ["Ninguna opción seleccionada", "1", "2", "3", "4"]
 }
 }*/, {
    title : "Permitir ofertas",
    name : "PermitirOfertas",
    type : Global.Control.View.SectionClient.TYPE.CHECK,
    options : {
        value : row.PermitirOfertas
    }
}];

// El botón para editar las plantillas del cliente.
var templates = [{
    title : "Plantillas",
    type : Global.Control.View.SectionClient.TYPE.BUTTON,
    options : {
        value : "Gestionar plantillas"
    }
}];

// Los campos y valores para el aparatado de "Datos de consumo extras".
var route = [{
    title : "Equivalencia",
    name : "Equivalencia",
    type : Global.Control.View.SectionClient.TYPE.CHECK,
    options : {
        value : row.Equivalencia
    }
}, {
    title : "Ruta",
    name : "Ruta",
    type : Global.Control.View.SectionClient.TYPE.TEXT_FIELD,
    options : {
        value : row.Ruta,
        maxLength : 3,
        keyaboardType : Ti.UI.KEYBOARD_NUMBER_PAD
    }
}, {
    title : "Día de la Preventa",
    name : "DiaPreventa",
    type : Global.Control.View.SectionClient.TYPE.PICKER,
    options : {
        value : Global.Functions.dayToIndex(row.DiaPreventa) + 1,
        items : ["Ninguna opción seleccionada", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"]
    }
}, {
    title : "Día de cierre",
    name : "DiaCierre",
    type : Global.Control.View.SectionClient.TYPE.PICKER,
    options : {
        value : Global.Functions.dayToIndex(row.DiaCierre) + 1,
        items : ["Ninguna opción seleccionada", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"]
    }
}, {
    title : "Nocturno",
    name : "Nocturno",
    type : Global.Control.View.SectionClient.TYPE.CHECK,
    options : {
        value : row.Nocturno
    }
}, {
    title : "Valoración del pedido",
    name : "ValoracionPedido",
    type : Global.Control.View.SectionClient.TYPE.CHECK,
    options : {
        value : row.ValoracionPedido
    }
}, {
    title : "Observaciones",
    name : "Observaciones",
    type : Global.Control.View.SectionClient.TYPE.TEXT_AREA,
    options : {
        value : row.Observaciones,
        maxLength : 60
    }
}];
//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//

viewBody.add(new (require(Global.Path.CONTROL + 'View/SectionClient').CreateView)("Datos de empresa", company));
viewBody.children[0].children[1].children[0].children[1].setEditable(false);
viewBody.add(new (require(Global.Path.CONTROL + 'View/SectionClient').CreateView)("Datos de consumo", consume));
viewBody.add(new (require(Global.Path.CONTROL + 'View/SectionClient').CreateView)("Datos de localización", typeVia));
viewBody.add(new (require(Global.Path.CONTROL + 'View/SectionClient').CreateView)("Datos bancarios", bank));
viewBody.add(new (require(Global.Path.CONTROL + 'View/SectionClient').CreateView)("Datos extra de consumo", consume2));
viewBody.add(new (require(Global.Path.CONTROL + 'View/SectionClient').CreateView)("Datos de la ruta", route));
viewBody.add(template.index());

viewFoot.add(butSave);
viewFoot.add(line_h);

//
// ---------------------------------------------------------------- EVENTS WIN -------------------------------------------------
//
//Postalyout
win.addEventListener('postlayout', showNif);

//
// ---------------------------------------------------------------- FUNCTIONS -------------------------------------------------
//
function showNif(){
    var text = viewBody.children[0].children[1].children[0].children[1];
    text.blur();
    setTimeout(function(){
        text.setEditable(true);    
    }, 500);
    win.removeEventListener('postlayout', showNif);  
};

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(headerMenu);
win.add(viewBody);
win.add(viewFoot);
