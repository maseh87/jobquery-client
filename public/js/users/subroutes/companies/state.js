app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('users.companies', {
      abstract: true,
      url: '/companies',
      template: '<ui-view/>'
    })
      .state('users.companies.all', {
        url: '',
        templateUrl: '/js/users/subroutes/companies/templates/companies.tpl.html',
        controller: 'UsersCompaniesCtrl'
      })
      .state('users.companies.detail', {
        url: '/:_id',
        templateUrl: '/js/users/subroutes/companies/templates/detail.tpl.html',
        controller: 'UsersCompaniesDetailCtrl'
      });

}]);