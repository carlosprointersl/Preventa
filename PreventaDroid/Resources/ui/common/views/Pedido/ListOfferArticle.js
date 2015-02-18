/**
 * @fileOverview En este archivo se crea la vista que muestra las promociones de un artículo.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una vista donde se muestran las promociones de un artículo.
 * @class
 * @memberOf Global.Control
 * @param {Object} article Los datos del artículo.
 */
function ListOfferArticle(article) {
    /**
     * El modelo/s que se aplica a este controlador.
     * @private
     * @type Model
     */
    var model = new Global.Model.Promociones();

    /**
     * Las ofertas por secciones. La primera son para los artículos, la segunda para las agrupaciones.
     * @private
     * @type Array[]
     */
    var whereDate = " AND (Desde <= '" + Global.Functions.dateSQliteFormat(new Date()) + "' OR Desde IS NULL) AND (Hasta >= '" + Global.Functions.dateSQliteFormat(new Date()) + "' OR Hasta IS NULL)";
    var offers = [article.AutorizacionDtos === 0 ? model.select("WHERE CodigoArticulo = '" + article.CodigoArticulo + "' AND CodigoCliente = '0' AND CodigoAgrupacion = '0'" + whereDate) : new Array(), article.AutorizacionDtos === 0 ? model.select("WHERE CodigoArticulo = '" + article.CodigoArticulo + "' AND CodigoCliente = '0' AND CodigoAgrupacion != '0'" + whereDate) : new Array()];

    /**
     * La ventana.
     * @private
     * @type Ti.UI.Window
     */
    var win = Ti.UI.createWindow({
        backgroundColor : '#000000',
        opacity : 0.5,
        navBarHidden : true
    });

    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var viewMain = Ti.UI.createView({
        left : 20,
        right : 20,
        top : 20,
        bottom : 20,
        backgroundColor : Global.Theme.BACKGROUND,
        layout : 'vertical'
    });

    /**
     * La vista del título.
     * @private
     * @type Ti.UI.View
     */
    var viewTitle = Ti.UI.createView({
        backgroundColor : Global.Theme.HEADER,
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        top : 0
    });

    /**
     * La vista del encabezado.
     * @private
     * @type Ti.UI.View
     */
    var viewHeader = Ti.UI.createView({
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        height : 45,
        layout : 'horizontal'
    });

    /**
     * El botón para cerrar la ventana.
     * @private
     * @type Ti.UI.Button.
     */
    var butClose = Ti.UI.createImageView({
        image : '/images/cancel_image_42.png',
        center : {
            y : 20,
            x : (Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor) - 20
        }
    });

    /**
     * El evento 'click' del botón cierra la ventana.
     * @event 'click'
     */
    butClose.addEventListener('click', function() {
        win.close();
    });

    /**
     * La etiqueta "Nombre artículo".
     * @private
     * @type Ti.UI.Label
     */
    var labelName = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 20
        },
        text : article.Descripcion,
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        horizontalWrap : false
    });

    /**
     * La etiqueta "Descripción".
     * @private
     * @type Ti.UI.Label
     */
    var labelDescription = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 15
        },
        text : 'Descripción',
        textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
        verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        width : "50%",
        height : Ti.UI.FILL
    });

    /**
     * La etiqueta "Desde".
     * @private
     * @type Ti.UI.Label
     */
    var labelFor = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 15
        },
        text : 'Desde',
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        width : "25%",
        height : Ti.UI.FILL
    });
    
    /**
     * La etiqueta "Precio Especial".
     * @private
     * @type Ti.UI.Label
     */
    var labelPrice = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 15
        },
        text : 'Precio Especial',
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        width : "25%",
        height : Ti.UI.FILL
    });

    /**
     * Las filas con las promociones.
     * @private
     * @type Ti.UI.TableViewRow[]
     */
    var rows = new Array();

    /**
     * Las secciones de promociones.
     * @private
     * @type Array
     */
    var sections = new Array();
    //Creamos las filas con las promociones
    //Recorremos las 2 secciones de promociones ARTICULO-GRUPO
    for (var i = 0; i < offers.length; i++) {
        //Si hay datos en esta sección
        if (offers[i].length > 0) {
            sections.push(Ti.UI.createTableViewSection({
                headerTitle : i === 0 ? "Artículo" : "Grupo artículos"
            }));
            for (var x = 0, j = offers[i].length; x < j; x++) {
                var row = Ti.UI.createTableViewRow({
                    layout : 'horizontal'
                });

                //Fecha
                var labelDescriptionRow = Ti.UI.createLabel({
                    color : Global.Theme.TEXT_SECONDARY,
                    font : {
                        fontSize : 13.5
                    },
                    text : offers[i][x].Descripcion,
                    textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
                    verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
                    width : "50%"
                });

                //Desde
                var labelForRow = Ti.UI.createLabel({
                    color : Global.Theme.TEXT_SECONDARY,
                    font : {
                        fontSize : 15
                    },
                    text : offers[i][x].PromocionDesde,
                    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
                    verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
                    width : "25%"
                });
                
                //Precio
                var labelPriceRow = Ti.UI.createLabel({
                    color : Global.Theme.TEXT_SECONDARY,
                    font : {
                        fontSize : 15
                    },
                    text : offers[i][x].PrecioEspecial,
                    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
                    verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
                    width : "25%"
                });

                row.add(labelDescriptionRow);
                row.add(labelForRow);
                row.add(labelPriceRow);

                sections[sections.length - 1].add(row);
            };
        };
    };

    //Si no tiene promociones insertamos una fila que lo indique.
    if (sections.length == 0)
        sections.push(Ti.UI.createTableViewSection({
            headerTitle : "Este artículo no tiene promociones"
        }));

    /**
     * La tabla donde se muestra el listado de promociones.
     * @private
     * @type Ti.UI.TableView
     */
    var table = Ti.UI.createTableView({
        data : sections
    });

    viewTitle.add(labelName);

    viewHeader.add(labelDescription);
    viewHeader.add(labelFor);
    viewHeader.add(labelPrice);

    viewMain.add(viewTitle);
    viewMain.add(viewHeader);
    viewMain.add(table);

    win.add(viewMain);
    win.add(butClose);

    return win;
};

module.exports = ListOfferArticle;
