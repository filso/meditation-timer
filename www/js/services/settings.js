angular.module('meditationTimer.services')
  .service('settings', function() {
    var defaults = {
    };

    this.getSettings = function() {
      var ret = _.defaults(opts, defaults);
      return ret;
    };

  });