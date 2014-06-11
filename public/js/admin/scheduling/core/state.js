app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.scheduling', {
      url: '/scheduling',
      templateUrl: '/js/admin/scheduling/core/templates/scheduling.tpl.html',
      controller: 'AdminSchedulingCtrl'
    });

}]);