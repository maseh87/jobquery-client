app.factory('UsersAccount', ['$http', 'SERVER_URL', function($http, SERVER_URL){
  var methods = {};

  methods.get = function(){
    return $http({
      method: 'GET',
      url: SERVER_URL + '/api/public/account'
    }).then(function(data){
      return data.data;
    }); 
  };

  methods.update = function(user){
    return $http({
      method: 'PUT',
      url: SERVER_URL + '/api/public/account',
      data: user
    });
  };

  return methods;
}]);