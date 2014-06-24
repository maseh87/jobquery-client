app.controller('UsersOpportunitiesDetailCtrl', ['$scope', 'UsersOpportunity', '$stateParams',
function($scope, UsersOpportunity, $stateParams) {

  UsersOpportunity.get($stateParams._id).then(function(data){
    var match = data.match;
    var opportunity = match.opportunity;
    var questions = opportunity.questions;
    if(questions.length !== match.answers.length){
      for(var i = 0; i < questions.length - match.answers.length; i++){
        match.answers.push({
          answer: ''
        });
      }
    }
    $scope.match = match;
    $scope.answers = $scope.match.answers;
    $scope.questions = questions;
    $scope.opportunity = opportunity;
  });

  $scope.submit = function(){
    UsersOpportunity.update($scope.match);
  };

}]);
