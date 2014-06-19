app.controller('AdminOpportunitiesCtrl', ['$scope', 'Opportunity', 'Match', 
  function($scope, Opportunity, Match) {

  Opportunity.getAll().then(function(opportunities){
    Match.getAll().then(function(matches) {
      console.log(matches);
      $scope.mapToView(matches, opportunities);
    });
  });

  $scope.log = function(item) {
    console.log($scope.attributes);
  };

  $scope.toggleEdit = function (attribute) {
    if (attribute.editable) { $scope.syncTags(); }
    attribute.editable = !attribute.editable;
  };

  $scope.addTo = function (array, field) {
    array.push(field);
  };

  $scope.groups = {};
  $scope.attributes = [];

  $scope.mapToView = function (matchData, oppData) {
    var opportunities = {};
    oppData.forEach(function (opp) { opportunities[opp._id] = opp; });

    matchData.forEach(function(match) {
      var oppModel = opportunities[match.opportunity._id];
      var groupName = oppModel.category.name;
      if (!$scope.groups.hasOwnProperty(groupName)) { $scope.groups[groupName] = []; }

      if (opportunities[match.opportunity._id].processed) {
        $scope.groups[groupName].forEach(function(opportunity) {
          if (opportunity._id !== match.opportunity._id) { return null; }
          opportunity.declared++;
          if (match.userInterest >= 3) { opportunity.interested++; }
        }); 
        return null; 
      }
      opportunities[match.opportunity._id].processed = true;

      var opportunity = {};
      opportunity._id = oppModel._id;
      opportunity.company = oppModel.company.name;
      opportunity.declared = 1;
      opportunity.interested = match.userInterest >= 3 ? 1 : 0;
      opportunity.url = oppModel.links[0].url;
      opportunity.title = oppModel.jobTitle;
      opportunity.location = oppModel.company.city;

      $scope.groups[groupName].push(opportunity);
    });
  };

}]);
/*
$scope.attributes = [attr1, attr2];
var attr1 = {
  _id: 1,
  name: "UI/UX",
  question: "How strong are ou with UI/UX?"
  labels: ["Weak", "Below Avg", "Exp.", "Strong"]
};


var opp1 = {
  _id: 1,
  company: "Google",
  declared: 56,
  interested: 34,
  url: "www.google.ca",
  title: "Front-end Engineer",
  location: "San Francisco"
}; */
/*
$scope.groups = {};
$scope.attributes = [];

// each controller has its own model-view-mapper

// what i need the model data mapped to
$scope.groups = {
  'attending': [ opp1, opp2 ],
  'cancelled': [ opp3, opp4 ]
};

*/