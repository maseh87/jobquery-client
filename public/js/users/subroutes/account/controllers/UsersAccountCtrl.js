app.controller('UsersAccountCtrl',
  ['$scope','UsersAccount', 'UserTag', function($scope, UsersAccount, UserTag) {

  UsersAccount.get().then(function(user){
    $scope.user = user;
    $scope.binary = user.tags.filter(function(item){ return item.tag.type === 'binary'; });
    $scope.scale = user.tags.filter(function(item){ return item.tag.type === 'scale'; });
    $scope.text = user.tags.filter(function(item){ return item.tag.type === 'text'; });
  });

  $scope.update = function(){
    $scope.user.tags = [];
    $scope.user.tags.concat($scope.binary, $scope.scale, $scope.text);
    UsersAccount.update().then(function(response){
      console.log('User account information updated successfully');
    });
  };

}]);
