app.controller('AdminOpportunitiesNewCtrl',
  ['$scope', '$stateParams', '$state', 'Opportunity', 'Company', 'Tag', 'Category',
  function($scope, $stateParams, $state, Opportunity, Company, Tag, Category) {

  $scope.basic = {
    description: '',
    company: {},
    category: {},
    title: '',
    group: {},
    active: true,
    links: []
  };

  $scope.guidance = {
    questions: [],
    tags: []
  };

  Tag.getAll().then(function (tags) { $scope.tags = tags; });
  Company.getAll().then(function (companies) {
    $scope.companies = companies;
    $scope.basic.company = companies[0]; // default
  });
  Category.getAll('Opportunity').then(function (categories) {
    $scope.categories = categories;
    $scope.basic.category = categories[0]; // default
  });


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
    oppData.active = $scope.basic.active;
    oppData.description = $scope.basic.description;
    oppData.questions = $scope.guidance.questions;
    oppData.jobTitle = $scope.basic.title;
    oppData.category = $scope.basic.category._id;
    oppData.company = $scope.basic.company._id;
    oppData.notes = $scope.basic.notes ? [ {text: $scope.basic.notes} ] : [];
    oppData.internalNotes = $scope.basic.internal ? [ {text: $scope.basic.internal} ] : [];
    oppData.tags = $scope.guidance.tags.map(function (tag) {
      return {tag: tag.id, value: tag.value, importance: tag.importance};
    });
    oppData.links = $scope.basic.links;

    Opportunity.create(oppData).then(function(data){
      $state.go('admin.opportunities.detail', { _id : data._id});
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
