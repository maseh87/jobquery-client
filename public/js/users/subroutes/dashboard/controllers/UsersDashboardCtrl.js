app.controller('UsersDashboardCtrl', ['$scope', 'UsersOpportunity', function ($scope, UsersOpportunity) {

  var objectifyMatches = function(matches){
    var matchesObj = {};

    matches.forEach(function(match){
      matchesObj[match.opportunity] = {
        _id: match._id,
        answers: match.answers,
        userInterest: match.userInterest
      };
    });

    return matchesObj;
  };

  var normalizeQuestionsAndAnswers = function(opportunity, match){
    var numQuestions = opportunity.questions.length;
    var numAnswers = match.answers.length;
    var difference = numQuestions - numAnswers;

    if(difference){
      for(var i = 0; i < difference; i++){
        match.answers.push({ answer: '' });
      }
    };

  };

  var formatData = function(opportunities, matches){
    matches = objectifyMatches(matches);

    opportunities.forEach(function(opportunity){
      var match = matches[opportunity._id];
      normalizeQuestionsAndAnswers(opportunity, match);
      opportunity.match = match;
    });

    return opportunities.filter(function(opportunity){
      return opportunity.match.userInterest === 0;
    });

  };

  UsersOpportunity.getAll().then(function(data){
    $scope.opportunities = formatData(data.opportunities, data.matches);
  });

  $scope.submit = function(){
    UsersOpportunity.update($scope.opportunities[0].match).then(function(){
      $scope.opportunities.splice(0, 1);
    });
  };

}]);
