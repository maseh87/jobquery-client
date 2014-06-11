//User State
app.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('user', {
      url: '/user',
      views: {
        'sidebar': {
          templateUrl: '/js/user/templates/sidebar.tpl.html',
          controller: 'UserSidebarCtrl'
        },
        'main': {
          templateUrl: '/js/user/templates/user.tpl.html',
          controller: 'UserCtrl'
        }
      }
    });

}]);