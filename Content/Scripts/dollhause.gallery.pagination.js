/*------------------------------------------------
::
::  PAGINATION CONTROLS
::
-------------------------------------------------*/
var PaginationControl = GalleryView.extend({

    initControls: function () { },

    build: function () {
        var length = this.model.get('length');
        if (length > 1) {
            this.$el.prepend(this.template({ length: length, uid: this.model.get('uid') }));
            this.bindEvents();
        }
    },

    bindEvents: function () {
        var events = {};
        events['click .' + this.model.get('uid') + ' .pager-item'] = 'seek';
        this.delegateEvents(events);
    },

    change: function () {
        var items = this.$el.find('.' + this.model.get('uid') + ' .pager-item');
        items.removeClass('active').eq(this.model.get('current')).addClass('active');
    },

    template: _.template('' +
        '<div class="pager <%= uid %>">' +
			'<% for (var i = 0; i < length; i++) { %>' +
                '<div class="pager-item pager-item-<%= i %>">' +
                    '<%= i %>' +
                '</div>' +
            '<% } %>' +
		'</div>' +
    '')

});