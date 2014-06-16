app.controller('AdminCandidatesDetailCtrl', ['User', '$scope', '$stateParams', function(User, $scope, $stateParams){

  User.get($stateParams._id).then(function(user){
    $scope.user = user;
  });

  $scope.update = function(user){
    User.update(user)
    .then(function(user){
      $scope.saved = true;
    }, function(error){
      $scope.saveError = true;
    });
  };

}]);
