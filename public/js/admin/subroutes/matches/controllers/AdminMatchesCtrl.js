app.controller('AdminMatchesCtrl', ['$scope', '$state', 'Match', 'Opportunity', 'User', 
  function ($scope, $state, Match, Opportunity, User) {

  Match.getAll().then(function (matchData) {
    User.getAll().then(function (users) {
      $scope.users = users;
      $scope.matches = matchData.matches;
      $scope.opportunities = matchData.opportunities;

      var oppColumnMap = {};
      var userMap = {};
      var matrix = {};

      // generate key map
      $scope.opportunities.forEach(function (opportunity, i) { oppColumnMap[opportunity._id] = i; });
      $scope.users.forEach(function (user, i) { userMap[user._id] = user.name; });

      $scope.matches.forEach(function (matchData) {
        var column = oppColumnMap[matchData.opportunity];
        var row = matchData.user;
        if (!matrix.hasOwnProperty(row)) { matrix[row] = []; }
        matrix[row][column] = matchData;
      });

      $scope.matrix = matrix;
      $scope.userMap = userMap;
      console.log("matrix", $scope.matrix);
      console.log(userMap);
    });
  });

  $scope.edit = function(match) { 
    console.log(match);
  };

  $scope.isOverridden = function (match) {
    return match.adminOverride > 0 ? 'gridbox-highlight-blue' : '';
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