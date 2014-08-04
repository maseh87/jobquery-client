app.controller('UsersDashboardCtrl',
  ['$scope', 'UsersOpportunity', 'UserDashboardService', 'GuidanceService', 'generateGlyphs', 'DialogueService',
  function ($scope, UsersOpportunity, UserDashboardService, GuidanceService, generateGlyphs, DialogueService) {

  var matches;
  $scope.submitText = '✔ Submit Preferences';
  $scope.pendingRequests = 0;

  var objectify = function(arrayOfObjects){
    var object = {};

    arrayOfObjects.forEach(function(item){
      object[item._id] = item;
    });

    return object;
  };

  var initialize = function(){
    UsersOpportunity.getAll().then(function(data){
      var opps = objectify(data.opportunities);
      matches = data.matches.filter(function(match){
        return (match.userInterest === 0) && opps[match.opportunity];
      });
      $scope.matches = matches;
      $scope.opps = opps;
      $scope.numberOfOpps = Object.keys(opps).length;
      if(matches.length){
        getNextOpportunity();
      }
    });
  };

  var addIndexAsProperty = function(arrayOfObjects){
    return arrayOfObjects.map(function(item, index){
      item.index = index;
      return item;
    });
  };

  var animateScroll = function () {
    var delta = window.pageYOffset;
    var frames = 30;
    var period = 15;

    for (var i = 1; i <= frames; i++) {
      (function (scrollPos) {
        setTimeout(function() { window.scrollTo(0, scrollPos); }, period * i);
      })((frames - i) / frames * delta);
    }
  };

  var getNextOpportunity = function(){
    var nextOpportunityId = $scope.matches[0].opportunity;
    animateScroll();
    return UsersOpportunity.get(nextOpportunityId).then(function(data){
      $scope.submitText='✔ Submit Preferences';
      $scope.pendingRequests--;
      var match = data.match;
      var opportunity = match.opportunity;
      var questions = opportunity.questions;
      var user = data.user;
      $scope.user = user;

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
      var guidanceResult = GuidanceService.processTags(opportunity, user);
      var processedTags = guidanceResult[0];
      $scope.score = guidanceResult[1];
      $scope.processedTags = [processedTags.must, processedTags.nice];
      $scope.calculateFit = generateGlyphs.calculateFit;
    });
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

  $scope.submit = function(){
    $scope.submitText = 'Submitting...';
    $scope.pendingRequests++;

    UsersOpportunity.update($scope.match).then(function(){
      $scope.submitText = 'Fetching Next';
      $scope.matches.splice(0, 1);
      if($scope.matches.length > 0){
        getNextOpportunity();
      }
    });
  };
  $scope.tips = ['You have zero interest in this opportunity or already have a conversation in progress. We will actively avoid introducing you.',
    'You\'re not that interested right now but you\'d be open to conversation, especially if they\'re interested in you.',
    'Your interest is piqued and you\'d like to learn more. This opportunity could be pretty high on your list.',
    'You are very interested in this opportunity and it stands among the top of your list. You have to meet this team!'
  ];

  initialize();

}]);