/**
 * @fileOverview En este archivo se crea el controlador "NotasPreventista".
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 *
 */

/**
 * La librería underscore.js
 */
var _ = require('/lib/underscore');

/**
 * Crea un controlador de nombre "NotasPreventista".
 * @class Es la clase que define al controlador "NotasPreventista". Interactua con el modelo "NotasPreventista".
 * @memberOf Global.Controller
 */
var NotasPreventista = function() {
    /**
     * El modelo con los datos de las notas.
     * @private
     * @type Model
     */
    var model = new Global.Model.NotasPreventista();

    /**
     * El modelo con los datos de las notas leídas.
     * @private
     * @type Model
     */
    var modelSend = new Global.Model.NotasPreventistaSend();

    /**
     * Elimina la nota para que no aparezca como leída.
     * @param {Object} note La nota con el estado cambiado.
     */
    function destroy(note) {
        modelSend.setData(note);
        modelSend.del();
    };

    /**
     * Inserta la nota en la base de datos "sendxxx.s3db".
     * @param {Object} note La nota a insertar.
     */
    function insert(note) {
        note.send = 0;
        modelSend.setData(note);
        modelSend.insert();
    };

    /**
     * Recupera las notas de un cliente o todas y marca las que están leídas. Si no hay cliente las recupera todas, en caso
     * contrario sólo las del cliente indicado.
     * @param {Number} client El código del cliente a consultar.
     * @return {Object[]} Las notas con los estados correctos.
     */
    function loadNotes(client) {
        var notes = model.select(client === undefined ? "" : "WHERE CodigoCliente = '" + client + "'");
        var notesSend = modelSend.select();

        //Recorremos las notas leídas para marcarlas y saber si se han enviado.
        _.each(notesSend, function(element) {
            var index = _.indexOf(notes, _.find(notes, function(c) {
                return c.id === element.id;
            }));
            if (index > -1) {
                notes[index].Estado = 1;
                notes[index].send = element.send;
            };
        });

        //Ordenamos las notas en NO LEDIAS, LEIDAS y ENVIADAS.
        notes = _.sortBy(_.sortBy(notes, function(_note) {
            return _note.Estado == 1;
        }), function(_note) {
            return _note.send == 1;
        });

        return notes;
    };

    /**
     * Recuperamos las notas de un cliente en concreto.
     * @param {Number} client El código del cliente del que queremos recuperar las notas.
     * @return {Object[]} Un array con las notas que tenga el cliente.
     */
    this.getNotes = function(client) {
        return loadNotes(client);
    };

    /**
     * Recuperamos todas las notas.
     * @return {Object[]} Un array con las notas.
     */
    this.getAllNotes = function() {
        return loadNotes();
    };

    /**
     * Actualiza los datos de la nota. El único que puede cambiar es el estado.
     * @param {Object} note La nota a modificar.
     */
    this.checkNote = function(note) {
        if (note.send === undefined)
            insert(note);
        else
            destroy(note);
    };
};

module.exports = NotasPreventista;
