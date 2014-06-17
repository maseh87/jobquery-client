app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('users.opportunities', {
      abstract: true,
      url: '/opportunities',
      template: '<ui-view/>'
    })
    .state('users.opportunities.all', {
      url: '',
      templateUrl: '/js/users/subroutes/opportunities/templates/opportunities.tpl.html',
      controller: 'UsersOpportunitiesCtrl'
    })
    .state('users.opportunities.detail', {
      url: '/:_id',
      templateUrl: '/js/users/subroutes/opportunities/templates/detail.tpl.html',
      controller: 'UsersOpportunitiesDetailCtrl'
    });
}]);