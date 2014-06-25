app.controller('AdminCandidatesDetailCtrl', ['User', '$scope', '$stateParams', 'Match', 'Company',
function (User, $scope, $stateParams, Match, Company) {

  var user, companies, matches;

  var initialize = function(){
    User.get($stateParams._id).then(function(data){
      user = data;
      return Match.getOpportunities(user._id);
    }).then(function(data){
      matches = data.matches
      return Company.getAll();
    }).then(function(data){
      companies = data;
      $scope.matches = parseData(matches, companies);
      $scope.user = user;
    });
  };

  var parseData = function(matches, companies){
    var parsed = [];
    companies = objectify(companies);

    matches.forEach(function(match){
      parsed.push({
        companyName: companies[match.opportunity.company].name,
        jobTitle: match.opportunity.jobTitle,
        userInterest: match.userInterest
      });
    });

    return parsed;
  };

  var objectify = function(array){
    var obj = {};
    array.forEach(function(item){
      obj[item._id] = item;
    });
    return obj;
  };

  $scope.update = function (user) {
    User.update(user)
    .then(function (updated) {
      $scope.updated = true;
    },function (updated) {
      $scope.saveError = true;
    });
  };

  initialize();

}]);
