function insertNodeAtCursor(node) {
    var range, html;
    if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
        range.insertNode(node);
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        html = (node.nodeType == 3) ? node.data : node.outerHTML;
        range.pasteHTML(html);
    }
}

$(function () {

    $('pre').each(function () {
        var pre = $(this);
        pre.attr('contenteditable', '').attr('spellcheck', 'false').wrap('<div class="pre-wrapper" />').wrap('<div class="pre-container" />');
        pre.parent().append('<a class="log"><span>RUN</span></a>');
        var log = pre.parent().find('.log');
        log.click(function (e) {
            e.preventDefault();
            pre.focus();
            var script = pre.html().replace(/(<([^>]+)>)/ig, '');
            $('body').append('<script type="text/javascript">' + script + '</script>');
        });

        pre.on('focus', function () {
            pre.parent().addClass('focus');
        });

        pre.on('blur', function () {
            pre.parent().removeClass('focus');
        });

        pre.on('keydown', function (e) {
            if (e.keyCode === 9) e.preventDefault();
            switch (e.keyCode) {
                case 9:
                    var range = window.getSelection().getRangeAt(0);
                    range.startOffset;
                    range.endOffset;
                    var textNode = document.createTextNode("    ");
                    range.insertNode(textNode);
                    range.setEnd(document.getElementsByTagName("pre").item(0), range.startOffset += textNode.length)
                    //range.setStart(pre[0], range.startOffset += textNode.length)
                    //console.log();
                    break;
            }
        });

    });


});