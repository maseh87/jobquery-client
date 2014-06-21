//Application Level State
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/js/core/templates/home.tpl.html',
      resolve: {
        redirect: function($location, localStorageService){
          var isAdmin = JSON.parse(localStorageService.get('isAdmin'));
          if(isAdmin){
            $location.path('/admin');
          } else {
            $location.path('/users');
          }
        }
      },
      controller: 'AppCtrl'
    })
    .state('404', {
      url: '/404',
      templateUrl: '/js/core/templates/404.tpl.html',
      controller: 'AppCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/js/core/templates/login.tpl.html',
      controller: 'LoginCtrl'
    });

}]);