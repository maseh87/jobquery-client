var app = angular.module('jobQuery', ['ui.router', 'ngResource', 'LocalStorageModule', 'ui.bootstrap', 'ui.bootstrap.tpls', 'videosharing-embed']);

app.constant('SERVER_URL', '/* @echo SERVER_URL */');

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true; //Enable cross domain calls
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  // Remove the header used to identify ajax call that would prevent CORS from working
  // http://thibaultdenizet.com/tutorial/cors-with-angular-js-and-sinatra/
  $httpProvider.interceptors.push('LoadingInterceptor');
}]);


app.run(function($rootScope) {
  $rootScope.notifications = {
    loading: false
  };

});

app.factory('LoadingInterceptor', ['$rootScope', function($rootScope) {
  return {
    response: function(obj) {
      console.log('response');
      $rootScope.notifications.loading = false;
      return obj;
    },
    request: function(obj) {
      console.log('request');

      $rootScope.notifications.loading = true;
      return obj;
    }
  };
}]);