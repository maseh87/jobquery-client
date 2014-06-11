//User.Account State
app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('user.account', {
      url: '/account',
      templateUrl: '/js/user/account/core/templates/account.tpl.html',
      controller: 'UserAccountCtrl'
    });

}]);