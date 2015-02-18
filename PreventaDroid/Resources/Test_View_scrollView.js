/**
 * ------------------------------------------------- CATALOG TEST -------------------------------------------
 *
 */

function TestWindow() {

    var win = Ti.UI.createWindow({
        title : 'Prueba SCROLLVIEW',
        backgroundColor : 'white'
    });

    var scrollView = Ti.UI.createScrollView({
        contentWidth : 'auto',
        contentHeight : '16.66%',
        height : '16.66%',
        width : Ti.UI.FILL,
        top : 20
    });

    var view = Ti.UI.createView({
        backgroundColor : '#336699',
        width : Ti.UI.SIZE,
        height : Ti.UI.FILL,
        layout : 'horizontal'
    });

    var button = Ti.UI.createButton({
        title : "Add numbers",
        width : Ti.UI.FILL,
        top : 200
    });

    button.addEventListener('click', function() {
        var end = 3;
        for (var i = 0; i < end; i++) {
            view.add(Ti.UI.createLabel({
                color : '#FFFFFF',
                font : {
                    fontSize : 50
                },
                width : Ti.UI.SIZE,
                text : i
            }));
        };
    });

    scrollView.add(view);

    win.add(scrollView);
    win.add(button);

    return win;

};

module.exports = TestWindow();
