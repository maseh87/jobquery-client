app.config(['$stateProvider', function($stateProvider){

  $stateProvider
    .state('admin.candidates', {
      url: '/candidates',
      templateUrl: '/js/admin/subroutes/candidates/templates/candidates.tpl.html',
      resolve: {
        Resource: ['User', function(User){
          return User;
        }]
      },
      controller: 'ResourceCtrl'
    })
    .state('admin.candidates.detail', {
      url: '/:_id',
      templateUrl: '/js/admin/subroutes/candidates/templates/detail.tpl.html',
      controller: 'ResourceDetailCtrl'
    })
    .state('admin.candidates.detail.edit', {
      url: '/edit',
      templateUrl: '/js/admin/subroutes/candidates/templates/edit.tpl.html',
      controller: 'ResourceEditCtrl'
    })
    .state('admin.candidates.new', {
      url: '/new',
      templateUrl: '/js/admin/subroutes/candidates/templates/new.tpl.html',
      controller: 'ResourceCandidateCtrl'
    });

}]);