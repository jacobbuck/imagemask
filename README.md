# imagemask

Cross browser image masking using canvas.

## Usage

Imagemask has 3 parameters:

- image: Image to apply mask to (must be an `<img>` element)
- mask: Mask image to apply (can be `<img>` element or URL string)
- options: Optional object of options:
  - stretch: Set true if mask should strech over image
  - complete: Function that get's called once the mask has been applied

```
// Standalone
imagemask(myCoolImage, document.querySelector('img.fancy-mask'));

// With jQuery Adaptor
$('img.cool').imagemask('/url/to/mask.png', { stretch: true });
```

## Browser support

Works on all browsers which support [HTML Canvas Element](http://caniuse.com/canvas).
