app.controller('AdminDashboardCtrl', ['$scope', 'Match', 'User', function ($scope, Match, User) {

  var matches, users;

  Match.getAll().then(function(data){
    matches = data.matches;
    return User.getAll();
  }).then(function(data){
    users = data;
  });

}]);
