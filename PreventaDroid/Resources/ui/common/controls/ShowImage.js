/**
 * @fileOverview En este archivo se crea una ventana que muestra la imágen de un artículo, si la tiene.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Crea una ventana emergente donde muestra la imágen de un artículo, si la tiene.
 * @class
 * @memberOf Global.Control
 * @param {Number/String} code El código del artículo para mostrar su imágen.
 * @param {String} description La descripción del artículo.
 */
function ShowImage(code, description) {
    /**
     * La ventana principal.
     * @private
     * @type Ti.UI.Window
     */
    var win = Ti.UI.createWindow({
        backgroundColor : '#000000',
        navBarHidden : true,
        opacity : 0.5
    });

    /**
     * La vista principal. Es la que contiene todos los elementos.
     * @private
     * @type Ti.UI.View
     */
    var viewMain = Ti.UI.createView({
        left : 30,
        right : 30,
        top : 30,
        bottom : 30,
        backgroundColor : '#FFFFFF'
    });

    /**
     * La etiqueta para el título de la ventana.
     * @private
     * @type Ti.UI.Label
     */
    var labelTitle = Ti.UI.createLabel({
        color : '#000000',
        font : {
            fontSize : 20
        },
        text : description,
        left : 3,
        bottom : 0,
        height : 40,
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE
    });

    /**
     * Botón Exit.
     * @private
     * @type Ti.UI.Button
     */
    var butExit = Ti.UI.createImageView({
        width : Ti.UI.SIZE,
        image : '/images/cancel_image_42.png',
        right : 30,
        center : {
            y : 30,
            x : (Ti.Platform.displayCaps.getPlatformWidth / Ti.Platform.displayCaps.logicalDensityFactor) - 30 
        }
    });

    butExit.addEventListener('click', function() {
        win.close();
    });

    /**
     * Busca el archivo en la dirección indicada para las extensiones indicadas. Cuando encuentre el archivo para la extensión lo devuelve.
     * @param {String} sdcardPath La dirección de la tarjeta de memoria.
     * @param {String} filePath La dirección del archivo.
     */
    function getFile(sdcardPath, filePath) {
        //Las extensiones válidas
        var extensions = [".jpg", ".png"];
        //El índice
        var index = 0;
        //El archivo
        var file = Ti.Filesystem.getFile(sdcardPath, filePath + extensions[index]);
        //Mientras no lo encuentre o no sea el final...
        while (!file.exists() && index < extensions.length) {
            index += 1;
            file = Ti.Filesystem.getFile(sdcardPath, filePath + extensions[index]);
        };

        return file;
    };

    /**
     * Crea la imágen que se ha de mostrar.
     * @return {Ti.UI.ImageView} La imágen para mostrar.
     */
    function createImage() {
        var sdcardPath = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).parent.nativePath;
        var path = Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.PHOTO_DIRECTORY + Ti.Filesystem.separator;
        var file = getFile(sdcardPath, path + code);

        var photo = Ti.UI.createImageView({
            image : file.exists() ? file : undefined,
            defaultImage : "/images/no_image.png",
            top : 0,
            bottom : 40
        });
        
        return photo;
    };

    viewMain.add(createImage());
    viewMain.add(labelTitle);

    win.add(viewMain);
    win.add(butExit);

    return win;
};

module.exports = ShowImage;
