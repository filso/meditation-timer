angular.module('meditationTimer.controllers')
  .controller('TimerCtrl', function($scope) {

    $scope.startTime = new Date();

    $scope.currentTime = 400;

    function updateUI(seconds) {
      $scope.minutes = Math.floor(seconds / 60);
      $scope.seconds = seconds % 60;
    } 

    function secondPassed() {
      var time = new Date();
      console.log(time);
    };

    setInterval(secondPassed, 1000);
  });

