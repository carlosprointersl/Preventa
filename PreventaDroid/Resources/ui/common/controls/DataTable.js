/**
 * @fileOverview En este archivo estan las clases para crear una tabla que contenga datos.
 * Se crean tres clases diferentes dentro del Namespace DataTable :
 * 1. Table -> Crea una tabla.
 * 2. Column -> Crea una columna para la tabla. Será la cabecera de esta.
 * 3. Row -> Crea una fila para la tabla. Es una sub-clase de DataTable
 *
 * @author Juan Carlos Matilla
 * @version 1.0.1
 */

/**
 * Representa una columna.
 * @class Este objeto define las propiedades de una columna que formará parte de una tabla.
 * @memberOf Global.Control.DataTable
 */
var Column = function(options) {
	/** El color por defecto.
	 * @private */
	const COLOR = '#FFFFFF';
	/** La fuente por defecto.
	 * @private */
	const FONT = {
		fontFamily : 'Arial',
		fontSize : 18,
		fontWeight : 'normal'
	};
	/** El ancho por defecto.
	 * @private */
	const WIDTH = 150;
	/** Valor de HorizontalWrap por defecto.
	 * @private */
	const HORI_WRAP = true;
	/** El color de fonde por defecto.
	 * @private */
	const BACK_COLOR = "#535353";
	/** La alineación del texto por defecto.
	 * @private */
	const ALIGN = Ti.UI.TEXT_ALIGNMENT_CENTER;
	/** La alineación vertical del texto por defecto.
	 * @private */
	const VERT_ALIGN = Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER;

	/**
	 * Crea una Label con las opciones por defecto si no le hemos indicado otras. Esta formará
	 * parte de la cabecera de la tabla al ser una columna.
	 * @private
	 * @return {Label} La etiqueta con todos los datos.
	 */
	function createColumn() {
		var label = Ti.UI.createLabel(options);
		label.height = Ti.UI.FILL;
		label.color = label.color || COLOR;
		label.font = label.font || FONT;
		label.width = label.width || WIDTH;
		label.horizontalWrap = label.horizontalWrap || HORI_WRAP;
		label.backgroundColor = label.backgroundColor || BACK_COLOR;
		label.textAlign = label.textAlign || ALIGN;
		label.verticaltAlign = label.verticalAlign || VERT_ALIGN;
		label.text = options.text || options.name;
		label.name = options.name;

		return label;
	};

	/**
	 * Retorna una "Label" que representa la columna.
	 * @return {Label} La etiqueta con todos los datos.
	 */
	this.getColumn = function() {
		return createColumn();
	};
};

/**
 * Representa una tabla.
 * @class Crea una Ti.UI.TableView con las opciones por defecto si no le hemos indicado otras.
 * Es la tabla que se mostrará.
 * @memberOf Global.Control.DataTable
 * @param {Object} [options] Opciones para configurar la tabla.
 */
