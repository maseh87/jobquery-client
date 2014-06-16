app
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