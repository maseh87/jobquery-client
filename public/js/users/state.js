//User State
app.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('users', {
      url: '/users',
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