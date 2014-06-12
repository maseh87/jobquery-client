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
    });

}]);