app
  .constant('SERVER_URL', 'http://localhost:9000')

  .factory('User', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
    return $resource(SERVER_URL + '/api/users/:_id', null, {update: {method: 'PUT'}});
  }])

  .factory('Message', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
    return $resource(SERVER_URL + '/api/messages/:_id');
  }])

  .factory('Tag', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
    return $resource(SERVER_URL + '/api/tags');
  }])

  .factory('Company', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
    return $resource(SERVER_URL + '/api/companies/:_id', null, {update: {method: 'PUT'}});
  }])

  .factory('Opportunity', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
    return $resource(SERVER_URL + '/api/opportunities/:_id', null, {update: {method: 'PUT'}});
  }]);