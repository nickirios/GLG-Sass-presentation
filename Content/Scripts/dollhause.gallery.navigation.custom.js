/*------------------------------------------------
::
::  CUSTOM NAVIGATION CONTROL
::
-------------------------------------------------*/
var CustomNavigation = NavigationControl.extend({

    build: function () {
        // I'm going to hijack the existing arrows
        this.bindEvents();
    },

    bindEvents: function () {
        var events = {};
        events['click .last-child'] = 'previous';
        events['click .first-child'] = 'next';
        this.delegateEvents(events);
    },

    change: function () {
        // Again, hijacking the existing arrows
    },

    events: {
        'click .vertical-gallery.first-child': 'previous',
        'click .vertical-gallery.last-child': 'next'
    }

});