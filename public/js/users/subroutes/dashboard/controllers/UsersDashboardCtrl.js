app.controller('UsersDashboardCtrl',
  ['$scope', 'UsersOpportunity', 'GuidanceService', 'generateGlyphs', 'DialogueService', '$sce',
  function ($scope, UsersOpportunity, GuidanceService, generateGlyphs, DialogueService, $sce) {

  var matches, matchesWithInterest;
  $scope.submitText = '✔ Submit Preferences';
  $scope.pendingRequests = 0;
  $scope.slides = [];
  $scope.default = true;
  $scope.isVideo = false;

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
      matchesWithInterest = data.matches.filter(function(match){
        return (match.userInterest !== 0) && opps[match.opportunity];
      });
      $scope.matches = matches;
      $scope.matchesWithInterest = matchesWithInterest;
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
      $scope.completedUserTags = user.tags.filter(function(tag){
        return tag.value !== null;
      }).length;

      $scope.percentageOfSurveyCompleted = Math.floor(($scope.completedUserTags / $scope.user.tags.length) * 100).toString() + '%';

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

      if(opportunity.company.media.length === 0) {
        $scope.defaultImage = "http://thesimplephysicist.com/wp-content/uploads/2014/05/default-avatar.jpg";
      }

      for (var j = 0; j < opportunity.company.media.length; j++) {
        $scope.defaultImage = opportunity.company.media[0].url;
        //check if the midea is video or image, if it match youtube, it is video
        if ( opportunity.company.media[j].url.match(/youtube/)){
          $scope.slides.push({
            video: opportunity.company.media[j].url,
            caption: opportunity.company.media[j].caption
          });
        } else {
          $scope.slides.push({
            image: opportunity.company.media[j].url,
            caption: opportunity.company.media[j].caption
          });
        }
      }
    });
  };


  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
    if(imageUrl.match(/youtube/)) {
      $scope.isVideo = true;
    }
    else{
      $scope.default = false;
      $scope.isVideo = false;
    }
  };

  $scope.updateInterest = function (value) {
    if (!$scope.match) { return undefined; }

    $scope.match.answers = $scope.match.answers.map(function(answerObj){
      if(answerObj.answer === ''){
        answerObj.answer = ' ';
      }
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
    $scope.default = true;
    $scope.isVideo = false;

    UsersOpportunity.update($scope.match).then(function(){
      $scope.submitText = 'Fetching Next';
      $scope.matches.splice(0, 1);
      //delete medias from last opportunity
      while ($scope.slides.length) {
        $scope.slides.shift();
      }

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
