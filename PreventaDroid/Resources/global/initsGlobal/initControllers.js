/**
 * @fileOverview En este archivo se añaden todos los controladores a Global.Controller.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */
//Busca en la carpeta "controller" todos los archivos y los añade al namespace Global.Controllers
(function() {
	var dir = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory() + 'controller/');
	var files = dir.getDirectoryListing();

	/**
	 * @namespace Los controladores. 
	 */
	Global.Controller = {};

	for (var i = 0; i < files.length; i++) {
		if (Global.Functions.isJsFile(files[i])) {
			var name = files[i].slice(0, -3);
			// Ti.include(Global.Path.CONTROLLER + files[i]);
			// Global.Controller[name] = functionController;
			Global.Controller[name] = require(Global.Path.CONTROLLER + name);
		};
	};
})();
