app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.companies', {
      url: '/companies',
      templateUrl: '/js/admin/subroutes/companies/templates/companies.tpl.html',
      controller: 'AdminCompaniesCtrl'
    })
    .state('admin.companies.detail', {
      url: '/:id',
      templateUrl: '/js/admin/subroutes/companies/templates/detail.tpl.html',
      controller: 'AdminCompaniesDetailCtrl'
    })
    .state('admin.companies.detail.edit', {
      url: '/edit',
      templateUrl: '/js/admin/subroutes/companies/templates/edit.tpl.html',
      controller: 'AdminCompaniesEditCtrl'
    })
    .state('admin.companies.new', {
      url: '/new',
      templateUrl: '/js/admin/subroutes/companies/templates/new.tpl.html',
      controller: 'AdminCompaniesNewCtrl'
    });

}]);