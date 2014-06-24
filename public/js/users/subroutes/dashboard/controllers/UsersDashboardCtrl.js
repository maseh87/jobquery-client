app.controller('UsersDashboardCtrl', ['$scope', 'UsersOpportunity', 'GuidanceService', 
function ($scope, UsersOpportunity, GuidanceService) {

  var matches;
  $scope.submitText = 'Submit';
  $scope.pendingRequests = 0;

  var initialize = function(){
    UsersOpportunity.getAll().then(function(data){
      matches = data.matches.filter(function(match){
        return match.userInterest === 0;
      });
      $scope.matches = matches;
      getNextOpportunity();
    });
  };

  var getNextOpportunity = function(){
    var nextOpportunityId = $scope.matches[0].opportunity;
    return UsersOpportunity.get(nextOpportunityId).then(function(data){
      $scope.submitText='Submit';
      $scope.pendingRequests--;
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
  };

  $scope.submit = function(){
    $scope.submitText = 'Submitting...';
    $scope.pendingRequests++;
    UsersOpportunity.update($scope.match).then(function(){
      $scope.submitText = 'Fetching Next';
      $scope.matches.splice(0, 1);
      getNextOpportunity();
    });
  };

  initialize();

}]);
