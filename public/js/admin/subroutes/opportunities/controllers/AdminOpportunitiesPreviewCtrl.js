app.controller('AdminOpportunitiesPreviewCtrl', function($scope, $stateParams, Match) {

  Match.getUsers($stateParams._id).then(function (data) {
    console.log(data.opportunity);
    var opportunity = data.opportunity;
    var questions = opportunity.questions;
    $scope.opportunity = opportunity;
    $scope.company = opportunity.company;
  });
});