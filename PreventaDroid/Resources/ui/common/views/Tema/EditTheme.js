/**
 * @fileOverview Es la vista "EditTheme" para la edición de los "Temas".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

//La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//Los datos del tema
var theme = win.theme;

//
// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
//Header
var viewHeader = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    top : 0,
    height : 60,
    layout : 'horizontal'
});

//Body
var viewBody = Ti.UI.createScrollView({
    contentHeight : 'auto',
    layout : 'vertical',
    showVerticalScrollIndicator : true,
    showHorizontalScrollIndicator : false,
    top : 60,
    bottom : 70,
    scrollType : 'vertical'
});
//Content
var viewContent = Ti.UI.createView({
    backgroundColor : 'orange',
    height : Ti.UI.SIZE,
    layout : 'vertical'
});

//Foot
var viewFoot = Ti.UI.createView({
    bottom : 0,
    height : 70,
    width : Ti.UI.FILL
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
//Nombre
var labelName = Ti.UI.createLabel({
    color : Global.Theme.HEADER_TEXT,
    font : {
        fontSize : 21,
        fontWeight : 'bold'
    },
    text : 'Nombre: ',
    width : '30%',
    textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
    center : {
        y : '50%'
    }
});

//
// ---------------------------------------------------------------- TEXTFIELDS -------------------------------------------------
//
//El TextField del nombre del Tema
var textName = Ti.UI.createTextField({
    value : theme.nombre,
    hintText : "Nombre del tema",
    width : '70%',
    first : true,
    center : {
        y : '50%'
    },
    editable : false
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
    width : '50%',
    left : 0
});

var butCancel = Ti.UI.createButton({
    image : '/images/cancel_32.png',
    backgroundColor : Global.Theme.BUTTON.BACKGROUND,
    backgroundSelectedColor : Global.Theme.BUTTON.PRESS,
    color : Global.Theme.BUTTON.TITLE,
    font : {
        fontSize : 23,
        fontStyle : 'bold'
    },
    title : "Cancelar",
    height : Ti.UI.FILL,
    width : '50%',
    right : 0
});

//
// ---------------------------------------------------------------- LINES -------------------------------------------------
//
//Horizontal
var line_h = Ti.UI.createView({
    backgroundColor : Global.Theme.BACKGROUND,
    width : Ti.UI.FILL,
    height : 0.5,
    top : 0.25,
    zIndex : 1
});

//Vertical
var line_v = Ti.UI.createView({
    backgroundColor : Global.Theme.BACKGROUND,
    width : 0.5,
    height : Ti.UI.FILL,
    zIndex : 1,
    center : {
        y : '50%'
    }
});

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Text 'Focus'
textName.addEventListener('focus', function(e) {
    if (e.source.first) {
        e.source.blur();
        e.source.first = false;
    };
});

//Button Cancel
butCancel.addEventListener('click', function() {
    win.close();
});

//Button Save
butSave.addEventListener('click', function() {
    theme.nombre = textName.getValue();
    sectionBase.updateData();
    sectionRow.updateData();
    sectionSection.updateData();
    sectionButton.updateData();
    sectionPopup.updateData();
    sectionOrder.updateData();
    win.fireEvent('save');
});

//Postlayout
win.addEventListener('postlayout', showText);

//
// ---------------------------------------------------------------- DATA CONTROLS -------------------------------------------------
//
// Los colores base.
var base = [{
    title : "Base nº 1",
    name : "base_n1"
}, {
    title : "Base nº 2",
    name : "base_n2"
}, {
    title : "Base nº 3",
    name : "base_n3"
}, {
    title : "Base nº 4",
    name : "base_n4"
}];
// Los colores "row".
var row = [{
    title : "Fondo",
    name : "row_background"
}, {
    title : "Seleccionada",
    name : "row_press"
}, {
    title : "Principal",
    name : "row_title"
}, {
    title : "Secundario",
    name : "row_subtitle"
}];
// Los colores de sección.
var section = [{
    title : "Fondo",
    name : "section_background"
}, {
    title : "Texto",
    name : "section_text"
}];
// Los colores de los botones.
var button = [{
    title : "Fondo",
    name : "button_background"
}, {
    title : "Seleccionado",
    name : "button_press"
}, {
    title : "Texto",
    name : "button_title"
}];
// Los colores de las ventanas emergentes.
var popup = [{
    title : "Fondo",
    name : "popup_background"
}, {
    title : "Texto",
    name : "popup_text"
}, {
    title : "Lineas",
    name : "popup_lines"
}];
// Los colores del total de la fila de un pedido.
var order = [{
    title : "Fondo",
    name : "order_total_background"
}, {
    title : "Texto",
    name : "order_total_text"
}, {
    title : "Borde",
    name : "order_total_border"
}];
//
// ---------------------------------------------------------------- SECTIONS -------------------------------------------------
//
var sectionBase = require(Global.Path.CONTROL + 'View/SectionTheme')("Colores base", base, theme);
var sectionRow = require(Global.Path.CONTROL + 'View/SectionTheme')("Colores de las filas", row, theme);
var sectionSection = require(Global.Path.CONTROL + 'View/SectionTheme')("Colores de las secciones", section, theme);
var sectionButton = require(Global.Path.CONTROL + 'View/SectionTheme')("Colores de los botones", button, theme);
var sectionPopup = require(Global.Path.CONTROL + 'View/SectionTheme')("Colores ventanas modales", popup, theme);
var sectionOrder = require(Global.Path.CONTROL + 'View/SectionTheme')("Colores totales pedido", order, theme);

//
// ---------------------------------------------------------------- FUNCTIONS -------------------------------------------------
//
/**
 * Muestra el campo de texto.
 */
function showText(){
    textName.blur();
    setTimeout(function(){
        textName.setEditable(true);
    }, 500);
    win.removeEventListener('postlayout', showText);
};

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
viewBody.add(sectionBase);
viewBody.add(sectionRow);
viewBody.add(sectionSection);
viewBody.add(sectionButton);
viewBody.add(sectionPopup);
viewBody.add(sectionOrder);

//viewBody.add(viewContent);


viewHeader.add(labelName);
viewHeader.add(textName);

viewFoot.add(butSave);
viewFoot.add(butCancel);
viewFoot.add(line_h);
viewFoot.add(line_v);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(viewHeader);
win.add(viewBody);
win.add(viewFoot);
