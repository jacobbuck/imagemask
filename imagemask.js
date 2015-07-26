/*!
 * imagemask.js - Copyright (c) 2015 Jacob Buck
 * https://github.com/jacobbuck/imagemask
 * Licensed under the terms of the MIT license.
 */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		root.imagemask = factory();
	}
}(this, function () {
	// Check if the browser supports html5 canvas
	var supports = !!window.HTMLCanvasElement;

	// Fire a callback once all images passed have loaded
	// @param images Array
	// @param callback Function
	function imagesReady (images, callback) {
		var length = images.length;
		var loaded = 0;
		for (var i = 0; i < length; i++) {
			images[i].onload = function () {
				if (++loaded >= length) {
					callback();
				}
			};
		}
	}

	// Check if passed is an image element
	// @param image Mixed
	// @return Boolean true if input is image element
	function isImageNode (image) {
		return (image && image.nodeType === 1 && image.nodeName === 'IMG');
	}

	// Fire a callback once all images passed have loaded
	// @param image Node Image to apply mask to
	// @param mask Node|String Mask image
	// @param options Object
	function maskImage (image, mask, options) {
		options = options || {};

		// Ensure arguments are correct
		if (!isImageNode(image)) {
			throw new Error('Expected image argument as <img> element');
		}
		if (!isImageNode(mask) && typeof mask !== 'string') {
			throw new Error('Expected mask argument as <img> element or string');
		}

		// Don't bother with older browsers that don't support canvas
		if (!supports) { return false; }

		// Backup image's origial source into data attribute
		image.setAttribute('data-original-src', image.src);

		// Create canvas and get context
		var canvas  = document.createElement('canvas');
		var context = canvas.getContext('2d');

		// Create new image elements for manipulating image and mask
		var imageImage = document.createElement('img');
		var maskImage = document.createElement('img');

		// Once image and mask images have loaded (after source set bellow)
		imagesReady([imageImage, maskImage], function () {

			// Set canvas to the same size as image
			canvas.width = imageImage.width;
			canvas.height = imageImage.height;

			// Draw the mask onto the canvas first
			context.globalCompositeOperation = 'source-over';
			context.drawImage(maskImage, 0, 0,
				options.stretch ? imageImage.width : maskImage.width,
				options.stretch ? imageImage.height : maskImage.height
			);

			// Then draw the original image atop of the mask
			context.globalCompositeOperation = 'source-atop';
			context.drawImage(imageImage, 0, 0, imageImage.width, imageImage.height);

			// Replace image source with canvas output
			image.src = canvas.toDataURL('image/png');

			// Fire callback if set
			if (typeof options.complete === 'function') {
				options.complete.call(image, image, mask);
			}
		});

		// Set the image and mask images source
		imageImage.src = image.src;
		maskImage.src = mask.src || mask;
	}

	// Return maskImage function
	return maskImage;
}));
