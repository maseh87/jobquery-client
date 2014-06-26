app.controller('UsersOpportunitiesDetailCtrl', ['$scope', 'UsersOpportunity', '$stateParams', 'GuidanceService',
function($scope, UsersOpportunity, $stateParams, GuidanceService) {

  $scope.submitText = '✔  Submit';
  $scope.pendingRequests = 0;

  var addIndexAsProperty = function(arrayOfObjects){
    return arrayOfObjects.map(function(item, index){
      item.index = index;
      return item;
    });
  };

  $scope.updateInterest = function (value) {
    if (!$scope.match) { return undefined; }
    $scope.match.userInterest = value;
    UsersOpportunity.update($scope.match).then(function(){
      console.log("Success!");
    });
  };
  $scope.hasInterest = function (value) {
    if (!$scope.match) { return undefined; }
    return $scope.match.userInterest === value;
  };

  UsersOpportunity.get($stateParams._id).then(function(data){
    var match = data.match;
    var opportunity = match.opportunity;
    var questions = opportunity.questions;
    var user = data.user;

    var numQuestions = questions.length;
    var numAnswers = match.answers.length;
    var difference = numQuestions - numAnswers;

    if(questions.length !== match.answers.length){
      for(var i = 0; i < difference; i++){
        match.answers.push({
          answer: ''
        });
      }
    }
    
    $scope.match = match;
    $scope.answers = $scope.match.answers;
    $scope.questions = addIndexAsProperty(questions);
    $scope.opportunity = opportunity;
    var processedTags = GuidanceService.processTags(opportunity, user);
    $scope.processedTags = [processedTags.must, processedTags.nice];
  });

  $scope.submit = function() {
    $scope.submitText = 'Submitting...';
    $scope.pendingRequests++;
    UsersOpportunity.update($scope.match).then(function(){
      $scope.submitText = 'Save Successful';
      $scope.pendingRequests--;
    });
  };

}]);
