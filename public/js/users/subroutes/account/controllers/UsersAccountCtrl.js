app.controller('UsersAccountCtrl', ['$scope', 'UsersAccount', function($scope, UsersAccount){

  UsersAccount.get().then(function(user){
    $scope.user = user;
  });

  $scope.update = function(){
    UsersAccount.update($scope.user).then(function(response){
      console.log('User account information updated successfully');
    });
  };

}]);