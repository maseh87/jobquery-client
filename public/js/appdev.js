var app = angular.module('jobQuery', ['ui.router', 'ngResource', 'LocalStorageModule','ui.bootstrap','ui.bootstrap.tpls']);


// app.constant('SERVER_URL', 'http://jobquery.azurewebsites.net');
// app.constant('SERVER_URL', 'http://jobquerystagingserver.azurewebsites.net/');
app.constant('SERVER_URL', 'http://localhost:9000');

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true; //Enable cross domain calls
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  // Remove the header used to identify ajax call that would prevent CORS from working
  // http://thibaultdenizet.com/tutorial/cors-with-angular-js-and-sinatra/
}]);
