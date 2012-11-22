# imgMask.js #

Cross browser image masking.

## jQuery Plugin Usage (jquery-imgmask.js) ##

$( element || selector ).imgMask( mask_url, stretch );

#### Example ####

``` js
$('#myimage').imgMask( 'mymask.png', true );
```

## Standalone Usage (imgmask.js) ##

imgMask( element, mask_url, stretch  )

#### Example ####

``` js
imgMask( document.getElementByID('myimage'), 'mymask.png' );
```

## Browser support ##

Works on all browsers which support [HTML Canvas Element](http://caniuse.com/canvas).

## Limitations ##

- Only works with the HTML Image Element (`<img>`).