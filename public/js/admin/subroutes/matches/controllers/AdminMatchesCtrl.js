app.controller('AdminMatchesCtrl', ['$scope', '$state', 'Match', function($scope, $state, Match){

  Match.getAll().then(function(matches){
    $scope.matches = matches;
  });

}]);