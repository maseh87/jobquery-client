app.controller('AdminOpportunitiesDetailCtrl', ['$scope', '$stateParams', 'Opportunity', 'Match', 'Tag',
  function($scope, $stateParams, Opportunity, Match, Tag) {

  Opportunity.get($stateParams._id).then(function(opportunity){
    $scope.opportunity = opportunity;
  });

  Match.getAll().then(function(matches){
    $scope.matches = matches;
  });

  Tag.getAll().then(function(tags) {
    $scope.tagNames = tags.map(function(tag) { return tag.name; });
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

  $scope.readOnly = false;
  $scope.editButtonText = "+ Edit Opportunity";
  $scope.toggleEdit = function () {
    $scope.readOnly = !$scope.readOnly;
    $scope.editButtonText = $scope.readOnly ? "+ Edit Opportunity" : "Save Opportunity";
  }; 

  $scope.save = function () {
    // patch to opportunity
  };

  // need to add user.interest on inject

}]);