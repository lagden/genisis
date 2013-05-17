// Full BG para IEs 6,7 e 8
if (!$.support.leadingWhitespace)
{
    var $win = $(window);
    var $tbls = $('.tbl');

    $.each($tbls.find('td'), function(k, v) {
        var $td = $(v);
        var url = $td.css('backgroundImage');
        url = url.replace('url(', '');
        url = url.replace('\'', '');
        url = url.replace('"', '');
        url = url.replace('\'', '');
        url = url.replace('"', '');
        url = url.replace(')', '');
        $td.append('<div class="viewport"><img src="'+url+'"></div>');
        $td.removeClass('img');
    });

    $win.on('resize', { 'tbls': $tbls }, function(ev) {
        tdsCover(ev.data.tbls)
    })
    .trigger('resize');

    function tdsCover(scope) {
        var min_w = 0;
        $.each(scope.find('td'), function(k, v) {
            var $td = $(v),
                $viewport = $td.find('.viewport:eq(0)'),
                $img = $viewport.find('img:eq(0)'),
                ow = $td.data('width'),
                oh = $td.data('height'),
                scale_h = $td.width() / ow,
                scale_v = $td.height() / oh,
                scale = scale_h > scale_v ? scale_h : scale_v;

            $viewport.width($td.width());
            $viewport.height($td.height());

            if (scale * ow < min_w) scale = min_w / ow;

            $img.width(scale * ow);
            $img.height(scale * oh);

            $viewport.scrollLeft(($img.width() - $td.width()) / 2);
            $viewport.scrollTop(($img.height() - $td.height()) / 2);
        });
    }
}