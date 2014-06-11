app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.opportunities', {
      url: '/opportunities',
      templateUrl: '/js/admin/subroutes/opportunities/templates/opportunities.tpl.html',
      controller: 'AdminOpportunitiesCtrl'
    });

}]);