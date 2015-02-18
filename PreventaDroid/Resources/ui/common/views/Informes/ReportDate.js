/**
 * @fileOverview En este archivo se crea la vista donde seleccionar las fechas para filtrar los informes.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una vista para modificar el filtro por fechas de los informes.
 * @param {Object} global La varibale Global.
 * @return {Ti.UI.View} La vista montada.
 */
function ReportDate(global) {
    /**
     * Contiene la fecha/hora de inicio.
     * @private
     * @type Date
     */
    var startDateTime = new Date();

    /**
     * Contiene la fecha/hora de fin.
     * @private
     * @type Date
     */
    var endDateTime = new Date();

    /**
     * La vista principal.
     * @private
     * @type Ti.UI.View
     */
    var viewDates = Ti.UI.createView({
        backgroundColor : Global.Theme.POPUP.BACKGROUND,
        top : 110,
        height : 0,
        down : false
    });

    /**
     * La vista para la fecha de inicio.
     * @private
     * @type Ti.UI.View
     */
    var viewStart = Ti.UI.createView({
        height : '50%',
        top : 0
    });

    /**
     * La vista para la fecha final.
     * @private
     * @type Ti.UI.View
     */
    var viewEnd = Ti.UI.createView({
        height : '50%',
        bottom : 0
    });

    /**
     * La etiqueta "Desde"
     * @private
     * @type Ti.UI.Label
     */
    var labelDesde = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 23
        },
        text : 'Desde',
        top : '10%',
        left : '20%',
        width : Ti.UI.SIZE
    });

    /**
     * La etiqueta con la fecha de inicio.
     * @private
     * @type Ti.UI.Label
     */
    var labelStartDate = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 23
        },
        text : Global.Functions.dateFormat(startDateTime),
        top : '50%',
        left : '20%',
        width : Ti.UI.SIZE
    });

    /**
     * La etiqueta con la hora de inicio.
     * @private
     * @type Ti.UI.Label
     */
    var labelStartTime = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 23
        },
        width : Ti.UI.SIZE,
        top : '50%',
        left : '70%',
        text : Global.Functions.timeFormat(startDateTime)
    });

    /**
     * La etiqueta "Hasta".
     * @private
     * @type Ti.UI.Label
     */
    var labelHasta = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 23
        },
        text : 'Hasta',
        top : '10%',
        left : '20%',
        width : Ti.UI.SIZE
    });

    /**
     * La etiqueta con la fecha de fin.
     * @private
     * @type Ti.UI.Label 
     */
    var labelEndDate = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 23
        },
        text : Global.Functions.dateFormat(endDateTime),
        top : '50%',
        left : '20%',
        width : Ti.UI.SIZE
    });

    /**
     * La etiqueta con la hora de fin.
     * @private
     * @type Ti.UI.Label
     */
    var labelEndTime = Ti.UI.createLabel({
        color : Global.Theme.TEXT_PRINCIPAL,
        font : {
            fontSize : 23
        },
        text : Global.Functions.timeFormat(endDateTime),
        top : '50%',
        left : '70%',
        width : Ti.UI.SIZE
    });

    /**
     * El "Check" para la fecha de inicio
     * @private
     * @type Ti.UI.Switch
     */
    var checkStart = Ti.UI.createSwitch({
        style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
        value : false,
        center : {
            x : '7.5%'
        }
    });

    /**
     * El "Check" para la fecha de fin
     * @private
     * @type Ti.UI.Switch
     */
    var checkEnd = Ti.UI.createSwitch({
        style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
        value : false,
        center : {
            x : '7.5%'
        }
    });
    
    /**
     * La línea horizontal.
     * @private
     * @type Ti.UI.View 
     */
    var line_h = Ti.UI.createView({
        backgroundColor : Global.Theme.LINES,
        height : 0.5,
        center : {
            y : '50%'
        }
    });
    
    /**
     * La línea horizontal del final.
     * @private
     * @type Ti.UI.View 
     */
    var line_hb = Ti.UI.createView({
        backgroundColor : Global.Theme.LINES,
        height : 0.5,
        bottom : 0
    });
    
    /**
     * La línea vertical.
     * @private
     * @type Ti.UI.View 
     */
    var line_v = Ti.UI.createView({
        backgroundColor : Global.Theme.LINES,
        width : 0.5,
        left : '15%'
    });

    /**
     * El evento "click" de la etiqueta "labelStartDate".
     * @event Click
     */
    labelStartDate.addEventListener('click', function() {
        var popup = new Global.Control.Windows.DateTime({
            type : Ti.UI.PICKER_TYPE_DATE,
            value : startDateTime,
            title : "Edición Fecha \"Desde\""
        });

        popup.addEventListener("dateTime:value", function(e) {
            startDateTime.setDate(e.value.getDate());
            startDateTime.setMonth(e.value.getMonth());
            startDateTime.setFullYear(e.value.getFullYear());
            labelStartDate.text = global.Functions.dateFormat(startDateTime);
        });
        
        popup.open();
    });

    /**
     * El evento "click" de la etiqueta "labelStartTime".
     * @event Click
     */
    labelStartTime.addEventListener('click', function() {
        var popup = new Global.Control.Windows.DateTime({
            type : Ti.UI.PICKER_TYPE_TIME,
            value : startDateTime,
            title : "Edición Hora \"Desde\""
        });
        
        popup.addEventListener("dateTime:value", function(e) {
            startDateTime.setHours(e.value.getHours());
            startDateTime.setMinutes(e.value.getMinutes());
            startDateTime.setSeconds(0);
            labelStartTime.text = Global.Functions.timeFormat(startDateTime);
        });
        
        popup.open();
    });

    /**
     * El evento "click" de la etiqueta "labelStartDate".
     * @event Click
     */
    labelEndDate.addEventListener('click', function() {
        var popup = new Global.Control.Windows.DateTime({
            type : Ti.UI.PICKER_TYPE_DATE,
            value : endDateTime,
            title : "Edición Fecha \"Hasta\""
        });
        
        popup.addEventListener("dateTime:value", function(e) {
            endDateTime.setDate(e.value.getDate());
            endDateTime.setMonth(e.value.getMonth());
            endDateTime.setFullYear(e.value.getFullYear());
            labelEndDate.text = global.Functions.dateFormat(endDateTime);
        });
        
        popup.open();
    });

    /**
     * El evento "click" de la etiqueta "labelStartDate".
     * @event Click
     */
    labelEndTime.addEventListener('click', function() {
        var popup = new Global.Control.Windows.DateTime({
            type : Ti.UI.PICKER_TYPE_TIME,
            value : endDateTime,
            title : "Edición Hora \"Hasta\""
        });
        
        popup.addEventListener("dateTime:value", function(e) {
            endDateTime.setHours(e.value.getHours());
            endDateTime.setMinutes(e.value.getMinutes());
            endDateTime.setSeconds(0);
            labelEndTime.text = Global.Functions.timeFormat(endDateTime);
        });
        
        popup.open();
    });

    /**
     * Retorna los valores de las fechas/horas.
     * @return {Object} Un objeto con dos propiedades:</br>
     * <ul>
     * <li>start: Con la fecha y hora de inicio.</li>
     * <li>end: Con la fecha y hora de fin.</li>
     * </ul>
     */
    viewDates.getValues = function() {
        return {
            start : checkStart.value ? startDateTime : null,
            end : checkEnd.value ? endDateTime : null
        };
    };

    //Añadimos los controles a la vista principal
    viewStart.add(checkStart);
    viewStart.add(labelDesde);
    viewStart.add(labelStartDate);
    viewStart.add(labelStartTime);
    viewEnd.add(checkEnd);
    viewEnd.add(labelHasta);
    viewEnd.add(labelEndDate);
    viewEnd.add(labelEndTime);

    viewDates.add(viewStart);
    viewDates.add(viewEnd);
    viewDates.add(line_h);
    viewDates.add(line_v);
    viewDates.add(line_hb);

    return viewDates;

};

module.exports = ReportDate;
