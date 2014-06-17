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

  $scope.readOnly = true;
  $scope.editButtonText = "+ Edit Opportunity";
  $scope.toggleEdit = function () {
    if (!$scope.readOnly) { $scope.save(); }
    $scope.readOnly = !$scope.readOnly;
    $scope.editButtonText = $scope.readOnly ? "+ Edit Opportunity" : "Save Opportunity";
  }; 

  $scope.addNewItem = function (attribute, field) {
    if ($scope.readOnly) { return null; }
    $scope.opportunity[attribute].push(field);
  };

  $scope.removeItem = function (attribute, item) {
    if ($scope.readOnly) { return null; }
    $scope.opportunity[attribute].forEach(function(elem, i, a) {
      if (elem.$$hashKey === item.$$hashKey) { a.splice(i, 1); }
    });
  };

  $scope.save = function () {
    console.log($scope.opportunity);
  };

  // need to add user.interest on inject

}]);