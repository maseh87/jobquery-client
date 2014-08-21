app.factory('OpportunityResource', ['$resource', 'SERVER_URL', function ($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/opportunities/:_id', null, {update: {method: 'PUT'}});
}]);

app.factory('Opportunity', ['OpportunityResource', function(OpportunityResource) {
  var opportunityMethods = {};

  opportunityMethods.getAll = function () {
    return OpportunityResource.query().$promise;
  };

  opportunityMethods.get = function (id) {
    return OpportunityResource.get({_id: id}).$promise;
  };

  opportunityMethods.create = function (newOpportunity) {
    var opportunity = new OpportunityResource(newOpportunity);
    return opportunity.$save();
  };

  opportunityMethods.update = function (opportunity) {
    return OpportunityResource.update({_id: opportunity._id}, opportunity).$promise;
  };
  return opportunityMethods;
}]);

(function(){
  var users;
  app.factory('CacheFactory', ['$cacheFactory', '$http', 'SERVER_URL', function($cacheFactory, $http, SERVER_URL) {
    users = $http({
        method: 'GET',
        url: SERVER_URL + '/api/matches'
      }).then(function (response) {
        return response.data;
      });

    return {
      users: users
    };
  }]);
}());