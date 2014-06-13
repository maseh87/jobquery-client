app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.companies', {
      url: '/companies',
      templateUrl: '/js/admin/subroutes/companies/templates/companies.tpl.html',
      resolve: {
        Resource: ['Company', function(Company){
          return Company;
        }]
      },
      controller: 'ResourceCtrl'
    })
    .state('admin.companies.detail', {
      url: '/:_id',
      templateUrl: '/js/admin/subroutes/companies/templates/detail.tpl.html',
      controller: 'ResourceDetailCtrl'
    })
    .state('admin.companies.detail.edit', {
      url: '/edit',
      templateUrl: '/js/admin/subroutes/companies/templates/edit.tpl.html',
      controller: 'ResourceEditCtrl'
    })
    .state('admin.companies.new', {
      url: '/new',
      templateUrl: '/js/admin/subroutes/companies/templates/new.tpl.html',
      controller: 'ResourceNewCtrl'
    });

}]);