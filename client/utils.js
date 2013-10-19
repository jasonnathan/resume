Utils = {
    CSS: {
        _prefixes: function(prop, value) {
            var o = {}, p = ['-webkit-', '-moz-', '-ms-', '-o-'];
            ko.utils.arrayForEach(p, function(v) {
                o[v + prop] = value;
            });
            return o;
        }
    },
    Animate: {
        _toggleClasses: function(e, c, cb) {
            return e.delay(1000).addClass(c).queue(function(next) {
                $(this).removeClass(c);
                next();
                return typeof cb === 'function' ? cb() : true;
            });
        },
        sliders: function() {
            var meters = $('.skill-labels .meter'), _p = Utils.CSS._prefixes;
            meters.each(function() {
                var e = $(this), pw = e.parent().width(), cw = e.attr('data-decimal') * pw,
                        transform = _p('transform', 'translate3d(' + cw + 'px, 0, 0)');
                return setTimeout(function() {
                    return e.css(transform);
                }, 500);
            });
        },
        buttons: function() {
            return Utils.Animate._toggleClasses($(".sub-nav .button"), "animated bounceInLeft");
        },
        about: function() {
            return Utils.Animate._toggleClasses($(".about"), "animated fadeIn");
        },
        removeItem: function(e) {
            return Utils.Animate._toggleClasses($(e), "animated fadeOutUp", function() {
                $(e).remove();
            });
        },
        addItem: function(e) {
            return Utils.Animate._toggleClasses($(e), "animated flipInX");
        },
        addItems: function(elements) {

            for (var i = 1; i < elements.length; i++) {
                (function(i) {
                    var r = Random.fraction() * 10, e = $(elements[i]);
                    e.hide();
                    return setTimeout(function() {
                        e.show();
                        return Utils.Animate.addItem(e);
                    }, r * i);
                }(i));
            }
        }
    }
};