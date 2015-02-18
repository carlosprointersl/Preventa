/**
 * @fileOverview En este archivo se declara las clases "Node", "Collection".
 * La colección es una lista simple enlazada donde los elementos serán los nodos.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

function Collection() {
    /**
     * EL nodo de una lista enlazada.
     * @class
     * @param {Object} El objeto que queremos guardar en la lista.
     */
    var Node = function(item) {

        /**
         * El nodo siguiente
         * @private
         */
        var node = null;

        /**
         * El contenido del nodo
         * @private
         */
        var item = item;

        /**
         * Cambia el contenido del nodo.
         * @param {Object} Lo que queremos guardar en el nodo.
         */
        this.setItem = function(value) {
            item = value;
        };
        /**
         * El contenido del nodo.
         * @return {Object}  El objeto guardado en el nodo.
         */
        this.getItem = function() {
            return item;
        };

        /**
         * Cambia el contenido del nodo siguiente
         * @param {Node} El nodo siguiente.
         */
        this.setNode = function(value) {
            if ( value instanceof Node) {
                node = value;
            };
        };

        /**
         * El nodo siguiente.
         * @return {Node}
         */
        this.getNode = function() {
            return node;
        };

    };

    /**
     * Es una lista simple enlazada.
     * @class
     */
    var CollectionNode = function() {
        /**
         * El nodo inicial
         * @private
         */
        var start = null;

        /**
         * El nodo final
         * @private
         */
        var end = null;

        /**
         * El tamaño de la lista
         * @private
         */
        var size = 0;

        /**
         * No dice si la lista está vacía.
         * @private
         * @return {Boolean} Retorna TRUE si la lista está vacía.
         */
        function isEmpty() {
            return size == 0;
        };

        /**
         * Añade un elemento al final de la lista
         * @param {Object} item El objeto que se añade a la lista.
         */
        this.add = function(item) {
            var node = new Node(item);
            //Si no hay ningún elemento
            if (isEmpty()) {
                start = node;
                end = node;
            } else {
                //Si hay elementos ponemos el siguiente al final
                end.setNode(node);
                end = node;
            };
            size += 1;
        };

        /**
         * Elimina el elemento de la lista si existe.
         * @param {Object} item El elemento a eliminar
         */
        this.remove = function(item) {
            if (!isEmpty()) {
                //Empezamos a buscar des del principio.
                var node = start;
                var preNode = null;
                //Mientras no sea igual y no estemos en el final.
                while (node.getItem() != item && node.getNode() != null) {
                    preNode = node;
                    node = node.getNode();
                };

                //Si salimos del bucle porque son iguales hemos de quitar este elemento.
                if (node.getItem() == item) {
                    preNode.setNode(node.getNode());
                    size -= 1;
                };
            };

        };

        /**
         * Quita el primer elemento de la lista. Si está vacía retorna NULL.
         * @return {Object} El primer elemento de la lista.
         */
        this.removeFirst = function() {
            if (isEmpty()) {
                return null;
            } else {
                var node = start;
                //Si solo hay un elemento
                if (start == end) {
                    start = null;
                    end = null;
                } else {
                    start = start.getNode();
                };
                size -= 1;
                return node.getItem();
            };

        };

        /**
         * Limpia la lista.
         */
        this.clear = function() {
            start = null;
            end = null;
            size = 0;
        };

        /**
         * Muestra el valor "string" de todos los objetos que componen la colección.
         * @return {String} La cadena con todos los valores de los objetos de la colección.
         */
        this.toString = function() {
            //Si no está vacia
            if (!isEmpty()) {
                var node = start;
                var returns = "";
                while (node.getNode() != null) {
                    returns += node.getItem().toString() + " ";
                    node = node.getNode();
                };

                returns += end.getItem().toString() + " ";
                return returns;
            } else {
                return "La colección está vacía.";
            };
        };

    };

};

module.exports = Collection;