app.factory('UserOpportunityResource', ['$resource', 'SERVER_URL', function ($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/public/opportunities/:_id', null, {update: {method: 'PUT'}});
}]);

app.factory('UsersOpportunity', ['$http', 'SERVER_URL', 'UserOpportunityResource',
  function($http, SERVER_URL, UserOpportunityResource) {
  var userOpportunityMethods = {};

  userOpportunityMethods.getAll = function () {
    return UserOpportunityResource.get().$promise;
  };

  userOpportunityMethods.get = function(id){
    return UserOpportunityResource.get({_id: id}).$promise;
  };

  userOpportunityMethods.update = function (match) {
    return UserOpportunityResource.update({_id: match._id}, match).$promise;
  };

  return userOpportunityMethods;
}]);
