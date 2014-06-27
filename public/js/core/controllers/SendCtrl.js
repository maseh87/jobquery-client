app.controller('SendCtrl', ['$scope', 'AuthService',
function($scope, AuthService) {

  $scope.sendPasswordReset = function (email) {
    $scope.submitting = true;
    AuthService.sendPasswordReset(email).then(function(response){
      $scope.success = true;
      $scope.submitting = false;
    }, function(response){
      $scope.success = true;
      $scope.submitting = false;
    });
  }

}]);
