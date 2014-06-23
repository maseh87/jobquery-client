app.controller('AdminOpportunitiesDetailCtrl', ['$scope', '$stateParams', 'Opportunity', 'Match', 'Tag', 'Category',
  function ($scope, $stateParams, Opportunity, Match, Tag, Category) {

  Match.getUsers($stateParams._id).then(function (data) {
    $scope.mapToView(data.opportunity, data.matches);
    $scope.oppData = data.opportunity;
  });

  Tag.getAll().then(function (tags) { $scope.tags = tags; });
  Category.getAll('Opportunity').then(function (categories) { $scope.categories = categories; });

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
    basicInfo._id = oppData._id;
    basicInfo.description = oppData.description;
    basicInfo.company = oppData.company.name;
    basicInfo.title = oppData.jobTitle;
    basicInfo.location = oppData.company.city;
    basicInfo.links = oppData.links;
    basicInfo.active = oppData.active;
    basicInfo.group = oppData.category;
    basicInfo.internal = oppData.internalNotes[0].text;
    $scope.basic = basicInfo;

    var guidance = {};
    var guidanceTags = {};
    guidance.questions = oppData.questions;
    guidance.tags = oppData.tags.map(function (tagData) {
      guidanceTags[tagData._id] = true;
      return {data: tagData.tag, value: tagData.value, importance: tagData.importance};
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
          return {_id: tagData._id, name: tagData.tag.label, value: tagData.value};
        })
      };
    });
    $scope.declared = declared;
  };

  $scope.save = function () {
    var oppData = {};
    oppData._id = $scope.basic._id;
    oppData.active = $scope.basic.active;
    oppData.description = $scope.basic.description;
    oppData.questions = $scope.guidance.questions;
    oppData.jobTitle = $scope.basic.title;
    oppData.category = $scope.basic.group._id;
    oppData.company = $scope.basic.company._id;

    oppData.questions = $scope.guidance.questions;
    oppData.internalNotes = $scope.basic.internal ? [ {text: $scope.basic.internal} ] : [];
    oppData.tags = $scope.guidance.tags.map(function (tag) { 
      return {tag: tag.data._id, value: tag.value, importance: tag.importance}; 
    });
    oppData.links = $scope.basic.links;

    Opportunity.update(oppData).then(function(data){
      // console.log("Update successful");
    });
  };

  $scope.removeFrom = function (array, item, idKey) {
    var index = array.reduce(function(a, b, i) {
      if (typeof a === "number") { return a; }
      if (idKey) {
        return b[idKey] === item[idKey] ? i : null;
      } else {
        return b === item ? i : null;
      }
    }, null);
    if (index !== null) { array.splice(index, 1); }
  };

  $scope.addTo = function (array, field) {
    array.push(field);
  };
}]);
