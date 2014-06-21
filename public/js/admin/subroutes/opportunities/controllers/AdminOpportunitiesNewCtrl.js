app.controller('AdminOpportunitiesNewCtrl', ['$scope', '$stateParams', 'Opportunity', 'Company', 'Tag', 
  function($scope, $stateParams, Opportunity, Match, Tag) {

  Tag.getAll().then(function (tags) {
    $scope.tagData = tags;
  });

  Company.getAll().then(function (companies) {
    $scope.companyData = companies;
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
    basicInfo._id = oppData._id;
    basicInfo.description = oppData.description;
    basicInfo.company = oppData.company.name;
    basicInfo.title = oppData.jobTitle;
    basicInfo.location = oppData.company.city;
    basicInfo.links = oppData.links;
    basicInfo.active = oppData.active;
    basicInfo.group = oppData.category.name;
    basicInfo.internal = oppData.internalNotes[0].text;
    $scope.basic = basicInfo;

    var guidance = {};
    var guidanceTags = {};
    guidance.questions = oppData.questions;
    guidance.tags = oppData.tags.filter(function (tagData) {
      return tagData.score >= 3;
    }).map(function (tagData) {
      guidanceTags[tagData._id] = true;
      return {_id: tagData._id, name: tagData.tag.name, value: tagData.score};
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

    var notesData = {
      _id: oppData._id,
      text: $scope.basic.internal
    };
    var tagsData = $scope.guidance.tags.map(function (tagView) {
      if (tagView._id) {
        return {_id: tagView._id, score: tagView.value};
      } else {
        var _id = $scope.tagData.filter(function (tagData) {
          return tagData.name === tagView.name;
        }).map(function (tagData) {
          return tagData._id;
        });
        return {_id: _id, score: tagView.value};
      }
    });
    
    oppData.questions = $scope.guidance.questions;
    oppData.internalNotes = [ notesData ];
    oppData.tags = tagsData;
    oppData.links = $scope.basic.links;

    Opportunity.update(oppData).then(function(data){
      console.log('Update successful');
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