//User.Account State
app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('user.account', {
      url: '/account',
      templateUrl: '/js/user/subroutes/account/templates/account.tpl.html',
      controller: 'UserAccountCtrl'
    });

}]);