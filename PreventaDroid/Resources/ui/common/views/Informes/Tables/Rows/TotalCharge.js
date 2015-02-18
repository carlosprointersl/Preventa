/**
 * @fileOverview En este archivo se crea la fila final de los cobros donde están los totales.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una "Row" con los importes totales de los cobros.
 * @class
 * @param {Object} options Las opciones del objeto.
 * <ul>
 * <li>options.cash: El importe total de los cobros en metálico.</li>
 * <li>options.check: El importe total de los cobros en talón.</li>
 * <li>options.total: La suma de los totales en metálico y en talón.</li>
 * </ul>
 * @return Ti.UI.TableViewRow
 */
function TotalCharge(options) {
    /**
     * La varible "Global".
     * @private
     * @type Namespace
     */
    var Global = require('/global/class/ReturnGlobal')();

    /**
     * La fila.
     * @private
     * @type TableViewRow
     */
    var row = Ti.UI.createTableViewRow({
        height : Ti.UI.SIZE,
        className : "totalCharge",
        backgroundColor : 'gray',
        layout : 'vertical'
    });

    /**
     * Total en metálico.
     * @private
     * @type Ti.UI.View
     */
    var viewTotalCash = Ti.UI.createView();

    /**
     * Total en talón.
     * @private
     * @type Ti.UI.View
     */
    var viewTotalCheck = Ti.UI.createView();
    
    /**
     * Total en tarjeta.
     * @private
     * @type Ti.UI.View
     */
    var viewTotalCard = Ti.UI.createView();

    /**
     * Total.
     * @private
     * @type Ti.UI.View
     */
    var viewTotal = Ti.UI.createView();

    /**
     * Total metálico
     * @private
     * @type Ti.UI.Label
     */
    var labelTotalCash = Ti.UI.createLabel({
        color : "#000000",
        font : {
            fontSize : 14
        },
        text : "Total Metálico",
        right : 80
    });

    /**
     * Importe total metálico
     * @private
     * @type Ti.UI.Label
     */
    var labelImportCash = Ti.UI.createLabel({
        color : "#000000",
        font : {
            fontSize : 14
        },
        text : options.cash,
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        right : 0,
    });
    
    /**
     * Total talón
     * @private
     * @type Ti.UI.Label
     */
    var labelTotalCheck = Ti.UI.createLabel({
        color : "#000000",
        font : {
            fontSize : 14
        },
        text : "Total Talón",
        right : 80
    });

    /**
     * Importe total talón
     * @private
     * @type Ti.UI.Label
     */
    var labelImportCheck = Ti.UI.createLabel({
        color : "#000000",
        font : {
            fontSize : 14
        },
        text : options.check,
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        right : 0
    });
    
    /**
     * Total tarjeta
     * @private
     * @type Ti.UI.Label
     */
    var labelTotalCard = Ti.UI.createLabel({
        color : "#000000",
        font : {
            fontSize : 14
        },
        text : "Total Tarjeta",
        right : 80
    });

    /**
     * Importe total tarjeta
     * @private
     * @type Ti.UI.Label
     */
    var labelImportCard = Ti.UI.createLabel({
        color : "#000000",
        font : {
            fontSize : 14
        },
        text : options.card,
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        right : 0
    });
    
    /**
     * Total importes
     * @private
     * @type Ti.UI.Label
     */
    var labelTotal = Ti.UI.createLabel({
        color : "#000000",
        font : {
            fontSize : 14
        },
        text : "Total cobrado",
        right : 80
    });

    /**
     * Importe total metálico
     * @private
     * @type Ti.UI.Label
     */
    var labelImport = Ti.UI.createLabel({
        color : "#000000",
        font : {
            fontSize : 14
        },
        text : options.total,
        textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
        right : 0
    });

    viewTotalCash.add(labelTotalCash);
    viewTotalCash.add(labelImportCash);

    viewTotalCheck.add(labelTotalCheck);
    viewTotalCheck.add(labelImportCheck);
    
    viewTotalCard.add(labelTotalCard);
    viewTotalCard.add(labelImportCard);

    viewTotal.add(labelTotal);
    viewTotal.add(labelImport);

    row.add(viewTotalCash);
    row.add(viewTotalCheck);
    row.add(viewTotalCard);
    row.add(viewTotal);

    return row;
};

module.exports = TotalCharge;
