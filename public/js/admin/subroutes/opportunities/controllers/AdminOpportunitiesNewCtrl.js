app.controller('AdminOpportunitiesNewCtrl',
  ['$scope', '$stateParams', '$state', 'Opportunity', 'Company', 'Tag', 'Category',
  function($scope, $stateParams, $state, Opportunity, Company, Tag, Category) {

  Tag.getAll().then(function (tags) { $scope.tags = tags; });
  Company.getAll().then(function (companies) { $scope.companies = companies; });
  Category.getAll('Opportunity').then(function (categories) { $scope.categories = categories; });

  $scope.basic = {
    description: '',
    company: {},
    title: '',
    group: {},
    active: true,
    links: []
  };
  $scope.guidance = {
    questions: [],
    tags: []
  };

  $scope.save = function () {
    // remove any empty tags
    for (var i = 0; i < $scope.guidance.tags.length; i += 1) {
      var currentTag = $scope.guidance.tags[i];
      if (!currentTag.id) {
        $scope.guidance.tags.splice(i, 1);
        i -= 1;
      }
    }

    var oppData = {};
    oppData.active = $scope.basic.active;
    oppData.description = $scope.basic.description;
    oppData.questions = $scope.guidance.questions;
    oppData.jobTitle = $scope.basic.title;

    oppData.questions = $scope.guidance.questions;
    oppData.internalNotes = $scope.basic.internal ? [ {text: $scope.basic.internal} ] : [];
    oppData.tags = $scope.guidance.tags.map(function (tag) {
      return {tag: tag.id, value: tag.value, importance: tag.importance};
    });
    oppData.links = $scope.basic.links;

    oppData.category = $scope.basic.category._id;
    oppData.company = $scope.basic.company._id;

    Opportunity.create(oppData).then(function(data){
      $state.go('admin.opportunities.detail', { _id : data._id});
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

  $scope.showCorrectValues = function (tag, index, id) {
    for (var i = 0; i < $scope.tags.length; i += 1) {
      if ($scope.tags[i]._id === id) {
        tag.type = $scope.tags[i].type;
        break;
      }
    }
  };

}]);
