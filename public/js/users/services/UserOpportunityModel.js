app.factory('UserOpportunityResource', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
  return $resource(SERVER_URL + '/api/public/opportunities/:_id', null, {update: {method: 'PUT'}});
}]);

app.factory('UsersOpportunity', ['UserOpportunityResource', function(UserOpportunityResource){
  var userOpportunityMethods = {};

  userOpportunityMethods.getAll = function(){
    return UserOpportunityResource.query().$promise;
  };

  userOpportunityMethods.get = function(id){
    return UserOpportunityResource.get({_id: id}).$promise;
  };

  userOpportunityMethods.update = function(opportunity){
    return UserOpportunityResource.update({_id: opportunity._id}, opportunity.match).$promise;
  };

  return userOpportunityMethods;
}]);