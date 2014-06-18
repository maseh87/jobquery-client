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


