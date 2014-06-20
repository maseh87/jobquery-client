app.factory('UserAccountResource', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
  return $resource(SERVER_URL + '/api/public/account/:_id', null, {update: {method: 'PUT'}});
}]);

app.factory('UsersAccount', ['UserAccountResource', function(UserAccountResource){
  var userOpportunityMethods = {};

  userOpportunityMethods.get = function(id){
    return UserAccountResource.get({_id: id}).$promise;
  };

  userOpportunityMethods.update = function(opportunity){
    return UserAccountResource.update({_id: opportunity._id}, opportunity.match).$promise;
  };

  return userOpportunityMethods;
}]);