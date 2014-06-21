//User State
app.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('users', {
      url: '/users',
      resolve: {
        redirect: function($location, localStorageService, $q){
          var deferred = $q.defer();
          var isAdmin = JSON.parse(localStorageService.get('isAdmin'));
          if(isAdmin){
            $location.path('/login');
            deferred.resolve();
          } else {
            deferred.resolve();
          }
          return deferred.promise;
        }
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