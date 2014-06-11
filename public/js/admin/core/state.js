//Admin State
app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin', {
      url: '/admin',
      templateUrl: '/js/admin/core/templates/admin.tpl.html',
      controller: 'AdminCtrl'
    })

}]);