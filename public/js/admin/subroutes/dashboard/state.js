app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.dashboard', {
      url: '/dashboard',
      templateUrl: '/js/admin/subroutes/dashboard/templates/dashboard.tpl.html',
      controller: 'AdminDashboardCtrl'
    });

}]);