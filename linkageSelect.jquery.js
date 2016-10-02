(function ($) {
    $.fn.extend({
        "linkageSelect": function (options) {
            var opt = $.extend({}, defaluts, options);
            for (var i = 0; i < opt.selects.length; i++) {
                var sel = $('<select></select>');
                var option1 = $('<option value="">请选择</option>');
                sel.attr('id', opt.selects[i].id);
                sel.append(option1);
                if (i === 0) {
                    var el_id = '#'+opt.selects[i].id;
                    $.ajax({
                        url: opt.selects[i].url,
                        type: opt.data.method,
                        dataType: 'json',
                        success: function(res) {
                            $.each(res, function(index, item) {
                                $(el_id).append('<option value="'+item.value+'">'+item.text+'</option>')
                            });
                        }
                    });
                }
                if (i < opt.selects.length-1) {
                    sel.attr({
                        'data-next-url': opt.selects[i+1].url,
                        'data-next-id': opt.selects[i+1].id
                    });
                    sel.change(function(event) {
                        var self = $(this);
                        self.nextAll('select').html('<option value="">请选择</option>');
                        $.ajax({
                            url: self.attr('data-next-url'),
                            type: opt.data.method,
                            dataType: 'json',
                            data: opt.data.requestKey+'='+self.val(),
                            success: function(res) {
                                $.each(res, function(index, item) {
                                    $('#'+self.attr('data-next-id')).append('<option value="'+item.value+'">'+item.text+'</option>')
                                });
                            }
                        });
                        
                    });
                }
                $(this).append(sel);
            }
        }
    });
    var defaluts = {
        'data': {
            'from': 'ajax',
            'method': 'get',
            'requestKey': 'id'
        },
        'selects': []
    }
})(window.jQuery);