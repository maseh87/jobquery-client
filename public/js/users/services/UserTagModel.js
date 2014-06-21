app.factory('UserTagResource',
  ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
  return $resource(SERVER_URL + '/public/tags', {});
}]);

app.factory('UserTag', ['UserTagResource', function(UserTagResource){
  var userTagMethods = {};

  userTagMethods.getAll = function(){
    return UserTagResource.query().$promise;
  };

  return userTagMethods;
}]);
