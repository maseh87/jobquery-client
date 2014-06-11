//User State
app.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('user', {
      url: '/user',
      templateUrl: '/js/user/core/templates/user.tpl.html',
      controller: 'UserCtrl'
    });

}]);