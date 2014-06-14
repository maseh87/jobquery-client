app.controller('MatchCtrl', ['Match', '$state', '$scope', function(Match, $state, $scope){

  Match.getAll().then(function(matches){
    $scope.matches = matches;
  });

}]);