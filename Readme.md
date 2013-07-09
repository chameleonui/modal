
# Chamelon UI – Modal

  Universal in page modal object/element

## Installation

    $ component install chameleonui/modal

## API

### Modal(el[,opts])

Creates new Modal object attached to `el` with optional options. 
Options has following default values:

    var defaults = {
        template: "<div class='modal'></div>"
        , method: 'after'
    };

### Modal.template(template:stringDoT):function

Sets DoT template of Modal.

### Modal.create([data:object]):stringHtml

Create HTML of Modal object with optional data object to be used to fill DoT template variables.

### Modal.show(el[, method, data]);

Show and attach modal element to DOM up to options method – by default after the referencing element.

### Modal.hide();

Hides modal element.

### Modal.toggle(el[, method, data]);

Toggle modal with option to set new referencing element, DOM attaching method and data to be filled to Modal's DoT Template.

## License

  MIT
