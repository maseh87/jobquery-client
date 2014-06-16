app.factory('User', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
  return $resource(SERVER_URL + '/api/users/:_id', null, {update: {method: 'PUT'}});
}]);