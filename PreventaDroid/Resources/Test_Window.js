/**
 * ------------------------------------------------- CATALOG TEST -------------------------------------------
 *
 */

function TestWindow() {

    var Global = require('/global/class/ReturnGlobal')();

    //El cuerpo de la ventana
        var body = require(Global.Path.VIEW + 'Tema/ViewPalette')(null);

        var options = {
            title : "Selección del color",
            body : body,
            buttons : Global.Control.Windows.BUTTON.SAVE_CANCEL
        };

        var Popup = require(Global.Path.CONTROL + 'Windows').Popup;
        var popup = new Popup(options);

        popup.addEventClickButton("save", function(){
            
        });
        
    return popup;
};

module.exports = TestWindow;
