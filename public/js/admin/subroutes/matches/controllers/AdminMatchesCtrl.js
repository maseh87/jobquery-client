app.controller('AdminMatchesCtrl', ['$scope', '$state', 'Match', 'Opportunity', 'User', 
  function ($scope, $state, Match, Opportunity, User) {

  Match.getAll().then(function (matchData) {
    User.getAll().then(function (users) {
      $scope.users = users;
      $scope.matches = matchData.matches;
      $scope.opportunities = matchData.opportunities;

      var keyMap = {};
      var matrix = {};


      // prepopulate array
      var prepopulateArray = function () {
        var populated = [];
        for (var i = 0; i < $scope.opportunities.length; i++) { populated.push(0); }
        return populated;
      };

      // prepopulate matrix
      $scope.users.forEach(function (user) {
        matrix[user._id] = prepopulateArray();
      });

      console.log("users", $scope.users);
      console.log("matches", $scope.matches);
      console.log("opps", $scope.opportunities);
      $scope.matrix = matrix;
      console.log("matrix", $scope.matrix);
    });
  });

  $scope.edit = function() { 
    console.log($scope.users);
  };
}]);

/*

keyMap is an object of oppIds
{ 
    oppId: colId,
    oppId: colId,
}

matrix is an object of objects...
{
  // first prepopulate with userIds
  userId: [ {matchId, userInterest}, {matchId, userInterest} ]
  userId: [ {matchId, userInterest}, {matchId, userInterest} ]
}
*/