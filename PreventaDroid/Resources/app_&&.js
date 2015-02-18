var win = Ti.UI.createWindow({
    navBarHidden : false,
    backgroundColor : '#000000',
    layout : 'vertical'
});

//
// ************************************ CONTENT 1 **********************************
//
var content1 = Ti.UI.createView({
    backgroundColor : 'green',
    height : 100    
});
win.add(content1);

// Create a Label.
var label1 = Ti.UI.createLabel({
	text : 'Label Content 1',
	color : '#FFFFFF',
	font : {fontSize:20},
	textAlign : 'center'
});
content1.add(label1);

//
// ************************************ CONTENT 2 **********************************
//
var content2 = Ti.UI.createView({
    backgroundColor : 'red',
    height : Ti.UI.SIZE,
    layout : 'horizontal',
    horizontalWrap : false
});
win.add(content2);

var but2 = Ti.UI.createButton({
    title : "PUSH",
    width : Ti.UI.SIZE
});
content2.add(but2);

var content21 = Ti.UI.createView({
    backgroundColor : 'white',
    height : Ti.UI.SIZE,
    right : 4,
    left : 4
}); 
content2.add(content21);

// Create a Label.
var label2 = Ti.UI.createLabel({
    text : 'Label Content 2',
    color : '#000000',
    font : {fontSize:20},
    textAlign : 'center'
});
content21.add(label2);

//
// ************************************ CONTENT 3 **********************************
//
var content3 = Ti.UI.createView({
    backgroundColor : 'yellow',
    height : 100
});
win.add(content3);

// Create a Label.
var label3 = Ti.UI.createLabel({
    text : 'Label Content 3',
    color : '#000000',
    font : {fontSize:20},
    textAlign : 'center'
});
content3.add(label3);


win.open();
