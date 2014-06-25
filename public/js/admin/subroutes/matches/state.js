app.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('admin.matches', {
      abstract: true,
      url: '/matches',
      template: '<ui-view/>'
    })
    .state('admin.matches.schedule', {
      url: '/schedule',
      template: '/js/admin/subroutes/matches/templates/schedule.tpl.html',
      controller: 'AdminMatchesScheduleCtrl'
    })
    .state('admin.matches.all', {
      url: '',
      templateUrl: '/js/admin/subroutes/matches/templates/matches.tpl.html',
      controller: 'AdminMatchesCtrl'
    });

}]);
