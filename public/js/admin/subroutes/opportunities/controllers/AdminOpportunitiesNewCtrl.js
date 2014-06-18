app.controller('AdminOpportunitiesNewCtrl', ['$scope', '$stateParams', 'Opportunity',  
  function($scope, $stateParams, Opportunity) {

  $scope.opportunity = {
    active: true,
    company: {},
    jobTitle: '',
    description: '',
    tags: [],
    links: [],
    notes: [],
    internalNotes: [],
    questions: [],
    survey: [],
    category: {}
  };

  $scope.readOnly = false;
  $scope.editButtonText = "+ Save Opportunity";

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

  $scope.create = function () {
    Opportunity.update($scope.opportunity).then(function(data){
      console.log('Update successful');
    });
  };

}]);

/*

$scope.basic = {};
$scope.guidance = {};
$scope.declared = [];

// what i expect
$scope.basic = {
  description: "lorem ipsum",
  company: "company",
  title: "string",
  location: "string",
  url: "url",
  learnmore: [url1, url2, url3],
  active: true,
  group: "true",
  internal: "string"
};
var url1 = "url1";

$scope.guidance = {
  questions: ["question1", "question2"],
  tags: [["algorithms", 4],["ui/ux", 3]
};

$scope.declared = [ cand1, cand2 ];
var cand1 = {
  name: "",
  email: "",
  interest: "",
  tags: [[],[],[]]
};

description, company, title, location, url, learnmore[], active, group, internal

*/

