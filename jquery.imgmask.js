/*!
 * imageMask.js - Copyright (c) 2012 Jacob Buck
 * https://github.com/jacobbuck/imgMask.js
 * Licensed under the terms of the MIT license.
 */
(function($){
	$.fn.extend({
		imgMask: function ( mask_url ) {
			// Simple ImagesReady Function
			function imagesReady ( images, callback ) {
				var total  = images.length,
					loaded = 0;
				$(images).load(function(){
					if ( ++loaded >= total )
						callback();
				});
			}
			// Use Webkit CSS Mask (non-standard, but still awesome)
			if ( 'webkitMask' in this[0].style )
				return this.each(function(){
					this.style.webkitMask = 'url(' + mask_url + ')';
				});
			// Use Canvas Mask
			else if ( 'HTMLCanvasElement' in window )
				return this.css( 'visibility', 'hidden' ).each(function(){
					var origimg = this,
						canvas  = $('<canvas>'),
						context = canvas[0].getContext('2d'),
						overimg = new Image(),
						maskimg = new Image();
					overimg.src = origimg.src;
					maskimg.src = mask_url;
					imagesReady( 
						[ maskimg, overimg ],
						function(){
							canvas.width( overimg.width ).height( overimg.height );
							context.globalCompositeOperation = 'source-over';
							context.drawImage( maskimg, 0, 0, maskimg.width, maskimg.height );
							context.globalCompositeOperation = 'source-atop';
							context.drawImage( overimg, 0, 0, overimg.width, overimg.height );
							$(origimg).attr( 'src', canvas[0].toDataURL('image/png') ).css( 'visibility','visible' );
						}
					);
				});
			// Otherwise Do Nothing (only IE 8 and older will get this far)
			return this;
		}
	});
}(this.jQuery));