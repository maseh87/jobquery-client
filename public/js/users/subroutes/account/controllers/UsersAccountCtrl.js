app.controller('UsersAccountCtrl', ['$scope', 'UsersAccount', 'Tag', function($scope, UsersAccount, Tag){

  UsersAccount.get().then(function(user){
    $scope.user = user;
  });

  Tag.getAll().then(function(tags){
    $scope.binary = tags.filter(function(item){ return item.type === 'binary' });
    $scope.scale = tags.filter(function(item){ return item.type === 'scale' });
    $scope.text = tags.filter(function(item){ return item.type === 'text' });
  });

  $scope.update = function(){
    $scope.user.tags = [];
    $scope.user.tags.concat($scope.binary, $scope.scale, $scope.text);
    UsersAccount.update($scope.user).then(function(response){
      console.log('User account information updated successfully');
    });
  };

}]);