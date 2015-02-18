/**
 * @fileOverview En este archivo se añaden todos los modelos a Global.Model.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */
//Busca en la carpeta "model" todos los archivos y los añade al namespace Global.Models
(function() {
	var dir = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory() + 'model/');
	var files = dir.getDirectoryListing();
	
	/**
	 * @namespace Los modelos. 
	 */
	Global.Model = {};

	for (var i = 0; i < files.length; i++) {
		if (Global.Functions.isJsFile(files[i])) {
			var name = files[i].slice(0, -3);
			// Ti.include(Global.Path.MODEL + files[i]);
			// Global.Model[name] = functionModel;
			Global.Model[name] = require(Global.Path.MODEL + name);
		};
	};
})();
