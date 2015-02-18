/**
 * @fileOverview En este archivo se crea la vista para la búsqueda de artículos.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Esta clase crea una vista para la búsqueda de artículos. Tiene un campo TextField, donde se guarda el código del artículo,
 * y un botón para mostrar un listado de artículos y seleccionar uno.
 * @class
 * @param {Number} type El tipo de teclado que se ha de mostrar para el TextField.
 * @param {Number} length La longitud del campo TextField.
 */
function ItemSearch(type, length) {
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
        height : Ti.UI.SIZE
    });

    /**
     * El campo de texto.
     * @private
     * @type Ti.UI.TextField
     */
    var text = Ti.UI.createTextField({
        left : 0,
        right : 50,
        keyboardType : type,
        maxLength : length
    });

    /**
     * El botón de búsqueda.
     * @private
     * @type Ti.UI.Button
     */
    var button = Ti.UI.createButton({
        image : '/images/search_32.png',
        right : 0,
        // height : 40,
        // width : 40,
    });

    /**
     * El evento 'click' del botón. Muestra un listado de artículos.
     * @private
     * @event 'click.
     */
    button.addEventListener('click', function() {
        var article = new Global.Controller.Articulos();
        var winArticle = article.getMainWin();

        winArticle.addEventListener('article:return', function(e) {
            text.setValue(e.article.CodigoArticulo);
            winArticle.close();
        });

        winArticle.open();
    });

    viewContent.add(text);
    viewContent.add(button);

    return viewContent;
};

module.exports = ItemSearch;
