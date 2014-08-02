app.controller('AdminOpportunitiesCtrl', ['$scope', 'Opportunity', 'Match', 'DialogueService',
  function ($scope, Opportunity, Match, DialogueService) {

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

      var isAttending = function(groupName){
        return groupName === "Attending Hiring Day";
      }

      var groupName = oppModel.category.name;
      var opportunity = {};
      if (!$scope.groups[groupName]) { $scope.groups[groupName] = []; }

      opportunity._id = oppModel._id;
      opportunity.category = oppModel.category;
      opportunity.groupName = groupName;
      opportunity.company = oppModel.company.name;
      opportunity.title = oppModel.jobTitle;
      opportunity.attending = isAttending(groupName);
      opportunity.active = oppModel.active;
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

  $scope.includeAllActive = false;
  $scope.includeAllPublic = true;

  $scope.toggleC = function (attribute) {
    $scope[attribute] = !$scope[attribute];
  };

  $scope.excludingMachine = function () {
    return function (item) {
      if ( (!$scope.includeAllActive && !item.active) ||
           (!$scope.includeAllPublic && !item.approved) ){
        return false;
      } else {
        return true;
      }
    };
  };

  $scope.toggleCheckbox = function (opp, property) {
    var opportunityToUpdate = {};
    opportunityToUpdate._id = opp._id;
    opportunityToUpdate[property] = !opp[property];
    Opportunity.update(opportunityToUpdate);
  };

  $scope.updateAttending = function(opp){
    //toggle opp.category.name
    if(opp.category.name === 'Attending Hiring Day'){
      console.log('before: ' + opp.category.name);
      opp.category.name = 'Not Attending Hiring Day'
      console.log('after: ' + opp.category.name);
    }else{
      console.log('before: ' + opp.category.name);
      opp.category.name = 'Attending Hiring Day'
      console.log('after: ' + opp.category.name);
    }
  };  

}]);

