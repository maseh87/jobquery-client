app
  .factory('Match', ['$http', 'SERVER_URL', function($http, SERVER_URL){
    var matchMethods = {};

    matchMethods.getAll = function(){
      return $http({
        method: 'GET',
        url: SERVER_URL + '/api/matches'
      });
    };

    matchMethods.getUsers = function(opportunityId){
      return $http({
        method: 'GET',
        url: SERVER_URL + '/api/matches/users/' + opportunityId
      });
    };

    matchMethods.getOpportunities = function(userId){
      return $http({
        method: 'GET',
        url: SERVER_URL + '/api/matches/opportunities/' + userId
      })
    };

    return matchMethods;
  }]);