app.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('admin.matches', {
      abstract: true,
      url: '/matches',
      template: '<ui-view/>'
    })
      .state('admin.matches.all', {
        url: '',
        templateUrl: '/js/admin/subroutes/matches/templates/matches.tpl.html',
        controller: 'AdminMatchesCtrl'
      });

}]);
