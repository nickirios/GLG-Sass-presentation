/*==================================================
::
::  How about with objects?
::
====================================================*/

$(function () {

    window.gallery1 = new Gallery({ el: $('section'), className: 'presentation-gallery' });

    window.gallery2 = new Gallery({ el: $('row'), className: 'vertical-gallery' });

});

var Gallery = function (options) {

    var self = this;

    this.current = 0;

    this.length = options.el.length;

    options.el.each(function () {
        self.build($(this), i);
    });

    this.build = function (thisContainer, i) {
        thisContainer.addClass(options.className + '-' + i);

        thisContainer.wrapInner('' +
            '<div class="wrapper ' + options.className + '">' +
                '<div class="inner ' + options.className + '">' +
                '</div>' +
            '</div>' +
        '');

        thisContainer.prepend('' +
            '<div class="previous' + options.className + ' arrow">' +
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
            '<div class="next' + options.className + ' arrow">' +
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
        '');
    };

    /*-----------------------------
    :: BIND THE EVENTS
    ------------------------------*/
    container.find('.' + options.className + '.next').click(function () {
        self.next();
    });

    container.find('.' + options.className + '.previous').click(function () {
        self.previous();
    });

    this.next = function () {
        if (self.current < self.length) {
            self.current += 1;
            container.addClass(options.className + '-show-' + self.current);
        }
    };

    this.previous = function () {
        if (self.current > 0) {
            self.current -= 1;
            container.addClass(options.className + '-show-' + self.current);
        }
    };


};

/*==================================================
::
::  What if we want to make changes?
::
====================================================
::  1) Make a subclass
====================================================*/
$(function () {

    window.jQueryGallery = new jQueryGallery({ el: $('column'), className: 'horizontal-gallery' });

});


var jQueryGallery = function () {

    this.next = function () {
        if (self.current < self.length) {
            self.current += 1;
            container.animate({ left: '-=100%' });
        }
    };

    this.previous = function () {
        if (self.current > 0) {
            self.current -= 1;
            container.animate({ left: '+=100%' });
        }
    };

};

jQueryGallery.prototype = new Gallery();

/*==================================================
::
::  What if we want to make changes?
::
====================================================
::  2) Override from configuration arguments
====================================================*/

$(function () {

    window.jquerygallery2 = new Gallery({ 
        el: $('section'), 
        className: 'presentation-gallery',
        next: function() {
            if (self.current < self.length) {
                self.current += 1;
                container.animate({ left: '-=100%' });
            }
        }
    });

});

var Gallery = function (options) {

    var self = this;

    for (var option in options) {
        this[option] = options[option];
    }

    this.current = 0;

    this.length = options.el.length;

    options.el.each(function () {
        self.build($(this), i);
    });

    this.build = function (thisContainer, i) {
        thisContainer.addClass(options.className + '-' + i);

        thisContainer.wrapInner('' +
            '<div class="wrapper ' + options.className + '">' +
                '<div class="inner ' + options.className + '">' +
                '</div>' +
            '</div>' +
        '');

        thisContainer.prepend('' +
            '<div class="previous' + options.className + ' arrow">' +
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
            '<div class="next' + options.className + ' arrow">' +
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
        '');
    };

    /*-----------------------------
    :: BIND THE EVENTS
    ------------------------------*/
    container.find('.' + options.className + '.next').click(function () {
        self.next();
    });

    container.find('.' + options.className + '.previous').click(function () {
        self.previous();
    });

    this.next = function () {
        if (self.current < self.length) {
            self.current += 1;
            container.addClass(options.className + '-show-' + self.current);
        }
    };

    this.previous = function () {
        if (self.current > 0) {
            self.current -= 1;
            container.addClass(options.className + '-show-' + self.current);
        }
    };
};

/*==================================================
::
::  What if we need to add functionality?
::
====================================================
::  1) Add instance methods or prototype
====================================================*/
Gallery.prototype.fadeIn = function() {};

jquerygallery2.fadeIn = function() {};
/*==================================================
::  2) Create and reference more objects
====================================================*/
var Pager = function() {
	
	this.build = function() {};
	
};
Pager.prototype = new Gallery({ el: $('section'), className: 'presentation-gallery' });

new Pager({ });


/*==================================================
::
::  What if we I want to hit the next method from
::	outside our function?
::
====================================================*/
jquerygallery2.next();





