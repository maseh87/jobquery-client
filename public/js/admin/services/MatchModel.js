app
  .factory('Match', ['$http', 'SERVER_URL', function ($http, SERVER_URL) {
    var matchMethods = {};

    matchMethods.getAll = function (queryParams) {
      return $http({
        method: 'GET',
        url: SERVER_URL + '/api/matches',
        params: queryParams
      }).then(function (response) {
        return response.data;
      });
    };

    matchMethods.getUsers = function (opportunityId) {
      return $http({
        method: 'GET',
        url: SERVER_URL + '/api/matches/opportunities/' + opportunityId
      }).then(function (response) {
        return response.data;
      });
    };

    matchMethods.getOpportunities = function (userId) {
      return $http({
        method: 'GET',
        url: SERVER_URL + '/api/matches/users/' + userId
      }).then(function (response) {
        return response.data;
      });
    };

    matchMethods.update = function (matchObject) {
      return $http({
        method: 'PUT',
        url: SERVER_URL + '/api/matches',
        data: matchObject
      }).then(function(response){
        return response.data;
      });
    };

    matchMethods.batchProcess = function(arrayOfIds){
      return $http({
        method: 'PUT',
        url: SERVER_URL + '/api/matches/batchProcess',
        data: { ids: arrayOfIds }
      }).then(function(response){
        return response.data;
      });
    };

    return matchMethods;
  }]);
