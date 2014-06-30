app.controller('UsersAccountCtrl',
  ['$scope', '$timeout', 'UsersAccount', 'UserTag',
  function ($scope, $timeout, UsersAccount, UserTag) {

  $scope.pendingRequests = 0;
  $scope.submitText = '✔ Save Your Profile';
  $scope.passwordText = '✎ Change Password';

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

  $scope.update = function (user) {
    if(user.password) delete user.password;
    if(user.newPassword) delete user.newPassword;
    if(user.newPasswordConfirm) delete user.newPasswordConfirm;
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
      $scope.submitText = '✔ Save Successful';
      $scope.pendingRequests--;
      console.log('User account information updated successfully');
      $timeout(function () {
        $scope.submitText = '✔ Save Your Profile';
      }, 2000);
    });
  };

  $scope.updatePassword = function(user){
    var oldPassword = user.password;
    var newPassword = user.newPassword;
    var newPasswordConfirm = user.newPasswordConfirm;
    if(oldPassword && (newPasswordConfirm === newPassword)){
      $scope.passwordText = 'Updating Password';
      UsersAccount.update({
        _id: user._id,
        oldPassword: oldPassword,
        newPassword: newPassword,
        newPasswordConfirm: newPasswordConfirm
      }).then(function(response){
        $scope.passwordText = '✔ Password Saved';
      }, function(err){
        $scope.passwordText = 'Incorrect Credentials';
      });
    } else if (newPasswordConfirm !== newPassword) {
      $scope.passwordText = 'Password Must Match Confirmation';
    } else {
      $scope.passwordText = 'Fill All Fields';
    }
  };

}]);
