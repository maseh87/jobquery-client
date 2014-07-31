app.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('admin.opportunities', {
      abstract: true,
      url: '/opportunities',
      template: '<ui-view/>'
    })
    .state('admin.opportunities.all', {
      url: '',
      templateUrl: '/js/admin/subroutes/opportunities/templates/opportunities.tpl.html',
      controller: 'AdminOpportunitiesCtrl'
    })
    .state('admin.opportunities.new', {
      url: '/new',
      templateUrl: '/js/admin/subroutes/opportunities/templates/new.tpl.html',
      controller: 'AdminOpportunitiesNewCtrl'
    })
    .state('admin.opportunities.detail', {
      url: '/:_id',
      templateUrl: '/js/admin/subroutes/opportunities/templates/detail.tpl.html',
      controller: 'AdminOpportunitiesDetailCtrl'
    })
    .state('admin.opportunities.preview', {
      url: '/preview',
      templateUrl: '/js/admin/subroutes/opportunities/templates/preview.tpl.html'
      // controller: 'PreviewOpportunitiesCtrl'
    });
}]);
