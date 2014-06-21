app.controller('UsersAccountCtrl',
  ['$scope','UsersAccount', 'UserTag', function($scope, UsersAccount, UserTag) {

  UsersAccount.get().then(function(user){
    $scope.user = user;
  });

  UserTag.getAll().then(function(tags){
    tags = tags.filter(function(tag){ return tag.active; });
    $scope.binary = tags.filter(function(item){ return item.type === 'binary'; });
    $scope.scale = tags.filter(function(item){ return item.type === 'scale'; });
    $scope.text = tags.filter(function(item){ return item.type === 'text'; });
  });

  $scope.update = function(){
    $scope.user.tags = [];
    $scope.user.tags.concat($scope.binary, $scope.scale, $scope.text);
    UsersAccount.update().then(function(response){
      console.log('User account information updated successfully');
    });
  };

}]);
