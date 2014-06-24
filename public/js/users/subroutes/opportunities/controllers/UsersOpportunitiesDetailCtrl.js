app.controller('UsersOpportunitiesDetailCtrl', ['$scope', 'UsersOpportunity', '$stateParams', 'GuidanceService',
function($scope, UsersOpportunity, $stateParams, GuidanceService) {

  UsersOpportunity.get($stateParams._id).then(function(data){
    var match = data.match;
    var opportunity = match.opportunity;
    var questions = opportunity.questions;
    var user = data.user;
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
    var processedTags = GuidanceService.processTags(opportunity, user);
    $scope.processedTags = [processedTags.must, processedTags.nice];
  });

  $scope.submit = function(){
    UsersOpportunity.update($scope.match);
  };

}]);
