/*------------------------------------------------
::
::  KEYBOARD NAVIGATION
::
-------------------------------------------------*/
var KeyboardNavigation = Backbone.View.extend({

	initialize: function() {
		this.initControls();
	},
	
	initControls: function() {
		$('#PresentationMap .section-pager:first .section-pager-row:first .section-pager-item:first').addClass('active');
		var number = function(i) {
			$(this).data('gallery', i);
		};
		$('#PresentationMap .section-pager').each(number);
		$('#PresentationMap .section-pager-row').each(number);
		$('#PresentationMap .section-pager-item').each(number);
	},
	
	key: function(e) {
		switch (e.keyCode) {
			case 37: this.left(); break;
			case 39: this.right(); break;
			case 38: this.up(); break;
			case 40: this.down(); break;
		}
	},
	
	left: function() {
		var index = $('#PresentationMap .active').parents('.section-pager-row').data('gallery');
		HorizontalGalleries[index].model.previous();
	},
	
	right: function() {
		var index = $('#PresentationMap .active').parents('.section-pager-row').data('gallery');
		HorizontalGalleries[index].model.next();
	},
	
	up: function() {
		var active = $('#PresentationMap .active');
		var index = active.parents('.section-pager').data('gallery');
		if (!VerticalGalleries[index].model.previous()) {
			SectionGallery.model.previous();
		}
	},
	
	down: function() {
		var active = $('#PresentationMap .active');
		var index = active.parents('.section-pager').data('gallery');
		if (!VerticalGalleries[index].model.next()) {
			SectionGallery.model.next();
		}
	},
	
	events: {
		'keyup': 'key'
	}

});
