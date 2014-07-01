app.controller('ResetCtrl', ['$scope', 'AuthService', '$stateParams', '$state',
function($scope, AuthService, $stateParams, $state) {

  $scope.updatePassword = function (password, passwordConfirmation) {
    if(password === passwordConfirmation){
      $scope.submitting = true;
      var resetParams = {
        password: password,
        resetHash: $stateParams.resetHash
      }
      AuthService.resetPassword(resetParams).then(function(response){
        $scope.submitting = false;
        $scope.success = true;
      });
    }
  }

}]);