var Table = function(options) {
	/** El ancho por defecto de las columnas.
	 * @private */
	const WIDTH_DEFAULT = 150;

	/**
	 * El ScrollView donde estará montada la cabecera y la tabla.
	 * @private
	 * @type ScrollView
	 */
	var scroll = Ti.UI.createScrollView({
		borderRadius : 15,
		contentWidth : 'auto',
		contentHeight : 'auto',
		height : Ti.UI.FILL,
		backgroundColor : 'white',
		layout : 'vertical',
		showVerticalScrollIndicator : false,
		showHorizontalScrollIndicator : true,
		visible : false
	});

	/**
	 * La View que representa la cabecera de la tabla.
	 * @private
	 * @type View
	 */
	var head = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		horizontalWrap : false,
		layout : 'horizontal'
	});
	head.addEventListener('postlayout', function(e) {
		var height = e.source.size.height;
		var parentheight = e.source.parent.size.height;

		if (height < (parentheight * 0.1)) {
			head.height = parentheight * 0.1;
		} else {
			head.height = height;
		}

		//Modificamos la altura de "body" para que se adecue
		body.height = parentheight - head.height;
		//Ponemos visible el "scroll" para que se visualice todo. De esta forma no se aprecia cuando la cabecerea se rehace.
		scroll.visible = true;
	});

	/**
	 * La View que representa el cuerpo de la tabla.
	 * @private
	 * @type View
	 */
	var body = Ti.UI.createView({
		//height : '90%',
		width : Ti.UI.FILL,
		horizontalWrap : false
	});

	/**
	 * La TableView donde se mostrarán los datos. La añadiremos a "body".
	 * @private
	 * @type TableView
	 */
	var table = Ti.UI.createTableView(options);

	/**
	 * Crea una nueva fila.
	 * @class Representa una fila válida para la tabla.
	 * @memberOf Global.Control.DataTable.Table
	 * @param {Object} options Opciones para configurar la tabla.
	 */
	var Row = function(options) {
		/** El color por defecto
		 *  @private*/
		const COLOR = '#222';
		/** La fuente por defecto
		 *  @private*/
		const FONT = {
			fontFamily : 'Arial',
			fontSize : 18,
			fontWeight : 'normal'
		};
		/** Valor de HorizontalWrap por defecto.
		 *  @private*/
		const HORI_WRAP = false;
		/** Color de la celda por defecto.
		 *  @private*/
		const BACK_COLOR_CELL = "Transparent";
		/** El color de la fila por defecto.
		 *  @private*/
		const BACK_COLOR = undefined;
		/** El color de la fila seleccionada por defecto.
		 *  @private*/
		const BACK_SELECT_COLOR = "orange";
		/** El nombre de la clase por defecto.
		 *  @private*/
		const CLASS = "Row";
		/** La altura por defecto.
		 *  @private*/
		const HEIGHT = 50;
		/** La alineación del texto por defecto.
		 *  @private*/
		const ALIGN = Ti.UI.TEXT_ALIGNMENT_CENTER;
		/** La alineación vertical del texto por defecto.
		 *  @private*/
		const VERT_ALIGN = Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER;

		/** Donde guardamos las celdas de la fila.
		 *  @private*/
		var cell = new Object();
		// Los argumentos var arg = arguments;

		/**
		 * Crea una Label con las opciones por defecto si no le hemos indicado otras.
		 * @private
		 * @return {Ti.UI.Label} La etiqueta que representa una celda para la fila.
		 */
		function createLabelRow(row) {
			var label = Ti.UI.createLabel(row);
			label.color = label.color || COLOR;
			label.font = label.font || FONT;
			label.horizontalWrap = label.horizontalWrap || HORI_WRAP;
			label.backgroundColor = label.backgroundColor || BACK_COLOR_CELL;
			label.textAlign = label.textAlign || ALIGN;
			label.verticaltAlign = label.verticalAlign || VERT_ALIGN;
			label.text = row != undefined ? row.text || row : "";
			return label;
		};

		/**
		 * Crea una fila válida para añadir a un TableView. En el Objeto que pasamos por parámetro
		 * tiene una propiedad de nombre "data" donde se guarda un Array asociativo con los datos de la fila.
		 * Los índices del Array deben coincidir con los nombres de las columnas.
		 * @private
		 * @return {Ti.UI.TableViewRow} Una fila válida para añadir a una tabla.
		 */
		function createRow() {
			var rowView = Ti.UI.createTableViewRow(options);
			rowView.className = rowView.className || CLASS;
			rowView.backgroundSelectedColor = rowView.backgroundSelectedColor || BACK_SELECT_COLOR;
			rowView.backgroundColor = rowView.backgroundColor || BACK_COLOR;
			rowView.width = Ti.UI.SIZE;
			rowView.height = rowView.height || HEIGHT;
			rowView.horizontalWrap = rowView.horizontalWrap || HORI_WRAP;
			rowView.layout = 'horizontal';

			var heads = head.getChildren();
			var row = returnValidRow();

			for (var x = 0; x < heads.length; x++) {
				var labelRow = createLabelRow(row[heads[x].name]);
				labelRow.width = heads[x].width;
				labelRow.height = rowView.height;
				cell[heads[x].name] = labelRow;
				rowView.add(labelRow);
				rowView[heads[x].name] = row[heads[x].name];
			};

			return rowView;
		};

		/**
		 * Examina el parámetro "options" para saber que tipo de datos se han pasado.
		 * Si es válido se retorna una fila con datos válida, sino lo son la fila estará vacía.
		 * @private
		 * @return {Object} Representa un Array asociativo con los nombres de las columnas.
		 */
		function returnValidRow() {
			//Si es un Array.
			if (Array.isArray(options)) {
				return arrayToObject(options);
			}

			//Si es un Object ...
			if ( options instanceof Object || typeof options == "object") {
				//No tiene el campo data
				if (options.data == undefined) {
					return options;
				} else {// Tiene el campo data
					return options.data;
				};
			}

			//Si NO es ninguna de las anteriores
			var validRow = new Object();
			var heads = head.getChildren();
			for (var i = 0; i < heads.length; i++) {
				validRow[heads[i].name] = "";
			};

			return validRow;
		};

		/**
		 * Retorna una fila válida.
		 * @return {Ti.UI.TableViewRow} La fila montada.
		 */
		this.getRow = function() {
			return createRow();
		};
	};

	/**
	 * Pasa un Array a Object para que sea accesible a través de índices asociativos (nombres columnas).
	 * Los índices del Object resultante son las columnas que tiene la tabla.
	 * @private
	 * @param {Array} value El Array a pasa a Objeto.
	 * @return {Object} Representa un Array asociativo con los nombres de las columnas.
	 */
	function arrayToObject(value) {
		var heads = head.getChildren();
		var newObject = new Object();
		for (var i = 0; i < heads.length; i++) {
			newObject[heads[i].name] = value[i] || "";
		};

		return newObject;
	};

	/**
	 * Añade una columna a la tabla. Si el parámetro es del tipo Column lo añade directamente,
	 * en caso contrario lo crea.
	 * @param {Object/Object[]/Column/Column[]/String/String[]} column Una columna para la tabla.
	 */
	this.addColumn = function(column) {
		//Si hemos pasado mas de un parámetro lo pasamos a un Array.
		if (arguments.length > 1) {
			column = Array.prototype.slice.call(arguments);
		};
		//Array - Añadimos todos los elementos.
		if (Array.isArray(column)) {
			for (var i = 0; i < column.length; i++) {
				this.addColumn(column[i]);
			};
			//Añade la columna si es válida.
		} else if ( column instanceof Column) {
			head.add(column.getColumn());
			//Object - Crea una columna y la añadimos.
		} else if ( typeof column == "object") {
			this.addColumn(new Column(column));
			//String - Crea una columna con los valores mínimos y la añadimos.
		} else if ( typeof column == "string") {
			this.addColumn(new Column({
				name : column
			}));
			//Mensaje de error.
		} else {
			alert("La columna no se puede añadir a la tabla.\nEl objeto no es del tipo adecuado.\nColumn: " + column);
		}
	};

	/**
	 * Crea un objeto del tipo "Row" válido para la tabla actual. En caso de que los datos no sean válidos
	 * crea una fila vacía.
	 * @param {String[]/Object/Arguments} [options] Las opciones que ha de tener la fila.
	 * @return {Row} La fila creada.
	 */
	this.newRow = function(options) {
		//Si hay mas de un argumento.
		if (arguments.length > 1) {
			return new Row(arrayToObject(Array.prototype.slice.call(arguments)));
		}
		return new Row(options);
	};

	/**
	 * Añade una fila a la tabla. Antes se debe de haber creado con el método newRow();
	 * @param {Row/Row[]} Una fila con sus datos.
	 */
	this.addRow = function(row) {
		if ( row instanceof Row) {
			var getRow = row.getRow();
			// Si no se ha definido backgroundColor pone el de defecto.
			getRow.backgroundColor = getRow.backgroundColor == undefined ? this.getNumRows() % 2 == 0 ? '#BFCFFE' : '#809FEE' : getRow.backgroundColor;
			table.appendRow(getRow);
			table.scrollToIndex(this.getNumRows() - 1);
		} else if (Array.isArray(row)) {
			for (var i = 0; i < row.length; i++) {
				this.addRow(row[i]);
			};
		} else {
			alert('La fila no es válida -> ' + row);
		}

	};

	/**
	 * Quita una fila en la tabla.
	 * @param {Integer} index El índice de la fila en la tabla.
	 */
	this.removeRow = function(index) {
		try {
			table.deleteRow(index);
		} catch(e) {
			alert("No es posible eliminar la fila.");
		}

	};

	/**
	 * Actualiza una fila con otra.
	 * @param {Row} row La nueva fila.
	 * @param {Integer} index El índice de la fila a actualizar.
	 */
	this.updateRow = function(index, row) {
		table.scrollToIndex(index);
		table.updateRow(index, row.getRow());
	};

	/**
	 * La cantidad de columnas de la tabla.
	 * @return {Integer} El número de columnas.
	 */
	this.getNumColumns = function() {
		return head.getChildren().length;
	};

	/**
	 * La cantidad de filas de la tabla.
	 * @return {Integer} El número de filas.
	 */
	this.getNumRows = function() {
		var num = 0;
		for (var i = 0; i < table.sections.length; i++) {
			num += table.sections[i].rows.length;
		};

		return num;
	};

	/**
	 * Crea y retorna una tabla. Antes se deben haber creado las columnas e insertado las filas.
	 * @return {Ti.UI.ScrollView} Una vista ScrollView con una tabla.
	 */
	this.getTable = function() {
		scroll.add(head);
		body.add(table);
		scroll.add(body);
		return scroll;
	};

	/**
	 * Añade eventos a la tabla.
	 * @param {String} name El nombre del evento.
	 * @param {Callback<Object>} [callback] Función se llama cuando el evento es activado.
	 */
	this.addEventListener = function(name, callback) {
		table.addEventListener(name, callback);
	};

	/**
	 * Quita eventos a la tabla.
	 * @param {String} name El nombre del evento.
	 * @param {Callback<Object>} [callback] Función a remover. Es la función que se paso al evento al crearlo.
	 */
	this.removeEventListener = function(name, callback) {
		table.removeEventListener(name, callback);
	};

	/**
	 * Dispara un evento.
	 * @param {String} name Nombre del evento.
	 * @param {Dictionay} [events] Diccionario de claves y valores que retorna el evento al oyente.
	 */
	this.fireEvent = function(name, events) {
		table.fireEvent(name, events);
	};
};
/**
 * Contiene los objetos necesarios para crear una tabla editable.
 * @namespace Objeto DataTable
 * @name Global.Control.DataTable
 */
var DataTable = {
	Table : Table,
	Column : Column
};

// var functionControl = DataTable;
module.exports = DataTable;
