/**
 * @fileOverview En este archivo se añaden todas las constantes a Global.Constant.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */
//Busca en la carpeta "global/constant" todos los archivos y los añade al namespace Global.Constants
(function() {
	var dir = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory() + Global.Path.CONSTANT);
	var files = dir.getDirectoryListing();

	for (var i = 0; i < files.length; i++) {
		if (Global.Functions.isJsFile(files[i])) {
			Ti.include(Global.Path.CONSTANT + files[i]);
		};
	};
})();
