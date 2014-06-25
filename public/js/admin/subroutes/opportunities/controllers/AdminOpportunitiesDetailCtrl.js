app.controller('AdminOpportunitiesDetailCtrl', ['$scope', '$stateParams', 'Opportunity', 'Match', 'Tag', 'Category',
  function ($scope, $stateParams, Opportunity, Match, Tag, Category) {

  Match.getUsers($stateParams._id).then(function (data) {
    $scope.mapToView(data.opportunity, data.matches);
    $scope.oppData = data.opportunity;
  });

  Tag.getAll().then(function (tags) { $scope.tags = tags; });
  Category.getAll('Opportunity').then(function (categories) { $scope.categories = categories; });

  $scope.readOnly = true;
  $scope.editButtonText = "Edit";
  $scope.toggleEdit = function () {
    if (!$scope.readOnly) { $scope.save(); }
    $scope.readOnly = !$scope.readOnly;
    $scope.editButtonText = $scope.readOnly ? "Edit" : "Save";
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
    basicInfo.approved = oppData.approved;
    basicInfo.group = oppData.category;
    basicInfo.internal =
      oppData.internalNotes.length ?
      oppData.internalNotes[0].text : null;
    basicInfo.notes =
      oppData.notes.length ?
      oppData.notes[0].text : null;
    $scope.basic = basicInfo;
    var guidance = {};
    guidance.questions = oppData.questions;
    guidance.tags = oppData.tags.map(function (tagData) {
      return {data: tagData.tag, value: tagData.value, importance: tagData.importance};
    });
    $scope.guidance = guidance;

    var declared = matchData.map(function (matchModel) {
      return {
        _id: matchModel.user._id,
        name: matchModel.user.name,
        email: matchModel.user.email,
        interest: matchModel.userInterest,
        tags: (function () {
          var tagsByKeys = {};
          matchModel.user.tags.forEach(function (tag) {
            tagsByKeys[tag.tag._id] = tag.value;
          });
          return tagsByKeys;
        })()
      };
    });
    $scope.declared = declared;
  };

  $scope.save = function () {
    // remove any empty tags and duplicate tags (preference for higher order)
    var existingTags = {};
    for (var i = 0; i < $scope.guidance.tags.length; i += 1) {
      var currentTag = $scope.guidance.tags[i];
      // check for empty tags
      if (!currentTag.data || !currentTag.data._id) {
        $scope.guidance.tags.splice(i, 1);
        i -= 1;
        continue;
      }
      // check for duplicate tags
      if (existingTags.hasOwnProperty(currentTag.data._id)) {
        $scope.guidance.tags.splice(i, 1);
        i -= 1;
      } else {
        existingTags[currentTag.data._id] = true;
      }
    }

    // remove any empty questions
    for (var j = 0; j < $scope.guidance.questions.length; j += 1) {
      var currentQ = $scope.guidance.questions[j];
      // check for empty questions
      if (currentQ.question === '') {
        $scope.guidance.questions.splice(j, 1);
        j -= 1;
      }
    }

    // remove any empty links
    for (var k = 0; k < $scope.basic.links.length; k += 1) {
      var currentLink = $scope.basic.links[k];
      // check for empty links
      if (currentLink.title === '' || currentLink.url === '') {
        $scope.basic.links.splice(k, 1);
        j -= 1;
      }
    }

    var oppData = {};
    oppData._id = $scope.basic._id;
    oppData.active = $scope.basic.active;
    oppData.approved = $scope.basic.approved;
    oppData.description = $scope.basic.description;
    oppData.questions = $scope.guidance.questions;
    oppData.jobTitle = $scope.basic.title;
    oppData.category = $scope.basic.group._id;
    oppData.company = $scope.basic.company._id;
    oppData.notes = $scope.basic.notes ? [ {text: $scope.basic.notes} ] : [];
    oppData.internalNotes = $scope.basic.internal ? [ {text: $scope.basic.internal} ] : [];
    oppData.tags = $scope.guidance.tags.map(function (tag) {
      return {tag: tag.data._id, value: tag.value, importance: tag.importance};
    });
    oppData.links = $scope.basic.links;

    Opportunity.update(oppData).then(function(data){
    });
  };

  $scope.removeFrom = function (index, array) {
    array.splice(index, 1);
  };

  $scope.addTo = function (array, field) {
    array.push(field);
  };

  $scope.showCorrectValues = function (tag, index, id) {
    for (var i = 0; i < $scope.tags.length; i += 1) {
      if ($scope.tags[i]._id === id) {
        tag.type = $scope.tags[i].type;
        break;
      }
    }
  };

}]);
