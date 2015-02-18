/**
 * @fileOverview En este archivo se crea el formulario para crear/editar los parámetros.
 *
 * @author Juan Carlos Matilla
 * @version 1.0
 *
 */

function TabGroup(global) {

	var Global = global;
	var tabGroup = Ti.UI.createTabGroup({
		//backgroundColor : 'white',
		exitOnClose : false
	});

	var winTab1 = Ti.UI.createWindow({
		title : 'Impresión facturas',
		backgroundColor : '#000000',
		url : 'WinPrintInvoices.js',
		layout : 'vertical'
	});

	var tabPrint = Ti.UI.createTab({
		title : "Impresión facturas",
		window : winTab1,
		icon : Global.Path.IMAGES + 'printer.png'
	});
	
	var winTab2 = Ti.UI.createWindow({
		title : 'Facturas pendientes',
		backgroundColor : '#000000',
		url : 'WinInvoicesPendents.js',
		layout : 'vertical',
		global : Global
	});
	
	var tabPending = Ti.UI.createTab({
		title : "Facturas pendientes",
		window : winTab2,
		icon : Global.Path.IMAGES + 'document.png'
	});
	
	var tabPending_extra = Ti.UI.createTab({
		title : "Facturas pendientes",
		icon : Global.Path.IMAGES + 'document.png'
	});
	
	
	tabGroup.addTab(tabPrint);
	tabGroup.addTab(tabPending);
	tabGroup.addTab(tabPending_extra);
	tabGroup.addTab(tabPending_extra);
	tabGroup.addTab(tabPending_extra);

	return tabGroup;
}

module.exports = TabGroup;
