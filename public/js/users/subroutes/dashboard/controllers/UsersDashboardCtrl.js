app.controller('UsersDashboardCtrl', ['$scope', 'UsersOpportunity', function ($scope, UsersOpportunity) {

  var matches;

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
      var processedTags = processTags(opportunity, user);
      $scope.processedTags = [processedTags.must, processedTags.nice];
    });
  };

  var objectifyUserTags = function(user){
    var tags = user.tags;
    var tagsObj = {};

    tags.forEach(function(tag){
      tagsObj[tag.tag._id] = tag.value;
    });

    return tagsObj;
  };

  var processTags = function(opportunity, user){
    var userTags = objectifyUserTags(user);
    var tags = opportunity.tags;
    var processed = {
      'must': {
        'scale': [],
        'binary': [],
        'text': []
      },
      'nice': {
        'scale': [],
        'binary': [],
        'text': []
      }
    };

    tags.forEach(function(tag){
      if(tag.importance === 'must'){
        processed.must[tag.tag.type].push({
          name: tag.tag.name,
          value: tag.value,
          userValue: userTags[tag.tag._id]
        });
      } else if (tag.importance === 'nice'){
        processed.nice[tag.tag.type].push({
          name: tag.tag.name,
          value: tag.value,
          userValue: userTags[tag.tag._id]
        });
      }
    });

    return processed;
  };

  $scope.submit = function(){
    UsersOpportunity.update($scope.match).then(function(){
      $scope.matches.splice(0, 1);
      getNextOpportunity();
    });
  };

  initialize();

}]);
