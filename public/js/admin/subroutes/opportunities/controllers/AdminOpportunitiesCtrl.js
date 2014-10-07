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

      var groupName = oppModel.category.name;
      var opportunity = {};
      if (!$scope.groups[groupName]) { $scope.groups[groupName] = []; }

      opportunity._id = oppModel._id;
      opportunity.category = oppModel.category;
      opportunity.groupName = groupName;
      opportunity.company = oppModel.company.name;
      opportunity.title = oppModel.jobTitle;
      opportunity.attending = groupName === 'Attending Hiring Day' ? true : false;
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

  $scope.updateAttendingCategory = function(opp){

    var toggleOppCategory = function(opp){

      //these are the unique _id in mongodb for the 'Attending Hiring Day', and
      //'Not Attending Hiring Day' respectively. These two categories should probably 
      //be refactored at some point in time to be boolean values on each opportunity 
      //rather than part of the original 'category' implementation

      if(opp.category.name === 'Attending Hiring Day'){
        var isNotAttendingDbId = '53ac93d51efb4600001c976d';
        opp.category.name = 'Not Attending Hiring Day';
        opp.category._id = isNotAttendingDbId;
      }else{
        var isAttendingDbId = '53ac93d51efb4600001c976c';
        opp.category.name = 'Attending Hiring Day';
        opp.category._id = isAttendingDbId;
      }
    };

    var toggleScopeGroupsCategory = function(opp){
      opp.attending = !opp.attending;
      if(opp.category.name === 'Attending Hiring Day'){
        var currentCategory = 'Attending Hiring Day';
        var newCategory = 'Not Attending Hiring Day';
      }else{
        var currentCategory = 'Not Attending Hiring Day';
        var newCategory = 'Attending Hiring Day';
      }

      var currentGroup = $scope.groups[currentCategory];
      for(var i = 0; i < currentGroup.length; i++){
        var opportunityInGroup = currentGroup[i];
        if(opportunityInGroup === opp){
          currentGroup.splice(i, 1);
          break;
        }
      }
      $scope.groups[newCategory].push(opp);
      
    };

    var toggleOppCategoryInDatabase = function(opp){
        opportunityToUpdate = {
          _id: opp._id,
          category: opp.category
        };
        Opportunity.update(opportunityToUpdate);
    };

    toggleScopeGroupsCategory(opp);
    toggleOppCategory(opp);
    toggleOppCategoryInDatabase(opp);
  };

}]);

