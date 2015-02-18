/**
 * @fileOverview Es la vista para seleccionar una oferta de todas las disponibles.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * La variable Global
 */
var Global = new (require('/global/class/ReturnGlobal'))();

/**
 * Crea la ventana con las ofertas para seleccionar un cliente.
 * @param {Object[]} offers Las ofertas que se van a mostrar.
 * @return {Ti.UI.Window} La ventana con las ofertas.
 */
function createWindow(offers) {
        
    /**
     * La cabecera de la ventana. Cuando pulsamos el botón de retroceso cierra la ventana actual.
     */
    var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Listado de ofertas", "Pedido", function() {
        win.close();
    });


    var viewHead = Ti.UI.createView({
        backgroundColor : Global.Theme.HEADER,
        height : 50,
        width : Ti.UI.FILL,
        layout : 'vertical'
    });
    

    var search = Ti.UI.createTextField({
    width : Ti.UI.FILL,
    height : 50,
    editable : true,
    hintText : 'Busqueda por nombre...'
    });

    var searchBar = Ti.UI.createSearchBar({
    height : 0
    });
    
    viewHead.add(search);
            
    /**
     * La ventana principal.
     * @privae
     * @type Ti.UI.Window
     */
    var win = Ti.UI.createWindow({
        backgroundColor : Global.Theme.BACKGROUND,
        navBarHidden : true,
        layout : 'vertical',
        orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
    });
    win.add(headerMenu);
    win.add(viewHead);

    /**
     * Los datos de la tabla.
     * @type Array
     */
    var data = createData(offers);
    /**
     * La tabla con las ofertas.
     * @type {Ti.UI.TableView}
     */
    var table = Ti.UI.createTableView({
        data : data,
        search : searchBar
        
    });
    win.add(table);
    
    
    //Click en la tabla
    table.addEventListener('click', function(e) {
        
        win.fireEvent('codeOffer', {
            code : e.row._id,
            name : e.row._name
        });
    });
    
    search.addEventListener('change', function(e) {
        
        searchBar.setValue(search.getValue());
        
        if (search.getValue() !== "") {
        var dataFilter = filterData(offers, data, search.getValue());
        table.setData(null);
        table.setData(dataFilter);
        }
        else {
            table.setData(null);
            table.setData(data);
        }
    });
    
    
    return win;

};

function createData(offers){
    var data = new Array();
    // Llenamos los datos para la tabla.
    _.each(offers, function(element) {
        data.push(row({
            name : element.Descripcion,
            code : element.CodigoPromocion
        }));
    });  
   
    return data;
};

function filterData(offers, data, str){
    var str = str.toUpperCase();
    var data2 = new Array();
     _.each(offers, function(element) {
       
       if(element.Descripcion.indexOf(str) > -1) { 
        data2.push(row({
            name : element.Descripcion,
            code : element.CodigoPromocion
        }));}
    });  
   
    return data2;
    
}

/**
 * Crea una fila para mostrar la oferta
 */
function row(offer) {
    /**
     * La fila.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var row = Ti.UI.createTableViewRow({
        backgroundColor : Global.Theme.ROW.BACKGROUND,
        backgroundSelectedColor : Global.Theme.ROW.PRESS,
        className : 'rowOffer'
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
        text : offer.name,
        left : 4,
        top : 4,
        bottom : 4,
        touchEnabled : false
    });
    row.add(labelDescription);

    /**
     * El código de la oferta.
     * @type {Integer}
     */
    row._id = offer.code;
    
    /**
     * El nombre de la oferta.
     * @type {Integer}
     */
    row._name = offer.name;

    return row;
};

module.exports = createWindow;
