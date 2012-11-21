# imgMask.js #

Cross browser image masking.

## jQuery Plugin Usage (jquery-imgmask.js) ##

``` js
$('#myimage').imgMask('mymask.png');
```

## Standalone Usage (imgmask.js) ##

``` js
imgMask( document.getElementByID('myimage'), 'mymask.png' );
```

## Browser support ##

Works on all browsers which support [HTML Canvas Element](http://caniuse.com/canvas).

Webkit browsers uses native (but non-standard) `-webkit-mask` CSS property.

## Limitations ##

- Only works with the HTML Image Element (`<img>`).
- Only supports fixed px sizes. Percentage widths and resizing doesn't work.
- Canvas replacement removes most inline attributes (i.e. `data-*`, `alt`, `style`, etc).
- Doesn't support HTML Image Maps.