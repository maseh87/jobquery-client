<<<<<<< HEAD
app.controller('AdminOpportunitiesDetailCtrl', ['$scope', '$stateParams', function($scope, $stateParams){
=======
app.controller('AdminOpportunitiesDetailCtrl', ['$scope', '$controller', 'Match', 
  function($scope, $controller, Match) {
>>>>>>> Edit and detail prelim templates

  $controller('ResourceDetailCtrl', {$scope: $scope, Resource: Resource});
  $controller('ResourceEditCtrl', {$scope: $scope, Resource: Resource});
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

  $scope.addNew = function (attribute) {

  };

  // need to inject user
  // need to add user.interest on inject

  // need to inject tags

}]);