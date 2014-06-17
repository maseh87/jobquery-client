app.factory('UserCompanyResource', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
  return $resource(SERVER_URL + '/api/public/companies/:_id', null, {update: {method: 'PUT'}});
}]);

app.factory('UsersCompany', ['UserCompanyResource', function(UserCompanyResource){
  var companyMethods = {};

  companyMethods.getAll = function(){
    return UserCompanyResource.query().$promise;
  };

  companyMethods.get = function(id){
    return UserCompanyResource.get({_id: id}).$promise;
  };

  return companyMethods;

}]);