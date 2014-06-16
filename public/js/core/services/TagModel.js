app.factory('Tag', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
  return $resource(SERVER_URL + '/api/tags/:_id', null, {update: {method: 'PUT'}});
}]);