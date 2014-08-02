app.controller('UsersOpportunitiesDetailCtrl',
  ['$scope', '$timeout', '$sce', 'UsersOpportunity', '$stateParams', 'GuidanceService', 'generateGlyphs',
  function($scope, $timeout, $sce, UsersOpportunity, $stateParams, GuidanceService, generateGlyphs) {

  $scope.submitText = '✔  Submit Preferences';
  $scope.pendingRequests = 0;
  $scope.myInterval = 5000;
  $scope.slides = [];


  var addIndexAsProperty = function(arrayOfObjects){
    return arrayOfObjects.map(function(item, index){
      item.index = index;
      return item;
    });
  };
    
  // $scope.trustSrc = function(src) {
  //   return $sce.trustAsResourceUrl(src);
  // };

  $scope.updateInterest = function (value) {
    if (!$scope.match) { return undefined; }

    $scope.match.answers = $scope.match.answers.map(function(answerObj){
      if(answerObj.answer === '') answerObj.answer = ' ';
      return answerObj;
    });

    $scope.match.userInterest = value;
    UsersOpportunity.update($scope.match).then(function () { });
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
          answer: ' '
        });
      }
    }

    $scope.match = match;
    $scope.answers = $scope.match.answers;
    $scope.questions = addIndexAsProperty(questions);
    $scope.opportunity = opportunity;
    var guidanceResult = GuidanceService.processTags(opportunity, user);
    var processedTags = guidanceResult[0];
    $scope.score = guidanceResult[1];
    $scope.processedTags = [processedTags.must, processedTags.nice];
    $scope.calculateFit = generateGlyphs.calculateFit;

    company = $scope.company = data.match.opportunity.company;

    for (var j = 0; j < company.media.length; j++) {
      $scope.slides.push({
        image: company.media[j].url
      });
    }
    //   if(company.links[1]){
    //       var domainURL = company.links[1].url.split("watch?v=")[0];
    //       var paramsURL = company.links[1].url.split("watch?v=")[1];
    //       $scope.slides.push({
    //           video: domainURL + "embed/" + paramsURL,
    //           caption: company.links[1].title
    //       })
    //   }

  });

  $scope.submit = function() {
    $scope.submitText = 'Submitting...';
    $scope.pendingRequests++;

    $scope.match.answers = $scope.match.answers.map(function(object){
      if(object.answer === '') object.answer = ' ';
      return object;
    });

    UsersOpportunity.update($scope.match).then(function(){
      $scope.submitText = '✔  Save Successful';
      $scope.pendingRequests--;
      $timeout(function () {
        $scope.submitText = '✔  Submit Preferences';
      }, 3000);
    });
  };

}]);
