app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.candidates', {
      url: '/candidates',
      templateUrl: '/js/admin/subroutes/candidates/templates/candidates.tpl.html',
      controller: 'AdminCandidatesCtrl'
    })
    .state('admin.candidates.detail', {
      url: '/:id',
      templateUrl: '/js/admin/subroutes/candidates/templates/detail.tpl.html',
      controller: 'AdminCandidatesDetailCtrl'
    });

}]);