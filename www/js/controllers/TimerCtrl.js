angular.module('meditationTimer.controllers')
  .controller('TimerCtrl', function($scope) {
    'use strict';

    var targetLength = 600; // 10 minutes
    var startTime = new Date();
    var elapsed = 0;

    function updateUI() {
      var seconds = targetLength - elapsed;
      $scope.minutes = Math.floor(seconds / 60);
      var s = seconds % 60;
      $scope.seconds = s <= 9 ? '0' + s : s;
    }

    function secondPassed() {
      var now = +(new Date());
      elapsed = Math.round((now - startTime) / 1000);
      $scope.$apply(function() {
        updateUI();
      });
    }

    updateUI();

    setInterval(secondPassed, 1000);
  });