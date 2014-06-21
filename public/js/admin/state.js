//Admin State
app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin', {
      url: '/admin',
      resolve: {
        redirect: function($location, localStorageService, $q){
          var deferred = $q.defer();
          var isAdmin = JSON.parse(localStorageService.get('isAdmin'));
          if(isAdmin){
            deferred.resolve();
          } else {
            $location.path('/login');
            deferred.resolve();
          }
          return deferred.promise;
        }
      },
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