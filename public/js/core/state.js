//Application Level State
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/js/core/templates/home.tpl.html',
      controller: 'AppCtrl'
    })
    .state('404', {
      url: '/404',
      templateUrl: '/js/core/templates/404.tpl.html',
      controller: 'AppCtrl'
    });

}]);