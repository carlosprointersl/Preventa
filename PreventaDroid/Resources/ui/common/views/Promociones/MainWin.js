/**
 * @fileOverview Es la vista MainWin de las promociones del artículo.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La variable Global
var Global = win.Global;
//Datos del artículo
var article = win.article;
//Las promociones
var offers = win.offers;
//La fila "check"
var checkRow;
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Promociones", "Artículos", function() {
    win.close();
});
headerMenu.setTop(0);

// ---------------------------------------------------------------- VIEWS -------------------------------------------------
//
viewMain = Ti.UI.createView();

//Header
var viewHeader = Ti.UI.createView({
    backgroundColor : Global.Theme.HEADER,
    height : 55,
    width : Ti.UI.FILL,
    top : 50,
    layout : 'vertical'
});

//
// ---------------------------------------------------------------- LABELS -------------------------------------------------
//
//Nombre artículo
var labelName = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 22,
        fontWeight : 'bold'
    },
    text : article.Descripcion,
    left : 2,
    width : Ti.UI.FILL,
    height : 33,
    horizontalWrap : false
});

//Código del artículo
var labelCode = Ti.UI.createLabel({
    color : Global.Theme.TEXT_PRINCIPAL,
    font : {
        fontSize : 17
    },
    text : article.CodigoArticulo,
    left : 2,
    textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
    width : Ti.UI.FILL,
    height : Ti.UI.SIZE,
    horizontalWrap : false
});

//
// ---------------------------------------------------------------- TABLE VIEW -------------------------------------------------
//

//El número de filas insertadas
var countRows = 0;
//El índice "check"
var indexCheck = 0;
//las secciones
var sections = new Array();
var section = new (require(Global.Path.CONTROL + 'Row/SectionRow'))();
//Añadimos la fila de "SIN PROMOCIÓN"
sections.push(section.getRow('Sin promoción'));
sections[sections.length - 1].add(Ti.UI.createTableViewRow({
    className : 'noOffer',
    height : 55,
    font : {
        fontSize : 20
    },
    color : Global.Theme.TEXT_SECONDARY,
    title : "Edición libre",
    offer : undefined
}));

//Creamos las filas con las promociones
//Recorremos las 3 secciones de promociones CLIENTE-ARTICULO-GRUPO
for (var i = 0; i < offers.length; i++) {
    //Si hay datos en esta sección
    if (offers[i].length > 0) {
        sections.push(section.getRow(i === 0 ? "Cliente - Artículo" : i === 1 ? "Artículo" : "Grupo artículos"));
        for (var x = 0; x < offers[i].length; x++) {
            var row = Ti.UI.createTableViewRow({
                className : 'offer',
                height : 55,
                font : {
                    fontSize : 20
                },
                color : Global.Theme.TEXT_SECONDARY,
                title : offers[i][x].Descripcion != undefined ? offers[i][x].Descripcion : "Descuento Fijo",
                offer : offers[i][x],
                _type : offers[i][x].Tipo
            });

            sections[sections.length - 1].add(row);

            //Si CodigoPromocion es igual al del artículo lo marcamos.
            if (article.CodigoPromocion == offers[i][x].CodigoPromocion) {
                row.setHasCheck(true);
                row.setClassName("checked");
                indexCheck = countRows;
            };

            countRows += 1;
        };
    };
};

var table = Ti.UI.createTableView({
    data : sections,
    top : viewHeader.top + viewHeader.getHeight(),
    bottom : 0
});

//Nos situamos en la fila seleccionada.
table.scrollToIndex(indexCheck);

//
// ---------------------------------------------------------------- EVENTS -------------------------------------------------
//
//Click en la tabla
table.addEventListener('click', function(e) {
    win.fireEvent('offer:save', {
        row : e.row.offer == undefined ? undefined : e.row
    });
    //alert(e.index + " -> " + e.row.title);
});

//Al abrir la ventana miramos si hay "descuento fijo", en caso afirmativo abrimos esta oferta
win.addEventListener('open', function() {
    if (offers[0].length > 0) {
        //Recupera la sección Cliente - Artículo si la hay
        for (var i = 0, j = table.sections.length; i < j; i++) {
            if (table.sections[i].headerView.children[0].text == "Cliente - Artículo") {
                var _rows = table.sections[i].getRows();

                for (var i = 0, j = _rows.length; i < j; i++) {
                    if (_rows[i]._type != "" || _rows[i]._type != null) {
                        var row = _rows[i];
                        win.fireEvent('offer:save', {
                            row : row.offer == undefined ? undefined : row
                        });
                    };
                };

                break;
            };
        };
    };
});

//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//

viewHeader.add(labelName);
viewHeader.add(labelCode);

viewMain.add(headerMenu);
viewMain.add(viewHeader);
viewMain.add(table);

//
// ---------------------------------------------------------------- ADD VIEWS -------------------------------------------------
//
win.add(viewMain);
