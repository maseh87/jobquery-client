//Admin State
app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin', {
      url: '/admin',
      views: {
        'sidebar': {
          templateUrl: '/js/admin/templates/sidebar.tpl.html',
          controller: 'AdminSidebarCtrl'
        },
        'main': {
          templateUrl: '/js/admin/templates/admin.tpl.html',
          controller: 'AdminCtrl'
        }
      }
    });

}]);