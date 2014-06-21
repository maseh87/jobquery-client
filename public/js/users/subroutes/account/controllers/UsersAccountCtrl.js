app.controller('UsersAccountCtrl',
  ['$scope','UsersAccount', 'UserTag', function($scope, UsersAccount, UserTag) {

  UsersAccount.get().then(function(user){
    $scope.user = user;
    $scope.binary = user.tags.filter(function(item){ return item.tag.type === 'binary'; });
    $scope.scale = user.tags.filter(function(item){ return item.tag.type === 'scale'; });
    $scope.text = user.tags.filter(function(item){ return item.tag.type === 'text'; });

    $scope.tags = {};
    user.tags.forEach(function (item) {

      // establish category
      var cat = item.tag.category.name;
      $scope.tags[cat] = $scope.tags[cat] || {};

      // establish type (binary, scale, or text)
      var type = item.tag.type;
      $scope.tags[cat][type] = $scope.tags[cat][type] || [];
      $scope.tags[cat][type].push(item);
    });
  });

  $scope.update = function(){
    // re-compile tags
    var compiledTags = [];
    for (var key in $scope.tags) {
      for (var type in $scope.tags[key]) {
        $scope.tags[key][type].forEach(function (tag) {
          compiledTags.push(tag);
        });
      }
    }
    $scope.user.tags = compiledTags;

    // send for update
    UsersAccount.update($scope.user).then(function(response){
      console.log('User account information updated successfully');
    });
  };

}]);
