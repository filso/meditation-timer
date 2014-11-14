/**
 * $ngdoc service
 * @name Session
 *
 * @description
 */
angular.module('meditationTimer.models')
  .factory('Session', function($scope, Part) {

    function Session() {
      this.parts = [
        Part.createPreparation(5),
        Part.createBells(1, 1),
        Part.createSilence(7),
        Part.createBells(1, 1),
        Part.createSilence(10),
        Part.createBells(3, 1)
      ];
    }

    // prototype methods
    var prototype = {
      getTotalDuration: function() {
        _.reduce(this.parts, function(sum, part) {
          if (part.duration) {
            sum += part.duration;
          }
          return sum;
        });
      },
    };

    _.extend(Session.prototype, prototype);

    return Session;

  });