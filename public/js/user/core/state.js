//User State
app.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('user', {
      url: '/user',
      views: {
        'sidebar': {
          templateUrl: '/js/user/core/templates/sidebar.tpl.html',
          controller: 'UserSidebarCtrl'
        },
        'main': {
          templateUrl: '/js/user/core/templates/user.tpl.html',
          controller: 'UserCtrl'
        }
      }
    });

}]);