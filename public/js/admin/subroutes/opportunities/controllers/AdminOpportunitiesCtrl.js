app.controller('AdminOpportunitiesCtrl', ['$scope', '$controller', 'Opportunity', 'Match', 
  function($scope, $controller, Opportunity, Match) {

  $controller('ResourceCtrl', {$scope: $scope, Resource: Opportunity});
  $controller('MatchCtrl', {$scope: $scope, Match: Match});

  var interest = {};
  $scope.$watch('matches', function(matches) {
    if (!matches) return null;
    if (!$scope.resources) return null;
    matches.data.forEach(function (match) {
      if (!interest[match.oppId]) { interest[match.oppId] = 0; }
      if (match.userInterest >= 3) { interest[match.oppId]++; }
    });
    $scope.resources.forEach(function (opportunity) {
      opportunity.userInterest = interest[opportunity._id];
      var link = "www." + opportunity.company.name.split(' ')[0] + ".ca"
      opportunity.links = [link];
    });
  });

  $scope.test = function() {
    console.log("Logging scope...");
    console.log($scope);
  };

}]);