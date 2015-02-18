/**
 * ------------------------------------------------- EXPRESIONES REGULARES -------------------------------------------
 *
 */

function Test_Expresion() {
    var exp = ["#000000", "#808080", "#abaab00", "#ffaF", "#FF99ff", "#ff78fg"];
    
    function isColor(color) {
        return /(^#(([0-9A-Fa-f]{6}$)|([0-9A-Fa-f]{3}$)))/.test(color);  
    };
    
    for (var i=0; i < exp.length; i++) {
        Ti.API.warn(isColor(exp[i]));
    };
};

module.exports = Test_Expresion;
