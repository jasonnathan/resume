Template.progressBar.rendered = function() {
  var num = parseFloat(this.data.number) || 0,
    element = this.$('.pb-container').get(0),
    textElement = this.$('.pb-container .text'),
    circle = new ProgressBar.Circle(element, {
      color: '#3594cb',
      trailColor: '#eee',
      trailWidth: 1,
      duration: 2000,
      easing: 'bounce',
      strokeWidth: 5,
      step: function(state, circle) {
        textElement.text((Math.round(circle.value() * 100) / 10).toFixed(1));
      }
    });
  // return circle.animate(num, function() {
  //   return true;
  // });
  Meteor.setTimeout(function() {
    return circle.animate(num);
  }, 2500);
}