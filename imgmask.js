/*!
 * imageMask.js - Copyright (c) 2012 Jacob Buck
 * https://github.com/jacobbuck/imgMask.js
 * Licensed under the terms of the MIT license.
 */
window.imgMask = function ( origimg, mask_url ) {
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
	// Webkit CSS Mask
	if ( 'webkitMask' in origimg.style ) {
		origimg.style.webkitMask = 'url('+mask_url+')';
	// Canvas Mask
	} else if ( 'HTMLCanvasElement' in window ) {
		(function(){
			var canvas  = document.createElement("canvas"),
				context = canvas.getContext('2d'),
				overimg = new Image(),
				maskimg = new Image(); 
			overimg.src = origimg.src;
			maskimg.src = mask_url;
			for ( 
				var a = ['id','className','width','height','title'],
					i = a.length - 1, 
					v;
				v = a[i], i >= 0;
				i--
			) {
				canvas[ v ] = origimg[ v ];
			}
			origimg.parentNode.replaceChild( canvas, origimg );
			imagesReady( 
				[ maskimg, overimg ], 
				function(){
					context.globalCompositeOperation = 'source-over';
					context.drawImage( maskimg, 0, 0, maskimg.width, maskimg.height );
					context.globalCompositeOperation = 'source-atop';
					context.drawImage( overimg, 0, 0, overimg.width, overimg.height );
				}
			);
		}())
	}
};