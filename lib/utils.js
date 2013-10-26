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
            return $(".sub-nav .button").css({opacity: 0}).transition({opacity: 1})
        },
        about: function() {
            return $(".about").css({opacity: 0, scale: 0.1}).transition({opacity: 1, scale: 1})
        },
        removeItem: function(e) {
            if (e.nodeType !== 3) {
                $(e).transition({opacity: 0});
                return setTimeout(function(){$(e).remove()}, 250)
            }

//            return Utils.Animate._toggleClasses($(e), "animated fadeOutUp", function() {
//                $(e).transition({opacity:0, scale:0.1}).remove();
//            });
        },
        addItem: function(e) {
            //return Utils.Animate._toggleClasses($(e), "animated flipInX");
            $(e).transition({x: -40})
                    .transition({y: 40})
                    .transition({x: 0})
                    .transition({y: 0});
        },
        addItems: function(elements) {
//            $(elements).hide().transition({opacity:1});;
            ko.utils.arrayForEach(elements, function(i) {
                if (i.nodeType !== 3) {
                    $(i)
                            .css({opacity: 0, scale: 0.1})
                            .transition({opacity: 1, scale: 1.1})
                            .transition({scale: 1});
                }
                //console.log(i)

            })
//            for (var i = 1; i < elements.length; i++) {
//                (function(i) {
//                    var r = Random.fraction() * 10, e = $(elements[i]);
//                    e.hide();
//                    return setTimeout(function() {
//                        e.show();
//                        return Utils.Animate.addItem(e);
//                    }, r * i);
//                }(i));
//            }
        }
    }
};