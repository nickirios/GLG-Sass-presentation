/*------------------------------------------------
::
::  NAVIGATION CONTROLS
::
-------------------------------------------------*/
var NavigationControl = GalleryView.extend({

    initControls: function () { },

    build: function () {
        var length = this.model.get('length');
        if (length > 1) {
            this.$el.prepend(this.template({ uid: 'previous ' + this.model.get('uid'), className: this.model.get('className') }));
            this.$el.prepend(this.template({ uid: 'next ' + this.model.get('uid'), className: this.model.get('className') }));
            this.bindEvents();
        }
    },

    bindEvents: function () {
        var events = {};
        events['click .' + this.model.get('uid') + '.previous'] = 'previous';
        events['click .' + this.model.get('uid') + '.next'] = 'next';
        this.delegateEvents(events);
    },

    change: function () {
        var self = this;
        setTimeout(function () {
            var uid = '.' + self.model.get('uid');
            self.$el.find(uid + '.arrow').removeClass('first-child last-child');
            if (self.model.get('current') <= 0) {
                self.$el.find(uid + '.previous').addClass('first-child');
            } else if (self.model.get('current') >= self.model.get('length') - 1) {
                self.$el.find(uid + '.next').addClass('last-child');
            }
        }, 400);
    },

    template: _.template('' +
        '<div class="<%= className %> <%= uid %> arrow">' +
            '<div class="arrow-border"></div>' +
		    '<div class="dotted-arrow">' +
			    '<div class="dot-1"></div>' +
			    '<div class="dot-2"></div>' +
			    '<div class="dot-3"></div>' +
			    '<div class="dot-4"></div>' +
			    '<div class="dot-5"></div>' +
			    '<div class="dot-6"></div>' +
			    '<div class="dot-7"></div>' +
			    '<div class="dot-8"></div>' +
			    '<div class="dot-9"></div>' +
		    '</div>' +
        '</div>' +
    '')

});