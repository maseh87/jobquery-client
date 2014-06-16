app.controller('AdminCandidatesCtrl', ['User', '$scope', function(User, $scope){

  User.getAll().then(function(users){
    $scope.users = users;
  });

  $scope.update = function(user) {
    User.update(user)
    .then(function(user){
      $scope.updated = true;
    }, function(error){
      $scope.updateError = true;
    });
  };

}]);
