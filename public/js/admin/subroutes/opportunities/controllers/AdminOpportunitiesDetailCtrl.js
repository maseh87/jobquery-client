app.controller('AdminOpportunitiesDetailCtrl', ['$scope', '$stateParams', 'Opportunity', 'Match', 'Tag',
  function($scope, $stateParams, Opportunity, Match, Tag) {

  Opportunity.get($stateParams._id).then(function(opportunity){
    $scope.opportunity = opportunity;
    $scope.opportunity._additions = [];
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

  $scope.readOnly = true;
  $scope.editButtonText = "+ Edit Opportunity";
  $scope.toggleEdit = function () {
    if (!$scope.readOnly) { $scope.save(); }
    $scope.readOnly = !$scope.readOnly;
    $scope.editButtonText = $scope.readOnly ? "+ Edit Opportunity" : "Save Opportunity";
  }; 

  $scope.addNew = function(attribute, object) {
    if ($scope.readOnly) { return null; }
    if (!$scope.opportunity._additions[attribute]) { $scope.opportunity._additions[attribute] = []; }
    $scope.opportunity._additions[attribute].push(object);
  };

  $scope.save = function () {
    var _additions = $scope.opportunity._additions;
    for (var attribute in _additions) {
      console.log(_additions[attribute]);
      var newItems = _additions[attribute];
      newItems.forEach(function(e) { console.log(e); });
    }
  };

  // need to add user.interest on inject

}]);