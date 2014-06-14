app.controller('AdminOpportunitiesCtrl', ['$scope', '$controller', 'Opportunity', 'Match', 
  function($scope, $controller, Opportunity, Match) {

  $controller('ResourceCtrl', {$scope: $scope, Resource: Opportunity});
  $controller('MatchCtrl', {$scope: $scope, Match: Match});

  var compiled = {};
  $scope.$watch('matches', function(matches) {
    if (!matches) return null;
    console.log(matches.data);
  });

  $scope.test = function() {
    console.log("Logging scope...");
    console.log($scope);
  };

}]);