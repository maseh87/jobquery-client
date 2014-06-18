app.controller('AdminMatchesCtrl', ['$scope', '$state', 'Match', function($scope, $state, Match){

  var matrixify = function(matchArray){

    var normUsers = {};
    var normUserIndex = 0;

    var normOpps = {};
    var normOppIndex = 0;

    var matrix = [];

    //Iterate through the matchArray
    matchArray.forEach(function(match){
      var userId = match.userId;
      var oppId = match.oppId;

      if(normUsers[userId] === undefined){
        normUsers[userId] = normUserIndex;
        normUserIndex++;
      }

      if(normOpps[oppId] === undefined){
        normOpps[oppId] = normOppIndex;
        normOppIndex++;
      }

      var userIndex = normUsers[userId];
      var oppIndex = normOpps[oppId];

      //First check to see if the row exists
      if(!Array.isArray(matrix[userIndex])){
        matrix[userIndex] = [];
      }

      //Now add nulls until the length = oppIndex + 1;
      for(var i = matrix[userIndex].length - 1; i < oppIndex; i++){
        matrix[userIndex].push(null);
      }

      //Add the userInterest at the appropriate place;
      matrix[userIndex][oppIndex] = match.userInterest;
    });

    //Finally fill out the candidates with nulls to normalize row width
    matrix.forEach(function(column){
      while(column.length < normOppIndex){
        column.push(null);
      }
    });

    return matrix;
  };

  Match.getAll().then(function(matches){
    $scope.matrix = matrixify(matches);
  });

}]);