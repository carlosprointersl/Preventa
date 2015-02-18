/**
 * @fileOverview En este archivo se crea la clase para la edición de los temas.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Esta clase crea una vista para la edición de datos de los temas.
 * @class
 * @param {String} title El título del apartado.
 * @param {Object[]} data Los datos de los colores.
 * <ol>
 * <li>data.title:  {String} El título del parámetro a mostrar.</li>
 * <li>data.name:   {String} El nombre del parámetro en la base de datos.</li>
 * </ol>
 * @param {Object} theme Los datos del tema.
 * @memberof Global.Control
 */
function SectionTheme(title, data, theme) {
    /**
     * La función para crear las filas de la sección.
     * @private
     * @function
     */
    var row = require(Global.Path.VIEW + 'Tema/ThemeEditRow');

    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var viewContent = Ti.UI.createView({
        backgroundColor : Global.Theme.BACKGROUND,
        height : Ti.UI.SIZE,
        width : Ti.UI.FILL,
        layout : 'vertical',
        top : 0.5
    });

    /**
     * La cabecera del apartado.
     * @private
     * @type Ti.UI.View
     */
    var viewHeader = Ti.UI.createView({
        backgroundColor : Global.Theme.HEADER,
        height : Ti.UI.SIZE,
        width : Ti.UI.FILL
    });

    /**
     * El cuerpo del apartado.
     * @private
     * @type Ti.UI.View/Ti.UI.TableView
     */
    var viewBody = Ti.UI.createView({
        height : 0,
        width : Ti.UI.FILL,
        layout : 'horizontal'
    });
    
    /**
     * La tabla con los parámetros.
     * @private
     * @type Ti.UI.TableView 
     */
    var table = Ti.UI.createTableView();

    /**
     * El título del apartado.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitle = Ti.UI.createLabel({
        color : Global.Theme.HEADER_TEXT,
        font : {
            fontSize : 19
        },
        text : title,
        textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
        left : 5,
        right : 50
    });

    /**
     * El botón para mostrar los datos.
     * @private
     * @type Ti.UI.Button
     */
    var button = Ti.UI.createButton({
        image : '/images/arrow_sans_down_32.png',
        right : 0,
        // height : 40,
        // width : 40,
    });
    
    /**
     * Pone al objeto "data" los valores actuales. 
     */
    viewContent.updateData = function(){
        for (var i=0; i < data.length; i++) {
            theme[data[i].name] = viewBody.children[i].getValue();
        };  
    };

    /**
     * El evento 'click' del botón. Hace que se muestre o esconda la vista "body", para la edición de los datos.
     * @private
     * @event 'click.
     */
    button.addEventListener('click', function() {
        var animation = Ti.UI.createAnimation({
            duration : 100
        });
        //Si no tiene altura
        if (!viewBody.down) {
            animation.height = Ti.UI.SIZE;
            viewBody.down = true;
            button.setImage('/images/arrow_sans_up_32.png');
        } else {
            animation.height = 0;
            viewBody.down = false;
            button.setImage('/images/arrow_sans_down_32.png');
        };

        viewBody.animate(animation);
    });

    //Llenamos la vista body con los datos de "data".
    for (var i = 0; i < data.length; i++) {
        var tmp_row = row(data[i].title, theme[data[i].name]);
        //Si NO ES la primera añadimos un espacio encima.
        if(i > 0){
            tmp_row.setTop(0.5);  
        };
        viewBody.add(tmp_row);
    };

    viewHeader.add(labelTitle);
    viewHeader.add(button);
    
    viewContent.add(viewHeader);
    viewContent.add(viewBody);
    
    /*viewContent.addEventListener('postlayout', function(e){
        Ti.API.info('************************* SECTION ' + title + ' EVENT POSTLAYOUT *****************************');
        Ti.API.info('SIZE: h->' + e.source.size.height + ' - w->' + e.source.size.width);
    });
    
    viewBody.addEventListener('postlayout', function(e){
        Ti.API.info('************************* SECTION ' + title + ' VIEWBODY EVENT POSTLAYOUT *****************************');
        Ti.API.info('SIZE: h->' + e.source.size.height + ' - w->' + e.source.size.width);
    });*/

    return viewContent;
};

module.exports = SectionTheme;
