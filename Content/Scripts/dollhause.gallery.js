/*------------------------------------------------
::
::  BASE GALLERY MODEL (For Extending)
::
-------------------------------------------------*/
var GalleryModel = Backbone.Model.extend({

    defaults: { current: undefined, uid: undefined, length: undefined },

    initialize: function () {
        this.set({
            uid: 'gallery-' + this.cid,
            className: (this.has('className')) ? this.get('className') : ''
        });
    },

    /*--------------------------
    ::  Utilities
    ---------------------------*/
    log: function (log) {
        if (!_.isUndefined(console)) {
            console.log('Gallery: ' + log);
        }
    },

    createIfNot: function () {
        if (_.isUndefined(this.get('current'))) this.set({ current: 0 });
    },

    /*--------------------------
    ::  Functionality
    ---------------------------*/
    seek: function (current) {
        this.createIfNot();
        var total = this.get('length') - 1;
        if (current >= 0 && current <= total) this.set({ current: current });
    },

    previous: function () {
        this.createIfNot();
        var total = this.get('length') - 1;
        var atEnd = (this.get('continous')) ? total : 0;
        var current = (this.get('current') <= 0) ? atEnd : this.get('current') - 1;
        var returned = (this.get('current') <= 0) ? false : this;
		this.set({ current: current });
		return returned;
    },

    next: function () {
        this.createIfNot();
        var total = this.get('length') - 1;
        var atEnd = (this.get('continous')) ? 0 : this.get('current');
        var current = (this.get('current') >= total) ? atEnd : this.get('current') + 1;
		var returned = (this.get('current') >= total) ? false : this;
		this.set({ current: current });
		return returned;
    }

});
/*------------------------------------------------
::
::  BASE GALLERY VIEW (Also for Extending)
::
-------------------------------------------------*/
var GalleryView = Backbone.View.extend({

    initialize: function () {
        this.model.on('change:current', this.change, this);
        this.build();
        this.initControls();
    },

    initControls: function () {
        this.$el.wrapInner(this.template(this)).find('.wrapper:first').prepend(this.backTemplate(this));
        var options = {
            el: this.$el, model: this.model
        };
        this.model.set({
            navigation: (this.model.get('hasNavigation') === false) ? null : new NavigationControl(options),
            pagination: (this.model.get('hasPagination') === false) ? null : new PaginationControl(options),
            current: 0
        });
    },

    build: function () {
        this.model.log('You never set a build initialization. Why not?');
    },

    seek: function (e) { this.model.seek($(e.target).index()); },

    previous: function () { this.model.previous(); },

    next: function () { this.model.next(); },

    template: _.template('' +
        '<div class="wrapper <%= this.model.get("uid") %> <%= this.model.get("className") %>">' +
            '<div class="inner <%= this.model.get("uid") %> <%= this.model.get("className") %>">' +
            '</div>' +
        '</div>' +
    ''),

    backTemplate: _.template('' + 
        '<div class="back <%= this.model.get("uid") %> <%= this.model.get("className") %>"></div>' +
    '')

});