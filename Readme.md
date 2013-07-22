
# Chamelon UI – Modal

  Universal in page modal object/element

## Installation

    $ component install chameleonui/modal

## API

### Modal(el[,opts])

Creates new Modal object attached to `el` with optional options. 
Options has following default values:

```js
var defaults = {
    template: "<div class='modal is-hidden'></div>", 
    method: 'after',
    class: 'modal',
    classHidden: 'is-hidden',
    eventName: 'chameleonui-modal',
    ajaxErrorMsg: 'Server communication error!'
};
```

Public properties:
    
```js
Modal.id;        // Unique ID used for HTML element
Modal.isPlaced;  // DOM placement state
Modal.isVisible; // visibility state
```


### Modal.template(template:stringDoT):this

Sets DoT template of Modal.


### Modal.place([el:element, data:object]):this

Place Modalt into DOM – hidden by default.


### Modal.remove():this

Remove hide and remove modal form DOM.


### Modal.show():this

Show modal to all.


### Modal.hide():this

Hides modal - but it is stil in DOM.


### Modal.toggle():this

Toggle modal visibility – does not manipulate DOM.


### Modal.content(html:htmlString):this

Replace content if Modal already placed.


### Modal.ajaxContent(url, type:GET, cache:true ):this

Replace content by AJAX response if Modal already placed.
 - `type` – HTTP request method GET/POST… etc. 
    - be aware XHR needs CORS and HTTP OPTIONS enabled
 - `cache` – use cache for XHR on not – default: `true`

## Author(s)

[Edgedesign s.r.o.](http://www.edgedesing.cz) – Tomas Kuba


## License

  MIT
