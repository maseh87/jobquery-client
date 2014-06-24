app.controller('UsersOpportunitiesDetailCtrl', ['$scope', 'UsersOpportunity', '$stateParams',
function($scope, UsersOpportunity, $stateParams) {

  UsersOpportunity.get($stateParams._id).then(function(data){
    var match = data.match;
    var opportunity = match.opportunity;

    $scope.match = match;
    $scope.opportunity = opportunity;
    $scope.userInterest = match.userInterest;
    $scope.questions = match.opportunity.questions;
    $scope.answers = match.answers;
  });

  $scope.submit = function(){
    var match = $scope.match;
    match.answers = $scope.answers;
    match.userInterest = parseInt($scope.match.userInterest);
    console.log(match);
    UsersOpportunity.update(match);
  };

}]);
