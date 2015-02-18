/**
 * @fileOverview En este archivo se crea el la vista del cuerpo de la ventana para las unidades del artículo en el pedido.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La variable Global
 * @type Object
 */
var Global = new (require('/global/class/ReturnGlobal'))();

/**
 * Crea la vista del cuerpo para la edición de las unidades del artículo para un pedido.
 * @param {Object} article Los datos del artículo o de los artículos. Cuando tiene más de un artículo estos se encuantran en la propiedad "articles".
 * @param {String} title El título de la ventana actual.
 */
function SaleWin(article, title) {
    /**
     * El constructor de la ventana.
     * @private
     * @type Function
     */
    var saleWin = require(Global.Path.CONTROL + 'Window/SaleWin');
    
    /**
     * El cuerpo del mensaje emergente.
     * @private
     * @type Ti.UI.View
     */
    var body = Ti.UI.createView({
        layout : 'vertical'
    });

    /**
     * La ventana.
     * @private
     * @type Ti.UI.Window
     */
    var win = new saleWin(title, article.Descripcion, "Cerrar", body, article._del);

    /**
     * La ventana como objeto de Ti.
     * @private
     * @type Ti.UI.Window
     */
    var winTi = win.getWin();

    /**
     * Añade una función al evento 'click' del botón "Aceptar" de la ventana.
     * @param {Function} callback La función ha realizar al producirse el evento.
     * @event 'click'
     */
    this.addEventAcceptListener = function(callback) {
        win.addEventListener(win.BUTTON_ACCEPT, "click", function() {
            callback();

            //El tipo de promoción
            winTi.fireEvent('save', {
                article : article.articles == undefined ? article : article.articles
            });

            winTi.close();
        });
    };

    /**
     * Añade un evento al botón "Eliminar" de la ventana.
     * @event 'click'
     */
    win.addEventListener(win.BUTTON_DELETE, "click", function() {
        //El evento para eliminar la fila
        winTi.fireEvent('but:delete');
    });

    /**
     * Añadimos la ventana para la venta al artículo.
     * @param {Object} saleWin La ventana para la venta.
     */
    winTi.addWinOffer = function(saleWin) {
        article.winOffer = saleWin;
    };

    /**
     * Añade controles al "body".
     * @param {Object} control El control a añadir al "body".
     */
    this.bodyAdd = function(control) {
        body.add(control);
    };
    
    /**
     * Modifica valores de las propiedades de la vista "body".
     * @param {String} name El nombre de la propiedad.
     * @param {Indefined} value El valor para asignarle a la propiedad. 
     */
    this.setValueBody = function(name, value){
        body[name] = value;
    };

    /**
     * Cambia el estado del botón aceptar.
     * @param {Boolean} state El estado del botón aceptar
     */
    this.setButtonState = function(state) {
        win.buttonState(state);
    };

    /**
     * Retorna la ventana lista para utilizar.
     * @return {Ti.UI.Window} La ventana para editar las unidades de venta.
     */
    this.getWin = function() {
        return winTi;
    };
    
};

module.exports = SaleWin;
