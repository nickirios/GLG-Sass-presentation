/*------------------------------------------------
::
::  THE META GALLERY
::
-------------------------------------------------*/
var MetaGallery = function (options) {
    this.model = new MetaGalleryModel($.extend(options));
    this.view = new MetaGalleryView($.extend(options, { model: this.model }));
};

var MetaGalleryModel = GalleryModel.extend({

    initialize: function () {
        var self = this;
        this.set({
            uid: 'gallery-' + this.cid,
            className: (this.has('className')) ? this.get('className') : ''
        });
        /*
        ::  Watch the section gallery 
        ------------------------------*/
        this.get('gallerySection').model.on('change:current', this.update, this);
        /*
        ::  Watch the row galleries
        ------------------------------*/
        _.each(this.get('galleryRow'), function (row, i) {
            row.model.on('change:current', self.update, self);
        });
        /*
        ::  Watch the column galleries
        ---------------------------------*/
        _.each(this.get('galleryColumn'), function (column, i) {
            column.model.on('change:current', self.update, self);
        });
        /*
        ::  Update the original model if this model changes
        -----------------------------------------------------*/
        this.on('change:next', this.next, this);

        this.getStructure();
    },

    getRow: function (section) {
        var row = 0;
        for (var i = 0; i < section; i++) { row += this.get('sections')[i].rowLength; }
        return row;
    },

    getColumn: function (row) {
        var column = 0;
        for (var i = 0; i < row; i++) { column += this.get('rows')[i].columnLength; }
        return column;
    },

    update: function () {
        var section = this.get('gallerySection').model.get('current');
        row = this.getRow(section) + this.get('galleryRow')[section].model.get('current');
        column = this.getColumn(row) + this.get('galleryColumn')[row].model.get('current');
        this.set({ current: { section: section, row: row, column: column} });
    },

    getStructure: function () {
        var self = this;

        var sections = {};
        this.attributes.el.find('section').each(function (i) {
            sections[i] = { rowLength: $(this).find('row').length };
        });

        var rows = {}
        this.attributes.el.find('row').each(function (i) {
            rows[i] = { columnLength: $(this).find('column').length };
        });

        this.set({ sections: sections, rows: rows });
    },

    next: function () {
        var current = this.get('next');
        this.get('gallerySection').model.set({ current: current.section });
        var row = current.row - this.getRow(current.section);
        this.get('galleryRow')[current.section].model.set({ current: row });
        var column = current.column - this.getColumn(current.row);
        this.get('galleryColumn')[current.row].model.set({ current: column });
    }

});


var MetaGalleryView = GalleryView.extend({

    initialize: function () {
        this.model.on('change:current', this.change, this);
        this.build();
    },

    build: function () {
        var self = this;
        $('#PresentationMap').append(this.template(this));
        this.$el.find('.section-pager').each(this.number);
        this.$el.find('.section-pager-row').each(this.number);
        this.$el.find('.section-pager-item').each(this.number);
        $('.overview-wrapper').click(function () {
            self.show();
        });
    },

    number: function (i) {
        $(this).data('count', i);
    },

    change: function () {
        this.$el.find('.section-pager-wrapper .active').removeClass('active');
        this.$el.find('.section-pager').eq(this.model.get('current').section).addClass('active');
        this.$el.find('.section-pager-item').eq(this.model.get('current').column).addClass('active');
    },

    template: _.template('' +
        '<div class="section-pager-back inner"></div>' +
        '<div class="section-pager-wrapper center">' +
            '<% var total = 0; %>' +
            '<% _.each(model.get("gallerySection").model.get("items"), function(section, i) { %>' +
                '<div class="section-pager section-pager-<%= i %>">' +
                    '<div class="section-pager-row-back inner"></div>' +
                    '<% _.each(model.get("galleryRow")[i].model.get("items"), function(row, j) { %>' +
                        '<div class="section-pager-row section-pager-row-<%= j %>">' +
                            '<% _.each(model.get("galleryColumn")[total].model.get("items"), function(column, k) { %>' +
                                '<div class="section-pager-item section-pager-item-<%= k %>">' +
                                    '<%= k %>' +
                                '</div>' +
                            '<% }); %>' +
                        '</div>' +
                        '<% total += 1; %>' +
                    '<% }); %>' +
                '</div>' +
            '<% }); %>' +
        '</div>' +
    ''),

    seek: function (e) {
        var self = this;
        item = $(e.target);
        this.model.set({
            next: {
                section: item.parents('.section-pager').data('count'),
                row: item.parents('.section-pager-row').data('count'),
                column: item.data('count')
            }
        });
        clearTimeout(timeout);
        var timeout = setTimeout(function () {
            //self.hide();
        }, 1000);
    },

    show: function () {
        var map = $('#PresentationMap');
        var items = map.find('.section-pager-item, .section');
        items.addClass('showing');
        map.show().animate({ opacity: 1 }, function () { show(); });
        var show = function _show() {
            if (_.isUndefined(_show.i)) { _show.i = 0 } else { _show.i += 1; }
            if (_show.i < items.length) {
                items.eq(_show.i).removeClass('showing');
                setTimeout(show, 20);
            }
        };
    },

    hide: function () {
        $('#PresentationMap').animate({ opacity: 0 }, function () {
            $(this).hide();
        });
    },

    events: {
        'click .section-pager-item': 'seek',
        'click .section-pager-back': 'hide'
    }

});
