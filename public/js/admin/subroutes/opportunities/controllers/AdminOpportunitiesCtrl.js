app.controller('AdminOpportunitiesCtrl', ['$scope', 'Opportunity', 'Match', 
  function($scope, Opportunity, Match) {

  Opportunity.getAll().then(function(opportunities){
    $scope.opportunities = opportunities;
  });

  Match.getAll().then(function(matches){
    $scope.matches = matches;
  });

  $scope.$watch('matches', function(matches) {
    var interest = {};
    if (!matches) return null;
    if (!$scope.opportunities) return null;

    matches.data.forEach(function (match) {
      if (!interest[match.oppId]) { interest[match.oppId] = 0; }
      if (match.userInterest >= 3) { interest[match.oppId]++; }
    });

    $scope.opportunities.forEach(function (opportunity) {
      opportunity.userInterest = interest[opportunity._id];
    });
  });

}]);