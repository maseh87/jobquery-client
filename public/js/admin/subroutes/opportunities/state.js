app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.opportunities', {
      url: '/opportunities',
      templateUrl: '/js/admin/subroutes/opportunities/templates/opportunities.tpl.html',
      controller: 'AdminOpportunitiesCtrl'
    })
    .state('admin.opportunities.detail', {
      url: '/:id',
      templateUrl: '/js/admin/subroutes/opportunities/templates/detail.tpl.html',
      controller: 'AdminOpportunitiesDetailCtrl'
    })
    .state('admin.opportunities.detail.edit', {
      url: '/edit',
      templateUrl: '/js/admin/subroutes/opportunities/templates/edit.tpl.html',
      controller: 'AdminOpportunitiesEditCtrl'
    })
    .state('admin.opportunities.new', {
      url: '/new',
      templateUrl: '/js/admin/subroutes/opportunities/templates/new.tpl.html',
      controller: 'AdminOpportunitiesNewCtrl'
    });

}]);