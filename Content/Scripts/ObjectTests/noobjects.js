/*==================================================
::
::  Let's build it without objects
::
====================================================*/

$(function () {

    MakeGallery($('section'), 'presentation-gallery');

    MakeGallery($('row'), 'vertical-gallery');

});

function MakeGallery(container, className) {
    
    var current = 0;
    var length = container.length;

    /*-----------------------------
    :: BUILD THE HTML
    ------------------------------*/
    container.each(function (i) {
        build($(this), i);
    });
    
    function build(thisContainer, i) {

        thisContainer.addClass(className + '-' + i);
        
        thisContainer.wrapInner('' +
            '<div class="wrapper ' + className + '">' +
                '<div class="inner ' + className + '">' +
                '</div>' +
            '</div>' +
        '');

        thisContainer.prepend('' +
            '<div class="previous' + className + ' arrow">' +
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
            '<div class="next' + className + ' arrow">' +
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
    container.find('.' + className + '.next').click(function () {
        next();
    });

    container.find('.' + className + '.previous').click(function () {
        previous();
    });

    function next() {
        if (current < length) {
            current += 1;
            container.addClass(className + '-show-' + current);
        }
    };

    function previous() {
        if (current > 0) {
            current -= 1;
            container.addClass(className + '-show-' + current);
        }
    };

};
/*==================================================
::
::  What if we want to make changes?
::
====================================================
::  1) Add more arguments
====================================================*/
$(function () {

    MakeGallery2($('column'), 'horizontal-gallery', 'cssAnimate');

});

function MakeGallery2(container, className, animationStyle) {

    var current = 0;
    var length = container.length;

    /*-----------------------------
    :: BUILD THE HTML
    ------------------------------*/
    container.each(function (i) {
        build($(this), i);
    });

    function build(thisContainer, i) {

        thisContainer.addClass(className + '-' + i);

        thisContainer.wrapInner('' +
            '<div class="wrapper ' + className + '">' +
                '<div class="inner ' + className + '">' +
                '</div>' +
            '</div>' +
        '');

        thisContainer.prepend('' +
            '<div class="previous' + className + ' arrow">' +
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
            '<div class="next' + className + ' arrow">' +
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
    container.find('.' + className + '.next').click(function () {
        next();
    });

    container.find('.' + className + '.previous').click(function () {
        previous();
    });

    function next() {
        if (current < length) {
            current += 1;
            /*---------------------
            ::  CONDITIONALS!
            ----------------------*/
            if (animationStyle == 'cssAnimate') {
                container.addClass(className + '-show-' + current);
            } else {
                container.animate({ left: '-=100%' });
            }
        }
    };

    function previous() {
        if (current > 0) {
            current -= 1;
            /*---------------------
            ::  CONDITIONALS!
            ----------------------*/
            if (animationStyle == 'cssAnimate') {
                container.addClass(className + '-show-' + current);
            } else {
                container.animate({ left: '+=100%' });
            }
        }
    };

};

/*==================================================
::
::  What if we want to make changes?
::
====================================================
::  2) Make a copy
====================================================*/
$(function () {

    MakeGallery3($('column'), 'horizontal-gallery');

});

function MakeGallery3(container, className) {

    var current = 0;
    var length = container.length;

    /*-----------------------------
    :: BUILD THE HTML
    ------------------------------*/
    container.each(function (i) {
        build($(this), i);
    });

    function build(thisContainer, i) {

        thisContainer.addClass(className + '-' + i);

        thisContainer.wrapInner('' +
            '<div class="wrapper ' + className + '">' +
                '<div class="inner ' + className + '">' +
                '</div>' +
            '</div>' +
        '');

        thisContainer.prepend('' +
            '<div class="previous' + className + ' arrow">' +
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
            '<div class="next' + className + ' arrow">' +
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
    container.find('.' + className + '.next').click(function () {
        next();
    });

    container.find('.' + className + '.previous').click(function () {
        previous();
    });

    function next() {
        if (current < length) {
            current += 1;
            //container.addClass(className + '-show-' + current);
            container.animate({ left: '-=100%' });

        }
    };

    function previous() {
        if (current > 0) {
            current -= 1;
            //container.addClass(className + '-show-' + current);
            container.animate({ left: '+=100%' });
        }
    };

};

/*==================================================
::
::  What if we need to add functionality?
::
====================================================
::  1) Make the function bigger
====================================================
::	2) Create more functions and pass more arguments
====================================================*/
function MakePagerNavigation(container, className) {
	container.find('.' + className + '.next').click(function () {
        next();
    });

    container.find('.' + className + '.previous').click(function () {
        previous();
    });

    function next() {
        if (current < length) {
            current += 1;
            container.animate({ left: '-=100%' });

        }
    };

    function previous() {
        if (current > 0) {
            current -= 1;
            container.animate({ left: '+=100%' });
        }
    };
};

function MakeGallery3(container, className) {
	
	MakePagerNavigation(container, className);
	
};

/*==================================================
::
::  What if we I want to hit the next method from
::	outside our function?
::
====================================================
::  1) ???
====================================================
::	2) $('.next').click();
====================================================*/

