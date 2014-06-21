app.controller('AdminOpportunitiesDetailCtrl', ['$scope', '$stateParams', 'Opportunity', 'Match', 'Tag', 'User', 
  function($scope, $stateParams, Opportunity, Match, Tag, User) {

  Match.getUsers($stateParams._id).then(function (data) {
    console.log(data);
    $scope.mapToView(data.opportunity, data.matches);
  });

  $scope.readOnly = true;
  $scope.editButtonText = "+ Edit Opportunity";
  $scope.toggleEdit = function () {
    if (!$scope.readOnly) { $scope.save(); }
    $scope.readOnly = !$scope.readOnly;
    $scope.editButtonText = $scope.readOnly ? "+ Edit Opportunity" : "Save Opportunity";
  }; 

  $scope.basic = {};
  $scope.guidance = {};
  $scope.declared = [];
  $scope.mapToView = function (oppData, matchData) {
    var basicInfo = {};
    basicInfo.description = oppData.description;
    basicInfo.company = oppData.company.name;
    basicInfo.title = oppData.jobTitle;
    basicInfo.location = oppData.company.city;
    basicInfo.url = oppData.links[0].url;
    basicInfo.learnMore = oppData.links.map(function(linkData) { return linkData.url; });
    basicInfo.active = oppData.active;
    basicInfo.group = oppData.category.name;
    basicInfo.internal = oppData.internalNotes[0].text;
    $scope.basic = basicInfo;

    var guidance = {};
    var guidanceTags = {};
    guidance.questions = oppData.questions.map(function(questionData) { return questionData.question; });
    guidance.tags = oppData.tags.filter(function (tagData) {
      return tagData.score >= 3;
    }).map(function (tagData) {
      guidanceTags[tagData._id] = true;
      return {name: tagData.tag.name, value: tagData.score};
    });
    $scope.guidance = guidance;

    var declared = matchData.map(function (matchModel) {
      return {
        _id: matchModel.user._id,
        name: matchModel.user.name,
        email: matchModel.user.email,
        interest: matchModel.userInterest,
        tags: matchModel.user.tags.filter(function (tagData) {
          return guidanceTags[tagData._id];
        }).map(function (tagData) {
          return {name: tagData.tag.label, value: tagData.value};
        })
      };
    });
    $scope.declared = declared;
  };

  $scope.save = function () {
    var oppData = {};
    Opportunity.update(oppData).then(function(data){
      console.log('Update successful');
    });
  };

  $scope.removeFrom = function (array, item, idKey) {
    var index = array.reduce(function(a, b, i) {
      if (idKey) {
        return elem[idKey] === item[idKey] ? i : null;
      } else {
        return elem === item ? i : null;
      }
    }, null);
    if (index !== null) { array.splice(index, 1); }
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
