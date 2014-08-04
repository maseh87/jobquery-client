app.controller('UsersAccountCtrl',
  ['$scope', '$timeout', 'UsersAccount', 'UserTag', 'DialogueService',
  function ($scope, $timeout, UsersAccount, UserTag, DialogueService) {

  var SURVEY_LINK = 'https://docs.google.com/forms/d/1TgmSj5Wnu9Cbwi4xl42Gp3bEWxCFw4lD-pdNiaYTKOI/viewform';
  $scope.pendingRequests = 0;
  $scope.submitText = '✔ Save Your Profile';
  $scope.passwordText = '✎ Change Password';

  UsersAccount.get().then(function (user) {
    //user is the $promise I just returned from UsersAccount.get()
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

  $scope.updateSearchStage = function (value) {
    if (value === "Accepted") {
      var title = "Job Stage: Accepted - Survey Link";
      var message = "<div>Congratulations on finding a job! <br> Please take a few minutes and fill out a short survey.<br>Your information will help us improve the job search experience for the next cohort.<br><br><button class='content-button'><a href='" + SURVEY_LINK + "' target='_blank'>✔ Take me to the survey!</a></button></div>";
      DialogueService.setMessage(title, message);
      DialogueService.show();
    }
    $scope.user.searchStage = value;
  };
  $scope.isSearchStage = function (value) { return $scope.user.searchStage === value; };


  $scope.update = function (user) {
      console.log("what is user in update", user);
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
