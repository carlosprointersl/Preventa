/**
 * ------------------------------------------------- CATALOG TEST -------------------------------------------
 *
 */

function Test() {

    var win = Ti.UI.createWindow({
        exitOnClose : true,
        backgroundColor : 'white'
    });

    var content1 = Ti.UI.createView({
        width : Ti.UI.FILL,
        layout : 'horizontal',
        top : '5dp',
        height : '30dp'
    });
    
    var content2 = Ti.UI.createView({
        width : Ti.UI.FILL,
        layout : 'horizontal',
        top : '55dp',
        height : Ti.UI.SIZE
    });
    
    var colors = ['red', 'green', 'aqua', 'brown', 'gray', 'lime', 'orange'];
    var NUM = 7;
    
    for (var i=0; i < NUM; i++) {
        content1.add(Ti.UI.createView({
            width : (100 / NUM)+'%',
            backgroundColor : colors[i]
        }));
    };
    
    var ld = Ti.Platform.displayCaps.ydpi / 160;
    var width = Ti.Platform.displayCaps.platformWidth / ld;
    var wv = width / NUM + 'dp';
    
    Ti.API.warn("LD: " + ld + "\nWidth: " + width + "\nWV: " + wv);
    
    for (var i=0; i < NUM; i++) {
        content2.add(Ti.UI.createView({
            width : wv,
            backgroundColor : colors[i],
            height : '30dp'
        }));
    };
    
    win.add(content1);
    win.add(content2);

    win.addEventListener('postlayout', function(e) {

        if (!win._one) {
            Ti.API.info('Ti.Platform.displayCaps.density: ' + Ti.Platform.displayCaps.density);
            Ti.API.info('Ti.Platform.displayCaps.dpi: ' + Ti.Platform.displayCaps.dpi);
            Ti.API.info('Ti.Platform.displayCaps.platformHeight: ' + Ti.Platform.displayCaps.platformHeight);
            Ti.API.info('Ti.Platform.displayCaps.platformWidth: ' + Ti.Platform.displayCaps.platformWidth);
            if (Ti.Platform.osname === 'android') {
                Ti.API.info('Ti.Platform.displayCaps.xdpi: ' + Ti.Platform.displayCaps.xdpi);
                Ti.API.info('Ti.Platform.displayCaps.ydpi: ' + Ti.Platform.displayCaps.ydpi);
                Ti.API.info('Ti.Platform.displayCaps.logicalDensityFactor: ' + Ti.Platform.displayCaps.logicalDensityFactor);
            };
            Ti.API.info('Size.Height: ' + e.source.size.height);
            Ti.API.info('Size.Width: ' + e.source.size.width);

            win._one = true;
        };
    });
    
    return win;

};

module.exports = Test();
