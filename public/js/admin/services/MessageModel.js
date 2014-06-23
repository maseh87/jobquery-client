app.factory('Message', ['$resource', 'SERVER_URL', function ($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/messages/:_id');
}]);
