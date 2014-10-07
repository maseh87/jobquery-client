app.config(['$stateProvider', function($stateProvider){

  $stateProvider

    .state('admin.companies', {
      abstract: true,
      url: '/companies',
      template: '<ui-view/>'
    })
      .state('admin.companies.all', {
        url: '',
        templateUrl: '/js/admin/subroutes/companies/templates/companies.tpl.html',
        controller: 'AdminCompaniesCtrl'
      })
      .state('admin.companies.new', {
        url: '/new',
        templateUrl: '/js/admin/subroutes/companies/templates/new.tpl.html',
        controller: 'AdminCompaniesNewCtrl'
      })
      .state('admin.companies.detail', {
        url: '/:_id',
        templateUrl: '/js/admin/subroutes/companies/templates/detail.tpl.html',
        controller: 'AdminCompaniesDetailCtrl'
      });

}]);
