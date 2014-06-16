app.factory('UserResource', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
  return $resource(SERVER_URL + '/api/users/:_id', null, {update: {method: 'PUT'}});
}]);

app.factory('User', ['UserResource', function(UserResource){
  var userMethods = {};

  userMethods.getAll = function(){
    return UserResource.query().$promise;
  };

  userMethods.get = function(id){
    return UserResource.get({_id: id}).$promise;
  };

  userMethods.create = function(user){
    var user = new UserResource(user);
    return user.$save();
  };

  userMethods.update = function(user){
    return UserResource.update({_id: user._id}, user).$promise;
  };

  return userMethods;
}]);