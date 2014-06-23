app.controller('AdminOpportunitiesNewCtrl', ['$scope', '$stateParams', 'Opportunity', 'Company', 'Tag', 'Category', 
  function($scope, $stateParams, Opportunity, Company, Tag, Category) {

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
    var oppData = {};
    oppData.active = $scope.basic.active;
    oppData.description = $scope.basic.description;
    oppData.questions = $scope.guidance.questions;
    oppData.jobTitle = $scope.basic.title;
    
    oppData.questions = $scope.guidance.questions;
    oppData.internalNotes = $scope.basic.internal ? [ {text: $scope.basic.internal} ] : [];
    oppData.tags = $scope.guidance.tags.map(function (tag) { 
      return {tag: tag.data._id, score: tag.value, importance: tag.importance}; 
    });
    oppData.links = $scope.basic.links;

    oppData.category = $scope.basic.category._id;
    oppData.company = $scope.basic.company._id;

    Opportunity.create(oppData).then(function(data){
      console.log('Create successful');
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