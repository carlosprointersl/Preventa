/**
 * ------------------------------------------------- CATALOG TEST -------------------------------------------
 *
 */

function TestButtonRow() {
    var win = Ti.UI.createWindow({
        backgroundColor : '#FFFFFF',
        //bubbleParent : false
    });
    
    var row = Ti.UI.createTableViewRow({
        bubbleParent : false,
        backgroundColor : 'red',
        backgroundSelectedColor : 'orange'
    });
    row.addEventListener('click', function(e){
        label.setText("ROW SOURCE: " + e.source + "\n");
        Ti.API.info("ROW SOURCE: " + e.source + "\n");
    });
    
    var view = Ti.UI.createView({
        height : 70,
        touchEnabled : false
    });
    
    view.addEventListener('click', function(e){
        label.setText("VIEW SOURCE: " + e.source + "\n");
        Ti.API.info("VIEW SOURCE: " + e.source + "\n");
    });
    
    // var button = Ti.UI.createButton({
        // height : 60,
        // width : 60,
        // bubbleParent : false,
        // backgroundColor : 'white',
        // backgroundImage : '/ui/common/images/48/Check.png',
        // backgroundSelectedImage : '/ui/common/images/48/delete.png'
//         
    // });
    
    var button = Ti.UI.createView({
        height : 60,
        width : 60,
        bubbleParent : false,
        backgroundColor : 'white',
        backgroundImage : '/ui/common/images/48/Check.png',
        backgroundSelectedImage : '/ui/common/images/48/delete.png'
        
    });
    
    button.addEventListener('click', function(e){
        label.setText("BUTTON SOURCE: " + e.source + "\n");
        Ti.API.info("BUTTON SOURCE: " + e.source + "\n");
    });
    
    var label = Ti.UI.createLabel({
        top : 140,
        color : "#000000",
        font : {
            fontSize : 20
        },
        text : 'SOURCE: '
    });
    
    win.addEventListener('click', function(e){
        label.setText("WIN SOURCE: " + e.source + "\n");
        Ti.API.info("WIN SOURCE: " + e.source + "\n");
    });
    
    
    view.add(button);
    
    row.add(view);
    
    var table = Ti.UI.createTableView({
        top : '50%',
        bottom : 0,
        data : [row]
    });    
    
    win.add(label);
    win.add(table);
    
    win.open();
};

module.exports = TestButtonRow;
