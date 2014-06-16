app.controller('AdminCandidatesCtrl', ['User', '$scope', function(User, $scope){

  User.getAll().then(function(users){
    $scope.users = users;
  });

}]);
