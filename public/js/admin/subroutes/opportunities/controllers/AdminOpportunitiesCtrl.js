app.controller('AdminOpportunitiesCtrl', ['$scope', 'Opportunity', 'Match', 
  function($scope, Opportunity, Match) {

  Opportunity.getAll().then(function(opportunities){
    $scope.opportunities = opportunities;
  });

  Match.getAll().then(function(matches){
    $scope.matches = matches;
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

  $scope.groups = {};
  $scope.attributes = [];
  $scope.viewToModel = function () {

  };
  $scope.modelToView = function () {

  };

}]);

/*
$scope.groups = {};
$scope.attributes = [];

// each controller has its own model-view-mapper

// what i need the model data mapped to
$scope.groups = {
  'attending': [ opp1, opp2 ],
  'cancelled': [ opp3, opp4 ]
};

var opp1 = {
  _id: 1,
  company: "Google",
  declared: 56,
  interested: 34,
  url: "www.google.ca",
  title: "Front-end Engineer",
  location: "San Francisco"
};

$scope.attributes = [attr1, attr2];
var attr1 = {
  _id: 1,
  name: "UI/UX",
  question: "How strong are ou with Ui/UX?"
  labels: ["Weak", "Below Avg", "Exp.", "Strong"]
};

*/