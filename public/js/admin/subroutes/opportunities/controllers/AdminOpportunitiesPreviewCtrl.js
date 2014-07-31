app.controller('AdminOpportunitiesPreviewCtrl', function($scope, $stateParams, Match) {
  // $scope.opportunity = {
  //   jobTitle: 'Job Title',
  //   company: {
  //     name: 'Company Name'
  //   }
  // };
  Match.getUsers($stateParams._id).then(function (data) {
    console.log(data.opportunity);
    var opportunity = data.opportunity;
    var questions = opportunity.questions;
    $scope.opportunity = opportunity;
  });
});