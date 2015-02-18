/**
 * @fileOverview En este archivo se añaden todos los controles a Global.Control.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */
//Busca en la carpeta "ui/common/controls" todos los archivos y los añade al namespace Global.Control
(function() {
    var dir = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory() + Global.Path.CONTROL);
    var files = dir.getDirectoryListing();

    /**
     * @namespace Los controles propios.
     */
    Global.Control = {};

    for (var i = 0; i < files.length; i++) {
        tmp_file = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory() + Global.Path.CONTROL + files[i]);
        //Si es un dirctorio miramos en su interior
        if (tmp_file.directoryListing.length > 0) {
            //Los archivos del directorio
            tmp_files = tmp_file.getDirectoryListing();
            //El nombre del directorio
            var dirName = tmp_file.name.replace("/", "");
            Global.Control[dirName] = new Object();
            //Por cada archivo en el directorio...
            for (var t = 0; t < tmp_files.length; t++) {
                //Si es una archivo *.js.
                if (Global.Functions.isJsFile(tmp_files[t])) {
                    //El nombre del archivo.
                    var name = tmp_files[t].slice(0, -3);
                    Global.Control[dirName][name] = require(Global.Path.CONTROL + dirName + "/" + name);
                };
            };
        } else {
            if (Global.Functions.isJsFile(files[i])) {
                var name = files[i].slice(0, -3);
                Global.Control[name] = require(Global.Path.CONTROL + name);
            };
        };
    };
})();
