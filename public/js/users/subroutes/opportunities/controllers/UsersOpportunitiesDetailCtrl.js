app.controller('UsersOpportunitiesDetailCtrl',
  ['$scope', '$timeout', '$sce', 'UsersOpportunity', '$stateParams', 'GuidanceService', 'generateGlyphs',
  function($scope, $timeout, $sce, UsersOpportunity, $stateParams, GuidanceService, generateGlyphs) {

  $scope.submitText = '✔  Submit Preferences';
  $scope.pendingRequests = 0;
  $scope.myInterval = 5000;
  $scope.slides = [];
  $scope.defaultImage = true;
  $scope.isVideo = false;

  var addIndexAsProperty = function(arrayOfObjects){
    return arrayOfObjects.map(function(item, index){
      item.index = index;
      return item;
    });
  };

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

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
      //if media is video, save it as video
      if ( company.media[j].url.match(/youtube/)){
        $scope.slides.push({
          video: company.media[j].url,
          caption: company.media[j].caption
        });
      } else {
        $scope.slides.push({
          image: company.media[j].url,
          caption: company.media[j].caption
        });
      }
    }

  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
    if( imageUrl.match(/youtube/)) {
      $scope.isVideo = true;
    }
    else{
      $scope.defaultImage = false;
      $scope.isVideo = false;
    }
  };

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
