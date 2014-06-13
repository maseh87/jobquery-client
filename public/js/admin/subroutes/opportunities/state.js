app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.opportunities', {
      url: '/opportunities',
      templateUrl: '/js/admin/subroutes/opportunities/templates/opportunities.tpl.html',
      resolve: {
        Resource: ['Opportunity', function(Opportunity){
          return Opportunity;
        }]
      },
      controller: 'ResourceCtrl'
    })
    .state('admin.opportunities.detail', {
      url: '/:id',
      templateUrl: '/js/admin/subroutes/opportunities/templates/detail.tpl.html',
      controller: 'ResourceDetailCtrl'
    })
    .state('admin.opportunities.detail.edit', {
      url: '/edit',
      templateUrl: '/js/admin/subroutes/opportunities/templates/edit.tpl.html',
      controller: 'ResourceEditCtrl'
    })
    .state('admin.opportunities.new', {
      url: '/new',
      templateUrl: '/js/admin/subroutes/opportunities/templates/new.tpl.html',
      controller: 'ResourceNewCtrl'
    });

}]);