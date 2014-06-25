app.controller('AdminOpportunitiesCtrl', ['$scope', 'Opportunity', 'Match',
  function ($scope, Opportunity, Match) {

  Match.getAll().then(function (data) {
    $scope.mapToView(data.matches, data.opportunities);
  });

  $scope.toggleEdit = function (attribute) {
    if (attribute.editable) { $scope.syncTags(); }
    attribute.editable = !attribute.editable;
  };

  $scope.groups = {};

  $scope.mapToView = function (matchData, oppData) {
    var allOpportunities = {};
    oppData.forEach(function (oppModel) {
      var opportunity = {};
      var groupName = oppModel.category.name;
      if (!$scope.groups[groupName]) { $scope.groups[groupName] = []; }

      opportunity._id = oppModel._id;
      opportunity.company = oppModel.company.name;
      opportunity.title = oppModel.jobTitle;
      opportunity.approved = oppModel.approved;
      opportunity.internalNotes =
        oppModel.internalNotes.length > 0 ? oppModel.internalNotes[0].text : null;
      opportunity.interested = 0;
      opportunity.declared = 0;

      allOpportunities[opportunity._id] = opportunity;
      $scope.groups[groupName].push(opportunity);
    });

    matchData.forEach(function (match) {
      var oppId = match.opportunity;
      if (match.userInterest > 0) { allOpportunities[oppId].declared++; }
      if (match.userInterest > 2) { allOpportunities[oppId].interested++; }
    });
  };

}]);
