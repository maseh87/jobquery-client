app.factory('UserOpportunityResource', ['$resource', 'SERVER_URL', function ($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/public/opportunities/:_id', null, {update: {method: 'PUT'}});
}]);

app.factory('UsersOpportunity', ['$http', 'SERVER_URL', 'UserOpportunityResource',
  function($http, SERVER_URL, UserOpportunityResource) {
  var userOpportunityMethods = {};

  userOpportunityMethods.getAll = function () {
    return $http.get(SERVER_URL + '/public/opportunities')
    .then(function(response){
      return response.data;
    });
  };

  userOpportunityMethods.get = function(id){
    return UserOpportunityResource.get({_id: id}).$promise;
  };

  userOpportunityMethods.update = function (opportunity) {
    return UserOpportunityResource.update({_id: opportunity._id}, opportunity.match).$promise;
  };

  return userOpportunityMethods;
}]);
