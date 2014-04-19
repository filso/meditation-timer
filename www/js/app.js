angular.module('meditationTimer', ['ionic',
  'meditationTimer.controllers', 'meditationTimer.routing'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  });

angular.module('meditationTimer.routing', []);

angular.module('meditationTimer.controllers', []);
angular.module('meditationTimer.services', []);
angular.module('meditationTimer.directives', []);