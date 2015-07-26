/*!
 * jquery.imagemask.js - Copyright (c) 2015 Jacob Buck
 * https://github.com/jacobbuck/imagemask
 * Licensed under the terms of the MIT license.
 */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'imagemask'], factory);
	} else {
		factory(root.$, root.imagemask);
	}
}(this, function ($, imagemask) {
	$.fn.extend({
		imagemask: function (mask, options) {
			return this.each(function () {
				imagemask(this, mask, options);
			});
		}
	});
}));
