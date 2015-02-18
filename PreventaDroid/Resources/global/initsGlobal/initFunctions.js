/**
 * @fileOverview En este archivo se añaden todas las funciones a Global.Functions.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */
//Busca en la carpeta "global/fucntion" todos los archivos y los añade al namespace Global.Fucntions
(function() {
	var dir = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory() + Global.Path.FUNCTION);
	var files = dir.getDirectoryListing();

	for (var i = 0; i < files.length; i++) {
		if (Global.Functions.isJsFile(files[i])) {
			Ti.include(Global.Path.FUNCTION + files[i]);
		}
	};
})();
