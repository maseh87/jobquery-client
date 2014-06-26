app.controller('ResetCtrl', ['$scope', 'AuthService', '$stateParams',
function($scope, AuthService, $stateParams) {

  $scope.updatePassword = function (password) {
    $scope.submitting = true;
    var resetParams = {
      password: password,
      resetHash: $stateParams.resetHash
    }
    AuthService.resetPassword(resetParams).then(function(response){
      console.log(response);
    });
  }

}]);
