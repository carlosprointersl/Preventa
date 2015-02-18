/**
 * @fileOverview En este archivo estan las clases para crear un catálogo de productos.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

var Global = require('/global/class/ReturnGlobal')();

/**
 * @class Esta clase crea una vista, para el catálogo, de un artículo con su imagen y datos.
 * @param {Object} article Los datos del artículo
 */
function ArticleView(article) {
    /**
     * La altura que deben tener las imágenes para que el efecto scroll horizontal sea mas real.</br>
     * El valor se obtiene cuando se ha formado la vista "content".
     * @private
     * @type Number
     */
    var heightImages;
    
    /**
     * El contandor para hacer desaparecer las flechas.
     * @private
     * @type Number
     */
    var timeOut;

    /**
     * La vista contenedor.
     * @private
     * @type Ti.UI.View
     */
    var content = Ti.UI.createView({
        height : Ti.UI.FILL,
        width : Ti.UI.FILL
    });

    /**
     * La vista que contiene la/s imágen/es. Se define al añadir la/s imágen/es.
     * @private
     * @type Ti.UI.ScrollView
     */
    var images = Ti.UI.createView({
        top : 0,
        bottom : 70
    });

    /**
     * La flecha de arriba.
     * @private
     * @type Ti.UI.View
     */
    var arrowUp = createArrow({
        top : 0,
        image : '/images/arrow_up_68.png',
    });

    /**
     * La flecha de la abajo.
     * @private
     * @type Ti.UI.View
     */
    var arrowDown = createArrow({
        bottom : 70,
        image : '/images/arrow_down_68.png'
    });

    /**
     * La vista donde se visualizan los datos.
     * @private
     * @type Ti.UI.View
     */
    var data = createViewData();

    /**
     * Crea la vista con la flecha que indica la dirección posible.
     * @return {Ti.UI.View} La vista con la flecha.
     */
    function createArrow(options) {
        //La vista que contiene la flecha
        var content = Ti.UI.createView({
            // backgroundColor : 'gray',
            width : Ti.UI.SIZE,
            height : Ti.UI.SIZE,
            top : options.top,
            bottom : options.bottom,
            opacity : 0.5,
            visible : false
        });

        //La imágen con la flecha.
        var arrow = Ti.UI.createImageView({
            image : options.image
        });

        //Añadimos la flecha a la vista.
        content.add(arrow);

        return content;
    };

    /**
     * Forma la vista de los datos.
     * @return {Ti.UI.View} Una vista donde se muestran los datos del artículo.
     */
    function createViewData() {
        //La vista contenedor
        var content = Ti.UI.createView({
            backgroundColor : Global.Theme.ROW.BACKGROUND, //"#6BAECE",
            height : 70,
            bottom : 0
        });

        //El contenedor para los textos.
        var viewTexts = Ti.UI.createView({
            height : Ti.UI.FILL,
            width : Ti.UI.FILL,
            layout : 'vertical'
        });

        //Contenedor para el código y la tarifa.
        var viewCodeRate = Ti.UI.createView({
            height : '50%',
            left : 2,
            right : 2
        });

        //Etiqueta de la descripción.
        var labelDescription = Ti.UI.createLabel({
            color : Global.Theme.TEXT_PRINCIPAL, //'#FFFFFF',
            font : {
                fontSize : 22,
                fontWeight : 'bold'
            },
            text : article.Descripcion,
            wordWrap : false,
            left : 2,
            right : 2,
            height : '50%'
        });

        //Etiqueta de la tarifa.
        var labelRate = Ti.UI.createLabel({
            color : Global.Theme.TEXT_SECONDARY, //'#000000',
            font : {
                fontSize : 16
            },
            text : Global.Functions.numToEuro(article.Tarifa),
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
            right : 0,
            width : '33%',
            height : Ti.UI.SIZE
        });

        //Etiqueta del código.
        var labelCode = Ti.UI.createLabel({
            color : Global.Theme.TEXT_SECONDARY, //'#000000',
            font : {
                fontSize : 16
            },
            text : article.CodigoArticulo,
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
            left : 0,
            width : '33%',
            height : Ti.UI.SIZE
        });
        
        //Etiqueta del código.
        var labelBoxUnits = Ti.UI.createLabel({
            color : Global.Theme.TEXT_SECONDARY, //'#000000',
            font : {
                fontSize : 16
            },
            text : article.UnidadesCaja,
            left : '33%',
            right : '33%',
            textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
            width : '34%',
            height : Ti.UI.SIZE
        });

        //Evento "touch start" de la fila, para cuando se pulse la fila que se marque.
        content.addEventListener('touchstart', function(e) {
            viewTexts.setBackgroundColor('orange');
        });

        //Evento "touch end" de la fila, para cuando se deja de pulsar la fila que se muestre del color original.
        content.addEventListener('touchend', function(e) {
            viewTexts.setBackgroundColor('transparent');
        });

        //Evento "touch cancel" de la fila, para cuando se deja de pulsar la fila que se muestre del color original.
        content.addEventListener('touchcancel', function(e) {
            viewTexts.setBackgroundColor('transparent');
        });

        viewCodeRate.add(labelCode);
        viewCodeRate.add(labelBoxUnits);
        viewCodeRate.add(labelRate);

        viewTexts.add(labelDescription);
        viewTexts.add(viewCodeRate);

        content.add(viewTexts);

        return content;
    };

    /**
     * Añade las imágenes que sean necesarias a la vista.
     */
    function addImages() {
        var sdcardPath = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).parent.nativePath;
        var path = Global.Path.DIRECTORY + Ti.Filesystem.separator + Global.Path.PHOTO_DIRECTORY + Ti.Filesystem.separator;
        //var file = Ti.Filesystem.getFile(sdcardPath, path + article.CodigoArticulo + '_1.jpg');
        var file = getFile(sdcardPath, path + article.CodigoArticulo + '_1');
        
        //Buscamos si tiene mas de una imágen.
        if (file.exists()) {
            //Hasta que no existe el fichero vamos añadiendo imágenes.
            var x = 2;
            //Definimos la vista de "images"
            var scroll = Ti.UI.createScrollView({
                layout : 'vertical',
                contentHeight : 'auto',
                scrollType : 'vertical'
            });
            //Mientras exista el archivo lo añadimos al "scroll".
            while (file.exists()) {
                //La vista contenedor
                var content = Ti.UI.createView({
                    height : heightImages
                });
                //La photo
                var photo = Ti.UI.createImageView({
                    image : file,
                    top : 10,
                    bottom : 10,
                    left : 10,
                    right : 10
                });

                content.add(photo);
                //Añadimos la imágen al "scroll"
                scroll.add(content);
                //Siguiente imágen
                // file = Ti.Filesystem.getFile(sdcardPath, path + article.CodigoArticulo + '_' + x + '.jpg');
                file = getFile(sdcardPath, path + article.CodigoArticulo + '_' + x);

                x += 1;
            };

            //Si hay mas de una imágen mostramos la flecha inferior.
            if (x - 2 > 1) {
                arrowDown.show();
            };
            
            //Al finalizar la pulsacion iniciamos el contador para esconder las flechas.
            scroll.addEventListener('touchend', function(e) {
                if (timeOut != undefined) {
                    clearTimeout(timeOut);
                };

                timeOut = setTimeout(function() {
                    arrowUp.hide();
                    arrowDown.hide();
                }, 2500);
            });
            //Controlando el evento "scroll" de la vista podemos mostrar/ocultar las flechas según convenga.
            scroll.addEventListener('scroll', function(e) {
                var dife = Math.round((3 * heightImages) - (heightImages / 2));
                //Cuando supera 10 de movimiento esconde la flecha "up".
                if (e.y > (heightImages / 2)) {
                    arrowUp.show();
                } else {
                    arrowUp.hide();
                };
                //Cuando llega al final esconde la flecha "down".
                if (e.y < dife) {
                    arrowDown.show();
                } else {
                    arrowDown.hide();
                };
            });

            images.add(scroll);
        } else {
            var photo = Ti.UI.createImageView({
                defaultImage : "/images/no_image.png",
                top : 10,
                bottom : 10,
                left : 10,
                right : 10
            });

            //Miramos que haya al menos una imágen.
            file = getFile(sdcardPath, path + article.CodigoArticulo);
            //Si existe el archivo modificamos la propiedad "image" de la imágen.
            if (file.exists()) {
                photo.setImage(file);
            };
            //Añadimos la imágen.
            images.add(photo);
        };
    };
    
    /**
     * Busca el archivo en la dirección indicada para las extensiones indicadas. Cuando encuentre el archivo para la extensión lo devuelve.
     * @param {String} sdcardPath La dirección de la tarjeta de memoria.
     * @param {String} filePath La dirección del archivo.  
     */
    function getFile(sdcardPath, filePath){
        //Las extensiones válidas
        var extensions = [".jpg", ".png"];
        //El índice
        var index = 0;
        //El archivo
        var file = Ti.Filesystem.getFile(sdcardPath, filePath + extensions[index]);
        //Mientras no lo encuentre o no sea el final...
        while(!file.exists() && index < extensions.length){
            index += 1;
            file = Ti.Filesystem.getFile(sdcardPath, filePath + extensions[index]);
        };
        
        return file;
    };
    
    /**
     * Añade eventos a al vista de información (data).
     * @param {String} event El nombre del evento.
     * @param {Function} callback La función ha realizar por el evento.
     */
    content.addEventListenerData = function(event, callback) {
        data.addEventListener(event, callback);
    };

    /**
     * Añade eventos a la imágen.
     * @param {String} event El nombre del evento.
     * @param {Function} callback La función ha realizar por el evento.
     */
    content.addEventListenerPhoto = function(event, callback) {
        images.addEventListener(event, callback);
    };

    /**
     * Capturamos el evento 'postlayout' de la ventana para conocer sus medidas reales.
     * @event 'postlayout'
     */
    content.addEventListener('postlayout', function(e) {
        //Solo queremos capturarlo una vez.
        if (!content.first) {
            content.first = true;
            heightImages = e.source.size.height - 70;
            //Ti.API.error("Medidas de la vista CONTENT: W: " + e.source.size.height + " H: " + e.source.size.width + "\nImages Height: " + heightImages);
            addImages();
        };
    });

    //Añadimos los componentes a la vista
    content.add(images);
    content.add(data);
    content.add(arrowUp);
    content.add(arrowDown);

    return content;
};

