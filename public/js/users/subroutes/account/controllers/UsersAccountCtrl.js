app.controller('UsersAccountCtrl', ['$scope', 'UsersAccount', 'UserTag', 
function ($scope, UsersAccount, UserTag) {
  $scope.pendingRequests = 0;
  $scope.submitText = 'Save Your Profile';

  UsersAccount.get().then(function (user) {
    $scope.user = user;
    $scope.binary = user.tags.filter(function (item) { return item.tag.type === 'binary'; });
    $scope.scale = user.tags.filter(function (item) { return item.tag.type === 'scale'; });
    $scope.text = user.tags.filter(function (item) { return item.tag.type === 'text'; });

    $scope.labels = {};
    $scope.tags = {};
    user.tags.forEach(function (item) {
      // establish category
      var cat = item.tag.category.name;
      $scope.tags[cat] = $scope.tags[cat] || {};

      // establish type (binary, scale, or text)
      var type = item.tag.type;
      $scope.tags[cat][type] = $scope.tags[cat][type] || [];
      $scope.tags[cat][type].push(item);

      // establish label
      var label = item.tag.category.label;
      $scope.labels[cat] = $scope.labels[cat] || label;
    });
  });

  $scope.updateSearchStage = function (value) { $scope.user.searchStage = value; };
  $scope.isSearchStage = function (value) { return $scope.user.searchStage === value; };

  $scope.update = function () {
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
    $scope.pendingRequests++;
    $scope.submitText = 'Saving...';
    UsersAccount.update($scope.user).then(function (response) {
      $scope.submitText = 'Save Successful';
      $scope.pendingRequests--;
      console.log('User account information updated successfully');
    });
  };

}]);
