app.controller('AdminOpportunitiesPreviewCtrl', function($scope, $stateParams, Opportunity) {

  Opportunity.get($stateParams._id).then(function (data) {
    console.log(data);
    $scope.opportunity = data;
    // var questions = opportunity.questions;
    // $scope.opportunity = opportunity;
    $scope.company = data.company;
  });
});