/**
 * Crea un catálogo de artículos.
 * @class Esta clase se ayuda de otros objetos para crear un catálogo de artículos. Los artículos se visualizan
 * desplazandose horizontalmente. En algunos casos un artículo puede tener mas de una imágen, cuando esto sucede las imágenes
 * de este mismo artículo se desplazan horizontalmente.
 * @memberof Global.Control
 * @param {Object[]} [articles=[]] Los artículos del parámetro.
 */
function Catalog(articles) {
    //Valor por defecto [].
    var articles = articles || new Array();

    /**
     * El contandor para hacer desaparecer las flechas.
     * @private
     * @type Number
     */
    var timeOut;

    /**
     * El contenedor del "ScrollableView".
     * @private
     * @Ti.UI.View
     */
    var content = Ti.UI.createView();

    /**
     * Contiene las vistas que van a formar el catálogo.
     * @private
     * @type Ti.UI.View[]
     */
    var views = createViews();

    /**
     * La vista "scrollabe" donde están todos los artículos.
     * @private
     * @type Ti.UI.ScrollableView
     */
    var scrollable = Ti.UI.createScrollableView({
        backgroundColor : '#90BACE',
        views : views
    });

    /**
     * La flecha de la derecha.
     * @private
     * @type Ti.UI.View
     */
    var arrowRigth = createArrow({
        right : 0,
        image : '/images/arrow_right_68.png'
    });

    /**
     * La flecha de la izquierda.
     * @private
     * @type Ti.UI.View
     */
    var arrowLeft = createArrow({
        left : 0,
        image : '/images/arrow_left_68.png'
    });

    /**
     * Crea la vista con la flecha que indica la dirección posible.
     * @return {Ti.UI.View} La vista con la flecha.
     */
    function createArrow(options) {
        //La vista que contiene la flecha
        var content = Ti.UI.createView({
            // backgroundColor : 'gray',
            width : Ti.UI.SIZE,
            height : Ti.UI.SIZE,
            left : options.left,
            right : options.right,
            opacity : 0.5
        });

        //La imágen con la flecha.
        var arrow = Ti.UI.createImageView({
            image : options.image
        });

        //Añadimos la flecha a la vista.
        content.add(arrow);

        return content;
    };

    /**
     * Crea las vistas del catálogo con los datos de los artículos.
     * @return Ti.UI.View[]
     */
    function createViews() {
        //Si hay artículos creamos las vistas.
        if (articles.length > 0) {
            var articlesView = new Array();
            for (var i = 0; i < articles.length; i++) {
                var articleView = new ArticleView(articles[i]);
                articlesView.push(articleView);
                //Escuchamos el vento "click" de los datos.
                articleView.addEventListenerData('click', function(e) {
                    //Disparamos el evento 'data:click' de la vista principal.
                    content.fireEvent('data:click');
                });
            };
        } else {
            return articles;
        };

        return articlesView;
    };

    /**
     * Retorna la página actual del "ScrollableView".
     * @return {Number} El índice de la página actual.
     */
    content.getCurrentPage = function() {
        return scrollable.getCurrentPage();
    };

    /**
     * Mostramos las flechas necesarias. Siempre que haya al menos un scroll para una dirección.
     */
    function showArrows() {
        if (timeOut != undefined) {
            clearTimeout(timeOut);
        };
        //Si estamo al principio ocultamos la flecha izquierda, SINO la mostramos.
        arrowLeft.setVisible(!scrollable.getCurrentPage() == 0);
        arrowRigth.setVisible(scrollable.getCurrentPage() < (articles.length - 1));
        //Ti.API.warn("********** SHOW ARROWS ************");
        timeOut = setTimeout(function() {
            arrowLeft.setVisible(false);
            arrowRigth.setVisible(false);
        }, 2500);
    };

    /**
     * El evento "scroll" de la vista. Cuando sucede mostramos las flechas necesarias.
     * @event scroll
     */
    scrollable.addEventListener('scrollend', showArrows);

    /**
     * Añadimos un artículo al catálogo.
     * @param {Object} article El artículo a añadir.
     *
     this.add = function(article){

     };*/

    /**
     * Eliminamos un artículo del catálogo si es posible.
     * @param {Number/Object} article La posición del artículo en el catálogo o el artículo en si.
     *
     this.remove = function(article){

     };*/

    showArrows();

    content.add(scrollable);
    content.add(arrowLeft);
    content.add(arrowRigth);

    return content;
};

module.exports = Catalog;
