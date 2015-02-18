/**
 * ------------------------------------------------- CATALOG TEST -------------------------------------------
 *
 */

function TestButtonRow() {
    var win = Ti.UI.createWindow({
        backgroundColor : '#FFFFFF',
        //bubbleParent : false
    });
    
    /**
     * La vista que hace de botón.
     * @private
     * @type Ti.UI.View
     */
    var button = Ti.UI.createView({
        backgroundColor : "yellow",
        backgroundSelectedColor : "green",
        height : Ti.UI.FILL,
        width : 70,
        height : 70
    });
    /**
     * La imágen del botón.
     * @private
     * @type Ti.UI.View
     */
    var image = Ti.UI.createImageView({
        image : '/ui/common/images/48/delete.png',
        width : Ti.UI.FILL,
        top : 2,
        touchEnabled : false
    });
    /**
     * La acción del botón.
     * @private
     * @type Ti.UI.View
     */
    var label = Ti.UI.createLabel({
        text : "Eliminar",
        color : 'white',
        font : {
            fontSize : 12.10
        },
        bottom : 3,
        touchEnabled : false
    });

    //Simula el efecto "touch" de un botón.
    // button.addEventListener('touchstart', function() {
        // button.setBackgroundColor(Global.Theme.BUTTON.PRESS);
    // });
// 
    // button.addEventListener('touchend', function() {
        // button.setBackgroundColor(Global.Theme.BUTTON.BACKGROUND);
    // });
//     
    // button.addEventListener('touchcancel', function() {
        // button.setBackgroundColor(Global.Theme.BUTTON.BACKGROUND);
    // });

    button.add(image);
    button.add(label);
    
    win.add(button);
    
    win.open();
};

module.exports = TestButtonRow;
