if (Meteor.isClient) {
    Meteor.startup(function() {
        Template.clientele.rendered = function(){
            ko.applyBindings(new Clientele, this.firstNode);
        };
        Template.clientele.destroyed = function(){
            ko.cleanNode(this.firstNode);
        };

        $(window).resize(_init);
        return _init();
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}

function _init() {
    var _a = Utils.Animate;
    _a.sliders();
    _a.buttons();
    _a.about();
}

function Clientele() {
    var self = this;
    self.currentSelection = ko.observable();
    self.items = ko.observableArray();
    self._populate = function(t) {
        var o = {src: 'http://placedog.com/400/300'},
        r = 0, tmp = [];
        switch(t){
            case "All": r = 12; break;
            case "Artwork": r = 8; break;
            case "Websites": r = 4; break;
            default: r = 12; break;
        }
        for (var i = 0; i < r; i++) {
            tmp.push(o);
        }
        return self.items(tmp);
    };
    self.setSelection = function(d, e) {
        var el = $(e.currentTarget), t = el.text(), i = [];
        self.currentSelection(t);
        return self._populate(t);
    };

    self._populate();
}
;
