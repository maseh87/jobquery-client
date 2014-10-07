var app = angular.module('jobQuery', ['ui.router', 'ngResource', 'LocalStorageModule', 'ui.bootstrap', 'ui.bootstrap.tpls', 'videosharing-embed', 'ngAnimate']);

app.constant('SERVER_URL', 'http://localhost:9000');

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true; //Enable cross domain calls
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  // Remove the header used to identify ajax call that would prevent CORS from working
  // http://thibaultdenizet.com/tutorial/cors-with-angular-js-and-sinatra/
  $httpProvider.interceptors.push('LoadingInterceptor');

}]);

app.run(['$rootScope', function($rootScope) {
 $rootScope.notifications = {
   loading: false
 };
}]);

app.factory('LoadingInterceptor', ['$rootScope', function($rootScope) {
  return {
    response: function(obj) {
      $rootScope.notifications.loading = false;
      return obj;
    },
    request: function(obj) {
      $rootScope.notifications.loading = true;
      return obj;
    }
  };
}]);

app.animation('.overlay', function() {
  return {
    enter: function(elem, callback) {
      $(elem).animate({
        opacity: '0.4'
      }, 500, callback);
    },
    leave: function(elem, callback) {
      $(elem).animate({
        opacity: '0'
      }, 500, callback);
    }
  };
});