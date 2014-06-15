app
  .constant('SERVER_URL', 'http://localhost:9000')

  .factory('authHttpInterceptor', ['localStorageService', function(localStorageService) {
   return {
     'request': function(config) {
       config.headers = config.headers || {};
       if(localStorageService.get('token')){
         config.headers.Authorization = 'Bearer ' + localStorageService.get('token');
       }
       return config;
     }
   };
  }])

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authHttpInterceptor');
  }])

  .factory('User', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
    return $resource(SERVER_URL + '/api/users/:_id', null, {update: {method: 'PUT'}});
  }])

  .factory('Message', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
    return $resource(SERVER_URL + '/api/messages/:_id');
  }])

  .factory('Tag', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
    return $resource(SERVER_URL + '/api/tags/:_id', null, {update: {method: 'PUT'}});
  }])

  .factory('CompanyResource', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
    return $resource(SERVER_URL + '/api/companies/:_id', null, {update: {method: 'PUT'}});
  }])

  .factory('Company', ['CompanyResource', function(CompanyResource){
    var companyMethods = {};

    companyMethods.getAll = function(){
      return CompanyResource.query().$promise;
    };

    companyMethods.get = function(id){
      return CompanyResource.get({_id: id}).$promise;
    };

    companyMethods.create = function(company){
      var company = new CompanyResource(company);
      return company.$save();
    };

    companyMethods.update = function(company){
      return CompanyResource.update({_id: company._id}, company).$promise;
    };

    return companyMethods;
  }])

  .factory('Opportunity', ['$resource', 'SERVER_URL', function($resource, SERVER_URL){
    return $resource(SERVER_URL + '/api/opportunities/:_id', null, {update: {method: 'PUT'}});
  }]);
