app.controller('AdminOpportunitiesDetailCtrl', ['$scope', '$stateParams', 'Opportunity', 'Match', 'Tag', 'User', 
  function($scope, $stateParams, Opportunity, Match, Tag, User) {

  Opportunity.get($stateParams._id).then(function(opportunity){
    $scope.opportunity = opportunity;
  });

  // *****
  // I have to do this crazy ugly logic until we come up with a better way on the backend!
  // *****
  Tag.getAll().then(function(tags) {
    $scope.tagCollection = tags;
    Match.getAll().then(function(matches){
      $scope.users = [];
      $scope.matches = matches.data.filter(function (match) {
        return match.oppId.toString() === $stateParams._id.toString();
      });
      $scope.matches.forEach(function (match) {
        var user = {};
        user._name = match.userId.name;
        user._email = match.userId.email;
        user._interest = match.userInterest;
        user._attributes = match.oppId.tags.map(function (matchTag) {
          var traitMatches = match.userId.tags.filter(function (userTag) {
            return userTag.tagId.name === matchTag.tagId.name;
          })[0];
          return traitMatches.length === 0 ? 0 : traitMatches[0];
        });
        $scope.users.push(user);
      });
    });
  });

  $scope.readOnly = true;
  $scope.editButtonText = "+ Edit Opportunity";
  $scope.toggleEdit = function () {
    if (!$scope.readOnly) { $scope.save(); }
    $scope.readOnly = !$scope.readOnly;
    $scope.editButtonText = $scope.readOnly ? "+ Edit Opportunity" : "Save Opportunity";
  }; 

  $scope.save = function () {
    Opportunity.update($scope.opportunity).then(function(data){
      console.log('Update successful');
    });
  };

  $scope.basic = {};
  $scope.guidance = {};
  $scope.declared = [];
  $scope.viewToModel = function () {

  };
  $scope.modelToView = function () {

  };
  
  $scope.removeFrom = function (array, item, idKey) {
    array = array.filter(function(elem) {
      return idKey ? elem[idKey] !== item[idKey] : elem !== item;
    });
  };

  $scope.addTo = function (array, field) {
    array.push(field);
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
  learnMore: [url1, url2, url3],
  active: true,
  group: "true",
  internal: "string"
};
var url1 = "www.google.ca";

$scope.guidance = {
  questions: ["question1", "question2"],
  tags: [tag1, tag2]
};

$scope.declared = [ cand1, cand2 ];
var cand1 = {
  name: "",
  email: "",
  interest: "",
  tags: [tag1, tag2, tag3]
};

var tag = {
  name: 'algorithms',
  value: 3
}

description, company, title, location, url, learnmore[], active, group, internal

*/








