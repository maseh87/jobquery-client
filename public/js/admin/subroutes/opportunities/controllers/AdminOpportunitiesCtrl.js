app.controller('AdminOpportunitiesCtrl', ['$scope', '$controller', 'Opportunity', 'Match', 
  function($scope, $controller, Opportunity, Match) {

  $controller('ResourceCtrl', {$scope: $scope, Resource: Opportunity});
  $controller('MatchCtrl', {$scope: $scope, Match: Match});

  $scope.$watch('matches', function(matches) {
    var interest = {};
    if (!matches) return null;
    if (!$scope.resources) return null;

    matches.data.forEach(function (match) {
      if (!interest[match.oppId]) { interest[match.oppId] = 0; }
      if (match.userInterest >= 3) { interest[match.oppId]++; }
    });

    $scope.resources.forEach(function (opportunity) {
      opportunity.userInterest = interest[opportunity._id];
    });
  });

}]);