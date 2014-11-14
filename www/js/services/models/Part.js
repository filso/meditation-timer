/**
 * $ngdoc service
 * @name Session
 *
 * @description
 */
angular.module('meditationTimer.models')
  .factory('Part', function() {
    function Part() {
    }

    Part.Type = {
      PREPARATION: 0,
      SILENCE: 1,
      BELLS: 2,
      AUDIO: 3
    };

    Part.createPreparation = function(duration) {
      return {
        type: Part.Type.PREPARATION,
        duration: duration
      };
    };

    Part.createSilence = function(duration) {
      return {
        type: Part.Type.SILENCE,
        duration: duration
      };
    };

    Part.createBells = function (amount, bellSound) {
      return {
        type: Part.Type.BELLS,
        duration: duration
      };
    };

    Part.createAudio = function (sound) {
      return {
        type: Part.Type.AUDIO
      };
    };

    return Part;

  });