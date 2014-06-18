app.controller('AdminOpportunitiesNewCtrl', ['$scope', '$stateParams', 'Opportunity',  
  function($scope, $stateParams, Opportunity) {

  $scope.create = function () {
    Opportunity.update($scope.opportunity).then(function(data){
      console.log('Update successful');
    });
  };

  $scope.removeFrom = function (array, item, idKey) {
    array = array.filter(function(elem) {
      return idKey ? elem[idKey] !== item[idKey] : elem !== item;
    });
  };

  $scope.addTo = function (array, field) {
    array.push(field);
  };

  $scope.viewToModel = function () {

  };

  $scope.basic = {
    description: "",
    company: "",
    title: "",
    location: "",
    url: "",
    learnMore: [""],
    active: true,
    group: "",
    internal: ""
  };

  $scope.guidance = {
    questions: [""],
    tags: [{ name: '', value: 0 }]
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

