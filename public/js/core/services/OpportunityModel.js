app.factory('Opportunity', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
  return $resource(SERVER_URL + '/api/opportunities/:_id', null, {update: {method: 'PUT'}});
}]);