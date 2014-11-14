angular.module('meditationTimer', ['ionic',
  'meditationTimer.controllers', 'meditationTimer.routing'
])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .run(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    // device APIs are available

    function onDeviceReady() {
      if (navigator.network.connection.type == Connection.NONE) {
        alert("nocon");
      } else {
        alert("yescon");
      }
    }

  });

angular.module('meditationTimer.routing', []);

angular.module('meditationTimer.controllers', []);
angular.module('meditationTimer.services', []);
angular.module('meditationTimer.models', []);
angular.module('meditationTimer.directives', []);