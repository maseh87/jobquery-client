app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.dashboard', {
      url: '/dashboard/:_id',
      templateUrl: '/js/admin/subroutes/dashboard/templates/dashboard.tpl.html',
      controller: 'AdminDashboardCtrl'
    });

}]);
