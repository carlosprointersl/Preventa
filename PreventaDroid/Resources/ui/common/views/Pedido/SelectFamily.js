/**
 * @fileOverview Es la vista MainWin del controlador Pedido.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La variable Global
 */
var Global = new (require('/global/class/ReturnGlobal'))();

/**
 * Crea la ventana con las familias para seleccionar una.
 * @param {String} [backWin] El nombre de la ventana anterior. Si no se indica nada se da por hecho de que es "Pedido".
 * @return {Ti.UI.Window} La ventana con las familias.
 */
function createWindow(backWin) {
    /**
     * El nombre de la ventana anterior.
     * @type String 
     */
    var backWin = backWin || "Pedido";
    
    /**
     * Las familias de los artículos
     */
    var familys = new Global.Model.Familias().customSelectFamilias(" ORDER BY CodigoArticulo DESC");

    /**
     * La cabecera de la ventana. Cuando pulsamod el botón de retroceso cierra la ventana actual.
     */
    var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Listado de familias", backWin, function() {
        win.close();
    });

    /**
     * La ventana principal.
     * @privae
     * @type Ti.UI.Window
     */
    var win = Ti.UI.createWindow({
        backgroundColor : Global.Theme.BACKGROUND,
        navBarHidden : true,
        //layout : 'vertical',
        orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
    });
    
    /**
     * La vista contenedor.
     * @type Ti.UI.View 
     */
    var content = Ti.UI.createView({
        top : 0,
        bottom : 0,
        layout : 'vertical'
    });
    win.add(content);
    content.add(headerMenu);

    /**
     * Los datos de la tabla.
     * @type Array
     */
    var data = new Array();
    // Llenamos los datos para la tabla.
    _.each(familys, function(element) {
        data.push(row({
            name : element.Familia,
            code : element.CodigoFamilia
        }));
    });

    /**
     * La tabla con las familias.
     * @type {Ti.UI.TableView}
     */
    var table = Ti.UI.createTableView({
        data : data
    });
    content.add(table);

    //Click en la tabla
    table.addEventListener('click', function(e) {
        win.fireEvent('codeFamily', {
            code : e.row._id,
            name : e.row._name
        });
    });
    
    return win;

};

/**
 * Crea una fila para mostrar la familya
 */
function row(family) {
    /**
     * La fila.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var row = Ti.UI.createTableViewRow({
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        backgroundSelectedColor : Global.Theme.ROW.PRESS,
        className : 'rowFamily'
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
        text : family.name,
        left : 4,
        top : 4,
        bottom : 4,
        touchEnabled : false
    });
    row.add(labelDescription);

    /**
     * El código de la familía.
     * @type {Integer}
     */
    row._id = family.code;
    
    /**
     * El nombre de la familía.
     * @type {Integer}
     */
    row._name = family.name;

    return row;
};

module.exports = createWindow;
