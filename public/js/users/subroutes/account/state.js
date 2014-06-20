//User.Account State
app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('users.account', {
      url: '/account/:_id',
      templateUrl: '/js/users/subroutes/account/templates/account.tpl.html',
      controller: 'UsersAccountCtrl'
    });

}]);
