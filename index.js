var $ = require('jquery'),
    Emitter = require('emitter'),
    inherit = require('inherit'),
    dot = require('doT');

module.exports = Modal;

var defaults = {
    template: "<div class='modal is-hidden'></div>", 
    method: 'after',
    class: 'modal',
    classHidden: 'is-hidden',
    eventName: 'chameleonui-modal',
    ajaxErrorMsg: 'Server communication error!'
};

function Modal(el, options) {
    // Merge opts with defaults
    this.options = options || {};
    for (var i in defaults) {
        if (!(i in this.options)) this.options[i] = defaults[i];
    }

    this.id = Math.random().toString(36).slice(2);
    // Flags
    this.isPlaced = false;
    this.isVisible = false;

    // Protected vars
    this._bindTo = el;
    this._template = dot.template(this.options.template);

    // Enable Emmiter to call this obj.
    Emitter.call(this); 
}

// Inherit Modal features from Emmiter 
inherit(Modal, Emitter);

Modal.prototype.template = function(template) {
    if (template) {
        this._template = dot.template(template);
    }
    return this;
}

Modal.prototype.place = function(el, data) {
    if(!this.isPlaced){
        if (el) this._bindTo = el;
        if (!data) data = {};
        if (this._bindTo && $.fn[this.options.method] && !this.isVisible) {
            this._$el = $(this._template(data));
            this._$el.attr('id', this.id);
            $(this._bindTo)[this.options.method](this._$el);
            this._bindClickRemove();
            this._bindKeyupRemove();
            this.isPlaced = true;
            this.emit('place');
        }
    }
    return this;
};

Modal.prototype.remove = function() {
    if (this.isPlaced) {
        this._$el.remove();
        delete this._$el;
        this._unbindClickRemove();
        this._unbindKeyupRemove();
        this.isPlaced = this.isVisible = false;
        this.emit('remove');
    }
    return this;
};

Modal.prototype._bindClickRemove = function() {
    var eventName = 'click.' + this.options.eventName + '-' + this.id,
    selector = '#' + this.id + ' [data-' + this.options.class + ']';
    $('body').on(eventName, selector, this, function(e){
        e.preventDefault();
        var action = $(this).data(e.data.options.class);
        if (action == 'remove' || action == 'hide') {
            e.data[action]();
        }
    });
};

Modal.prototype._unbindClickRemove = function(e) {
    $('body').off('click.' + this.options.eventName + '-' + this.id);
};

Modal.prototype._bindKeyupRemove = function() {
    var eventName = 'keyup.' + this.options.eventName + '-' + this.id;
    $('body').on(eventName, this, function(e){
        if (e.keyCode == 27) e.data.remove();
    });
};

Modal.prototype._unbindKeyupRemove = function(e) {
    $('body').off('keyup.' + this.options.eventName + '-' + this.id);
};

Modal.prototype.show = function() {
    if (this.isPlaced) {
        this._$el.removeClass(this.options.classHidden);
        this.isVisible = true;
        this.emit('show');
    }
    return this;
};

Modal.prototype.hide = function() {
    if (this.isVisible) {
        this._$el.addClass(this.options.classHidden);
        this.isVisible = false;
        this.emit('hide');
    }
    return this;
};

Modal.prototype.toggle = function() {
    (this.isVisible) ? this.hide() : this.show();
    this.emit('toggle');
};

Modal.prototype.content = function(html) {
    if (this.isPlaced) {
       this._$el.html(html);
       this.emit('content');
    }
    return this;
};

Modal.prototype.ajaxContent = function(url, type, cache) {
    if (this.isPlaced) {
        var setting = {
            type: type || 'GET',
            cache: cache || true,
            context: this
        };

        $.ajax(url, setting)
            .done(function(data, status, xhr) {
                this.content(data);
                this.emit('ajax-done');
            })
            .fail(function(xhr, status, error) {
                this.content(xhr.responseText || this.options.ajaxErrorMsg);
                this.emit('ajax-fail');
            }); 
    }
    return this;
};
