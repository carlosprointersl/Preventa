/**
 * @fileOverview En este archivo se cre el Namespace Global.Platform.
 *
 * @author <a href="mailto:juancarlos@prointersl.com">Juan Carlos Matilla</a>
 * @version 1.0
 */

/**
 * Indica si las medidas del dispositivo corresponden a una Tablet.
 * @return {Boolean} Retorna TRUE si el dispositivo es una Tablet, FALSE en caso contrario. 
 */
function isTablet(){
    var osname = Ti.Platform.osname;
    dpi = Ti.Platform.displayCaps.dpi,
    w = Ti.Platform.displayCaps.platformWidth / dpi,
    h = Ti.Platform.displayCaps.platformHeight / dpi,
    diagonalSize = Math.sqrt(w*w+h*h),
    diag = 6.5;
    
    return osname === 'android' && diagonalSize >= diag;  
};

/**
 * @namespace Las constantes de las caracteristicas del dispositivo.
 */
Global.Platform = {
	/** <b>Ti.Platform.</b> */
	NAME 	: Ti.Platform.name,
	/** <b>Ti.Platform.osname</b> */
	OSNAME	: Ti.Platform.osname,
	/** <b>Ti.Platform.version</b> */
	VERSION : Ti.Platform.version,
	/** <b>Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor</b> */
	HEIGHT 	: Math.round(Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor),
	/** <b>Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor</b> */
	WIDTH 	: Math.round(Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor),
	/** <b>Ti.Platform.model</b> */	
	MODEL 	: Ti.Platform.model,
	/** <b>Indica si es una Tablet</b> */    
    TABLET  : isTablet()
}; 