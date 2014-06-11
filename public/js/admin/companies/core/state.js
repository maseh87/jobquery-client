app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.companies', {
      url: '/companies',
      templateUrl: '/js/admin/companies/core/templates/companies.tpl.html',
      controller: 'AdminCompaniesCtrl'
    });

}]);