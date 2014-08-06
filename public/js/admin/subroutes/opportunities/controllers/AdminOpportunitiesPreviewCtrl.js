app.controller('AdminOpportunitiesPreviewCtrl', ['$scope', '$stateParams', 'Opportunity',
  function($scope, $stateParams, Opportunity) {

  Opportunity.get($stateParams._id).then(function (data) {
    $scope.opportunity = data;
    $scope.company = data.company;
  });
}]);