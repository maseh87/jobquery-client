app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.candidates', {
      url: '/candidates',
      templateUrl: '/js/admin/candidates/core/templates/candidates.tpl.html',
      controller: 'AdminCandidatesCtrl'
    });

}]);