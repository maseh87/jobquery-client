//User State
app.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('users', {
      url: '/users',
      resolve: {
        redirect: ['$location', 'localStorageService', function ($location, localStorageService) {
          var isAdmin = localStorageService.get('isAdmin');
          if(isAdmin === 'true'){
            $location.path('/login');
          }
        }]
      },
      views: {
        'sidebar': {
          templateUrl: '/js/users/templates/sidebar.tpl.html',
          controller: 'UsersSidebarCtrl'
        },
        'main': {
          templateUrl: '/js/users/templates/users.tpl.html',
          controller: 'UsersCtrl'
        }
      }
    });

}]);
