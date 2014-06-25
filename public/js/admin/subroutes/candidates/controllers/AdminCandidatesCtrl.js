app.controller('AdminCandidatesCtrl', ['User', 'Match', '$scope', function (User, Match, $scope) {

  $scope.query = '';

  User.getAll().then(function (users) {
    console.log(users);
    $scope.users = users;
    var groups = {};
    var userMap = {};
    // split users into groups<key,user>
    users.forEach(function (user) {
      if (!user.category) {
        user.category = {};
        user.category.name = 'Uncategorized';
      }
      if (user.isRegistered === false) {
        user.category.name = 'Invited, Has Never Logged In';
      }
      if(!groups[user.category.name]) {
        groups[user.category.name] = [];
      }
      groups[user.category.name].push(user);
    });

    users.forEach(function (user) {
      userMap[user._id] = user;
      userMap[user._id].interestDeclared = 0;
      userMap[user._id].interestThreeOrGreater = 0;
    });

    Match.getAll().then(function (data) {
      var matches = data.matches;
      for(var i = 0; i < matches.length; i++) {
        var match = matches[i];
        if (match.userInterest !== 0) {
          userMap[match.user].interestDeclared++;
          if (match.userInterest >= 3) {
            userMap[match.user].interestThreeOrGreater++;
          }
        }
      }
      $scope.groups = groups;
    });

  });


}]);
