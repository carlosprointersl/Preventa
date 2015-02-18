/**
 * @fileOverview En este archivo se define la clase para crear una fila para mostrar los "Artículos" al añadir uno a un pedido.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una fila para el listado de "Artículos" al añadir uno en un pedido.
 * @class
 * @memberOf Global.Control
 * @param {Object} article Los datos del artículo.
 */
function ArticleRow(article) {
    /**
     * La fila.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var row = Ti.UI.createTableViewRow({
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        backgroundSelectedColor : Global.Theme.ROW.PRESS,
        className : 'rowClient',
        filter : article.CodigoArticulo + article.Descripcion,
    });
    
    /**
     * Contiene los datos del atículo.
     * @private
     * @type Ti.UI.View 
     */
    var content = Ti.UI.createView({
        layout : 'vertical',
        touchEnabled : false
    });
    row.add(content);

    /**
     * Contiene los datos del artículo. El código, las unidades caja y la tarifa.
     * @private
     * @type Ti.UI.View
     */
    var viewDataArticle = Ti.UI.createView({
        layout : 'horizontal',
        height : Ti.UI.SIZE,
        touchEnabled : false
    });

    /**
     * Etiqueta de la descripción.
     * @private
     * @type Ti.UI.Label
     */
    var labelDescription = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 22,
            fontWeight : 'bold'
        },
        text : article.Descripcion,
        left : 2,
        right : 35,
        //height : Ti.UI.SIZE,
        horizontalWrap : false,
        touchEnabled : false
    });
    content.add(labelDescription);
    content.add(viewDataArticle);

    //Añadimos las etiquetas de los datos del artículo.
    /**
     * Las etiquetas de los datos del artículo.
     * @private
     * @type Array
     */
    var labels = [{
        text : article.CodigoArticulo,
        width : '33%'
    }, {
        text : article.UnidadesCaja,
        width : '34%'
    }, {
        text : Global.Functions.numToEuro(article.Tarifa),
        width : '33%'
    }];

    for (var i = 0, j = labels.length; i < j; i++) {
        viewDataArticle.add(Ti.UI.createLabel({
            //backgroundColor : 'red',
            color : Global.Theme.TEXT_SECONDARY,
            font : {
                fontSize : 16
            },
            text : labels[i].text,
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
            height : Ti.UI.FILL,
            width : labels[i].width,
            touchEnabled : false
        }));
    };

    /**
     * El botón para mostrar el menú de acción.
     * @private
     * @type Ti.UI.ImageView
     */
    var butMenu = Ti.UI.createImageView({
        image : '/images/menu_32.png',
        width : 34,
        right : 1,
        top : 0,
        bubbleParent : false
    });
    row.add(butMenu);

    /**
     * El evento 'click' del botón para mostrar/esconder el menú de acciones.
     * @event 'clikc'
     */
    butMenu.addEventListener('click', function() {
        //La selección de las acciones.
        var dialog = Ti.UI.createOptionDialog({
            options : ['Imágen', 'Promociones'],
            title : article.Descripcion
        });
        //El evento 'click' para saber que opción se ha escogido.
        dialog.addEventListener('click', function(e) {
            switch (e.index) {
                case 0:
                    var imageWin = Global.Control.ShowImage(article.CodigoArticulo, article.Descripcion);
                    imageWin.open();
                    break;
                case 1:
                    var offerWin = require(Global.Path.VIEW + 'Pedido/ListOfferArticle')(article);
                    offerWin.open();
                    break;
            };
        });

        dialog.show();
    });

    return row;
};

module.exports = ArticleRow;
