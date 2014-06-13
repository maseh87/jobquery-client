app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.opportunities', {
      abstract: true,
      url: '/opportunities',
      template: '<ui-view/>',
      resolve: {
        Resource: ['Opportunity', function(Opportunity){
          return Opportunity;
        }]
      }
    })
    .state('admin.opportunities.all', {
      url: '',
      templateUrl: '/js/admin/subroutes/opportunities/templates/opportunities.tpl.html',
      controller: 'ResourceCtrl'
    })
    .state('admin.opportunities.detail', {
      url: '/:_id',
      templateUrl: '/js/admin/subroutes/opportunities/templates/detail.tpl.html',
      controller: 'ResourceDetailCtrl'
    })
    .state('admin.opportunities.edit', {
      url: '/:_id/edit',
      templateUrl: '/js/admin/subroutes/opportunities/templates/edit.tpl.html',
      controller: 'ResourceEditCtrl'
    })
    .state('admin.opportunities.new', {
      url: '/new',
      templateUrl: '/js/admin/subroutes/opportunities/templates/new.tpl.html',
      controller: 'ResourceNewCtrl'
    });

}]);