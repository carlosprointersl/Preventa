/**
 * ------------------------------------------------- CATALOG TEST -------------------------------------------
 *
 */

function TestWindow() {

    var Global = require('/global/class/ReturnGlobal')();

    //------------------------------------------- SCROLLABLE VIEW -----------------------------------

    // var win = Ti.UI.createWindow({
        // backgroundColor : Global.Theme.BACKGROUND
    // });
//     
    // var button = Ti.UI.createButton({
        // title : 'Theme'
    // });
    
    // button.addEventListener('click', function(){
        Global.Controller.Tema('index');
    // });
//     
    // win.add(button);
// 
    // return win;
};

module.exports = TestWindow;
