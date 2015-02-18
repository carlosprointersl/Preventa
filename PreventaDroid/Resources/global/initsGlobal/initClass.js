/**
 * @fileOverview En este archivo se añaden todas las clases a Global.Class.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */
//Busca en la carpeta "global/class" todos los archivos y los añade al namespace Global.Class
(function() {
	var dir = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory() + Global.Path.CLASS);
	var files = dir.getDirectoryListing();
	
	/**
	 * @namespace Las clases genéricas de la aplicación.
 	 */ 
	Global.Class = {};

	for (var i = 0; i < files.length; i++) {
		if (Global.Functions.isJsFile(files[i])) {
			var name = files[i].slice(0, -3);
			// Ti.include(Global.Path.CLASS + files[i]);
			// Global.Class[name] = functionClass;
			Global.Class[name] = require(Global.Path.CLASS + name);
		};
	};
})();
