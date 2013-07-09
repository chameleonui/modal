var jq = require('jquery'),
    Emitter = require('emitter'),
    inherit = require('inherit'),
    dot = require('doT');

module.exports = Modal;

var defaults = {
    template: "<div class='modal'></div>"
    , method: 'after'
};

function Modal(el, opts) {
    // Merge opts with defaults
    this.opts = opts || {};
    for (var i in defaults) {
        if (!(i in this.opts)) this.opts[i] = defaults[i];
    }

    // Protected vars
    this._bindTo = el;
    this._template = dot.template(this.opts.template);

    // Enable Emmiter to call this obj.
    Emitter.call(this); 
}

// Inherit Modal features from Emmiter 
inherit(Modal, Emitter);

Modal.prototype.template = function(template) {
    if (template) this._template = dot.template(template);
    return this._template;
}

Modal.prototype.create = function(data) {
    return this._template(data);
}

Modal.prototype.show = function(el, method, data) {
    if (el) this._bindTo = el;
    var method = method || this.opts.method;
    if (this._bindTo && jq.fn[method] && !this._jqEl) {
        this._jqEl = jq(this.create(data));
        jq(this._bindTo)[method](this._jqEl);
    }
    this.emit('show');
    return this;
}

Modal.prototype.hide = function() {
    if (this._jqEl) {
        this._jqEl.remove(); //or .detach()?
        delete this._jqEl;
    }
    this.emit('hide');
    return this;
}

Modal.prototype.toggle = function(el, method, data) {
    if (this._jqEl) {
        this.hide();
    } else {
        this.show(el, method, data);
    }
    this.emit('toggle');
    return this;
}


