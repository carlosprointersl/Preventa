/**
 * @fileOverview En este archivo se crea el controlador "Informes". Este es responsable de crear los diferentes
 * tipos de informes según convenga.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * Crea un controlador de nombre "Informes".
 * @class Es la clase que define al controlador "Informes". Interactua con el modelo "Informes".
 * @memberOf Global.Controller
 * @param {String} [action = index]) La acción que debe realizar el controlador.
 */
var Informes = function(action) {

    action = action || "index";

    /**
     * Muestra una tabla/listado de registros.
     * @private
     */
    function index() {
        createMainWin().open();
    };
    
    /**
     * Crea la vista principal de este controlador. Sobre esta vista se realizan todas las acciones.
     * @return {Window} El objeto "Window" que formará la vista principal de este controlador.
     */
    function createMainWin() {
        var win = Ti.UI.createWindow({
            url : Global.Path.VIEW + 'Informes/MainWin.js',
            //title : 'Informes',
            backgroundColor : Global.Theme.BACKGROUND,
            Global : Global,
            log : Log,
            navBarHidden : true,
            dataSection : dataSection,
            exitOnClose : (action === "exit"),
            orientationModes : Global.Platform.TABLET ? [] : [Ti.UI.PORTRAIT]
        });

        //Nuevo informe
        win.addEventListener("newReport", function(e) {
            //Ti.API.info("Start: " + e.start + "\nEnd: " + e.end);
            var data;
            //Según el tipo de report
            switch(e.type) {
                case Global.Report.COMPLET:
                    data = [require(Global.Path.VIEW + 'Informes/Tables/IncidentsData')(e.start, e.end), /*require(Global.Path.VIEW + 'Informes/Tables/MovementsData')(e.start, e.end)*/, require(Global.Path.VIEW + 'Informes/Tables/OrdersData')(e.start, e.end), require(Global.Path.VIEW + 'Informes/Tables/ClientsData')(e.start, e.end), require(Global.Path.VIEW + 'Informes/Tables/ChargesData')(e.start, e.end)];
                    break;
                case Global.Report.ORDERS:
                    data = require(Global.Path.VIEW + 'Informes/Tables/OrdersData')(e.start, e.end);
                    break;
                case Global.Report.CASH_MOVEMENTS:
                    // data = require(Global.Path.VIEW + 'Informes/Tables/MovementsData')(e.start, e.end);
                    break;
                case Global.Report.INCIDENTS:
                    data = require(Global.Path.VIEW + 'Informes/Tables/IncidentsData')(e.start, e.end);
                    break;
                case Global.Report.AUTOSALE:
                    //data = require(Global.Path.VIEW + 'Informes/Tables/AutosaleData')(e.start, e.end);
                    break;
                case Global.Report.CLIENTS:
                    data = require(Global.Path.VIEW + 'Informes/Tables/ClientsData')(e.start, e.end);
                    break;
                case Global.Report.CHARGE:
                    data = require(Global.Path.VIEW + 'Informes/Tables/ChargesData')(e.start, e.end);
                    break;
                case Global.Report.BEVERAGE_ORDER:

                    break;
                case Global.Report.SNACKS_ORDER:

                    break;
            };
            win.fireEvent("returnData", {
                data : data
            });
        });

        //Enviar los datos
        return win;
    };

    /**
     * Busca en las secciones de la tabla si hay al menos una con datos.
     * @private
     * @param {Ti.UI.TableViewSection[]} sections Las secciones que componen la tabla.
     * @return {Boolean} Retorna "TRUE" si hay alguna sección con datos.
     */
    function dataSection(sections) {
        //Recorremos las secciones hasta que una tenga datos o lleguemos la final.
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].enabled) {
                return true;
            };
        };

        return false;
    };

    //Se ejecuta cuando se instancia el objeto.
    /*(function() {
        switch(action) {
            case "index":
                index();
                break;
        };
    })();*/
   index();

};

module.exports = Informes;
