/**
 * @fileOverview En este archivo se declara la clase que hace accesible la variable "Global" para todos los archivos.
 * Se ha de recuperar con el método "require".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

function ReturnGlobal() {
    return Global;
};

module.exports = ReturnGlobal;