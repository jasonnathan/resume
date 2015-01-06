Meteor.startup(function() {
  //$('html').addClass('md-perspective');
});

if (Meteor.isClient) {
  var contact = new Contact;
  // Interactive Button
  Template.interactiveButton.rendered = function() {
    // $('#resume-info').fancybox({
    //   fitToView: true,
    //   autoSize: true,
    //   autoResize: true,
    //   autoResize: true,
    //   maxWidth: '550px',
    //   height: '100%',
    //   openEffect: 'elastic',
    //   closeEffect: 'elastic',
    //   helpers: {
    //     overlay: {
    //       locked: false
    //     },
    //     title: "Welcome to my interactive resume"
    //   },
    //   afterClose: function() {
    //     contact.successMessage(null);
    //   }
    // });

    var overlay = $('.md-overlay'),
      modal = this.$("#interactiveModal"),
      clicker = $('#resume-info'),
      closer = this.$('.md-close'),
      removeModal = function(hasPerspective) {
        modal.removeClass('md-show');
        hasPerspective && $('html').removeClass('md-perspective');
      },
      removeHandler = function(e) {
        if (e)
          e.preventDefault();

        return removeModal($(document.documentElement).hasClass('md-perspective'));
      };

    clicker.on('click', function(e) {
      e.preventDefault();
      modal.addClass('md-show');
      overlay.on('click', removeHandler);
      Meteor.setTimeout(function() {
        $(document.documentElement).addClass('md-perspective');
      }, 25);

    });

    closer.on('click', removeHandler);

  };

  // Clientelle Template
  Template.clientele.events({
    'mouseenter .view': function(e) {
      e.stopImmediatePropagation();
      $("#grid .view").removeClass('hover');
      $(e.target).addClass("hover");
      return false;
    },
    'mouseleave': function(e) {
      $(e.currentTarget).removeClass("hover");
    },
    'click #submitEmail': function() {

    }
  });
  Template.clientele.rendered = function() {
    $('.various').fancybox({
      fitToView: true,
      autoSize: true,
      width: '90%',
      height: '90%',
      openEffect: 'elastic',
      closeEffect: 'elastic',
      helpers: {
        overlay: {
          locked: false
        }
      }
    });

    $('.filter').on('click', function() {
      var e = $(this);
      e.parent.find('filter').removeClass('active');
      e.addClass('active');
    });
  };
  Template.clientele.destroyed = function() {
    ko.cleanNode(this.firstNode);
  };


  // RealtAsia Popoup
  Template.realtasia.rendered = function() {
    $('#grid').mixitup({
      transitionSpeed: 300
    });

    ko.applyBindings(contact, this.find('#followup'));
  };

  Template.contactForm.rendered = function() {
    $('#contactFromButton').fancybox({
      fitToView: true,
      autoSize: true,
      autoResize: true,
      maxWidth: '550px',
      height: '100%',
      openEffect: 'elastic',
      closeEffect: 'elastic',
      helpers: {
        overlay: {
          locked: false
        }
      },
      afterClose: function() {
        contact.successMessage(null);
      }
    });
    ko.applyBindings(contact, this.find('#contactFromBlock'));
  };

  Template.setup.rendered = function() {

    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments);
      }, i[r].l = 1 * new Date();
      a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-2433084-18', 'jasonnathan.com');
    ga('send', 'pageview');

  };

  Meteor.startup(function() {
    _init();
  });
}

function _init() {
  $('body').addClass('js');
  var tl = new TimelineLite({
    paused: true
  });
  var meters = $('.skill-labels .meter');
  tl
    .from($('.fieldset h4'), 1, {
      left: "-100%",
      ease: Back.easeInOut
    })
    .from($('.nameHeader'), 1, {
      left: "-100%",
      ease: Back.easeInOut
    }, '-=.3')
    .from($('.profileThumb'), 1, {
      scale: .5,
      ease: Back.easeInOut
    }, '-=.3')
    .from($('.about'), 1, {
      scale: .1,
      opacity: 0,
      ease: Back.easeInOut
    }, '-=.5')
    .from($('.contact-block'), 1, {
      opacity: 0,
      rotation: "-80deg",
      scale: 1.8,
      ease: Back.easeOut
    }, 0.2);

  meters.each(function() {
    var e = $(this),
      pw = e.parent().width(),
      cw = e.attr('data-decimal') * pw;
    tl.to(this, .05, {
      x: cw + 'px',
      ease: Back.easeInOut
    });
  });

  tl.restart();
  var _a = Utils.Animate,
    employBlocks = $('.cbp_tmtimeline > li .cbp_tmlabel'),
    eTl = new TimelineLite;

  // TweenLite.set(employBlocks, {
  //   height: "1vh",
  //   opacity: .1
  // })

  // _.each(employBlocks.toArray(), function(el) {
  //   return eTl.add(TweenLite.to(el, 1, {
  //     opacity: 1,
  //     height: "100%",
  //     ease: Bounce.easeOut
  //   }));
  // });
}


function Contact() {
  var self = this;
  self.errorMessage = ko.observable(null);
  self.successMessage = ko.observable(null);
  self.name = ko.observable();
  self.number = ko.observable();
  self.message = ko.observable();
  self.email = ko.observable();
  self.email.subscribe(function(v) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    self.errorMessage(!re.test(v));
  }, self);

  self.submitMessage = function() {
    if (self.errorMessage() && !check(self.email(), String)) {
      return false;
    }

    var options = {
      from: self.email(),
      subject: "New Message",
      text: self.name() + "\t" + self.message() + "\t" + self.number(),
      html: Template.contactEmail({
        email: self.email(),
        name: self.name(),
        number: self.number(),
        message: self.message()
      })
    };
    Meteor.call('sendNewContactEmail', options);
    self.successMessage("Thank you for your message! An email will be arriving in my inbox shortly.");
  };

  self.submitEmail = function() {
    if (self.errorMessage() && !check(self.email(), String)) {
      return false;
    }
    Meteor.call('sendStrangerNotification', self.email(), Template.strangerEmail());
    self.successMessage("Thank you! An email was sent to that address to inform you about this subscription.");
  };
}