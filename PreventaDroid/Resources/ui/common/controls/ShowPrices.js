/**
 * @fileOverview En este archivo se crea un control donde se muestran los precios del artículo. El total y el unitario, con y sin iva.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea un control donde se muestran los precios del artículo, el total y el unitario con y sin iva.
 * @class
 * @param {String} ivaCliente El código ("N" o "R") de IVA que le corresponden a un cliente.
 * @param {String} articleIva El número del iva que le corresponde al artículo.
 */
function ShowPrices(ivaCliente, articleIva) {
    
    /**
     * El contenedor del control.
     * @private
     * @type Ti.UI.View 
     */
    var content = Ti.UI.createView({
        layout : 'vertical',
        height : Ti.UI.SIZE
    });

    /**
     * El contenedor del precio UNITARIO.
     * @private
     * @type Ti.UI.View
     */
    var viewUnitPrice = new LabelPrice("Precio UNITARIO:", ivaCliente, articleIva, 3);
    content.add(viewUnitPrice.getContent());

    /**
     * El contenedor del precio FINAL.
     * @private
     * @type Ti.UI.View
     */
    var viewEndPrice = new LabelPrice("Precio FINAL:", ivaCliente, articleIva, 2);
    content.add(viewEndPrice.getContent());
    
    /**
     * Modifica el valor del precio final
     * @param {String} value El valor a modificar. 
     */
    this.setEndPrice = function(value){
        viewEndPrice.setText(value);
    };
    
    /**
     * Modifica el valor del precio unitario
     * @param {String} value El valor a modificar. 
     */
    this.setUnitPrice = function(value){
        viewUnitPrice.setText(value);
    };
    
    /**
     * Recupera el valor actual del precio final.
     * @return {String} El valor actual. 
     */
    this.getEndPrice = function(){
        return viewEndPrice.getText();  
    };
    
    /**
     * Recupera el valor actual del precio unitario.
     * @return {String} El valor actual. 
     */
    this.getUnitPrice = function(){
        return viewUnitPrice.getText();  
    };
    
    /**
     * Retorna el controla montado.
     * @return {Ti.UI.View} La vista content con el control montado.  
     */
    this.getContent = function(){
        return content;  
    };
    
    /**
     * Cambia el color de los textos.
     * @param {String} color El color que deben tener los textos. 
     */
    this.setColorText = function(color){
        viewUnitPrice.setColorText(color);
        viewEndPrice.setColorText(color);
     
    };

};

/**
 * Calcula el % de IVA que le corresponde a un determinado cliente y retorna un número para poder calcularlo.
 * @param {String} ivaCliente El código ("N" o "R") de IVA que le corresponden a un cliente.
 * @param {String} articleIva El número del iva que le corresponde al artículo.
 * @return {Integer} El IVA que se le debe aplicar.
 */
function calculateIva(ivaCliente, articleIva) {
    /**
     * El controlador de "Iva y recargos".
     * @private
     * @type Controller
     */
    var ivaRecargo = Global.Parameters.IvaRecargo;

    //El IVA en %
    var iva_per = ivaCliente == "N" ? ivaRecargo["getIva" + articleIva]() : ivaCliente == "R" ? parseFloat(ivaRecargo["getIva" + articleIva]()) + parseFloat(ivaRecargo["getRecargo" + articleIva]()) : 0;
    //El IVA en formato númerico para multiplicar.Ej: 21% --> 1,21.
    return (parseInt(iva_per) + 100) / 100;
}

/**
 * Crea una etiqueta para mostrar un precio. Permite modificar el precio mostrado.
 * @param {String} textLabel El texto que aparece en la etiqueta del precio.
 * @param {String} ivaCliente El código ("N" o "R") de IVA que le corresponden a un cliente.
 * @param {String} articleIva El número del iva que le corresponde al artículo.
 * @param {Intger} numDecimals El número de decimales a mostrar en el precio.
 */
function LabelPrice(textLabel, ivaCliente, articleIva, numDecimals) {

    /**
     * El % del IVA para calcular el IVA.
     * @private
     * @type Float
     */
    var iva = calculateIva(ivaCliente, articleIva);

    /**
     * El contenedor del precio.
     * @private
     * @type Ti.UI.View
     */
    var viewEndPrice = Ti.UI.createView({
        //backgroundColor : 'green',
        height : Ti.UI.SIZE,
        layout : 'horizontal'
    });

    /**
     * La etiqueta con el título del precio FINAL aplicando el descuento.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitlePrice = Ti.UI.createLabel({
        left : '5%',
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 17
        },
        text : textLabel,
        width : '45%',
        height : Ti.UI.SIZE
    });
    viewEndPrice.add(labelTitlePrice);

    /**
     * El contenedor de los precios.
     * @private
     * @type Ti.UI.View
     */
    var viewPrices = Ti.UI.createView({
        //backgroundColor : 'red',
        width : '45%',
        height : Ti.UI.SIZE
    });
    viewEndPrice.add(viewPrices);

    /**
     * La etiqueta con el precio aplicando el descuento SIN IVA.
     * @private
     * @type Ti.UI.Label
     */
    var labelPrice = Ti.UI.createLabel({
        left : 4,
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 17,
            fontWeight : 'bold'
        },
        text : ""
    });
    viewPrices.add(labelPrice);

    /**
     * La etiqueta con el precio aplicando el descuento CON IVA.
     * @private
     * @type Ti.UI.Label
     */
    var labelPriceIva = Ti.UI.createLabel({
        right : 4,
        color : Global.Theme.TEXT_SECONDARY,
        font : {
            fontSize : 17,
            fontWeight : 'bold'
        },
        text : ""
    });
    viewPrices.add(labelPriceIva);

    /**
     * Cambia el valor del precio con IVA.
     */
    function addIva() {
        var num = Global.Functions.euroToNum(labelPrice.getText()) * iva;

        labelPriceIva.setText(Global.Functions.numToEuro(num, numDecimals));
    };

    /**
     * Retorna objeto vista para pode añadirlo a un contenedor.
     * @return {Ti.UI.View} viewPrice El contenedor.
     */
    this.getContent = function() {
        return viewEndPrice;
    };

    /**
     * Modifica el valor del precio.
     * @param {String} value El valor del precio.
     */
    this.setText = function(value) {
        labelPrice.setText(value);
        addIva();
    };

    /**
     * Recupera el valor del precio.
     * @return {String} El valor del precio.
     */
    this.getText = function() {
        return labelPrice.getText();
    };
    
    /**
     * Cambia el color de los textos.
     * @param {String} color El color que deben tener los textos. 
     */
    this.setColorText = function(color){
        labelTitlePrice.setColor(color);
        labelPrice.setColor(color);
        labelPriceIva.setColor(color);       
    };
}

module.exports = ShowPrices;
