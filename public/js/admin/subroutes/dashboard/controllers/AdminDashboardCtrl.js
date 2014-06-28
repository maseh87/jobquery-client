app.controller('AdminDashboardCtrl', ['$scope', 'Match', 'User', function ($scope, Match, User) {

  var matches, users, opportunities, candidateCategories, opportunityCategories;
  $scope.candidateCategoryQuery = {};

  var objectify = function(arrayOfObjects){
    var objectified = {};

    arrayOfObjects.forEach(function(obj){
      objectified[obj._id] = obj;
    });

    return objectified;
  };

  var arrayify = function(objectOfObjects){
    var arrayified = [];

    for(var key in objectOfObjects){
      arrayified.push(objectOfObjects[key]);
    };

    return arrayified;
  };

  var processEntries = function(matches, users, opportunities){
    var results = [];
    users = objectify(users);
    opportunities = objectify(opportunities);

    candidateCategories = {};
    opportunityCategories = {};

    for(var i = 0; i < matches.length; i++){
      var matchObj = matches[i];

      if(matchObj.userInterest === 0) continue;

      var opportunityCategory = opportunities[matchObj.opportunity].category;
      var candidateCategory = users[matchObj.user].category;

      if(candidateCategory) candidateCategories[candidateCategory._id] = candidateCategory;
      if(opportunityCategory) opportunityCategories[opportunityCategory._id] = opportunityCategory;

      results.push({
        candidate: users[matchObj.user].name,
        candidateGroup: users[matchObj.user].category ? users[matchObj.user].category.name : null,
        company: opportunities[matchObj.opportunity].company.name,
        opportunityGroup: opportunities[matchObj.opportunity].category ? opportunities[matchObj.opportunity].category.name : null,
        interest: matchObj.userInterest,
        override: matchObj.adminOverride,
        processed: matchObj.isProcessed
      });
    }

    candidateCategories = arrayify(candidateCategories);
    opportunityCategories = arrayify(opportunityCategories);

    return results;
  };

  Match.getAll().then(function(data){
    matches = data.matches;
    opportunities = data.opportunities;
    return User.getAll();
  }).then(function(data){
    users = data;
    $scope.entries = processEntries(matches, users, opportunities);
    $scope.candidateCategories = candidateCategories;
    $scope.opportunityCategories = opportunityCategories;
  });

  $scope.customQuery = function(entry){

    //Filter for processed
    if($scope.processedQuery !== entry.processed) return false;

    //Filter for candidate name
    if($scope.candidateNameQuery){
      var regex = new RegExp($scope.candidateNameQuery, 'i');
      if(!entry.candidate.match(regex)) return false;
    }

    //Filter for interest >= input number
    if($scope.interestQuery){
      if($scope.interestQuery > entry.interest) return false;
    }

    //Filter for admin override >= input number
    if($scope.overrideQuery){
      if($scope.overrideQuery > entry.override) return false;
    }

    //Filter for candidate category
    //First see if any of them at all are selected. Then filter for the ones that are
    var temp = [];
    for(var key in candidateCategories){
      var category = candidateCategories[key];
      if(category.selected) temp.push(category);
    };
    if(temp.length !== 0){
      var validCandidateCategory = false;
      for(var i = 0; i < temp.length; i++){
        if(temp[i].name === entry.candidateGroup) validCandidateCategory = true;
      }
      if(!validCandidateCategory) return false;
    }

    //Filter for opportunity category
    var temp = [];
    for(var key in opportunityCategories){
      var category = opportunityCategories[key];
      if(category.selected) temp.push(category);
    };
    if(temp.length !== 0){
      var validOpportunityCategory = false;
      for(var i = 0; i < temp.length; i++){
        if(temp[i].name === entry.opportunityGroup) validOpportunityCategory = true;
      }
      if(!validOpportunityCategory) return false;
    }


    return true;
  };

}]);
