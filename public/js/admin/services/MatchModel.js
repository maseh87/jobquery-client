app
  .factory('Match', ['$http', 'SERVER_URL', function($http, SERVER_URL){
    var matchMethods = {};

    matchMethods.getAll = function(){
      return $http({
        method: 'GET',
        url: SERVER_URL + '/api/matches'
      }).then(function(response){
        return response.data;
      });
    };

    matchMethods.getUsers = function(opportunityId){
      return $http({
        method: 'GET',
        url: SERVER_URL + '/api/matches/users/' + opportunityId
      }).then(function(response){
        return response.data;
      });
    };

    matchMethods.getOpportunities = function(userId){
      return $http({
        method: 'GET',
        url: SERVER_URL + '/api/matches/opportunities/' + userId
      }).then(function(response){
        return response.data;
      });
    };

    return matchMethods;
  }]);