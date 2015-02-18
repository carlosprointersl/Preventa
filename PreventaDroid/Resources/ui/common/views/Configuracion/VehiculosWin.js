/**
 * @fileOverview En este archivo se crea el punto de menú "Administración".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

// La ventana actual con la que vamos a trabajar.
var win = Ti.UI.currentWindow;
//La ventana padre
var parentWin = win.parentWin;
//La variable Global
var Global = win.Global;
//EL controlador de vehículos.
var vehicle = new Global.Controller.Vehiculo();
// HeaderMenu
var headerMenu = require(Global.Path.CONTROL + 'View/HeaderMenu')("Vehículos", "Configuración", function(){win.close();});



//
// ---------------------------------------------------------------- ADD CONTROLS -------------------------------------------------
//
win.add(headerMenu);
