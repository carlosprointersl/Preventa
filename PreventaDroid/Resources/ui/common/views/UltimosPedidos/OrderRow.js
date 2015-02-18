/**
 * @fileOverview En este archivo se crea la fila para mostrar los datos de los últimos pedidos.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una fila para el listado de "Últimos pedidos".
 * @class
 * @param {Object} order Los datos del pedido.
 */
function OrderRow(order) {

    /**
     * La fila.
     * @private
     * @type Ti.UI.TableViewRow
     */
    var row = require(Global.Path.CONTROL + 'Row/SimpleRow')();

    //Modificamos las opciones de la vista "content" del "row".
    row.setLayout("vertical");
    row.setClassName('orderDate');

    //La descripcion
    var viewDescription = Ti.UI.createView({
        height : Global.Parameters.Configuracion.getViewLastOrders() == "C" ? Ti.UI.SIZE : 0,
        width : Ti.UI.FILL,
        layout : 'horizontal'
    });

    //Los nombres de los campos
    var viewTitlesFields = Ti.UI.createView({
        height : Ti.UI.SIZE,
        width : Ti.UI.FILL,
        layout : 'horizontal'
    });

    //Los datos de los campos
    var viewDataFields = Ti.UI.createView({
        height : Ti.UI.SIZE,
        width : Ti.UI.FILL,
        layout : 'horizontal'
    });

    //Descripcion
    var labelDescription = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 17,
            fontWeight : 'bold'
        },
        text : order.description,
        horizontalWrap : true,
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,
        left : 2
    });

    // var labelsTitleName = ['Código', 'Cantidad', 'Precio', 'Descuento', 'P.U.'];
    var labelsWidths = ['20', '20', '20', '20', '20'];

    // for (var i = 0; i < labelsTitleName.length; i++) {
        // viewTitlesFields.add(Ti.UI.createLabel({
            // color : Global.Theme.TEXT_SECONDARY,
            // font : {
                // fontSize : 13
            // },
            // text : labelsTitleName[i],
            // textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
            // height : Ti.UI.FILL,
            // width : labelsWidths[i] + '%'
        // }));
    // };

    var labelsDataName = [order.code, order.quantity, order.price, order.discount, order.pu];

    for (var i = 0; i < labelsDataName.length; i++) {
        viewDataFields.add(Ti.UI.createLabel({
            color : Global.Theme.TEXT_SECONDARY,
            font : {
                fontSize : 13
            },
            text : labelsDataName[i],
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
            height : Ti.UI.FILL,
            width : labelsWidths[i] + '%'
        }));
    };

    viewDescription.add(labelDescription);
    
    /**
     * Pasa de tipo "Detallada" a "Simple".
     */
    row.setType = function(){
        viewDescription.setHeight(viewDescription.getHeight() == 0 ? Ti.UI.SIZE : 0);
    };
    
    row.add(viewDescription);
    //row.add(viewTitlesFields);
    row.add(viewDataFields);

    return row;
};

module.exports = OrderRow;
