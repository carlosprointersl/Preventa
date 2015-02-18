/**
 * @fileOverview Es el archivo inicial. Es donde se inicializan todos los elementos de
 * la aplicación.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * @namespace Este es el namespace principal. Toda la operativa de la aplicación depende de él.
 */
var Global = {};

//El include con las variables y métodos mínimos necesarios para empezar
Ti.include('/global/initsGlobal/beforeInits.js');

// El include para inicializar las constantes.
Ti.include(Global.Path.INITS_GLOBAL + 'initConstants.js');

// El include de las funciones globales de la aplicación.
Ti.include(Global.Path.INITS_GLOBAL + 'initFunctions.js');

// Instalamos las bases de datos
Ti.include(Global.Path.INITS_GLOBAL + 'installDB.js');

// El include de los parámetros de la aplicación.
Ti.include(Global.Path.INITS_GLOBAL + 'initParameters.js');

// El include de las clases globales de la aplicación.
Ti.include(Global.Path.INITS_GLOBAL + 'initClass.js');

// La clase "Log".
var Log = new Global.Class.Log();

// La clase "GeoPosicionamiento".
var Geo = new Global.Class.GeoPosicionamiento();
Geo.start();

// El include de los controles de la aplicación.
Ti.include(Global.Path.INITS_GLOBAL + 'initControls.js');

// El include de los modelos de la aplicación.
Ti.include(Global.Path.INITS_GLOBAL + 'initModels.js');

// El include de los controladores de la aplicación.
Ti.include(Global.Path.INITS_GLOBAL + 'initControllers.js');

//Inicializamos el tema.
Global.Controller.Tema();

Log.info("Iniciamos la aplicación.");
// Instanciamos el controlador "Principal" que nos mostrará la ventana por defecto "login".
Global.Controller.Principal(); // El inicial
//Global.Controller.Principal('index');