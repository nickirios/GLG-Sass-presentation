/*------------------------------------------------
::
::  THE CSS GALLERY
::
-------------------------------------------------*/
var CSSGallery = function (options) {
    this.model = new GalleryModel($.extend(options));
    this.view = new CSSGalleryView($.extend(options, { model: this.model }));
};

var CSSGalleryView = GalleryView.extend({

    build: function () {
        var self = this;
        var classes = '';
        this.model.get('items').each(function (i) {
            var item = $(this);
            var className = self.model.get('className');
            item.addClass(className + '-' + i);
            classes += ' ' + className + '-show-' + i;
        });
        self.model.set({ 
			classes: classes, 
			length: this.model.get('items').length, 
			isSafari: navigator.userAgent.toLowerCase().indexOf('safari') > 0
		});
    },

    change: function _change() {
        this.$el.removeClass(this.model.get('classes')).addClass(this.model.get('className') + '-show-' + this.model.get('current'));
		// Weird Safari bugfix
		if (this.model.get('isSafari')) {
			var self = this;
			if (self.model.get('items').length > 1) {
				this.model.get('items').eq(this.model.get('current')).show();
				clearTimeout(_change.timeout);
				_change.timeout = setTimeout(function() {
					self.model.get('items').slice(0, self.model.get('current')).hide();	
				}, 800);
			}
		}
    }

});