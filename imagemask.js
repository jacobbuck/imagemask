/*!
 * imageMask.js - Copyright (c) 2012 Jacob Buck
 * https://github.com/jacobbuck/imgMask.js
 * Licensed under the terms of the MIT license.
 */
window.imgMask = function ( origimg, mask_url, stretch ) {
	if ( ! 'HTMLCanvasElement' in window ) 
		return false;
	// Some Functions
	function imagesReady ( images, callback ) {
		var total  = images.length,
			loaded = 0;
		for ( var i = 0; i < total; i++ ) {
			images[ i ].onload = function(){
				if ( ++loaded >= total )
					callback();
			}
		}
	}
	var canvas  = document.createElement("canvas"),
		context = canvas.getContext('2d'),
		overimg = new Image(),
		maskimg = new Image(); 
	overimg.src = origimg.src;
	maskimg.src = mask_url;
	origimg.style.visibility = 'hidden';
	imagesReady( 
		[ maskimg, overimg ], 
		function(){
			canvas.width  = overimg.width;
			canvas.height = overimg.height;
			context.globalCompositeOperation = 'source-over';
			context.drawImage( maskimg, 0, 0, 
				stretch ? overimg.width : maskimg.width, 
				stretch ? overimg.height : maskimg.height
			);
			context.globalCompositeOperation = 'source-atop';
			context.drawImage( overimg, 0, 0, overimg.width, overimg.height );
			origimg.src = canvas.toDataURL('image/png');
			origimg.style.visibility = 'visible';
		}
	);
};