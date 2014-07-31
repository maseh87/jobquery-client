app.controller('AdminOpportunitiesPreviewCtrl', function($scope, $stateParams, Opportunity) {

  Opportunity.get($stateParams._id).then(function (data) {
    // console.log(data.company);
    $scope.opportunity = data;
    $scope.company = data.company;
  });
});