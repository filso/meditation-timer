angular.module('meditationTimer.controllers')
  .controller('SessionBuilderCtrl', function($scope, $ionicModal) {
    var session = [];

    $scope.session = {
      parts: [{}, {}]
    };


    $ionicModal.fromTemplateUrl('templates/modals/edit_part.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.addPart = function() {
      openModal();
    };

    var openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });


  });